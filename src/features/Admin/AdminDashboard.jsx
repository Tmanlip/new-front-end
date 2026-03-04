import React from 'react'
import AdminLayout from './AdminLayout'

export default function AdminDashboard({ onLogout }) {
  return (
    <AdminLayout onLogout={onLogout}>
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
    </AdminLayout>
  )
}
