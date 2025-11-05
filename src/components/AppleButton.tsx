import React from 'react'
import { Link } from 'react-router-dom'

interface AppleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string
  variant?: 'primary' | 'secondary'
  className?: string
}

const AppleButton: React.FC<AppleButtonProps> = ({ to, variant = 'primary', className = '', children, ...rest }) => {
  const classes = `apple-button apple-button-${variant} ${className}`.trim()

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}

export default AppleButton