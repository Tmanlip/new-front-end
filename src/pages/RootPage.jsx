import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import AdminDashboard from '../features/Admin/AdminDashboard'
import LawyerDashboard from '../features/Lawyer/LawyerDashboard'
import ClientDashboard from '../features/Client/ClientDashboard'
import { useAuth } from '../context/AuthContext'
import { PUBLIC_PATHS } from '../constants/paths'

export default function RootPage() {
  const { isAuthenticated, userRole, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (!isAuthenticated) {
    return <Navigate to={PUBLIC_PATHS.LOGIN} replace />
  }

  // Render appropriate dashboard based on user role
  if (userRole === 'Admin') {
    return <AdminDashboard onLogout={handleLogout} />
  } else if (userRole === 'Lawyer') {
    return <LawyerDashboard onLogout={handleLogout} />
  } else if (userRole === 'Client') {
    return <ClientDashboard onLogout={handleLogout} />
  }
}
