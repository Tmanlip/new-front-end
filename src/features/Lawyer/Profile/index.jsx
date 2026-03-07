import React, { useMemo, useState } from 'react'
import LawyerLayout from './../LawyerLayout'
import { LawyerEditModal } from './editInformation' // Import the modal
import { LawyerEditCaseModal } from './editCase'
import { useAuth } from '../../../context/AuthContext'
import PasswordResetPopup from '../../../components/PasswordResetPopup'

export default function LawyerUserInfoPage({ onLogout }) {
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [showCaseModal, setShowCaseModal] = useState(false)
  const [showResetPopup, setShowResetPopup] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 3
  const { user, updateUser, userRole, currentCase, cases, setCases, setCurrentCase } = useAuth()

  const profile = useMemo(() => ({
    name: user?.name || 'Unknown User',
    email: user?.email || '—',
    role: user?.role || userRole || 'Lawyer',
    specialization: user?.specialization || 'General',
    joinedDate: user?.joinedDate || '—'
  }), [user, userRole])

  const handleSaveInfo = (updatedData) => {
    updateUser(updatedData)
    setShowInfoModal(false)
  }

  const handleSaveCase = (updatedCaseData) => {
    if (!currentCase) {
      setShowCaseModal(false)
      return
    }

    const nextCase = { ...currentCase, ...updatedCaseData }
    setCurrentCase(nextCase)
    setCases(prevCases => prevCases.map(item => (
      item.id === currentCase.id ? { ...item, ...updatedCaseData } : item
    )))
    setShowCaseModal(false)
  }

  const totalCases = cases.length
  const totalPages = Math.max(1, Math.ceil(totalCases / pageSize))
  const startIndex = (currentPage - 1) * pageSize
  const paginatedCases = cases.slice(startIndex, startIndex + pageSize)

  return (
    <LawyerLayout onLogout={onLogout}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1>User Information</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setShowInfoModal(true)}
            style={{ padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Edit Information
          </button>
          <button
            onClick={() => setShowCaseModal(true)}
            disabled={!currentCase}
            style={{ padding: '8px 16px', backgroundColor: currentCase ? '#17a2b8' : '#9cc8d1', color: '#fff', border: 'none', borderRadius: '4px', cursor: currentCase ? 'pointer' : 'not-allowed' }}
          >
            Edit Case
          </button>
          <button
            onClick={() => setShowResetPopup(true)}
            style={{ padding: '8px 16px', backgroundColor: '#6f42c1', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Reset Password
          </button>
        </div>
      </div>

      <div style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
        <p><strong>Full Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Role:</strong> {profile.role}</p>
        <p><strong>Specialization:</strong> {profile.specialization}</p>
        <p><strong>Joined Date:</strong> {profile.joinedDate}</p>
      </div>

      <div style={{ marginTop: '20px', padding: '24px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
        <h2 style={{ marginTop: 0 }}>Case Information</h2>
        {totalCases === 0 ? (
          <p style={{ color: '#666' }}>No cases available.</p>
        ) : (
          <>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '2px solid #ddd' }}>
                  <th style={{ padding: '8px' }}>Case ID</th>
                  <th style={{ padding: '8px' }}>Title</th>
                  <th style={{ padding: '8px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCases.map(item => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '8px' }}>{item.id}</td>
                    <td style={{ padding: '8px' }}>{item.title || '—'}</td>
                    <td style={{ padding: '8px' }}>{item.status || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
              <button
                onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                style={{ padding: '8px 12px', border: '1px solid #ddd', backgroundColor: currentPage === 1 ? '#f5f5f5' : '#fff', borderRadius: '4px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
              >
                Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
                style={{ padding: '8px 12px', border: '1px solid #ddd', backgroundColor: currentPage === totalPages ? '#f5f5f5' : '#fff', borderRadius: '4px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {showInfoModal && (
        <LawyerEditModal 
          user={profile} 
          onSave={handleSaveInfo} 
          onCancel={() => setShowInfoModal(false)} 
        />
      )}

      {showCaseModal && (
        <LawyerEditCaseModal
          caseItem={currentCase}
          onSave={handleSaveCase}
          onCancel={() => setShowCaseModal(false)}
        />
      )}

      {showResetPopup && (
        <PasswordResetPopup
          email={profile.email}
          onClose={() => setShowResetPopup(false)}
        />
      )}
    </LawyerLayout>
  )
}