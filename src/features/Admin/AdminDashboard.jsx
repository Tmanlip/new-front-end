import React from 'react'
import Navbar from '../../shared/Navbar'
import Sidebar from '../../shared/Sidebar'
import { ADMIN_PATHS } from '../../constants/paths'

export default function AdminDashboard({ onLogout }) {
  const adminMenuItems = [
    {
      label: 'Management',
      links: [
        { name: 'Dashboard', href: ADMIN_PATHS.DASHBOARD, icon: '📊' },
        { name: 'Users', href: ADMIN_PATHS.USERS, icon: '👥' },
        { name: 'Cases', href: ADMIN_PATHS.CASES, icon: '🗂️' },
        { name: 'Lawyers', href: ADMIN_PATHS.LAWYERS, icon: '⚖️' },
        { name: 'Clients', href: ADMIN_PATHS.CLIENTS, icon: '📋' }
      ]
    },
    {
      label: 'System',
      links: [
        { name: 'Reports', href: ADMIN_PATHS.REPORTS, icon: '📈' },
        { name: 'Settings', href: ADMIN_PATHS.SETTINGS, icon: '⚙️' },
        { name: 'Audit Logs', href: ADMIN_PATHS.AUDIT_LOGS, icon: '📝' },
        { name: 'Backups', href: ADMIN_PATHS.BACKUPS, icon: '💾' }
      ]
    }
  ]

  return (
    <div>
      <Navbar userRole="Admin" onLogout={onLogout} />
      <div style={{ display: 'flex' }}>
        <Sidebar userRole="Admin" menuItems={adminMenuItems} />
        <main style={{ marginLeft: 250, padding: 24, width: 'calc(100% - 250px)', minHeight: 'calc(100vh - 60px)' }}>
          <h1>Admin Dashboard</h1>
          <p>Welcome, Admin! You have full access to the system.</p>
          <div style={{ marginTop: 20, padding: 16, backgroundColor: '#f0f0f0', borderRadius: 4 }}>
            <h3>Admin Features:</h3>
            <ul>
              <li>Manage Users</li>
              <li>View Reports</li>
              <li>System Settings</li>
              <li>User Audits</li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  )
}
