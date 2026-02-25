import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar({ userRole, menuItems }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside style={{
      backgroundColor: '#34495e',
      color: 'white',
      width: isCollapsed ? '60px' : '250px',
      minHeight: '100vh',
      padding: isCollapsed ? '16px 8px' : '24px 16px',
      transition: 'width 0.3s ease',
      boxShadow: '2px 0 4px rgba(0,0,0,0.1)',
      position: 'fixed',
      left: 0,
      top: '60px',
      overflowY: 'auto'
    }}>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
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
        {isCollapsed ? '→' : '←'}
      </button>

      <nav>
        {menuItems.map((item, index) => (
          <div key={index} style={{ marginBottom: '16px' }}>
            {item.label && !isCollapsed && (
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
                  fontSize: isCollapsed ? 12 : 14,
                  transition: 'background-color 0.2s',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a252f'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2c3e50'}
                title={isCollapsed ? link.name : ''}
              >
                {isCollapsed ? link.icon || link.name.charAt(0) : link.name}
              </Link>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  )
}
