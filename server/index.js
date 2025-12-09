const express = require("express")
const dotenv = require('dotenv')
dotenv.config({ path: '../.env' })
const cors = require("cors")
const jwt = require("jsonwebtoken")
const app = express()
const port = process.env.PORT || 3000
const sqlite3 = require('sqlite3').verbose()
app.use(express.json())
app.use(cors())
app.use(express.json())
const db = new sqlite3.Database('todolist.db')
const s = `
		    CREATE TABLE IF NOT EXISTS users(
		      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
		      first_name TEXT,
		      email TEXT  UNIQUE,
					pass TEXT
		    )
		  `
db.run(s, (err) => {
	err
		?
		console.error('Error creating table:', err.message)
		:
		console.log('Table created successfully')
})

const s2 = `
		    CREATE TABLE IF NOT EXISTS todos(
		      todo_id INTEGER PRIMARY KEY AUTOINCREMENT,
					user_id INT NOT NULL,
		      title TEXT,
		      text TEXT,
					completed INTEGER,
					FOREIGN KEY (user_id) REFERENCES users(user_id)
		    )
		  `
db.run(s2, (err) => {
	err
		?
		console.error('Error creating table:', err.message)
		:
		console.log('Table created successfully')
})

const selectUsers = function (email, callback) {
	db.get("SELECT * FROM users WHERE email = ?", [email], callback)
}
const selectTodos = function (user_id, callback) {
	db.all("SELECT * FROM todos WHERE user_id = ?", [user_id], callback)
}
const insertData = function (name, email, pass, callback) {
	db.run(`INSERT INTO users (first_name, email, pass)  VALUES ("${name}", "${email}", "${pass}")`, callback)
}
const insertItem = function (user_id, title, text, callback) {
	db.run(`INSERT INTO todos (user_id, title, text)  VALUES ("${user_id}", "${title}", "${text}")`, callback)
}
const updateItem = function (todo_id, user_id, completed, callback) {
	db.run(`UPDATE todos SET completed=? WHERE todo_id=? AND user_id=?`, [completed, todo_id, user_id], callback)
}
const deleteItem = function (todo_id, user_id, callback) {
	db.run(`DELETE FROM todos WHERE todo_id=? AND user_id=?`, [todo_id, user_id], callback)
}

app.get("/", (req, res) => {
	const token = req.header('Authorization').replace('Bearer ', '')
	if (token) {
		const decode = jwt.verify(token, process.env.MY_SECRET_KEY)
		selectUsers(decode.email, function (err, row) {
			if (err) throw Error(err)
			if (row) {
				selectTodos(row.user_id, function (err, data) {
					if (err) throw Error(err)
					if (data) {
						res.json({
							token: jwt.sign({ user: row.user_id, email: row.email }, process.env.MY_SECRET_KEY),
							data: { name: row.first_name, email: row.email },
							msg: "",
							login: true,
							todos: data

						})
					} else {
						res.json({
							token: jwt.sign({ user: row.user_id, email: row.email }, process.env.MY_SECRET_KEY),
							data: { name: row.first_name, email: row.email },
							msg: "",
							login: true
						})
					}
				})
			}
		})
	}
})
app.post("/register", (req, res) => {
	const reqBody = req.body
	selectUsers(req.body.email, function (err, row) {
		if (err) throw Error(err)
		if (row) {
			res.json({
				msg: "The user with this email address is registered",
			})
		} else {
			insertData(req.body.name, req.body.email, req.body.pass, function (err) {
				if (err) throw Error(err)
				if (!this.lastID) {
					res.json({ msg: "Something seems to have gone wrong..." })
				}
				res.json({
					msg: "signup successful",
					jwt: jwt.sign({ user_id: this.lastID, email: reqBody.email }, process.env.MY_SECRET_KEY),
					data: { name: reqBody.first_name, email: reqBody.email },
					login: false
				})
			})
		}
	})
})
app.post("/login", (req, res) => {
	const email = req.body.email
	const pass = req.body.pass
	const token = req.body.token
	if (token == "") {
		selectUsers(email, function (err, row) {
			if (err) throw Error(err)
			if (!row) return res.json({ msg: "The user was not found" })
			if (row) {
				if (row.pass === pass) {
					selectTodos(row.user_id, function (err, data) {
						if (err) throw Error(err)
						if (data) {
							res.json({
								token: jwt.sign({ user: row.user_id, email: row.email }, process.env.MY_SECRET_KEY),
								data: { name: row.first_name, email: row.email },
								msg: "",
								login: true,
								todos: data
							})
						} else {
							res.json({
								token: jwt.sign({ id: row.user_id, email: row.email }, process.env.MY_SECRET_KEY),
								data: { name: row.first_name, email: row.email },
								msg: "",
								login: true
							})
						}
					})
				} else {
					res.json({
						msg: "Incorrect password"
					})
				}
			}
		})
	} else {
		const decode = jwt.verify(token, process.env.MY_SECRET_KEY)
		const { email, user_id } = decode
		selectUsers(email, function (err, row) {
			if (err) throw Error(err)
			if (!row) return res.json({ msg: "The user was not found" })
			if (row) {
				if (row.pass === pass) {
					selectTodos(row.user_id, function (err, data) {
						if (err) throw Error(err)
						if (data) {
							res.json({
								token: jwt.sign({ user: row.user_id, email: row.email }, process.env.MY_SECRET_KEY),
								data: { name: row.first_name, email: row.email },
								msg: "",
								login: true,
								todos: data
							})
						} else {
							res.json({
								token: jwt.sign({ id: row.user_id, email: row.email }, process.env.MY_SECRET_KEY),
								data: { name: row.first_name, email: row.email },
								msg: "",
								login: true
							})
						}
					})
				} else {
					res.json({
						msg: "Incorrect password"
					})
				}
			}
		})
	}
})
app.post("/new", (req, res) => {
	selectUsers(req.body.email, function (err, row) {
		if (err) throw Error(err)
		if (!row) res.json({ msg: "The user was not found" })
		insertItem(row.user_id, req.body.title, req.body.text, function (err) {
			if (err) throw Error(err)
			selectTodos(row.user_id, function (err, row) {
				if (err) throw Error(err)
				res.json({
					todos: row
				})
			})
		})
	})
})
app.post("/delete", (req, res) => {
	deleteItem(req.body.todo_id, req.body.user_id, function (err) {
		if (err) throw Error(err)
		selectTodos(req.body.user_id, function (err, data) {
			if (err) throw Error(err)
			res.json({
				todos: data
			})
		})
	})
})

app.post("/update", (req, res) => {
	updateItem(req.body.item.todo_id, req.body.item.user_id, req.body.item.completed,
		function (err) {
			if (err) throw Error(err)
			selectTodos(req.body.item.user_id, function (err, data) {
				if (err) throw Error(err)
				res.json({
					todos: data
				})
			})
		}
	)
})

app.listen(port, () => {
	console.log(`Server is running : 
    http://localhost:${port}/`)
})
