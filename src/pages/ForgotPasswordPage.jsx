import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PUBLIC_PATHS } from '../constants/paths'
import Alert from '../components/Alert'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [alert, setAlert] = useState({ type: '', message: '' })

  const handleSubmit = (event) => {
    event.preventDefault()
    setAlert({ type: '', message: '' })

    if (!email.trim()) {
      setSubmitted(false)
      setAlert({ type: 'error', message: 'Please enter your email address.' })
      return
    }

    setSubmitted(true)
    setAlert({
      type: 'success',
      message: `If an account exists for ${email}, a reset link has been sent.`
    })
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <div style={{ textAlign: 'left', padding: 24, backgroundColor: 'white', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', maxWidth: 420, width: '100%' }}>
        <h1 style={{ marginTop: 0 }}>Forgot Password</h1>
        <p>Enter your email address and we will send you a password reset link.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor='email' style={{ display: 'block', marginBottom: 8 }}>Email</label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder='you@example.com'
            style={{ width: '100%', padding: 10, marginBottom: 12, border: '1px solid #ccc', borderRadius: 4 }}
            required
          />
          <button
            type='submit'
            style={{ padding: '10px 16px', fontSize: 16, backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
          >
            Send Reset Link
          </button>
        </form>
        <Alert type={alert.type} message={alert.message} style={{ marginTop: 12 }} />
        {submitted && (
          <div style={{ marginTop: 8 }}>
            <Link to={`${PUBLIC_PATHS.RESET_PASSWORD}?token=demo-reset-token`}>Open Reset Password Link</Link>
          </div>
        )}
        <div style={{ marginTop: 16 }}>
          <Link to={PUBLIC_PATHS.LOGIN}>Back to Login</Link>
        </div>
      </div>
    </div>
  )
}
