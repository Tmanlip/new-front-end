import React from 'react'
import ClientLayout from '../ClientLayout'

export default function MyLawyer({ onLogout }) {
  return (
    <ClientLayout onLogout={onLogout}>
      <h1>My Lawyer</h1>
    </ClientLayout>
  )
}
