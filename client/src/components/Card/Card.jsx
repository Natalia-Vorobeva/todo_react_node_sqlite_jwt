function Card({ item, handleDelete, handleCompleted }) {
	return (
		<li className="group relative overflow-hidden bg-gradient-to-br from-white via-white to-cyan-50/30 rounded-2xl p-4 mb-3 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-cyan-100/50">
			<div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
				item.completed === 1 
					? 'bg-gradient-to-b from-emerald-400 to-green-500' 
					: 'bg-gradient-to-b from-cyan-400 to-blue-500'
			}`}></div>
			
			<div className="flex items-start gap-3 ml-1.5">
				<div className="relative flex-shrink-0">
					<button
						onClick={(e) => handleCompleted(e, item)}
						className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
							item.completed === 1 
								? 'bg-gradient-to-br from-emerald-400 to-green-500 text-white shadow-lg ring-2 ring-emerald-100' 
								: 'bg-gradient-to-br from-white to-gray-100 text-gray-400 border border-gray-300 hover:border-cyan-400 hover:text-cyan-500 hover:shadow-md'
						}`}
					>
						{item.completed === 1 ? (
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
							</svg>
						) : (
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
							</svg>
						)}
					</button>
				</div>

				<div className="flex-1 min-w-0">
					<div className="flex items-start justify-between gap-3">
						<div className="flex-1 min-w-0 pr-2">
							<h3 className={`text-base font-bold mb-1 break-words line-clamp-2 ${
								item.completed === 1 
									? 'text-gray-500 line-through decoration-2 decoration-emerald-400' 
									: 'text-gray-800'
							}`}>
								{item.title}
							</h3>
							
							{item.text && (
								<div className="text-sm text-gray-600 leading-relaxed break-words p-2 bg-gradient-to-r from-gray-50/50 to-transparent rounded-lg border border-gray-100 line-clamp-2">
									{item.text}
								</div>
							)}
						</div>
						
						<div className="flex-shrink-0 ml-2">
							<button
								onClick={(e) => handleDelete(e, item)}
								className="hidden md:flex p-2 bg-gradient-to-br from-red-50 to-white text-red-500 hover:from-red-100 hover:to-white rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-md border border-red-100"
								title="Удалить задачу"
							>
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
					</div>
					
					<div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-gray-100 mt-2">
						<div className="flex items-center gap-2">
							<span className={`text-xs font-semibold px-3 py-1 rounded-full shadow-sm ${
								item.completed === 1 
									? 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border border-emerald-200' 
									: 'bg-gradient-to-r from-cyan-50 to-blue-50 text-blue-700 border border-cyan-200'
							}`}>
								{item.completed === 1 ? '✅ Выполнено' : '🔄 В процессе'}
							</span>
							
							{item.completed !== 1 && (
								<button
									onClick={(e) => handleCompleted(e, item)}
									className="text-xs font-semibold px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full hover:from-green-600 hover:to-emerald-700 transition-all duration-300 hover:shadow-sm"
								>
									Выполнить
								</button>
							)}
						</div>
						
						<div className="flex items-center gap-3">
							<div className="text-xs text-gray-500 font-medium">
								{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Сегодня'}
							</div>
							<button
								onClick={(e) => handleDelete(e, item)}
								className="md:hidden p-1.5 bg-gradient-to-br from-red-50 to-white text-red-500 hover:from-red-100 hover:to-white rounded-lg transition-all duration-300 border border-red-100"
								title="Удалить задачу"
							>
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		</li>
	)
}

export default Card