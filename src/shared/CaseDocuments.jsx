import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Tabs from './Tabs' // new tab component

export default function CaseDocuments({ role, permissions = {} }) {
  const [documents, setDocuments] = useState([])
  const [reports, setReports] = useState([])
  const [cheques, setCheques] = useState([])

  const [activeTab, setActiveTab] = useState('documents')

  const docsInputRef = useRef()
  const reportsInputRef = useRef()
  const chequeFileRef = useRef()

  const handleFileUpload = (targetListSetter) => (e) => {
    const f = e.target.files && e.target.files[0]
    if (!f) return
    const item = { id: Date.now(), name: f.name, uploadedBy: role, createdAt: new Date().toISOString() }
    targetListSetter(prev => [...prev, item])
    e.target.value = ''
  }

  const handleCreate = (targetListSetter, promptText) => () => {
    const title = window.prompt(promptText)
    if (!title) return
    const item = { id: Date.now(), name: title, createdBy: role, createdAt: new Date().toISOString() }
    targetListSetter(prev => [...prev, item])
  }

  const handleChequeUpload = (phase) => (e) => {
    const f = e.target.files && e.target.files[0]
    if (!f) return
    const item = { id: Date.now(), name: f.name, phase, uploadedBy: role, createdAt: new Date().toISOString() }
    setCheques(prev => [...prev, item])
    e.target.value = ''
  }

  const renderDocumentsTab = () => (
    <div style={{ padding: 16 }}>
      <h3>Documents</h3>
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            onClick={() => docsInputRef.current && docsInputRef.current.click()}
            disabled={!permissions.canUploadDocuments}
            style={{ padding: '8px 10px', background: permissions.canUploadDocuments ? '#2ecc71' : '#ccc', color: 'white', border: 'none', borderRadius: 4 }}
          >
            Upload Document
          </button>
          <input ref={docsInputRef} type="file" style={{ display: 'none' }} onChange={handleFileUpload(setDocuments)} />

          <button
            onClick={handleCreate(setDocuments, 'Enter document title:')}
            disabled={!permissions.canCreateDocuments}
            style={{ padding: '8px 10px', background: permissions.canCreateDocuments ? '#34495e' : '#ccc', color: 'white', border: 'none', borderRadius: 4 }}
          >
            Create Document
          </button>
        </div>
      </div>

      <ul>
        {documents.length ? documents.map(d => (
          <li key={d.id}>{d.name} <small style={{ color: '#666' }}>({d.uploadedBy || d.createdBy})</small></li>
        )) : <li style={{ color: '#666' }}>No documents</li>}
      </ul>
    </div>
  )

  const renderReportsTab = () => (
    <div style={{ padding: 16 }}>
      <h3>Reports</h3>
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            onClick={() => reportsInputRef.current && reportsInputRef.current.click()}
            disabled={!permissions.canUploadReports}
            style={{ padding: '8px 10px', background: permissions.canUploadReports ? '#3498db' : '#ccc', color: 'white', border: 'none', borderRadius: 4 }}
          >
            Upload Report
          </button>
          <input ref={reportsInputRef} type="file" style={{ display: 'none' }} onChange={handleFileUpload(setReports)} />

          <button
            onClick={handleCreate(setReports, 'Enter report title:')}
            disabled={!permissions.canCreateReports}
            style={{ padding: '8px 10px', background: permissions.canCreateReports ? '#34495e' : '#ccc', color: 'white', border: 'none', borderRadius: 4 }}
          >
            Create Report
          </button>
        </div>
      </div>

      <ul>
        {reports.length ? reports.map(r => (
          <li key={r.id}>{r.name} <small style={{ color: '#666' }}>({r.uploadedBy || r.createdBy})</small></li>
        )) : <li style={{ color: '#666' }}>No reports</li>}
      </ul>
    </div>
  )

  const renderChequesTab = () => (
    <div style={{ padding: 16 }}>
      <h3>Cheque (Phases)</h3>
      <div style={{ marginBottom: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
        <select id="cheque-phase-select" defaultValue="1" style={{ padding: '8px' }}>
          <option value="1">Phase 1</option>
          <option value="2">Phase 2</option>
          <option value="3">Phase 3</option>
          <option value="4">Phase 4</option>
          <option value="5">Phase 5</option>
        </select>

        <input
          ref={chequeFileRef}
          type="file"
          style={{ display: 'none' }}
          onChange={(e) => {
            const sel = document.getElementById('cheque-phase-select')
            const phase = sel ? sel.value : '1'
            handleChequeUpload(phase)(e)
          }}
          disabled={!permissions.canUploadCheque}
        />

        <button
          onClick={() => chequeFileRef.current && chequeFileRef.current.click()}
          disabled={!permissions.canUploadCheque}
          style={{ padding: '8px 10px', background: permissions.canUploadCheque ? '#e67e22' : '#ccc', color: 'white', border: 'none', borderRadius: 4 }}
        >
          Upload Cheque (by Phase)
        </button>
      </div>

      <ul>
        {cheques.length ? cheques.map(ch => (
          <li key={ch.id}>{ch.name} <small style={{ color: '#666' }}>(Phase {ch.phase}, {ch.uploadedBy})</small></li>
        )) : <li style={{ color: '#666' }}>No cheques uploaded</li>}
      </ul>
    </div>
  )

  const renderActiveTab = () => {
    if (activeTab === 'documents') return renderDocumentsTab()
    if (activeTab === 'reports') return renderReportsTab()
    if (activeTab === 'cheques') return renderChequesTab()
    return null
  }

  return (
    <div>
      <Tabs
        tabs={[
          { id: 'documents', label: 'Documents' },
          { id: 'reports', label: 'Reports' },
          { id: 'cheques', label: 'Cheques' }
        ]}
        selected={activeTab}
        onSelect={setActiveTab}
      />
      {renderActiveTab()}
    </div>
  )
}

CaseDocuments.propTypes = {
  role: PropTypes.string,
  permissions: PropTypes.object
}

CaseDocuments.propTypes = {
  role: PropTypes.string,
  permissions: PropTypes.object
}
