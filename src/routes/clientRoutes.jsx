import { CLIENT_PATHS } from '../constants/paths'

export const clientRoutes = [
  {
    path: CLIENT_PATHS.DASHBOARD,
    label: 'Dashboard',
    component: 'ClientDashboard'
  },
  {
    path: CLIENT_PATHS.MY_CASES,
    label: 'My Cases',
    component: 'Cases'
  },
  {
    path: CLIENT_PATHS.MY_LAWYER,
    label: 'My Lawyer',
    component: 'MyLawyer'
  },
  {
    path: CLIENT_PATHS.MESSAGES,
    label: 'Messages',
    component: 'Messages'
  },
  {
    path: CLIENT_PATHS.UPLOAD,
    label: 'Upload',
    component: 'Upload'
  },
  {
    path: CLIENT_PATHS.DOWNLOADS,
    label: 'Downloads',
    component: 'Downloads'
  },
  {
    path: CLIENT_PATHS.INVOICES,
    label: 'Invoices',
    component: 'Invoices'
  }
]
