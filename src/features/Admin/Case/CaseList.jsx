import React from 'react'
import PropTypes from 'prop-types'
import Navbar from '../../../shared/Navbar'
import Sidebar from '../../../shared/Sidebar'
import { ADMIN_PATHS } from '../../../constants/paths'

const sampleCases = [
  { id: 'C-1001', title: 'Property Dispute', client: 'Alice Johnson', status: 'Open' },
  { id: 'C-1002', title: 'Contract Review', client: 'Bob Smith', status: 'In Progress' },
  { id: 'C-1003', title: 'Employment Claim', client: 'Carol Lee', status: 'Closed' }
]

export default function CaseList({ onLogout }) {
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
          <h2>Cases</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid #ddd' }}>
                <th style={{ padding: '8px' }}>Case ID</th>
                <th style={{ padding: '8px' }}>Title</th>
                <th style={{ padding: '8px' }}>Client</th>
                <th style={{ padding: '8px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {sampleCases.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '8px' }}>{c.id}</td>
                  <td style={{ padding: '8px' }}>{c.title}</td>
                  <td style={{ padding: '8px' }}>{c.client}</td>
                  <td style={{ padding: '8px' }}>{c.status}</td>
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

CaseList.propTypes = {
  onLogout: PropTypes.func
}
