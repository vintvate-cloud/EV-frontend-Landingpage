import React from 'react';

const Footer = () => {
  return (
    <footer className="section-padding bg-surface-container-lowest" style={{ 
      display: 'flex', 
      flexWrap: 'wrap',
      justifyContent: 'space-between', 
      alignItems: 'center', 
      gap: 'var(--gutter)',
      borderTop: '1px solid var(--outline-variant)'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <a href="#" className="font-headline text-primary" style={{ fontSize: '32px', fontWeight: 'bold' }}>MyEVService</a>
        <p className="text-on-surface-variant font-mono" style={{ fontSize: '14px' }}>© 2026 MyEVService Enterprise. All rights reserved.</p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
        <a href="#" className="text-on-surface-variant hover-secondary font-mono" style={{ transition: 'color 0.2s', fontSize: '14px' }}>Privacy Policy</a>
        <a href="#" className="text-on-surface-variant hover-secondary font-mono" style={{ transition: 'color 0.2s', fontSize: '14px' }}>Terms of Service</a>
        <a href="#" className="text-on-surface-variant hover-secondary font-mono" style={{ transition: 'color 0.2s', fontSize: '14px' }}>Compliance</a>
        <a href="#" className="text-on-surface-variant hover-secondary font-mono" style={{ transition: 'color 0.2s', fontSize: '14px' }}>Security</a>
        <style>{`
          .hover-secondary:hover { color: var(--secondary); }
        `}</style>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ 
          width: '40px', height: '40px', borderRadius: '50%', 
          border: '1px solid rgba(255,255,255,0.1)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', transition: 'all 0.3s' 
        }} className="social-icon">
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>public</span>
        </div>
        <div style={{ 
          width: '40px', height: '40px', borderRadius: '50%', 
          border: '1px solid rgba(255,255,255,0.1)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', transition: 'all 0.3s' 
        }} className="social-icon">
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>alternate_email</span>
        </div>
        <style>{`
          .social-icon:hover {
            background-color: var(--primary);
            color: var(--on-primary);
          }
        `}</style>
      </div>
    </footer>
  );
};

export default Footer;
