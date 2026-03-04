import React, { useState } from 'react'
import AdminLayout from './../AdminLayout'
import { AdminEditUserModal } from './editModal'

const initialUsers = [
  { id: 'U-101', name: 'Alice Johnson', email: 'alice@example.com', role: 'Client' },
  { id: 'U-102', name: 'Bob Smith', email: 'bob@lawyer.com', role: 'Lawyer' }
]

export default function AdminUserList({ onLogout }) {
  const [users, setUsers] = useState(initialUsers)
  const [editingUser, setEditingUser] = useState(null)

  const handleSaveUser = (updatedUser) => {
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u))
    setEditingUser(null)
  }

  return (
    <AdminLayout onLogout={onLogout}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Manage Users</h2>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #ddd' }}>
            <th style={{ padding: '8px' }}>User ID</th>
            <th style={{ padding: '8px' }}>Name</th>
            <th style={{ padding: '8px' }}>Email</th>
            <th style={{ padding: '8px' }}>Role</th>
            <th style={{ padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px' }}>{u.id}</td>
              <td style={{ padding: '8px' }}>{u.name}</td>
              <td style={{ padding: '8px' }}>{u.email}</td>
              <td style={{ padding: '8px' }}>{u.role}</td>
              <td style={{ padding: '8px' }}>
                <button
                  onClick={() => setEditingUser(u)}
                  style={{ padding: '6px 12px', background: '#f39c12', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <AdminEditUserModal 
          user={editingUser} 
          onSave={handleSaveUser} 
          onCancel={() => setEditingUser(null)} 
        />
      )}
    </AdminLayout>
  )
}