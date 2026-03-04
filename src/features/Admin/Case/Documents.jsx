import React from 'react'
import AdminLayout from '../AdminLayout'
import CaseDocuments from '../../../shared/CaseDocuments'
import { useParams, useLocation, Link } from 'react-router-dom' // Added Link
import { useAuth } from '../../../context/AuthContext'

export default function AdminCaseDocuments({ onLogout }) {
  const { userId, caseId } = useParams()
  const location = useLocation()
  const { currentCase } = useAuth()
  const { user, case: routeCase } = location.state || {}
  const displayCase = routeCase || currentCase

  const permissions = {
    canUploadCheque: true,
    canUploadDocuments: false,
    canCreateDocuments: false,
    canUploadReports: false,
    canCreateReports: false
  }

  // Common button style
  const btnStyle = {
    padding: '8px 16px',
    marginRight: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    display: 'inline-block',
    border: 'none',
    cursor: 'pointer'
  }

  return (
    <AdminLayout onLogout={onLogout}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Case Documents (Admin)</h2>
        <div>
          <Link to="/admin/users/edit/:id" style={{ ...btnStyle, backgroundColor: '#6c757d' }}>
            Manage Users
          </Link>
          <Link to="/admin/cases" style={btnStyle}>
            Manage Cases
          </Link>
        </div>
      </div>

      {userId && (
        <div style={{ marginBottom: 8 }}>
          <strong>Showing cases for user:</strong> {user ? `${user.name} (${user.email})` : userId}
        </div>
      )}

      {caseId ? (
        <div style={{ marginBottom: 12 }}>
          <div><strong>Case ID:</strong> {displayCase ? displayCase.id : caseId}</div>
          <div><strong>Title:</strong> {displayCase ? displayCase.title || '—' : <span style={{ color: '#aaa' }}>No case details (opened from user)</span>}</div>
          <div><strong>Lawyer:</strong> {displayCase ? displayCase.lawyer || '—' : <span style={{ color: '#aaa' }}>No case details</span>}</div>
          <div><strong>Client:</strong> {displayCase ? displayCase.client || '—' : <span style={{ color: '#aaa' }}>No case details</span>}</div>
        </div>
      ) : null}

      <hr style={{ border: '0.5px solid #eee', margin: '20px 0' }} />

      <CaseDocuments role="Admin" permissions={permissions} />
    </AdminLayout>
  )
}