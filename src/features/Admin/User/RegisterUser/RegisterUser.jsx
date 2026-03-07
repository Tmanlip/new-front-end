import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../../AdminLayout'
import Alert from '../../../../components/Alert'
export default function RegisterUser({ onLogout }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('Client')
  const [alert, setAlert] = useState({ type: '', message: '' })
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    setAlert({ type: '', message: '' })

    if (!name.trim() || !email.trim() || !role) {
      setAlert({ type: 'error', message: 'Please fill in all required fields.' })
      return
    }

    setAlert({ type: 'success', message: `Registered user: ${name} (${email}), role: ${role}` })
    setTimeout(() => {
      navigate(-1)
    }, 1500)
  }

  return (
    <AdminLayout onLogout={onLogout}>
      <h2>Register User</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <label style={{ display: 'block', marginBottom: 12 }}>
          Name:<br />
          <input value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', padding: 6, marginTop: 2 }} />
        </label>
        <label style={{ display: 'block', marginBottom: 12 }}>
          Email:<br />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: 6, marginTop: 2 }} />
        </label>
        <label style={{ display: 'block', marginBottom: 16 }}>
          Role:<br />
          <select value={role} onChange={e => setRole(e.target.value)} style={{ width: '100%', padding: 6, marginTop: 2 }}>
            <option value="Client">Client</option>
            <option value="Lawyer">Lawyer</option>
            <option value="Admin">Admin</option>
          </select>
        </label>
        <Alert type={alert.type} message={alert.message} />
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="submit" style={{ padding: '8px 12px', background: '#2ecc71', color: 'white', border: 'none', borderRadius: 4 }}>Register</button>
          <button type="button" onClick={() => navigate(-1)} style={{ padding: '8px 12px', background: '#eee', color: '#333', border: 'none', borderRadius: 4 }}>Cancel</button>
        </div>
      </form>
    </AdminLayout>
  )
}
