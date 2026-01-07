import { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from '../../Form/Form';

const Login = ({ login, msg }) => {
	const [email, setEmail] = useState('')
	const [pass, setPass] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()
		login({ email, pass })
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-indigo-50 flex items-center justify-center p-4">
			<div className="w-full max-w-md transform hover:scale-[1.02] transition-all duration-500">
				<div className="bg-gradient-to-br from-white to-cyan-50 rounded-3xl border-2 border-cyan-200 shadow-2xl overflow-hidden">
					<div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-cyan-500">
						<div className="flex items-center justify-center gap-3 mb-2">
							<div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
								<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
								</svg>
							</div>
							<h2 className="text-2xl font-bold text-white">Войти в аккаунт</h2>
						</div>
						<p className="text-center text-cyan-100 text-sm">Добро пожаловать в TaskFlow</p>
					</div>

					<div className="px-8 py-6">
						<Form id="login" onSubmit={handleSubmit}>
							<div className="space-y-5">
								{/* Поле email */}
								<div>
									<label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2" htmlFor="login-email">
										<span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></span>
										Email адрес
									</label>
									<input
										className="w-full px-4 py-3.5 border-2 border-blue-200 bg-white/80 rounded-xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 placeholder:text-blue-300"
										id="login-email"
										type="email"
										placeholder="example@email.com"
										value={email}
										onChange={(e) => setEmail(e.target.value.trim())}
										required
									/>
								</div>

								{/* Поле пароля */}
								<div>
									<label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2" htmlFor="login-password">
										<span className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full"></span>
										Пароль
									</label>
									<input
										className="w-full px-4 py-3.5 border-2 border-cyan-200 bg-white/80 rounded-xl focus:ring-4 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all duration-300 placeholder:text-cyan-300"
										id="login-password"
										type="password"
										placeholder="Введите ваш пароль"
										value={pass}
										onChange={(e) => setPass(e.target.value.trim())}
										required
									/>
								</div>

								{/* Кнопки */}
								<div className="flex items-center justify-between pt-4">
									<button
										type="submit"
										className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-3 group"
									>
										<svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
										</svg>
										Войти в аккаунт
									</button>

									<Link
										to="/register"
										className="text-sm font-medium text-cyan-600 hover:text-cyan-800 hover:underline transition-all duration-300 flex items-center gap-2"
									>
										<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
										</svg>
										Создать аккаунт
									</Link>
								</div>
							</div>
						</Form>

						{/* Сообщение об ошибке */}
						{msg && (
							<div className="mt-6 p-4 bg-gradient-to-r from-red-100/50 to-pink-100/50 rounded-xl border border-red-200">
								<p className="text-red-600 font-medium flex items-center gap-2">
									<svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
									{msg}
								</p>
							</div>
						)}
					</div>
				</div>

				{/* Дополнительная информация */}
				<div className="mt-6 text-center">
					<p className="text-sm text-gray-500">
						TaskFlow • Управляйте задачами с удовольствием • 2025
					</p>
				</div>
			</div>
		</div>
	)
}

export default Login