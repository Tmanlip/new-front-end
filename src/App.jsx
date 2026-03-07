import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RootPage from './pages/RootPage'
import LoginPage from './pages/LoginPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import { getAllRoutes } from './routes'

// Component map for dynamic rendering
const componentMap = {
  RootPage: RootPage,
  LoginPage: LoginPage,
  ForgotPasswordPage: ForgotPasswordPage,
  ResetPasswordPage: ResetPasswordPage,
  AdminDashboard: React.lazy(() => import('./features/Admin/AdminDashboard')),
  LawyerDashboard: React.lazy(() => import('./features/Lawyer/LawyerDashboard')),
  ClientDashboard: React.lazy(() => import('./features/Client/ClientDashboard')),
  UserManagement: React.lazy(() => import('./features/Admin/User/UserList')),
  CaseManagement: React.lazy(() => import('./features/Admin/Case/CaseList')),
  AdminCaseDocuments: React.lazy(() => import('./features/Admin/Case/Documents')),
  RegisterUser: React.lazy(() => import('./features/Admin/User/RegisterUser/RegisterUser')),
  LawyerCaseDocuments: React.lazy(() => import('./features/Lawyer/Case/Documents')),
  ClientCaseDocuments: React.lazy(() => import('./features/Client/Case/Documents')),
  LawyerProfile: React.lazy(() => import('./features/Lawyer/Profile/index')),
  ClientProfile: React.lazy(() => import('./features/Client/Profile/index')),
  AdminEditUser: React.lazy(() => import('./features/Admin/User/editUser/index')),
  AdminEditCase: React.lazy(() => import('./features/Admin/Case/editCase/index')),
  LawyerManagement: React.lazy(() => import('./features/Admin/Lawyers/index')),
  ClientManagement: React.lazy(() => import('./features/Admin/Clients/index')),
  Reports: React.lazy(() => import('./features/Admin/Reports/index')),
  Settings: React.lazy(() => import('./features/Admin/Settings/index')),
  AuditLogs: React.lazy(() => import('./features/Admin/AuditLogs/index')),
  Backups: React.lazy(() => import('./features/Admin/Backups/index')),
  Clients: React.lazy(() => import('./features/Lawyer/Clients/index')),
  Documents: React.lazy(() => import('./features/Lawyer/Documents/index')),
  Appointments: React.lazy(() => import('./features/Lawyer/Appointments/index')),
  Calendar: React.lazy(() => import('./features/Lawyer/Calendar/index')),
  Billing: React.lazy(() => import('./features/Lawyer/Billing/index')),
  MyLawyer: React.lazy(() => import('./features/Client/MyLawyer/index')),
  Messages: React.lazy(() => import('./features/Client/Messages/index')),
  Upload: React.lazy(() => import('./features/Client/Upload/index')),
  Downloads: React.lazy(() => import('./features/Client/Downloads/index')),
  Invoices: React.lazy(() => import('./features/Client/Invoices/index')),
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
