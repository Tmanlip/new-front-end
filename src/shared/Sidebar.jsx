import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getRoutesByRole } from '../routes'

export default function Sidebar({ userRole, menuItems, open = true, onToggle }) {
  const isCollapsed = !open
  // Build menu from route configs when possible and group into sections
  let computed = menuItems
  if (!computed && userRole) {
    const roleKey = String(userRole).toLowerCase()
    const roleRoutes = getRoutesByRole(roleKey) || []

    // filter out dynamic routes (with params) and routes explicitly hidden from menu
    const visibleRoutes = roleRoutes.filter(r => {
      if (!r || !r.path) return false
      if (r.hideInMenu) return false
      return !String(r.path).includes(':')
    })

    const mapLinks = (arr) => arr.map(r => ({ name: r.label || r.path || 'Untitled', href: r.path || '#' }))

    if (roleKey === 'admin') {
      const management = mapLinks(visibleRoutes.slice(0, 5))
      const system = mapLinks(visibleRoutes.slice(5))
      computed = []
      if (management.length) computed.push({ label: 'Management', links: management })
      if (system.length) computed.push({ label: 'System', links: system })
    } else if (roleKey === 'lawyer') {
      const work = mapLinks(visibleRoutes.slice(0, 4))
      const schedule = mapLinks(visibleRoutes.slice(4))
      computed = []
      if (work.length) computed.push({ label: 'Work', links: work })
      if (schedule.length) computed.push({ label: 'Schedule', links: schedule })
    } else if (roleKey === 'client') {
      const account = mapLinks(visibleRoutes.slice(0, 4))
      const documents = mapLinks(visibleRoutes.slice(4))
      computed = []
      if (account.length) computed.push({ label: 'My Account', links: account })
      if (documents.length) computed.push({ label: 'Documents', links: documents })
    } else {
      const links = mapLinks(visibleRoutes)
      computed = links.length ? [{ label: 'Menu', links }] : []
    }
  }
  computed = computed || []

  return (
    <aside style={{
      backgroundColor: '#34495e',
      color: 'white',
      width: isCollapsed ? '0px' : '250px',
      minWidth: isCollapsed ? '0px' : '250px',
      minHeight: '100vh',
      padding: isCollapsed ? '0px' : '24px 16px',
      transition: 'width 0.3s, min-width 0.3s, padding 0.3s',
      boxShadow: isCollapsed ? 'none' : '2px 0 4px rgba(0,0,0,0.1)',
      position: 'fixed',
      left: 0,
      top: '60px',
      overflowY: 'auto',
      zIndex: 100
    }}>
      {!isCollapsed && (
        <button
          onClick={onToggle}
          style={{
            width: '100%',
            padding: '8px',
            marginBottom: '20px',
            backgroundColor: '#2c3e50',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: 14
          }}
        >
          {'←'}
        </button>
      )}
      <nav style={{ display: isCollapsed ? 'none' : 'block' }}>
        {computed.map((item, index) => (
          <div key={index} style={{ marginBottom: '16px' }}>
            {item.label && (
              <div style={{ fontSize: 12, fontWeight: 'bold', color: '#bdc3c7', marginBottom: '8px', textTransform: 'uppercase' }}>
                {item.label}
              </div>
            )}
            {item.links && item.links.map((link, idx) => (
              <Link
                key={idx}
                to={link.href}
                style={{
                  display: 'block',
                  padding: '12px 12px',
                  marginBottom: '4px',
                  backgroundColor: '#2c3e50',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: 4,
                  fontSize: 14,
                  transition: 'background-color 0.2s',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis'
                }}
                onClick={onToggle}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a252f'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2c3e50'}
                title={link.name}
              >
                {link.name}
              </Link>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  )
}
