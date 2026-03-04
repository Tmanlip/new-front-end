import React from 'react'
import LawyerLayout from '../LawyerLayout'

export default function Documents({ onLogout }) {
  return (
    <LawyerLayout onLogout={onLogout}>
      <h1>Documents</h1>
    </LawyerLayout>
  )
}
