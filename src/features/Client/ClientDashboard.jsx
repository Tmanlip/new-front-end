import React from 'react'
import Navbar from '../../shared/Navbar'
import Sidebar from '../../shared/Sidebar'

export default function ClientDashboard({ onLogout }) {
  const clientMenuItems = [
    {
      label: 'My Account',
      links: [
        { name: 'Dashboard', href: '#', icon: '📊' },
        { name: 'My Cases', href: '#', icon: '📁' },
        { name: 'My Lawyer', href: '#', icon: '⚖️' },
        { name: 'Messages', href: '#', icon: '💬' }
      ]
    },
    {
      label: 'Documents',
      links: [
        { name: 'Upload', href: '#', icon: '⬆️' },
        { name: 'Downloads', href: '#', icon: '⬇️' },
        { name: 'Invoices', href: '#', icon: '📋' }
      ]
    }
  ]

  return (
    <div>
      <Navbar userRole="Client" onLogout={onLogout} />
      <div style={{ display: 'flex' }}>
        <Sidebar userRole="Client" menuItems={clientMenuItems} />
        <main style={{ marginLeft: 250, padding: 24, width: 'calc(100% - 250px)', minHeight: 'calc(100vh - 60px)' }}>
          <h1>Client Dashboard</h1>
          <p>Welcome, Client! View your case status and communicate with your lawyer.</p>
          <div style={{ marginTop: 20, padding: 16, backgroundColor: '#f0f0f0', borderRadius: 4 }}>
            <h3>Client Features:</h3>
            <ul>
              <li>View Case Status</li>
              <li>Message Lawyer</li>
              <li>Upload Documents</li>
              <li>View Invoices</li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  )
}
