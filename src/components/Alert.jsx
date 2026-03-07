import React from 'react'

export default function Alert({ type = 'error', message = '', style = {} }) {
  if (!message) {
    return null
  }

  const isSuccess = type === 'success'

  return (
    <p
      style={{
        marginBottom: 12,
        color: isSuccess ? '#155724' : '#d93025',
        backgroundColor: isSuccess ? '#d4edda' : '#fdecea',
        border: `1px solid ${isSuccess ? '#c3e6cb' : '#f5c6cb'}`,
        borderRadius: 4,
        padding: 10,
        ...style
      }}
    >
      {message}
    </p>
  )
}
