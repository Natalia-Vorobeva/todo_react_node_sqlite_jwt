import {
	BrowserRouter as Router,
	Routes, Route
} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import * as api from './api/api.js'
import Login from './components/Pages/Login/Login'
import Register from './components/Pages/Register/Register'
import TodoList from './components/Pages/TodoList/TodoList'
import { useState, useEffect } from 'react'
import ProtectedRoute from './utils/ProtectedRoute.jsx'
import { Suspense } from 'react';
import Loading from './components/Loading/Loading.jsx';

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(null)
	const [dataForm, setDataForm] = useState({})
	const [todos, setTodos] = useState([])
	const [msg, setMsg] = useState('')
	const [msgReg, setMsgReg] = useState('')
	const navigate = useNavigate()

useEffect(() => {
  const token = localStorage.getItem('token')
  
  if (token) {
    handleToken()
  } else {
    // Если нет токена, показываем страницу логина
    setIsAuthenticated(false)
  }
}, [])

const handleToken = () => {
  const token = localStorage.getItem('token')
  if (token) {
    // Только если есть токен, проверяем его
    api
      .checkToken(token)
      .then((res) => {
        if (res.login == true) {
          setIsAuthenticated(res.login)
          setDataForm(res.data)
          setTodos(res.todos.reverse())
          localStorage.setItem('user', JSON.stringify({ name: res.data.name, email: res.data.email }))
          navigate('/', { replace: true })
        }
        else {
          navigate('/login', { replace: true })
        }
      })
      .catch(err => {
        console.log(err)
        navigate('/login', { replace: true }) 
      })
  } else {
    navigate('/login', { replace: true }) 
  }
}

	const login = (values) => {
		const { email, pass } = values
		const token = localStorage.getItem('token')
		api
			.authorize(email, pass, token ? token : '')
			.then((res) => {
				res.msg !== "" && setMsg(res.msg)
				if (res.token) {
					localStorage.setItem('user', JSON.stringify({ name: res.data.name, email: res.data.email }))
					localStorage.setItem('token', res.token)
					setIsAuthenticated(res.login)
					navigate('/', { replace: true })
					setDataForm({ name: res.data.name, email: res.data.email })
					setTodos(res.todos.reverse())
				}
			})
			.catch((err) => {
				console.log('%cDATA', 'color: purple', err, 'error')
			})
	}

	const register = (values) => {
		const { name, email, pass } = values;
		api
			.register(name, email, pass)
			.then((res) => {
				if (res.msg === 'The user with this email address is registered') {
					return setMsgReg(res.msg)
				} else if (res.msg === "signup successful")
					localStorage.setItem('token', res.jwt)
				setIsAuthenticated(res.login)
				navigate('/login', { replace: true })
				setDataForm(res.data)
				setMsgReg('')
			})
			.catch((err) => {
				console.log('%cDATA', 'color: #5093c3', err, 'err')
			})
	}

	const logout = () => {
		setIsAuthenticated(false)
		localStorage.removeItem('token')
		localStorage.removeItem('user')
		navigate('/login', { replace: true })
		setDataForm({})
		setMsg('')
		setTodos([])
	}

	const getTodo = (values) => {
		let user = localStorage.getItem('user')
		const dataUser = JSON.parse(user)
		const { title, text } = values
		api
			.getItemTodos(dataUser.email, title, text)
			.then((res) => {
				setTodos(res.todos.reverse())
			})
			.catch((err) => {
				console.log('%cDATA', 'color: purple', err)
			})
	}

	const deleteItemTodos = (item) => {
		api
			.deleteItem(item.todo_id, item.user_id)
			.then((res) => {
				setTodos(res.todos.reverse())
			})
			.catch(err => {
				console.log(err)
			})
	}

	const updateItemTodos = (item) => {
		api
			.updateItem(item)
			.then((res) => {
				setTodos(res.todos.reverse())
			})
			.catch(err => {
				console.log(err)
			})
	}

	return (
		<div className="w-full h-full"> 
			<Routes>
				<Route path="/login"
					element={
						<Suspense fallback={<Loading />}>
							<Login setIsAuthenticated={setIsAuthenticated} login
								={login} msg={msg} />
						</Suspense>
					} />
				<Route path="/register"
					element={<Register register={register} msgReg={msgReg} />} />
				<Route element={<ProtectedRoute isAuthenticated
					={isAuthenticated} />} >
					<Route path="/" exact
						element={
							<Suspense fallback={<Loading />}>
								<TodoList
									todos={todos}
									getTodo={getTodo}
									data={dataForm}
									logout={logout}
									deleteItem={deleteItemTodos}
									updateItem={updateItemTodos}
								/>
							</Suspense>
						} />
				</Route>
			</Routes>
		</div>
	)
}

export default App