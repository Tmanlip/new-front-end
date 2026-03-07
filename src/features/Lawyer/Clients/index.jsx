import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import LawyerLayout from '../LawyerLayout'
import { useAuth } from '../../../context/AuthContext'
import { LAWYER_PATHS } from '../../../constants/paths'

export default function Clients({ onLogout }) {
  const { user, cases, setCurrentCase } = useAuth()

  const clientRows = useMemo(() => {
    const groupedByClient = (cases || []).reduce((acc, caseItem, index) => {
      const clientName = caseItem.client || `Client ${index + 1}`
      if (!acc[clientName]) {
        acc[clientName] = []
      }
      acc[clientName].push(caseItem)
      return acc
    }, {})

    return Object.entries(groupedByClient).map(([clientName, clientCases]) => ({
      clientName,
      caseCount: clientCases.length,
      cases: clientCases
    }))
  }, [cases])

  return (
    <LawyerLayout onLogout={onLogout}>
      <h1>Clients</h1>
      <p style={{ marginTop: 0, color: '#666' }}>
        Showing clients related to {user?.name || 'current lawyer'} and their assigned cases.
      </p>

      {clientRows.length === 0 ? (
        <p style={{ color: '#666' }}>No clients are linked to this lawyer yet.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid #ddd' }}>
              <th style={{ padding: '8px' }}>Client</th>
              <th style={{ padding: '8px' }}>Total Cases</th>
              <th style={{ padding: '8px' }}>Related Cases</th>
              <th style={{ padding: '8px' }}>Case Path</th>
            </tr>
          </thead>
          <tbody>
            {clientRows.map(row => (
              <tr key={row.clientName} style={{ borderBottom: '1px solid #eee', verticalAlign: 'top' }}>
                <td style={{ padding: '8px' }}>{row.clientName}</td>
                <td style={{ padding: '8px' }}>{row.caseCount}</td>
                <td style={{ padding: '8px' }}>
                  {row.cases.map(caseItem => (
                    <div key={caseItem.id}>{caseItem.id} - {caseItem.title || 'Untitled'}</div>
                  ))}
                </td>
                <td style={{ padding: '8px' }}>
                  {row.cases.map(caseItem => (
                    <div key={`path-${caseItem.id}`}>
                      <Link
                        to={LAWYER_PATHS.CASES}
                        onClick={() => setCurrentCase(caseItem)}
                        style={{ color: '#0b63ce', textDecoration: 'underline' }}
                      >
                        {LAWYER_PATHS.CASES} / {caseItem.id}
                      </Link>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </LawyerLayout>
  )
}
