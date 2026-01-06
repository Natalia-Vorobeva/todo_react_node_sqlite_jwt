import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = (props) => {
	if (props.isAuthenticated === null) {
		return <div>Загрузка...</div>
	}
	return (
		props.isAuthenticated ? <Outlet /> : <Navigate to="/login" />

	)
}

export default ProtectedRoute