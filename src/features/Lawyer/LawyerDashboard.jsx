import React from 'react'
import LawyerLayout from './LawyerLayout'

export default function LawyerDashboard({ onLogout }) {
  return (
    <LawyerLayout onLogout={onLogout}>
      <h1>Lawyer Dashboard</h1>
      <p>Welcome, Lawyer! Access your cases and client information here.</p>
      <div style={{ marginTop: 20, padding: 16, backgroundColor: '#f0f0f0', borderRadius: 4 }}>
        <h3>Lawyer Features:</h3>
        <ul>
          <li>View My Cases</li>
          <li>Client Management</li>
          <li>Document Library</li>
          <li>Schedule Appointments</li>
        </ul>
      </div>
    </LawyerLayout>
  )
}
