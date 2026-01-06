const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('/tmp/todolist.db', sqlite3.OPEN_READONLY, (err) => {
	if (err) {
		console.error('Cannot open database:', err.message)
		process.exit(1)
	}

	console.log('Connected to database')

	// Проверяем таблицы
	db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
		if (err) {
			console.error('Error reading tables:', err.message)
		} else {
			console.log('\nTables in database:')
			tables.forEach(table => console.log(`  - ${table.name}`))
		}

		// Показываем данные
		db.all("SELECT user_id, email, created_at FROM users", (err, users) => {
			console.log('\nUsers:')
			if (users && users.length > 0) {
				users.forEach(user => console.log(`  ${user.user_id}: ${user.email} (${user.created_at})`))
			} else {
				console.log('  No users found')
			}

			db.all("SELECT todo_id, user_id, title, completed FROM todos", (err, todos) => {
				console.log('\nTodos:')
				if (todos && todos.length > 0) {
					todos.forEach(todo => {
						const status = todo.completed ? '✓' : '○'
						console.log(`  ${status} ${todo.todo_id}: ${todo.title} (user: ${todo.user_id})`)
					})
				} else {
					console.log('  No todos found')
				}

				db.close()
				console.log('\nDatabase check complete')
			})
		})
	})
})