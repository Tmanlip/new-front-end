import React, { useState } from 'react'

export function AdminEditCaseModal({ caseItem, onSave, onCancel }) {
  const [formData, setFormData] = useState({ ...caseItem })

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
    width: '460px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>Edit Case</h3>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Case ID</label>
          <input style={{ width: '100%', padding: '8px' }} name="id" value={formData.id || ''} disabled />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Title</label>
          <input style={{ width: '100%', padding: '8px' }} name="title" value={formData.title || ''} onChange={handleChange} />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Description</label>
          <textarea
            style={{ width: '100%', padding: '8px', minHeight: '80px', boxSizing: 'border-box' }}
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Client</label>
          <input style={{ width: '100%', padding: '8px' }} name="client" value={formData.client || ''} onChange={handleChange} />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Lawyer</label>
          <input style={{ width: '100%', padding: '8px' }} name="lawyer" value={formData.lawyer || ''} onChange={handleChange} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Status</label>
          <select style={{ width: '100%', padding: '8px' }} name="status" value={formData.status || 'Open'} onChange={handleChange}>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
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
