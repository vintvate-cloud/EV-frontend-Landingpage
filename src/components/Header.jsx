import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const headerRef = useRef(null);
  const innerNavRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    // GSAP ScrollTrigger for the Navbar
    const ctx = gsap.context(() => {
      // Animate the inner nav container to become more compact
      gsap.to(innerNavRef.current, {
        maxWidth: '1050px',
        padding: '6px 6px 6px 20px',
        background: 'rgba(15, 18, 20, 0.95)',
        scrollTrigger: {
          start: 'top top',
          end: '+=300',
          scrub: 1, // Smooth scrubbing
        }
      });

      // Optionally scale down the links slightly to fit the compact navbar
      gsap.to(linksRef.current, {
        gap: '20px',
        scrollTrigger: {
          start: 'top top',
          end: '+=300',
          scrub: 1,
        }
      });

      // Move the entire header up slightly
      gsap.to(headerRef.current, {
        top: '12px',
        scrollTrigger: {
          start: 'top top',
          end: '+=300',
          scrub: 1,
        }
      });
    });

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <motion.header
      ref={headerRef}
      style={{
        position: 'fixed',
        top: '24px',
        left: 0,
        width: '100%',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 24px'
      }}
    >
      <div 
        ref={innerNavRef}
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          width: '100%', 
          maxWidth: '1200px',
          background: 'rgba(15, 18, 20, 0.75)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '9999px',
          padding: '8px 8px 8px 24px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}
      >
        {/* Logo Section */}
        <motion.div 
          style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}
          whileHover={{ scale: 1.02 }}
        >
          <div style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '50%', 
            background: '#000', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            {/* Green Lightning Bolt */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#00C951" />
            </svg>
          </div>
          <a href="#" className="font-display" style={{ fontSize: '15px', color: 'var(--pure-white)', display: 'flex', gap: '4px', textDecoration: 'none' }}>
            <span style={{ fontWeight: 800 }}>MY EV</span>
            <span style={{ fontWeight: 500, color: '#9CA3AF' }}>SERVICE</span>
          </a>
        </motion.div>
        
        {/* Navigation Links */}
        <nav ref={linksRef} style={{ display: 'flex', gap: '32px', alignItems: 'center', overflow: 'hidden' }} className="font-body hidden md:flex">
          {['Ecosystem', 'Services', 'Network', 'Franchise', 'Parts'].map((item) => (
            <motion.a 
              key={item}
              href="#" 
              style={{ 
                fontSize: '14px', 
                color: '#D1D5DB', 
                textDecoration: 'none',
                fontWeight: 500,
                position: 'relative',
                whiteSpace: 'nowrap'
              }}
              whileHover={{ color: '#FFFFFF' }}
            >
              {item}
            </motion.a>
          ))}
        </nav>
        
        {/* CTA Button */}
        <div style={{ flexShrink: 0 }}>
          <motion.button 
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.98 }}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '10px 20px', 
              borderRadius: '9999px', 
              color: 'var(--pure-white)',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#00C951', boxShadow: '0 0 8px rgba(0, 201, 81, 0.8)' }} />
            Book service
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
