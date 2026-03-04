import React from 'react'
import ClientLayout from '../ClientLayout'

export default function Messages({ onLogout }) {
  return (
    <ClientLayout onLogout={onLogout}>
      <h1>Messages</h1>
    </ClientLayout>
  )
}
