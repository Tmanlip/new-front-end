import React, { useState } from 'react'

export function AdminEditUserModal({ user, onSave, onCancel }) {
  const [formData, setFormData] = useState({ ...user })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const overlayStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
    justifyContent: 'center', alignItems: 'center', zIndex: 1000
  }

  const modalStyle = {
    backgroundColor: '#fff', padding: '30px', borderRadius: '8px',
    width: '400px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>Edit User Profile</h3>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Full Name</label>
          <input style={{ width: '100%', padding: '8px' }} name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
          <input style={{ width: '100%', padding: '8px' }} name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button onClick={onCancel} style={{ padding: '8px 16px', cursor: 'pointer' }}>Cancel</button>
          <button onClick={() => onSave(formData)} style={{ padding: '8px 16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}