import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RootPage from './pages/RootPage'
import { getAllRoutes } from './routes'

// Component map for dynamic rendering
const componentMap = {
  RootPage: RootPage,
  AdminDashboard: React.lazy(() => import('./features/Admin/AdminDashboard')),
  LawyerDashboard: React.lazy(() => import('./features/Lawyer/LawyerDashboard')),
  ClientDashboard: React.lazy(() => import('./features/Client/ClientDashboard')),
  UserManagement: React.lazy(() => import('./features/Admin/User/UserList')),
  CaseManagement: React.lazy(() => import('./features/Admin/Case/CaseList')),
  // Placeholder components for other routes
  
  LawyerManagement: () => <div style={{ padding: 24 }}><h1>Lawyers Management</h1></div>,
  ClientManagement: () => <div style={{ padding: 24 }}><h1>Clients Management</h1></div>,
  Reports: () => <div style={{ padding: 24 }}><h1>Reports</h1></div>,
  Settings: () => <div style={{ padding: 24 }}><h1>Settings</h1></div>,
  AuditLogs: () => <div style={{ padding: 24 }}><h1>Audit Logs</h1></div>,
  Backups: () => <div style={{ padding: 24 }}><h1>Backups</h1></div>,
  Cases: () => <div style={{ padding: 24 }}><h1>Cases</h1></div>,
  Clients: () => <div style={{ padding: 24 }}><h1>Clients</h1></div>,
  Documents: () => <div style={{ padding: 24 }}><h1>Documents</h1></div>,
  Appointments: () => <div style={{ padding: 24 }}><h1>Appointments</h1></div>,
  Calendar: () => <div style={{ padding: 24 }}><h1>Calendar</h1></div>,
  Billing: () => <div style={{ padding: 24 }}><h1>Billing</h1></div>,
  MyLawyer: () => <div style={{ padding: 24 }}><h1>My Lawyer</h1></div>,
  Messages: () => <div style={{ padding: 24 }}><h1>Messages</h1></div>,
  Upload: () => <div style={{ padding: 24 }}><h1>Upload Documents</h1></div>,
  Downloads: () => <div style={{ padding: 24 }}><h1>Downloads</h1></div>,
  Invoices: () => <div style={{ padding: 24 }}><h1>Invoices</h1></div>
}

export default function App() {
  const allRoutes = getAllRoutes()

  return (
    <Router>
      <Routes>
        {allRoutes.map((route, index) => {
          const Component = typeof route.component === 'string' ? componentMap[route.component] : route.component
          return (
            <Route
              key={index}
              path={route.path}
              element={
                Component ? (
                  <React.Suspense fallback={<div style={{ padding: 24 }}>Loading...</div>}>
                    <Component onLogout={() => window.location.href = '/'} />
                  </React.Suspense>
                ) : (
                  <div style={{ padding: 24 }}>Page not found</div>
                )
              }
            />
          )
        })}
      </Routes>
    </Router>
  )
}
