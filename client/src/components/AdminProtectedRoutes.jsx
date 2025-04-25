import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AdminProtectedRoutes = ({children}) => {
    const {currentUser} = useSelector((state)=>state.auth)
    return currentUser?.isAdmin ? children : <Navigate to="/" />
}

export default AdminProtectedRoutes
