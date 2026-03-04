import React from 'react'
import ClientLayout from '../ClientLayout'
import CaseDocuments from '../../../shared/CaseDocuments'
import { useAuth } from '../../../context/AuthContext'

export default function ClientCaseDocuments({ onLogout }) {
  const { user, currentCase } = useAuth()
  const permissions = {
    canUploadCheque: false,
    canUploadDocuments: false,
    canCreateDocuments: false,
    canUploadReports: false,
    canCreateReports: false
  }

  return (
    <ClientLayout onLogout={onLogout}>
      <h2>Case Documents (Client)</h2>
      <div style={{ marginBottom: 8 }}>
        <strong>Client:</strong> {user?.name || 'Unknown'}
      </div>
      {currentCase && (
        <div style={{ marginBottom: 12 }}>
          <strong>Current Case:</strong> {currentCase.id} - {currentCase.title} ({currentCase.status || 'Open'})
        </div>
      )}
      {!currentCase && (
        <div style={{ marginBottom: 12, color: '#666' }}>No case is assigned in auth context.</div>
      )}
      <CaseDocuments role="Client" permissions={permissions} />
    </ClientLayout>
  )
}
