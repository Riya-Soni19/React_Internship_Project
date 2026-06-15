import React from 'react'
import './Footer.css'

const Footer: React.FC = () => {
  return (
    <footer className="custom-app-footer">
      <div className="footer-copyright-info">
        <p>© 2026 <strong>React Internship</strong> <span className="text-divider">•</span> Built with React + Vite</p>
      </div>
      <div className="footer-links-group">
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">React Docs</a>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">Vite</a>
        <a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">MDN</a>
      </div>
    </footer>
  );
};

export default Footer;