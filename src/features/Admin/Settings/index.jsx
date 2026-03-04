import React from 'react'
import AdminLayout from '../AdminLayout'

export default function Settings({ onLogout }) {
  return (
    <AdminLayout onLogout={onLogout}>
      <h1>Settings</h1>
    </AdminLayout>
  )
}
