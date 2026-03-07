import React, { useState } from 'react'
import Alert from './Alert'

export default function PasswordResetPopup({ email, onClose }) {
  const [step, setStep] = useState('verify')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [alert, setAlert] = useState({ type: '', message: '' })

  const handleVerifyCode = (event) => {
    event.preventDefault()
    setAlert({ type: '', message: '' })

    if (!/^\d{6}$/.test(code)) {
      setAlert({ type: 'error', message: 'Please enter a valid 6-digit code.' })
      return
    }

    if (code !== '123456') {
      setAlert({ type: 'error', message: 'Invalid verification code.' })
      return
    }

    setStep('reset')
    setAlert({ type: '', message: '' })
  }

  const handleResetPassword = (event) => {
    event.preventDefault()
    setAlert({ type: '', message: '' })

    if (!password || !confirmPassword) {
      setAlert({ type: 'error', message: 'Please fill in all required fields.' })
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

    setAlert({ type: 'success', message: 'Password reset successfully.' })
    setTimeout(() => {
      onClose()
    }, 1200)
  }

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  }

  const modalStyle = {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '8px',
    width: '420px',
    maxWidth: '95%',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        {step === 'verify' ? (
          <>
            <h3 style={{ marginTop: 0 }}>Verify Code</h3>
            <p style={{ marginTop: 0, color: '#555' }}>
              Enter the 6-digit code sent to {email || 'your email'}.
            </p>
            <form onSubmit={handleVerifyCode}>
              <label htmlFor='verificationCode' style={{ display: 'block', marginBottom: 8 }}>
                6-Digit Code
              </label>
              <input
                id='verificationCode'
                value={code}
                onChange={(event) => setCode(event.target.value)}
                maxLength={6}
                placeholder='Enter code'
                style={{ width: '100%', padding: 8, boxSizing: 'border-box', marginBottom: 12 }}
              />

              <Alert type={alert.type} message={alert.message} />

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button type='button' onClick={onClose} style={{ padding: '8px 16px', cursor: 'pointer' }}>
                  Cancel
                </button>
                <button
                  type='submit'
                  style={{ padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}
                >
                  Verify
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h3 style={{ marginTop: 0 }}>Reset Password</h3>
            <form onSubmit={handleResetPassword}>
              <label htmlFor='newPassword' style={{ display: 'block', marginBottom: 8 }}>
                New Password
              </label>
              <input
                id='newPassword'
                type='password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                style={{ width: '100%', padding: 8, boxSizing: 'border-box', marginBottom: 12 }}
              />

              <label htmlFor='confirmPassword' style={{ display: 'block', marginBottom: 8 }}>
                Confirm Password
              </label>
              <input
                id='confirmPassword'
                type='password'
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                style={{ width: '100%', padding: 8, boxSizing: 'border-box', marginBottom: 12 }}
              />

              <Alert type={alert.type} message={alert.message} />

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button type='button' onClick={onClose} style={{ padding: '8px 16px', cursor: 'pointer' }}>
                  Cancel
                </button>
                <button
                  type='submit'
                  style={{ padding: '8px 16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}
                >
                  Reset Password
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
