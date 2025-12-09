// Footer.jsx
import { useState } from "react";
import Form from "../Form/Form";

function Footer({ getTodo, handleScroll }) {
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')

	function handleSubmit(e) {
		e.preventDefault()
		getTodo({ title, text })
		setTitle('')
		setText('')
		handleScroll()
	}

	return (
		<div className="bg-gradient-to-br from-white to-cyan-50 rounded-3xl border-2 border-cyan-200 shadow-2xl p-6 transform hover:scale-[1.02] transition-transform duration-500">
			<div className="flex items-center gap-3 mb-6">
				<div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
					<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
					</svg>
				</div>
				<h2 className="text-xl font-bold text-gray-800">Добавить задачу</h2>
			</div>
			
			<Form id="todos" onSubmit={handleSubmit}>
				<div className="space-y-5">
					<div>
						<label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2" htmlFor="title-todo">
							<span className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></span>
							Название задачи
						</label>
						<input
							id="title-todo" 
							type="text"
							placeholder="Что нужно сделать?"
							className="w-full px-4 py-3.5 border-2 border-cyan-200 bg-white/80 rounded-xl focus:ring-4 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all duration-300 placeholder:text-cyan-300"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					
					<div>
						<label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2" htmlFor="text-todo">
							<span className="w-2 h-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"></span>
							Описание
						</label>
						<textarea
							id="text-todo" 
							rows="4"
							className="w-full px-4 py-3.5 border-2 border-violet-200 bg-white/80 rounded-xl focus:ring-4 focus:ring-violet-500/30 focus:border-violet-500 transition-all duration-300 resize-none placeholder:text-violet-300"
							placeholder="Добавьте детали..."
							value={text}
							onChange={(e) => setText(e.target.value)}
						/>
					</div>
					
					<button 
						type="submit"
						disabled={title === ""}
						className="w-full px-6 py-4 bg-gradient-to-r from-fuchsia-500 to-pink-600 text-white font-bold rounded-xl hover:from-fuchsia-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg flex items-center justify-center gap-3 group"
					>
						<svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
						</svg>
						<span className="drop-shadow-md">Добавить задачу</span>
					</button>
				</div>
			</Form>
			
			{/* Подсказка */}
			<div className="mt-6 p-3 bg-gradient-to-r from-cyan-100/50 to-blue-100/50 rounded-xl border border-cyan-200">
				<p className="text-sm text-cyan-700 flex items-center gap-2">
					<svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					Задачи автоматически сохраняются и синхронизируются
				</p>
			</div>
		</div>
	)
}

export default Footer