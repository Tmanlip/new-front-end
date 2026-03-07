import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { PUBLIC_PATHS } from '../constants/paths'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleRoleLogin = (role) => {
    const normalizedRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()

    const user = {
      id: `${normalizedRole.toUpperCase()}-001`,
      name: `${normalizedRole} User`,
      email: `${normalizedRole.toLowerCase()}@example.com`,
      role: normalizedRole
    }

    const sampleClients = [
      'Alice Johnson',
      'Mia Chen',
      'Noah Williams',
      'Sophia Patel'
    ]

    const loginCases = Array.from({ length: 8 }, (_, index) => {
      const caseNumber = String(index + 1).padStart(3, '0')
      const caseId = `CASE-${normalizedRole.toUpperCase()}-${caseNumber}`
      const baseCase = {
        id: caseId,
        title: `${normalizedRole} Case ${index + 1}`,
        status: index % 3 === 0 ? 'Open' : index % 3 === 1 ? 'In Progress' : 'Closed'
      }

      if (normalizedRole !== 'Lawyer') {
        return baseCase
      }

      const clientName = sampleClients[index % sampleClients.length]

      return {
        ...baseCase,
        client: clientName,
        description: `Legal workstream for ${clientName}.`,
        documents: [
          {
            id: `${caseId}-DOC-1`,
            name: `Engagement Letter ${index + 1}.pdf`,
            type: 'PDF',
            uploadedAt: new Date().toISOString()
          },
          {
            id: `${caseId}-DOC-2`,
            name: `Evidence Bundle ${index + 1}.docx`,
            type: 'DOCX',
            uploadedAt: new Date().toISOString()
          }
        ]
      }
    })

    const initialCase = loginCases[0]
    login({ user, currentCase: initialCase, cases: loginCases })
    navigate(`/${role.toLowerCase()}`)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <div style={{ textAlign: 'center', padding: 24, backgroundColor: 'white', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', maxWidth: 400, width: '100%' }}>
        <h1>Login</h1>
        <p>Please select your role and log in</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20 }}>
          <button
            onClick={() => handleRoleLogin('Admin')}
            style={{ padding: '10px 20px', fontSize: 16, backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
          >
            Login as Admin
          </button>
          <button
            onClick={() => handleRoleLogin('Lawyer')}
            style={{ padding: '10px 20px', fontSize: 16, backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
          >
            Login as Lawyer
          </button>
          <button
            onClick={() => handleRoleLogin('Client')}
            style={{ padding: '10px 20px', fontSize: 16, backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: 4, cursor: 'pointer' }}
          >
            Login as Client
          </button>
        </div>
        <div style={{ marginTop: 16 }}>
          <Link to={PUBLIC_PATHS.FORGOT_PASSWORD}>Forgot Password?</Link>
        </div>
      </div>
    </div>
  )
}
