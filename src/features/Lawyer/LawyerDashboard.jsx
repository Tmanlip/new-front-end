import React from 'react'
import Navbar from '../../shared/Navbar'
import Sidebar from '../../shared/Sidebar'

export default function LawyerDashboard({ onLogout }) {
  const lawyerMenuItems = [
    {
      label: 'Work',
      links: [
        { name: 'Dashboard', href: '#', icon: '📊' },
        { name: 'My Cases', href: '#', icon: '📁' },
        { name: 'Clients', href: '#', icon: '👤' },
        { name: 'Documents', href: '#', icon: '📄' }
      ]
    },
    {
      label: 'Schedule',
      links: [
        { name: 'Appointments', href: '#', icon: '📅' },
        { name: 'Calendar', href: '#', icon: '🗓️' },
        { name: 'Billing', href: '#', icon: '💰' }
      ]
    }
  ]

  return (
    <div>
      <Navbar userRole="Lawyer" onLogout={onLogout} />
      <div style={{ display: 'flex' }}>
        <Sidebar userRole="Lawyer" menuItems={lawyerMenuItems} />
        <main style={{ marginLeft: 250, padding: 24, width: 'calc(100% - 250px)', minHeight: 'calc(100vh - 60px)' }}>
          <h1>Lawyer Dashboard</h1>
          <p>Welcome, Lawyer! Access your cases and client information here.</p>
          <div style={{ marginTop: 20, padding: 16, backgroundColor: '#f0f0f0', borderRadius: 4 }}>
            <h3>Lawyer Features:</h3>
            <ul>
              <li>View My Cases</li>
              <li>Client Management</li>
              <li>Document Library</li>
              <li>Schedule Appointments</li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  )
}
