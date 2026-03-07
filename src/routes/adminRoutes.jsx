import AdminDashboard from '../features/Admin/AdminDashboard'
import UserList from '../features/Admin/User/UserList'
import CaseList from '../features/Admin/Case/CaseList'
import { ADMIN_PATHS } from '../constants/paths'

export const adminRoutes = [
  {
    path: ADMIN_PATHS.DASHBOARD,
    label: 'Dashboard',
    component: AdminDashboard
  },
  {
    path: ADMIN_PATHS.USERS,
    label: 'Users',
    component: UserList
  },
  {
    path: ADMIN_PATHS.REGISTER_USER,
    label: 'Register User',
    component: 'RegisterUser',
    hideInMenu: true
  },
  {
    path: ADMIN_PATHS.EDIT_USER,
    label: 'Edit User',
    component: 'AdminEditUser',
    hideInMenu: true
  },
  {
    path: `${ADMIN_PATHS.USERS}/:userId/cases`,
    label: 'User Cases',
    component: 'AdminCaseDocuments',
    hideInMenu: true
  },
  {
    path: ADMIN_PATHS.CASES,
    label: 'Cases',
    component: CaseList
  },
  {
    path: `${ADMIN_PATHS.CASES}/:caseId/documents`,
    label: 'Case Documents',
    component: 'AdminCaseDocuments',
    hideInMenu: true
  },
  {
    path: ADMIN_PATHS.EDIT_CASE,
    label: 'Edit Case',
    component: 'AdminEditCase',
    hideInMenu: true
  },
  {
    path: ADMIN_PATHS.LAWYERS,
    label: 'Lawyers',
    component: 'LawyerManagement'
  },
  {
    path: ADMIN_PATHS.CLIENTS,
    label: 'Clients',
    component: 'ClientManagement'
  },
  {
    path: ADMIN_PATHS.REPORTS,
    label: 'Reports',
    component: 'Reports'
  },
  {
    path: ADMIN_PATHS.SETTINGS,
    label: 'Settings',
    component: 'Settings'
  },
  {
    path: ADMIN_PATHS.AUDIT_LOGS,
    label: 'Audit Logs',
    component: 'AuditLogs'
  },
  {
    path: ADMIN_PATHS.BACKUPS,
    label: 'Backups',
    component: 'Backups'
  }
]
