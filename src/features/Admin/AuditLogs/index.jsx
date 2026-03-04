import React from 'react'
import AdminLayout from '../AdminLayout'

export default function AuditLogs({ onLogout }) {
  return (
    <AdminLayout onLogout={onLogout}>
      <h1>Audit Logs</h1>
    </AdminLayout>
  )
}
