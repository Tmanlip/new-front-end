import React from 'react'
import AdminLayout from '../AdminLayout'

export default function LawyerManagement({ onLogout }) {
  return (
    <AdminLayout onLogout={onLogout}>
      <h1>Lawyers Management</h1>
    </AdminLayout>
  )
}
