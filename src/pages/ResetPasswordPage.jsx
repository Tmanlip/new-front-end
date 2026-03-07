import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { PUBLIC_PATHS } from '../constants/paths'
import Alert from '../components/Alert'

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [alert, setAlert] = useState({ type: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!submitted) {
      return undefined
    }

    const timer = setTimeout(() => {
      navigate(PUBLIC_PATHS.LOGIN)
    }, 3000)

    return () => clearTimeout(timer)
  }, [submitted, navigate])

  const handleSubmit = (event) => {
    event.preventDefault()
    setAlert({ type: '', message: '' })

    if (!token) {
      setAlert({ type: 'error', message: 'Invalid or missing reset token.' })
      return
    }

    if (!password || !confirmPassword) {
      setAlert({ type: 'error', message: 'Please fill in all fields.' })
      return
    }

    if (password.length < 8) {
      setAlert({ type: 'error', message: 'Password must be at least 8 characters.' })
      return
    }

    if (password !== confirmPassword) {
      setAlert({ type: 'error', message: 'Passwords do not match.' })
      return
    }

    setSubmitted(true)
    setAlert({ type: 'success', message: 'Password reset successful. Redirecting to login...' })
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <div style={{ textAlign: 'left', padding: 24, backgroundColor: 'white', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', maxWidth: 420, width: '100%' }}>
        <h1 style={{ marginTop: 0 }}>Reset Password</h1>
        {submitted ? (
          <>
            <p>Your password has been reset successfully.</p>
            <Alert type={alert.type} message={alert.message} />
            <Link to={PUBLIC_PATHS.LOGIN}>Go to Login</Link>
          </>
        ) : (
          <>
            <p>Enter your new password below.</p>
            <form onSubmit={handleSubmit}>
              <label htmlFor='password' style={{ display: 'block', marginBottom: 8 }}>New Password</label>
              <input
                id='password'
                type='password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                style={{ width: '100%', padding: 10, marginBottom: 12, border: '1px solid #ccc', borderRadius: 4 }}
                required
              />

              <label htmlFor='confirmPassword' style={{ display: 'block', marginBottom: 8 }}>Confirm New Password</label>
              <input
                id='confirmPassword'
                type='password'
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                style={{ width: '100%', padding: 10, marginBottom: 12, border: '1px solid #ccc', borderRadius: 4 }}
                required
              />

              <Alert type={alert.type} message={alert.message} />

              <button
                type='submit'
                style={{ padding: '10px 16px', fontSize: 16, backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
              >
                Reset Password
              </button>
            </form>
            <div style={{ marginTop: 16 }}>
              <Link to={PUBLIC_PATHS.LOGIN}>Back to Login</Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
