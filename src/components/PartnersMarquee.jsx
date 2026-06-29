import React from 'react';
import { motion } from 'framer-motion';

const HolographicCard = ({ name }) => {
  return (
    <motion.div 
      style={{
        position: 'relative',
        width: '280px',
        height: '140px',
        flexShrink: 0,
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        cursor: 'pointer',
        // Slight 3D tilt
        transform: 'perspective(1000px) rotateY(-5deg)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      whileHover={{
        scale: 1.05,
        rotateY: 0,
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(0, 245, 255, 0.3)',
        boxShadow: '0 0 30px rgba(0, 245, 255, 0.15), 0 20px 40px rgba(0,0,0,0.5)'
      }}
      className="holo-card"
    >
      {/* Iridescent Edge Glow (Holographic feel) */}
      <div 
        className="holo-glow"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(0, 245, 255, 0) 0%, rgba(0, 245, 255, 0.1) 50%, rgba(0, 201, 81, 0) 100%)',
          opacity: 0,
          transition: 'opacity 0.5s ease',
          pointerEvents: 'none'
        }}
      />
      
      <span 
        className="font-headline text-on-surface" 
        style={{ 
          fontSize: '24px', 
          fontWeight: 800,
          letterSpacing: '2px',
          background: 'linear-gradient(135deg, #FFF 0%, #94A3B8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          zIndex: 10
        }}
      >
        {name}
      </span>
    </motion.div>
  );
};

const PartnersMarquee = () => {
  const partners = [
    "LUXE-DRIVE", "GRID-CO", "ZENITH VOLTS", "PRIME LOGISTICS", "ECO-CARGO", "URBAN-CHARGE",
    // Duplicate for seamless loop
    "LUXE-DRIVE", "GRID-CO", "ZENITH VOLTS", "PRIME LOGISTICS", "ECO-CARGO", "URBAN-CHARGE"
  ];

  return (
    <section style={{ 
      padding: '6rem 0', 
      backgroundColor: '#050505', // Deep space black
      overflow: 'hidden',
      position: 'relative'
    }}>
      <style>{`
        .holo-card:hover .holo-glow {
          opacity: 1 !important;
        }
        
        @keyframes marquee3d {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-280px * 6 - 3rem * 6)); }
        }
        
        .marquee-track {
          display: flex;
          gap: 3rem;
          width: fit-content;
          animation: marquee3d 30s linear infinite;
          padding-left: 3rem;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Subtle background glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '100px',
        background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.02), transparent)',
        filter: 'blur(30px)',
        zIndex: 0
      }} />

      <div style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="font-mono text-cyan" style={{ fontSize: '12px', letterSpacing: '3px' }}>TRUSTED ENTERPRISE PARTNERS</span>
        </div>
        
        <div className="marquee-track">
          {partners.map((partner, index) => (
            <HolographicCard key={index} name={partner} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersMarquee;
