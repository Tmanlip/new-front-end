import React from 'react'
import PropTypes from 'prop-types'
import Navbar from '../../../shared/Navbar'
import Sidebar from '../../../shared/Sidebar'
import { ADMIN_PATHS } from '../../../constants/paths'

const sampleUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Client' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Lawyer' },
  { id: 3, name: 'Carol Lee', email: 'carol@example.com', role: 'Admin' }
]

export default function UserList({ onLogout }) {
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
          <h2>Users</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid #ddd' }}>
                <th style={{ padding: '8px' }}>ID</th>
                <th style={{ padding: '8px' }}>Name</th>
                <th style={{ padding: '8px' }}>Email</th>
                <th style={{ padding: '8px' }}>Role</th>
              </tr>
            </thead>
            <tbody>
              {sampleUsers.map(u => (
                <tr key={u.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '8px' }}>{u.id}</td>
                  <td style={{ padding: '8px' }}>{u.name}</td>
                  <td style={{ padding: '8px' }}>{u.email}</td>
                  <td style={{ padding: '8px' }}>{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 16 }}>
            <button onClick={onLogout} style={{ padding: '8px 12px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: 4 }}>Logout</button>
          </div>
        </main>
      </div>
    </div>
  )
}

UserList.propTypes = {
  onLogout: PropTypes.func
}
