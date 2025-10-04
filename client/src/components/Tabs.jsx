import React from 'react';

export default function Tabs({ tabs, activeKey, onSelect, children }) {
  return (
    <>
      <ul className="nav nav-tabs">
        {tabs.map(t => (
          <li className="nav-item" key={t.key}>
            <button
              className={`nav-link ${activeKey === t.key ? 'active' : ''}`}
              onClick={() => onSelect(t.key)}
            >
              {t.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="pt-3">{children}</div>
    </>
  );
}
