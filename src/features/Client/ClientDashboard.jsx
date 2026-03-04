import React from 'react'
import ClientLayout from './ClientLayout'

export default function ClientDashboard({ onLogout }) {
  return (
    <ClientLayout onLogout={onLogout}>
      <h1>Client Dashboard</h1>
      <p>Welcome, Client! View your case status and communicate with your lawyer.</p>
      <div style={{ marginTop: 20, padding: 16, backgroundColor: '#f0f0f0', borderRadius: 4 }}>
        <h3>Client Features:</h3>
        <ul>
          <li>View Case Status</li>
          <li>Message Lawyer</li>
          <li>Upload Documents</li>
          <li>View Invoices</li>
        </ul>
      </div>
    </ClientLayout>
  )
}
