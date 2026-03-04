import React from 'react'
import AdminLayout from '../AdminLayout'

export default function Backups({ onLogout }) {
  return (
    <AdminLayout onLogout={onLogout}>
      <h1>Backups</h1>
    </AdminLayout>
  )
}
