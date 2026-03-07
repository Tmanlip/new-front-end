import React, { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LawyerLayout from '../LawyerLayout'
import { useAuth } from '../../../context/AuthContext'
import { LAWYER_PATHS } from '../../../constants/paths'

export default function Documents({ onLogout }) {
  const navigate = useNavigate()
  const { user, cases, setCurrentCase } = useAuth()

  const allDocuments = useMemo(() => {
    return (cases || []).flatMap((caseItem) => {
      const caseDocuments = Array.isArray(caseItem.documents) ? caseItem.documents : []

      return caseDocuments.map(doc => ({
        id: doc.id,
        name: doc.name,
        type: doc.type || 'FILE',
        uploadedAt: doc.uploadedAt,
        caseId: caseItem.id,
        caseTitle: caseItem.title || 'Untitled'
      }))
    })
  }, [cases])

  return (
    <LawyerLayout onLogout={onLogout}>
      <h1>Documents</h1>
      <p style={{ marginTop: 0, color: '#666' }}>
        Showing all documents related to {user?.name || 'current lawyer'} and where each file belongs.
      </p>

      {allDocuments.length === 0 ? (
        <p style={{ color: '#666' }}>No documents found for this lawyer.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid #ddd' }}>
              <th style={{ padding: '8px' }}>Document</th>
              <th style={{ padding: '8px' }}>Type</th>
              <th style={{ padding: '8px' }}>Case</th>
              <th style={{ padding: '8px' }}>Path to Case</th>
              <th style={{ padding: '8px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {allDocuments.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px' }}>{item.name}</td>
                <td style={{ padding: '8px' }}>{item.type}</td>
                <td style={{ padding: '8px' }}>{item.caseId} - {item.caseTitle}</td>
                <td style={{ padding: '8px' }}>
                  <Link
                    to={LAWYER_PATHS.CASES}
                    onClick={() => {
                      const nextCase = (cases || []).find(caseItem => caseItem.id === item.caseId)
                      if (nextCase) {
                        setCurrentCase(nextCase)
                      }
                    }}
                    style={{ color: '#0b63ce', textDecoration: 'underline' }}
                  >
                    {LAWYER_PATHS.CASES} / {item.caseId}
                  </Link>
                </td>
                <td style={{ padding: '8px' }}>
                  <button
                    onClick={() => {
                      const nextCase = (cases || []).find(caseItem => caseItem.id === item.caseId)
                      if (nextCase) {
                        setCurrentCase(nextCase)
                      }
                      navigate(LAWYER_PATHS.CASES)
                    }}
                    style={{ padding: '6px 10px', background: '#3498db', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}
                  >
                    Open Case
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </LawyerLayout>
  )
}
