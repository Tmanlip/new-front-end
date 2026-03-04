import React from 'react'
import PropTypes from 'prop-types'

// Simple tabs component. `tabs` is array of {id,label}.
// `selected` is id of currently active tab, `onSelect` called with id when user clicks.
export default function Tabs({ tabs, selected, onSelect }) {
  return (
    <div style={{ borderBottom: '1px solid #ddd', marginBottom: 16 }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onSelect(tab.id)}
          style={{
            padding: '8px 16px',
            marginRight: 4,
            background: selected === tab.id ? '#2c3e50' : '#f5f5f5',
            color: selected === tab.id ? 'white' : '#333',
            border: '1px solid #ccc',
            borderBottom: selected === tab.id ? '2px solid #2c3e50' : '1px solid #ccc',
            borderRadius: '4px 4px 0 0',
            cursor: 'pointer'
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, label: PropTypes.string })),
  selected: PropTypes.string,
  onSelect: PropTypes.func
}
