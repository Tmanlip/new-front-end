import React, { useState } from 'react'
import PropTypes from 'prop-types'
import AdminLayout from '../../Admin/AdminLayout'
import { useNavigate } from 'react-router-dom'

const sampleCases = [
  { id: 'C-1001', title: 'Property Dispute', client: 'Alice Johnson', status: 'Open' },
  { id: 'C-1002', title: 'Contract Review', client: 'Bob Smith', status: 'In Progress' },
  { id: 'C-1003', title: 'Employment Claim', client: 'Carol Lee', status: 'Closed' }
]

export default function CaseList({ onLogout }) {
  const [cases, setCases] = useState(sampleCases)
  const navigate = useNavigate()

  return (
    <AdminLayout onLogout={onLogout}>
      <h2>Cases</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid #ddd' }}>
                <th style={{ padding: '8px' }}>Case ID</th>
                <th style={{ padding: '8px' }}>Title</th>
                <th style={{ padding: '8px' }}>Client</th>
                <th style={{ padding: '8px' }}>Status</th>
                <th style={{ padding: '8px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cases.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '8px' }}>{c.id}</td>
                  <td style={{ padding: '8px' }}>{c.title}</td>
                  <td style={{ padding: '8px' }}>{c.client}</td>
                  <td style={{ padding: '8px' }}>{c.status}</td>
                  <td style={{ padding: '8px' }}>
                    <button
                      onClick={() => navigate(`/admin/cases/${c.id}/documents`, { state: { case: c } })}
                      style={{ padding: '6px 8px', marginRight: 8, background: '#3498db', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

      <div style={{ marginTop: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
        <button
          onClick={() => {
            const title = window.prompt('Enter case title:')
            if (!title) return
            const client = window.prompt('Enter client name:') || 'Unknown'
            const status = window.prompt('Enter status (Open/In Progress/Closed):') || 'Open'
            const nextIdNum = cases.length ? Math.max(...cases.map(x => parseInt(x.id.replace(/[^0-9]/g, ''), 10))) + 1 : 1001
            const nextId = `C-${nextIdNum}`
            setCases([...cases, { id: nextId, title, client, status }])
          }}
          style={{ padding: '8px 12px', background: '#34495e', color: 'white', border: 'none', borderRadius: 4 }}
        >
          Create Case
        </button>
      </div>
    </AdminLayout>
  )
}

CaseList.propTypes = {
  onLogout: PropTypes.func
}
