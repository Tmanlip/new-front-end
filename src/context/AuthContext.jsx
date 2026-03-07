import React, { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [currentCase, setCurrentCase] = useState(null)
  const [cases, setCases] = useState([])

  const login = ({ user: nextUser, currentCase: nextCase = null, cases: nextCases = [] }) => {
    setUser(nextUser || null)
    setCases(Array.isArray(nextCases) ? nextCases : [])
    if (nextCase) {
      setCurrentCase(nextCase)
    } else if (Array.isArray(nextCases) && nextCases.length) {
      setCurrentCase(nextCases[0])
    } else {
      setCurrentCase(null)
    }
  }

  const logout = () => {
    setUser(null)
    setCurrentCase(null)
    setCases([])
  }

  const updateUser = (updates) => {
    if (!updates || typeof updates !== 'object') return

    setUser(prev => {
      if (!prev) return prev

      const role = prev?.role
      const roleAllowedFields = {
        Client: ['name', 'email', 'specialization'],
        Lawyer: ['name', 'email', 'specialization']
      }

      const blockedKeys = new Set(['case', 'cases', 'currentCase', 'caseId'])
      const allowedFields = roleAllowedFields[role] || Object.keys(updates)

      const sanitizedUpdates = Object.entries(updates).reduce((acc, [key, value]) => {
        if (blockedKeys.has(key)) return acc
        if (!allowedFields.includes(key)) return acc
        acc[key] = value
        return acc
      }, {})

      return { ...prev, ...sanitizedUpdates }
    })
  }

  const value = useMemo(() => ({
    user,
    currentCase,
    cases,
    userRole: user?.role || null,
    isAuthenticated: Boolean(user),
    login,
    logout,
    updateUser,
    setCases,
    setCurrentCase
  }), [user, currentCase, cases])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
