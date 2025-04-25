import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({children}) => {
    const {currentUser} = useSelector((state)=>state.auth)
    return currentUser ? children : <Navigate to="/signin" />
}

export default ProtectedRoutes
