import React from 'react'
import ClientLayout from '../ClientLayout'

export default function Invoices({ onLogout }) {
  return (
    <ClientLayout onLogout={onLogout}>
      <h1>Invoices</h1>
    </ClientLayout>
  )
}
