import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import UserStatus from './UserStatus'

interface NavigationProps {
  currentPath?: string
}

const Navigation: React.FC<NavigationProps> = () => {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: '首页' },
    { path: '/skill-finder', label: '技能挖掘' },
    { path: '/business-planner', label: '副业规划' },
    { path: '/community', label: '抱团互助' }
  ]

  return (
    <nav className="apple-nav">
      <div className="apple-nav-content">
        <Link to="/" className="apple-nav-logo">
          AIFireHome
        </Link>
        <div className="apple-nav-links">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`apple-nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="apple-nav-actions">
          <UserStatus />
        </div>
      </div>
    </nav>
  )
}

export default Navigation