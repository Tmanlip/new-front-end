import React, { useState, useCallback } from 'react'
import Navbar from '../../shared/Navbar'
import Sidebar from '../../shared/Sidebar'
import { useLocation } from 'react-router-dom'

export default function ClientLayout({ userRole = 'Client', children, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()

  React.useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  const handleSidebarToggle = useCallback(() => setSidebarOpen(open => !open), [])

  return (
    <div>
      <Navbar userRole={userRole} onLogout={onLogout} />
      <div style={{ display: 'flex' }}>
        <Sidebar userRole={userRole} open={sidebarOpen} onToggle={handleSidebarToggle} />
        <main style={{
          marginLeft: sidebarOpen ? 250 : 0,
          transition: 'margin-left 0.3s',
          padding: 24,
          width: sidebarOpen ? 'calc(100% - 250px)' : '100%',
          minHeight: 'calc(100vh - 60px)'
        }}>
          <button onClick={handleSidebarToggle} style={{ marginBottom: 16, display: sidebarOpen ? 'none' : 'inline-block' }}>☰</button>
          {children}
        </main>
      </div>
    </div>
  )
}
