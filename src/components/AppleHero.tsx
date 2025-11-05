import React from 'react'

interface AppleHeroProps {
  title: React.ReactNode
  subtitle?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

const AppleHero: React.FC<AppleHeroProps> = ({ title, subtitle, children, className = '' }) => {
  return (
    <section className={`apple-hero ${className}`.trim()}>
      <div className="apple-container">
        <div className="apple-hero-content">
          <div className="apple-hero-text">
            <h1 className="apple-hero-title">{title}</h1>
            {subtitle && <p className="apple-hero-subtitle">{subtitle}</p>}
          </div>
          {children && (
            <div className="apple-hero-actions">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default AppleHero