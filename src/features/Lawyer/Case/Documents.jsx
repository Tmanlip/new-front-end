import React from 'react'
import LawyerLayout from '../LawyerLayout'
import CaseDocuments from '../../../shared/CaseDocuments'
import { useAuth } from '../../../context/AuthContext'

export default function LawyerCaseDocuments({ onLogout }) {
  const { user, currentCase } = useAuth()
  const permissions = {
    canUploadCheque: false,
    canUploadDocuments: true,
    canCreateDocuments: true,
    canUploadReports: true,
    canCreateReports: true
  }

  return (
    <LawyerLayout onLogout={onLogout}>
      <h2>Case Documents (Lawyer)</h2>
      <div style={{ marginBottom: 8 }}>
        <strong>Lawyer:</strong> {user?.name || 'Unknown'}
      </div>
      {currentCase && (
        <div style={{ marginBottom: 12 }}>
          <strong>Current Case:</strong> {currentCase.id} - {currentCase.title} ({currentCase.status || 'Open'})
        </div>
      )}
      {!currentCase && (
        <div style={{ marginBottom: 12, color: '#666' }}>No case is assigned in auth context.</div>
      )}
      <CaseDocuments role="Lawyer" permissions={permissions} />
    </LawyerLayout>
  )
}
