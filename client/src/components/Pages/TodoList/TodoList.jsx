import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import Header from '../../Header/Header.jsx';
import Footer from '../../Footer/Footer.jsx';
import Card from '../../Card/Card.jsx';

function TodoList({ logout, data, getTodo, todos, deleteItem, updateItem }) {
	const navigate = useNavigate()
	const ref = useRef(null)
	const handleLogout = () => {
		logout()
		navigate('/login')
	}
	const handleDelete = (e, item) => {
		e.preventDefault()
		deleteItem(item)
	}
	const handleCompleted = (e, item) => {
		e.preventDefault()
		updateItem({ ...item, completed: 1 })
	}
	const handleScroll = () => ref.current.scrollIntoView({ top: 0, behavior: 'smooth' })

	return (
		<div className="flex flex-col bg-gradient-to-br from-cyan-50 via-white to-indigo-50 overflow-auto">
			{/* Header с тем же контейнером, что и основной контент */}
			<div className="container mx-auto px-4 max-w-6xl w-full">
				<Header data={data} handleLogout={handleLogout} />
			</div>

			<main className="container mx-auto px-4 py-6 max-w-6xl w-full flex-1 overflow-hidden">
				{/* Статистика */}
				<div className="mb-6">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
						<div className="bg-gradient-to-br from-orange-500 to-pink-500 text-white rounded-xl p-4 shadow-md">
							<div className="text-2xl font-bold">{todos.length}</div>
							<div className="text-orange-100 text-sm">Всего задач</div>
						</div>
						<div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl p-4 shadow-md">
							<div className="text-2xl font-bold">
								{todos.filter(t => t.completed === 1).length}
							</div>
							<div className="text-emerald-100 text-sm">Выполнено</div>
						</div>
						<div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-xl p-4 shadow-md">
							<div className="text-2xl font-bold">
								{todos.filter(t => t.completed !== 1).length}
							</div>
							<div className="text-purple-100 text-sm">Активных</div>
						</div>
					</div>
				</div>

				<div className="flex flex-col lg:flex-row gap-6 flex-1 overflow-hidden">
					{/* Список задач */}
					<div className="lg:flex-1 min-w-0 flex flex-col overflow-hidden">
						<div className="bg-white rounded-xl border border-cyan-100/50 shadow-sm overflow-hidden flex-1 flex flex-col h-full">
							<div className="px-5 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 flex-shrink-0">
								<h2 className="text-lg font-semibold text-white">
									Мои задачи
								</h2>
							</div>

							{/* Контейнер списка с зеленым скроллом */}
							<div className="overflow-y-auto flex-1 min-h-0 bg-gradient-to-b from-white to-cyan-50/20 scrollbar-thin scrollbar-thumb-cyan-300 scrollbar-track-cyan-50 hover:scrollbar-thumb-cyan-400">
    <ol ref={ref} className="px-4 py-2">
        {todos?.length === 0 ? (
            <div className="py-10 text-center">
                <p className="text-cyan-600 font-medium">Нет задач. Добавьте первую!</p>
                <p className="text-cyan-400 text-sm mt-1">Используйте форму</p>
            </div>
        ) : (
            todos?.map((item, index) => {
                return <Card
                    key={`${item.id || index}`}
                    item={item}
                    handleDelete={handleDelete}
                    handleCompleted={handleCompleted}
                />
            })
        )}
    </ol>
</div>
						</div>
					</div>

					{/* Форма добавления */}
					<div className="lg:w-96">
						<div className="sticky top-6">
							<Footer getTodo={getTodo} handleScroll={handleScroll} />
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}

export default TodoList