import React, { useMemo, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import AdminLayout from '../../AdminLayout'
import { AdminEditCaseModal } from './editModal'

const initialCases = [
  { id: 'C-1001', title: 'Property Dispute', description: 'Dispute over property ownership documents.', client: 'Alice Johnson', lawyer: 'Bob Smith', status: 'Open' },
  { id: 'C-1002', title: 'Contract Review', description: 'Review of business contract clauses.', client: 'Bob Smith', lawyer: 'Carol Lee', status: 'In Progress' },
  { id: 'C-1003', title: 'Employment Claim', description: 'Workplace claim and response preparation.', client: 'Carol Lee', lawyer: 'David Kim', status: 'Closed' }
]

export default function AdminEditCasePage({ onLogout }) {
  const { id } = useParams()
  const location = useLocation()
  const routeCase = location.state?.case

  const seededCases = useMemo(() => {
    if (!id) return initialCases

    const fallbackCase = {
      id,
      title: routeCase?.title || 'Untitled Case',
      description: routeCase?.description || '',
      client: routeCase?.client || 'Unknown',
      lawyer: routeCase?.lawyer || 'Unassigned',
      status: routeCase?.status || 'Open'
    }

    const existing = initialCases.find(item => item.id === id)
    if (existing) {
      return initialCases.map(item => (item.id === id ? { ...item, ...routeCase } : item))
    }

    return [fallbackCase, ...initialCases]
  }, [id, routeCase])

  const [cases, setCases] = useState(seededCases)
  const [editingCase, setEditingCase] = useState(null)

  const displayedCases = id ? cases.filter(item => item.id === id) : cases

  const handleSaveCase = (updatedCase) => {
    setCases(prevCases => prevCases.map(item => (
      item.id === updatedCase.id ? updatedCase : item
    )))
    setEditingCase(null)
  }

  return (
    <AdminLayout onLogout={onLogout}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Manage Cases</h2>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #ddd' }}>
            <th style={{ padding: '8px' }}>Case ID</th>
            <th style={{ padding: '8px' }}>Title</th>
            <th style={{ padding: '8px' }}>Description</th>
            <th style={{ padding: '8px' }}>Client</th>
            <th style={{ padding: '8px' }}>Lawyer</th>
            <th style={{ padding: '8px' }}>Status</th>
            <th style={{ padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedCases.map(item => (
            <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px' }}>{item.id}</td>
              <td style={{ padding: '8px' }}>{item.title || '—'}</td>
              <td style={{ padding: '8px' }}>{item.description || '—'}</td>
              <td style={{ padding: '8px' }}>{item.client || '—'}</td>
              <td style={{ padding: '8px' }}>{item.lawyer || '—'}</td>
              <td style={{ padding: '8px' }}>{item.status || '—'}</td>
              <td style={{ padding: '8px' }}>
                <button
                  onClick={() => setEditingCase(item)}
                  style={{ padding: '6px 12px', background: '#f39c12', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {displayedCases.length === 0 && (
        <p style={{ marginTop: 16, color: '#666' }}>No case found.</p>
      )}

      {editingCase && (
        <AdminEditCaseModal
          caseItem={editingCase}
          onSave={handleSaveCase}
          onCancel={() => setEditingCase(null)}
        />
      )}
    </AdminLayout>
  )
}
