import React from 'react'
import './Header.css'

interface HeaderProps {
  currentDay: number;
}

const Header: React.FC<HeaderProps> = ({ currentDay }) => {
  // Map containing titles seen inside the right badge block
  const taskBadges: { [key: number]: string } = {
    1: 'Day 1 - Introduction',
    2: 'Day 2 - Profile Card',
    3: 'Day 3 - Student Data Management'
  };

  const currentBadgeText = taskBadges[currentDay] || `Day ${currentDay} - Implementation`;

  return (
    <header className="custom-app-header">
      <div className="header-brand-group">
        <div className="brand-badge-box">
          <span>DEV</span>
        </div>
        <div className="brand-title-meta">
          <h2>React Internship</h2>
          <p>Developer Bootcamp</p>
        </div>
      </div>
      
      <div className="header-status-badge">
        <span className="status-indicator-dot"></span>
        {currentBadgeText}
      </div>
    </header>
  );
};

export default Header;