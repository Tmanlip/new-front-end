import React from 'react'
import { useNavigate } from 'react-router-dom'
import AdminDashboard from '../features/Admin/AdminDashboard'
import LawyerDashboard from '../features/Lawyer/LawyerDashboard'
import ClientDashboard from '../features/Client/ClientDashboard'
import { useAuth } from '../context/AuthContext'

export default function RootPage() {
  const { isAuthenticated, userRole, login, logout } = useAuth()
  const navigate = useNavigate()

  const handleRoleLogin = (role) => {
    const normalizedRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()

    const user = {
      id: `${normalizedRole.toUpperCase()}-001`,
      name: `${normalizedRole} User`,
      email: `${normalizedRole.toLowerCase()}@example.com`,
      role: normalizedRole
    }

    const loginCases = Array.from({ length: 8 }, (_, index) => {
      const caseNumber = String(index + 1).padStart(3, '0')
      return {
        id: `CASE-${normalizedRole.toUpperCase()}-${caseNumber}`,
        title: `${normalizedRole} Case ${index + 1}`,
        status: index % 3 === 0 ? 'Open' : index % 3 === 1 ? 'In Progress' : 'Closed'
      }
    })

    const initialCase = loginCases[0]

    login({ user, currentCase: initialCase, cases: loginCases })
    navigate(`/${role.toLowerCase()}`)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (!isAuthenticated) {
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
