import React, { useState } from 'react'
import PropTypes from 'prop-types'
import AdminLayout from '../AdminLayout'
import { useNavigate } from 'react-router-dom'

const sampleUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Client' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Lawyer' },
  { id: 3, name: 'Carol Lee', email: 'carol@example.com', role: 'Admin' }
]

export default function UserList({ onLogout }) {
  const [users, setUsers] = useState(sampleUsers)
  const [showAssign, setShowAssign] = useState(false)
  const [assignUser, setAssignUser] = useState(null)
  const [assignTitle, setAssignTitle] = useState('')
  const [assignDesc, setAssignDesc] = useState('')
  const [assignLawyer, setAssignLawyer] = useState('')
  const navigate = useNavigate()

  // Only lawyers from users
  const lawyers = users.filter(u => u.role === 'Lawyer')

  return (
    <AdminLayout onLogout={onLogout}>
      {/* Off-canvas for Assign Case */}
      {showAssign && (
          <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: 350,
            height: '100vh',
            background: '#fff',
            boxShadow: '-2px 0 8px rgba(0,0,0,0.15)',
            zIndex: 1000,
            padding: 24,
            transition: 'transform 0.3s',
            transform: showAssign ? 'translateX(0)' : 'translateX(100%)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h3 style={{ marginTop: 0 }}>Assign Case</h3>
            <div style={{ marginBottom: 12 }}>
              <strong>User ID:</strong> {assignUser?.id}
            </div>
            <label style={{ marginBottom: 8 }}>
              Title:<br />
              <input value={assignTitle} onChange={e => setAssignTitle(e.target.value)} style={{ width: '100%', padding: 6, marginTop: 2 }} />
            </label>
            <label style={{ marginBottom: 8 }}>
              Description:<br />
              <textarea value={assignDesc} onChange={e => setAssignDesc(e.target.value)} style={{ width: '100%', padding: 6, marginTop: 2, minHeight: 60 }} />
            </label>
            <label style={{ marginBottom: 16 }}>
              Lawyer:<br />
              <select value={assignLawyer} onChange={e => setAssignLawyer(e.target.value)} style={{ width: '100%', padding: 6, marginTop: 2 }}>
                <option value="">Select lawyer</option>
                {lawyers.map(l => (
                  <option key={l.id} value={l.id}>{l.name}</option>
                ))}
              </select>
            </label>
            <div style={{ display: 'flex', gap: 8, marginTop: 0, marginBottom: 8 }}>
              <button
                onClick={() => {
                  // Simulate assign
                  if (!assignTitle || !assignLawyer) {
                    alert('Please enter title and select a lawyer.')
                    return
                  }
                  alert(`Assigned case \"${assignTitle}\" to user ${assignUser?.name} (Lawyer: ${lawyers.find(l => l.id === parseInt(assignLawyer))?.name || ''})`)
                  setShowAssign(false)
                  setAssignUser(null)
                  setAssignTitle('')
                  setAssignDesc('')
                  setAssignLawyer('')
                }}
                style={{ padding: '8px 12px', background: '#2ecc71', color: 'white', border: 'none', borderRadius: 4 }}
              >
                Assign
              </button>
              <button
                onClick={() => {
                  setShowAssign(false)
                  setAssignUser(null)
                  setAssignTitle('')
                  setAssignDesc('')
                  setAssignLawyer('')
                }}
                style={{ padding: '8px 12px', background: '#eee', color: '#333', border: 'none', borderRadius: 4 }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <main style={{ marginLeft: 250, padding: 24, width: 'calc(100% - 250px)', minHeight: 'calc(100vh - 60px)' }}>
          <h2>Users</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid #ddd' }}>
                <th style={{ padding: '8px' }}>ID</th>
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
                      onClick={() => {
                        const caseId = window.prompt(`Open documents for ${u.name} - enter Case ID to manage:`)
                        if (caseId) navigate(`/admin/cases/${caseId}/documents`, { state: { user: u } })
                      }}
                      style={{ padding: '6px 8px', marginRight: 8, background: '#3498db', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
                    >
                      Manage
                    </button>
                    <button
                      onClick={() => {
                        setAssignUser(u)
                        setShowAssign(true)
                      }}
                      style={{ padding: '6px 8px', background: '#2ecc71', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
                    >
                      Assign Case
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
            <button
              onClick={() => navigate('/admin/users/register')}
              style={{ padding: '8px 12px', background: '#34495e', color: 'white', border: 'none', borderRadius: 4 }}
            >
              Register User
            </button>
          </div>
        </main>
    </AdminLayout>
  )
}

UserList.propTypes = {
  onLogout: PropTypes.func
}
