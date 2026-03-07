import React, { useState } from 'react'

export function LawyerEditCaseModal({ caseItem, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: caseItem?.title || '',
    description: caseItem?.description || ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
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
    padding: '30px',
    borderRadius: '8px',
    width: '420px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>Edit Case</h3>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Title</label>
          <input
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Description</label>
          <textarea
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', minHeight: '90px', resize: 'vertical' }}
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button onClick={onCancel} style={{ padding: '8px 16px', cursor: 'pointer' }}>Cancel</button>
          <button
            onClick={() => onSave(formData)}
            style={{ padding: '8px 16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
