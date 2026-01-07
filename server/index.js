const express = require("express")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const app = express()
const port = process.env.PORT || 3000
const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const fs = require('fs')

const MY_SECRET_KEY = process.env.MY_SECRET_KEY || "default_dev_secret_key_1234567890"

app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Authorization: ${req.headers.authorization ? 'present' : 'missing'}`)
  next()
})

const dbPath = process.env.NODE_ENV === 'production' 
  ? '/tmp/todolist.db' 
  : 'todolist.db'  

if (process.env.NODE_ENV === 'production') {
  fs.access(dbPath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log('Creating new database file...')
    } else {
      console.log('Using existing database file')
    }
  })
}

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message)
  } else {
    console.log('Connected to SQLite database at:', dbPath)
    
    db.run('PRAGMA foreign_keys = ON', (err) => {
      if (err) {
        console.error('Error enabling foreign keys:', err.message)
      } else {
        console.log('Foreign keys enabled')
        createTables()
      }
    })
  }
})

const createTables = () => {
  return new Promise((resolve, reject) => {
    // Таблица пользователей
    const usersTable = `
      CREATE TABLE IF NOT EXISTS users(
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        pass TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `
    
    // Таблица задач с внешним ключом
    const todosTable = `
      CREATE TABLE IF NOT EXISTS todos(
        todo_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        text TEXT,
        completed INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
      )
    `
    
    db.serialize(() => {
      db.run(usersTable, (err) => {
        if (err) {
          console.error('Error creating users table:', err.message)
          reject(err)
          return
        }
        console.log('Users table ready')
        
        db.run(todosTable, (err) => {
          if (err) {
            console.error('Error creating todos table:', err.message)
            reject(err)
            return
          }
          
          addDemoDataIfNeeded().then(() => {
            console.log('Database initialization complete')
            resolve()
          }).catch(reject)
        })
      })
    })
  })
}

const addDemoDataIfNeeded = () => {
  return new Promise((resolve, reject) => {
    db.get("SELECT COUNT(*) as count FROM users", (err, row) => {
      if (err) {
        console.error('Error checking users count:', err.message)
        reject(err)
        return
      }
      
      if (row.count === 0) {      
        db.run(
          `INSERT INTO users (first_name, email, pass) VALUES (?, ?, ?)`,
          ['Demo User', 'demo@example.com', 'demo123'],
          function(err) {
            if (err) {
              console.error('Error adding demo user:', err.message)
              reject(err)
              return
            }
            
            const userId = this.lastID           
            const demoQueries = [
              `INSERT INTO todos (user_id, title, text, completed) VALUES (?, 'Первая задача', 'Это пример задачи', 0)`,
              `INSERT INTO todos (user_id, title, text, completed) VALUES (?, 'Выполненная задача', 'Эта задача выполнена', 1)`,
              `INSERT INTO todos (user_id, title, text, completed) VALUES (?, 'Важная задача', 'Не забудьте сделать это!', 0)`
            ]
            
            let completed = 0
            const total = demoQueries.length
            
            demoQueries.forEach((query, index) => {
              db.run(query, [userId], (err) => {
                if (err) {
                  console.error(`Error adding demo task ${index + 1}:`, err.message)
                } else {
                  completed++
                }
                
                if (completed === total) {
                  resolve()
                }
              })
            })
          }
        )
      } else {
        resolve()
      }
    })
  })
}

// Функции для работы с базой данных
const selectUsers = function (email, callback) {
  db.get("SELECT * FROM users WHERE email = ?", [email], callback)
}

const selectTodos = function (user_id, callback) {
  db.all("SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC", [user_id], callback)
}

const insertData = function (name, email, pass, callback) {
  db.run(
    `INSERT INTO users (first_name, email, pass) VALUES (?, ?, ?)`,
    [name, email, pass],
    callback
  )
}

const insertItem = function (user_id, title, text, callback) {
  db.run(
    `INSERT INTO todos (user_id, title, text) VALUES (?, ?, ?)`,
    [user_id, title, text],
    callback
  )
}

const updateItem = function (todo_id, user_id, completed, callback) {
  db.run(
    `UPDATE todos SET completed = ? WHERE todo_id = ? AND user_id = ?`,
    [completed, todo_id, user_id],
    callback
  )
}

const deleteItem = function (todo_id, user_id, callback) {
  db.run(
    `DELETE FROM todos WHERE todo_id = ? AND user_id = ?`,
    [todo_id, user_id],
    callback
  )
}

if (process.env.NODE_ENV === 'production') {
  const clientPath = path.join(__dirname, '../client/dist')
  
  if (fs.existsSync(clientPath)) {
    console.log('Serving static files from:', clientPath)
    app.use(express.static(clientPath))
  }
}

app.get("/api/check-token", (req, res) => {
  const authHeader = req.header('Authorization')
  
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided', login: false })
  }
  
  const token = authHeader.replace('Bearer ', '')
  
  try {
    const decode = jwt.verify(token, MY_SECRET_KEY)
    
    selectUsers(decode.email, (err, row) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ error: 'Database error', login: false })
      }
      
      if (!row) {
        return res.status(404).json({ error: 'User not found', login: false })
      }
      
      selectTodos(row.user_id, (err, todos) => {
        if (err) {
          console.error(err)
          return res.status(500).json({ error: 'Database error', login: false })
        }
        
        res.json({
          token: jwt.sign(
            { user_id: row.user_id, email: row.email },
            MY_SECRET_KEY,
            { expiresIn: '7d' }
          ),
          data: { name: row.first_name, email: row.email },
          msg: "",
          login: true,
          todos: todos || []
        })
      })
    })
  } catch (error) {
    res.status(401).json({ error: 'Invalid token', login: false })
  }
})

app.post("/api/register", (req, res) => {
  const reqBody = req.body
  selectUsers(req.body.email, function (err, row) {
    if (err) {
      console.error(err)
      return res.status(500).json({ error: 'Database error' })
    }
    
    if (row) {
      return res.json({
        msg: "The user with this email address is registered",
      })
    }
    
    insertData(req.body.name, req.body.email, req.body.pass, function (err) {
      if (err) {
        console.error(err)
        return res.status(500).json({ error: 'Database error' })
      }
      
      if (!this.lastID) {
        return res.json({ msg: "Something seems to have gone wrong..." })
      }
      
      res.json({
        msg: "signup successful",
        jwt: jwt.sign({ user_id: this.lastID, email: reqBody.email }, MY_SECRET_KEY),
        data: { name: reqBody.first_name, email: reqBody.email },
        login: false
      })
    })
  })
})

app.post("/api/login", (req, res) => {
  const email = req.body.email
  const pass = req.body.pass
  const token = req.body.token
  
  if (token == "") {
    selectUsers(email, function (err, row) {
      if (err) {
        console.error(err)
        return res.status(500).json({ error: 'Database error' })
      }
      
      if (!row) {
        return res.json({ msg: "The user was not found" })
      }
      
      if (row.pass === pass) {
        selectTodos(row.user_id, function (err, data) {
          if (err) {
            console.error(err)
            return res.status(500).json({ error: 'Database error' })
          }
          
          res.json({
            token: jwt.sign({ user: row.user_id, email: row.email }, MY_SECRET_KEY),
            data: { name: row.first_name, email: row.email },
            msg: "",
            login: true,
            todos: data || []
          })
        })
      } else {
        res.json({
          msg: "Incorrect password"
        })
      }
    })
  } else {
    try {
      const decode = jwt.verify(token, MY_SECRET_KEY)
      const { email, user_id } = decode
      
      selectUsers(email, function (err, row) {
        if (err) {
          console.error(err)
          return res.status(500).json({ error: 'Database error' })
        }
        
        if (!row) {
          return res.json({ msg: "The user was not found" })
        }
        
        if (row.pass === pass) {
          selectTodos(row.user_id, function (err, data) {
            if (err) {
              console.error(err)
              return res.status(500).json({ error: 'Database error' })
            }
            
            res.json({
              token: jwt.sign({ user: row.user_id, email: row.email }, MY_SECRET_KEY),
              data: { name: row.first_name, email: row.email },
              msg: "",
              login: true,
              todos: data || []
            })
          })
        } else {
          res.json({
            msg: "Incorrect password"
          })
        }
      })
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' })
    }
  }
})

app.post("/api/new", (req, res) => {
  selectUsers(req.body.email, function (err, row) {
    if (err) {
      console.error(err)
      return res.status(500).json({ error: 'Database error' })
    }
    
    if (!row) {
      return res.json({ msg: "The user was not found" })
    }
    
    insertItem(row.user_id, req.body.title, req.body.text, function (err) {
      if (err) {
        console.error(err)
        return res.status(500).json({ error: 'Database error' })
      }
      
      selectTodos(row.user_id, function (err, row) {
        if (err) {
          console.error(err)
          return res.status(500).json({ error: 'Database error' })
        }
        
        res.json({
          todos: row || []
        })
      })
    })
  })
})

app.post("/api/delete", (req, res) => {
  deleteItem(req.body.todo_id, req.body.user_id, function (err) {
    if (err) {
      console.error(err)
      return res.status(500).json({ error: 'Database error' })
    }
    
    selectTodos(req.body.user_id, function (err, data) {
      if (err) {
        console.error(err)
        return res.status(500).json({ error: 'Database error' })
      }
      
      res.json({
        todos: data || []
      })
    })
  })
})

app.post("/api/update", (req, res) => {
  updateItem(req.body.item.todo_id, req.body.item.user_id, req.body.item.completed,
    function (err) {
      if (err) {
        console.error(err)
        return res.status(500).json({ error: 'Database error' })
      }
      
      selectTodos(req.body.item.user_id, function (err, data) {
        if (err) {
          console.error(err)
          return res.status(500).json({ error: 'Database error' })
        }
        
        res.json({
          todos: data || []
        })
      })
    }
  )
})

// Раздача статики React
if (process.env.NODE_ENV === 'production') {
  const clientPath = path.join(__dirname, '../client/dist')
  
  if (fs.existsSync(clientPath)) {
    console.log('Serving static files from:', clientPath)
    
    // Сначала пытаемся найти статический файл
    app.use(express.static(clientPath))
    
    // Все остальные GET запросы отдаем index.html (SPA)
    app.get('*', (req, res) => {
      res.sendFile(path.join(clientPath, 'index.html'))
    })
  }
}

app.listen(port, () => {
  console.log(`Server is running on port ${port} in ${process.env.NODE_ENV || 'development'} mode`)
})