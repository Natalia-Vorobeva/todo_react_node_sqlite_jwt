import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = (props) => {
	return (
		props.isAuthenticated ? <Outlet/> : <Navigate to="/login"/>  
			
	)
}

export default ProtectedRoute