// Admin routes
export const ADMIN_PATHS = {
  DASHBOARD: '/admin',
  CASES: '/admin/cases',
  USERS: '/admin/users',
  LAWYERS: '/admin/lawyers',
  CLIENTS: '/admin/clients',
  REPORTS: '/admin/reports',
  SETTINGS: '/admin/settings',
  AUDIT_LOGS: '/admin/audit-logs',
  BACKUPS: '/admin/backups'
}

// Lawyer routes
export const LAWYER_PATHS = {
  DASHBOARD: '/lawyer',
  CASES: '/lawyer/cases',
  CLIENTS: '/lawyer/clients',
  DOCUMENTS: '/lawyer/documents',
  APPOINTMENTS: '/lawyer/appointments',
  CALENDAR: '/lawyer/calendar',
  BILLING: '/lawyer/billing'
}

// Client routes
export const CLIENT_PATHS = {
  DASHBOARD: '/client',
  MY_CASES: '/client/cases',
  MY_LAWYER: '/client/lawyer',
  MESSAGES: '/client/messages',
  UPLOAD: '/client/upload',
  DOWNLOADS: '/client/downloads',
  INVOICES: '/client/invoices'
}

// Public routes
export const PUBLIC_PATHS = {
  ROOT: '/',
  LOGIN: '/login'
}
