import React from 'react';
import './Skeleton.css';

interface SkeletonProps {
  type?: 'text' | 'card' | 'list' | 'plan';
  lines?: number;
  height?: string;
  width?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ 
  type = 'text', 
  lines = 1, 
  height = '1rem', 
  width = '100%' 
}) => {
  if (type === 'text') {
    return (
      <div className="skeleton-container">
        {Array.from({ length: lines }).map((_, index) => (
          <div 
            key={index} 
            className="skeleton skeleton-text" 
            style={{ 
              height,
              width: index === lines - 1 ? '70%' : width,
              marginBottom: index < lines - 1 ? '0.5rem' : '0'
            }}
          />
        ))}
      </div>
    );
  }

  if (type === 'card') {
    return (
      <div className="skeleton skeleton-card">
        <div className="skeleton-card-header">
          <div className="skeleton skeleton-avatar" />
          <div className="skeleton-card-info">
            <div className="skeleton skeleton-text" style={{ height: '1rem', width: '60%', marginBottom: '0.5rem' }} />
            <div className="skeleton skeleton-text" style={{ height: '0.75rem', width: '40%' }} />
          </div>
        </div>
        <div className="skeleton-card-content">
          <div className="skeleton skeleton-text" style={{ height: '0.75rem', marginBottom: '0.5rem' }} />
          <div className="skeleton skeleton-text" style={{ height: '0.75rem', width: '80%' }} />
        </div>
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="skeleton-container">
        {Array.from({ length: lines }).map((_, index) => (
          <div key={index} className="skeleton skeleton-list-item" style={{ marginBottom: '1rem' }}>
            <div className="skeleton skeleton-text" style={{ height: '1rem', width: '5%', marginRight: '1rem' }} />
            <div className="skeleton skeleton-text" style={{ height: '1rem', width: '85%' }} />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'plan') {
    return (
      <div className="skeleton skeleton-plan">
        <div className="skeleton-plan-overview">
          <div className="skeleton skeleton-text" style={{ height: '1.5rem', width: '30%', marginBottom: '1rem' }} />
          <div className="skeleton skeleton-text" style={{ height: '1rem', marginBottom: '1.5rem' }} />
          <div className="skeleton-plan-stats">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="skeleton skeleton-stat-item">
                <div className="skeleton skeleton-text" style={{ height: '0.75rem', width: '60%', marginBottom: '0.5rem' }} />
                <div className="skeleton skeleton-text" style={{ height: '1.25rem', width: '80%' }} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="skeleton-progress">
          <div className="skeleton skeleton-text" style={{ height: '1rem', width: '20%', marginBottom: '0.5rem' }} />
          <div className="skeleton skeleton-progress-bar" />
        </div>
        
        <div className="skeleton-day-navigation">
          <div className="skeleton skeleton-text" style={{ height: '1rem', width: '15%', marginRight: 'auto' }} />
          <div className="skeleton skeleton-text" style={{ height: '1.25rem', width: '10%' }} />
          <div className="skeleton skeleton-text" style={{ height: '1rem', width: '15%', marginLeft: 'auto' }} />
        </div>
        
        <div className="skeleton-day-cards">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="skeleton skeleton-day-card">
              <div className="skeleton-day-card-header">
                <div className="skeleton skeleton-avatar" />
                <div className="skeleton skeleton-text" style={{ height: '1rem', width: '60%', marginLeft: '1rem' }} />
                <div className="skeleton skeleton-text" style={{ height: '0.75rem', width: '15%', marginLeft: 'auto' }} />
              </div>
              <div className="skeleton-day-card-content">
                <div className="skeleton skeleton-text" style={{ height: '1rem', width: '20%', marginBottom: '0.5rem' }} />
                <div className="skeleton skeleton-list" style={{ marginBottom: '1rem' }}>
                  {Array.from({ length: 3 }).map((_, taskIndex) => (
                    <div key={taskIndex} className="skeleton skeleton-text" style={{ height: '0.75rem', width: `${80 - taskIndex * 10}%`, marginBottom: '0.25rem' }} />
                  ))}
                </div>
                <div className="skeleton skeleton-text" style={{ height: '1rem', width: '20%', marginBottom: '0.5rem' }} />
                <div className="skeleton skeleton-resources">
                  {Array.from({ length: 2 }).map((_, resourceIndex) => (
                    <div key={resourceIndex} className="skeleton skeleton-resource-item">
                      <div className="skeleton skeleton-avatar" style={{ width: '1rem', height: '1rem' }} />
                      <div className="skeleton skeleton-text" style={{ height: '0.75rem', width: '60%', marginLeft: '0.5rem' }} />
                      <div className="skeleton skeleton-text" style={{ height: '0.75rem', width: '15%', marginLeft: 'auto' }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default Skeleton;