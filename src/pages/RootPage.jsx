import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminDashboard from '../features/Admin/AdminDashboard'
import LawyerDashboard from '../features/Lawyer/LawyerDashboard'
import ClientDashboard from '../features/Client/ClientDashboard'

export default function RootPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const navigate = useNavigate()

  const handleRoleLogin = (role) => {
    setUserRole(role)
    setIsLoggedIn(true)
    navigate(`/${role.toLowerCase()}`)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserRole(null)
    navigate('/')
  }

  if (!isLoggedIn) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <div style={{ textAlign: 'center', padding: 24, backgroundColor: 'white', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', maxWidth: 400 }}>
          <h1>Welcome</h1>
          <p>Please select your role and log in</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20 }}>
            <button 
              onClick={() => handleRoleLogin('Admin')} 
              style={{ padding: '10px 20px', fontSize: 16, backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
            >
              Login as Admin
            </button>
            <button 
              onClick={() => handleRoleLogin('Lawyer')} 
              style={{ padding: '10px 20px', fontSize: 16, backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
            >
              Login as Lawyer
            </button>
            <button 
              onClick={() => handleRoleLogin('Client')} 
              style={{ padding: '10px 20px', fontSize: 16, backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: 4, cursor: 'pointer' }}
            >
              Login as Client
            </button>
          </div>
        </div>
      </div>
    )
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
