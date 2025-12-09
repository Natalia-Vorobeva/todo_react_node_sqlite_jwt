import { useState } from "react";
import { Link } from 'react-router-dom';
import Form from "../../Form/Form";

function Register({ register, msgReg }) {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [pass, setPass] = useState('')
	const [error, setError] = useState(null)

	const isValidEmail = (email) => {
		return /\S+@\S+\.\S+/.test(email)
	}
	const valid = isValidEmail(email)

	const handleSubmit = (e) => {
		e.preventDefault()
		setError(null)
		if (isValidEmail(email)) {
			register({ name: name.trim(), email, pass })
			setError('')
		} else {
			setError('Пожалуйста, введите корректный email адрес')
		}
	}	
	
	return (
		<div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-indigo-50 flex items-center justify-center p-4">
			<div className="w-full max-w-md transform hover:scale-[1.02] transition-all duration-500">
				{/* Карточка регистрации */}
				<div className="bg-gradient-to-br from-white to-cyan-50 rounded-3xl border-2 border-cyan-200 shadow-2xl overflow-hidden">
					{/* Заголовок с градиентом */}
					<div className="px-8 py-6 bg-gradient-to-r from-violet-600 to-purple-700">
						<div className="flex items-center justify-center gap-3 mb-2">
							<div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
								<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
								</svg>
							</div>
							<h2 className="text-2xl font-bold text-white">Создать аккаунт</h2>
						</div>
						<p className="text-center text-violet-100 text-sm">Присоединяйтесь к TaskFlow</p>
					</div>

					{/* Форма */}
					<div className="px-8 py-6">
						<Form id="register" onSubmit={handleSubmit}>
							<div className="space-y-5">
								{/* Поле имени */}
								<div>
									<label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2" htmlFor="register-user">
										<span className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></span>
										Имя пользователя
									</label>
									<input
										className="w-full px-4 py-3.5 border-2 border-cyan-200 bg-white/80 rounded-xl focus:ring-4 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all duration-300 placeholder:text-cyan-300"
										id="register-user"
										type="text"
										placeholder="Введите ваше имя"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>

								{/* Поле email */}
								<div>
									<label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2" htmlFor="register-email">
										<span className="w-2 h-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"></span>
										Email адрес
									</label>
									<input
										className={`w-full px-4 py-3.5 border-2 bg-white/80 rounded-xl focus:ring-4 focus:border-cyan-500 transition-all duration-300 placeholder:text-violet-300 ${
											email && !valid 
												? 'border-red-400 focus:ring-red-500/30' 
												: 'border-violet-200 focus:ring-violet-500/30'
										}`}
										id="register-email"
										type="email"
										placeholder="example@email.com"
										value={email}
										onChange={(e) => setEmail(e.target.value.trim())}
									/>
									{email && !valid && (
										<p className="mt-2 text-sm text-red-500 flex items-center gap-2">
											<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
											</svg>
											Введите корректный email адрес
										</p>
									)}
								</div>

								{/* Поле пароля */}
								<div>
									<label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2" htmlFor="register-password">
										<span className="w-2 h-2 bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-full"></span>
										Пароль
									</label>
									<input
										className="w-full px-4 py-3.5 border-2 border-fuchsia-200 bg-white/80 rounded-xl focus:ring-4 focus:ring-fuchsia-500/30 focus:border-fuchsia-500 transition-all duration-300 placeholder:text-fuchsia-300"
										id="register-password"
										type="password"
										placeholder="Не менее 4 символов"
										value={pass}
										onChange={(e) => setPass(e.target.value.trim())}
									/>
									{pass.length > 0 && pass.length < 4 && (
										<p className="mt-2 text-sm text-amber-500 flex items-center gap-2">
											<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>
											Пароль должен содержать минимум 4 символа
										</p>
									)}
								</div>

								{/* Кнопки */}
								<div className="flex items-center justify-between pt-4">
									<button
										disabled={name === "" || pass.length < 4 || !valid}
										className="px-8 py-3.5 bg-gradient-to-r from-fuchsia-500 to-pink-600 text-white font-bold rounded-xl hover:from-fuchsia-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg flex items-center gap-3 group"
									>
										<svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
										</svg>
										Создать аккаунт
									</button>
									
									<Link 
										to="/login" 
										className="text-sm font-medium text-purple-600 hover:text-purple-800 hover:underline transition-all duration-300 flex items-center gap-2"
									>
										<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
										</svg>
										Уже есть аккаунт?
									</Link>
								</div>
							</div>
						</Form>

						{/* Сообщения об ошибках */}
						{(msgReg || error) && (
							<div className="mt-6 p-4 bg-gradient-to-r from-red-100/50 to-pink-100/50 rounded-xl border border-red-200">
								{msgReg && (
									<p className="text-red-600 font-medium flex items-center gap-2">
										<svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
										{msgReg}
									</p>
								)}
								{error && !msgReg && (
									<p className="text-red-600 font-medium flex items-center gap-2">
										<svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
										{error}
									</p>
								)}
							</div>
						)}

						{/* Информация о безопасности */}
						<div className="mt-6 p-3 bg-gradient-to-r from-cyan-100/50 to-blue-100/50 rounded-xl border border-cyan-200">
							<p className="text-xs text-cyan-700 flex items-center gap-2">
								<svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
								</svg>
								Ваши данные защищены и не передаются третьим лицам
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Register