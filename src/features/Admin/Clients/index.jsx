import React from 'react'
import AdminLayout from '../AdminLayout'

export default function ClientManagement({ onLogout }) {
  return (
    <AdminLayout onLogout={onLogout}>
      <h1>Clients Management</h1>
    </AdminLayout>
  )
}
