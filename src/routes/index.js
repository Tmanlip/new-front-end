import { adminRoutes } from './adminRoutes'
import { lawyerRoutes } from './lawyerRoutes'
import { clientRoutes } from './clientRoutes'
import { PUBLIC_PATHS } from '../constants/paths'

export const routes = [
  {
    path: PUBLIC_PATHS.ROOT,
    label: 'Home',
    component: 'RootPage',
    isPublic: true
  },
  {
    path: PUBLIC_PATHS.LOGIN,
    label: 'Login',
    component: 'LoginPage',
    isPublic: true
  },
  {
    path: PUBLIC_PATHS.FORGOT_PASSWORD,
    label: 'Forgot Password',
    component: 'ForgotPasswordPage',
    isPublic: true
  },
  {
    path: PUBLIC_PATHS.RESET_PASSWORD,
    label: 'Reset Password',
    component: 'ResetPasswordPage',
    isPublic: true
  },
  {
    role: 'admin',
    routes: adminRoutes
  },
  {
    role: 'lawyer',
    routes: lawyerRoutes
  },
  {
    role: 'client',
    routes: clientRoutes
  }
]

// Flatten routes for easier access
export const getAllRoutes = () => {
  const flattened = []
  
  routes.forEach(route => {
    if (route.isPublic) {
      flattened.push(route)
    } else if (route.routes) {
      flattened.push(...route.routes.map(r => ({ ...r, role: route.role })))
    }
  })
  
  return flattened
}

// Get routes by role
export const getRoutesByRole = (role) => {
  const roleConfig = routes.find(r => r.role === role)
  return roleConfig ? roleConfig.routes : []
}

// Get all public routes
export const getPublicRoutes = () => {
  return routes.filter(r => r.isPublic)
}
