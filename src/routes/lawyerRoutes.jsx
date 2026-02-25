import { LAWYER_PATHS } from '../constants/paths'

export const lawyerRoutes = [
  {
    path: LAWYER_PATHS.DASHBOARD,
    label: 'Dashboard',
    component: 'LawyerDashboard'
  },
  {
    path: LAWYER_PATHS.CASES,
    label: 'My Cases',
    component: 'Cases'
  },
  {
    path: LAWYER_PATHS.CLIENTS,
    label: 'Clients',
    component: 'Clients'
  },
  {
    path: LAWYER_PATHS.DOCUMENTS,
    label: 'Documents',
    component: 'Documents'
  },
  {
    path: LAWYER_PATHS.APPOINTMENTS,
    label: 'Appointments',
    component: 'Appointments'
  },
  {
    path: LAWYER_PATHS.CALENDAR,
    label: 'Calendar',
    component: 'Calendar'
  },
  {
    path: LAWYER_PATHS.BILLING,
    label: 'Billing',
    component: 'Billing'
  }
]
