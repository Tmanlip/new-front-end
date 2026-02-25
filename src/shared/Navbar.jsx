import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navbar({ userRole, onLogout }) {
  const navigate = useNavigate()

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '16px 24px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ fontSize: 20, fontWeight: 'bold', cursor: 'pointer' }} onClick={() => navigate('/')}>
        Legal Management System
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <span>{userRole} User</span>
        <button
          onClick={() => {
            onLogout()
            navigate('/')
          }}
          style={{
            padding: '8px 16px',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: 14
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}
