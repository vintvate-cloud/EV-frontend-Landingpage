import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BentoCard = ({ children, className, style, color = 'rgba(255,255,255,0.1)' }) => {
  return (
    <div 
      className={`card-wrapper ${className || ''}`}
      style={{
        position: 'relative',
        borderRadius: '24px',
        background: 'rgba(255, 255, 255, 0.02)', // base border color
        padding: '1px', // Border thickness
        ...style
      }}
    >
      <div 
        className="card-spotlight"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          background: `radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), ${color}, transparent 40%)`,
          opacity: 0,
          transition: 'opacity 0.5s ease',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      <div 
        style={{
          position: 'relative',
          background: '#070707', // Very deep black for interior
          borderRadius: '23px',
          height: '100%',
          width: '100%',
          zIndex: 1,
          padding: '3rem',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {children}
      </div>
    </div>
  );
};

const FeaturesBento = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a staggered reveal animation for all elements with the 'reveal' class
      const revealElements = gsap.utils.toArray('.reveal');
      
      gsap.fromTo(revealElements, 
        { 
          y: 60, 
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%", // Trigger when top of section is 75% down the viewport
            // end: "bottom center", // Optional: if we want to scrub
            // scrub: true, // Uncomment if we want animation tied exactly to scrollbar
            toggleActions: "play none none reverse" // play on enter, reverse on leave back up
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    if (!gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    gridRef.current.style.setProperty('--mouse-x', `${x}px`);
    gridRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section ref={sectionRef} className="section-padding bg-background">
      <style>{`
        .grid-container:hover .card-spotlight {
          opacity: 1 !important;
        }
        
        @media (min-width: 1024px) {
          .large-card { grid-column: span 8 !important; }
          .small-card { grid-column: span 4 !important; }
        }
      `}</style>

      <div className="container">
        <div style={{ marginBottom: '5rem', textAlign: 'center' }}>
          <div className="font-mono text-primary reveal" style={{ letterSpacing: '0.2em', marginBottom: '1rem', fontSize: '12px' }}>PROACTIVE MAINTENANCE</div>
          <h2 className="font-headline reveal" style={{ fontSize: 'clamp(36px, 5vw, 56px)', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>Intelligence at Scale</h2>
          <p className="text-on-surface-variant font-body reveal stagger-1" style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto', fontWeight: 300 }}>
            We've built more than just a service—we've engineered a platform that anticipates your needs using raw data and sleek precision.
          </p>
        </div>

        <div 
          ref={gridRef}
          className="grid-container"
          onMouseMove={handleMouseMove}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '24px',
            position: 'relative'
          }}
        >
          {/* Large Card: Diagnostics */}
          <BentoCard 
            className="large-card reveal" 
            style={{ gridColumn: 'span 12', minHeight: '400px' }}
            color="rgba(0, 201, 81, 0.4)" // Primary glow
          >
            <div style={{ position: 'relative', zIndex: 10, maxWidth: '400px' }}>
              <motion.span 
                className="material-symbols-outlined text-primary" 
                style={{ fontSize: '40px', marginBottom: '2rem', display: 'block' }}
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                memory
              </motion.span>
              <h3 className="font-headline" style={{ fontSize: '32px', marginBottom: '1rem', color: '#FFF' }}>Smart Diagnostics</h3>
              <p className="text-on-surface-variant font-body" style={{ lineHeight: 1.6, fontWeight: 300 }}>
                Predictive health monitoring for your EV. Our AI identifies potential issues before they become expensive repairs, ensuring 99.9% uptime for your journey.
              </p>
            </div>
            
            {/* Minimalist Tech Graphic inside card */}
            <div style={{
              position: 'absolute',
              right: '5%',
              bottom: '5%',
              width: '50%',
              height: '80%',
              opacity: 0.6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none'
            }}>
               <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCF3Hj1H93JzFpKn1dfj12kxrGYvJ7wYVwyzM5D-ASlhX4mLO0iGvEJeUctwDaVMDGmNMTc-9dUv4eqcBHG6QjJQ5GMo3VqtDzsupgTcgLzAP_WUALE_KOD-v1Co9GRNdb8HAMhro42AG7xr1jIPs_FsEosCeYV6tKPUpjjhH1ZAqFs7z9V1miQz4ieScR58YEPOaitV6D_bIk60dl84nG66scmTZrECsZR6G3uPOJneFsu7icU5fLYvo5jnCvw7Nim3jEDVUNqWC8" 
                    alt="Diagnostics" 
                    style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'brightness(0.3) sepia(1) hue-rotate(90deg) saturate(3)' }} />
            </div>
          </BentoCard>

          {/* Small Card: Elite Hubs */}
          <BentoCard 
            className="small-card reveal stagger-1" 
            style={{ gridColumn: 'span 12', minHeight: '400px' }}
            color="rgba(16, 185, 129, 0.4)" // Secondary glow
          >
            <motion.span 
              className="material-symbols-outlined text-secondary" 
              style={{ fontSize: '40px', marginBottom: '2rem', display: 'block' }}
              whileHover={{ y: -5 }}
            >
              bolt
            </motion.span>
            <h3 className="font-headline" style={{ fontSize: '32px', marginBottom: '1rem', color: '#FFF' }}>Elite Hubs</h3>
            <p className="text-on-surface-variant font-body" style={{ marginBottom: 'auto', fontWeight: 300, lineHeight: 1.6 }}>
              Ultra-fast charging lounge experiences located in premium commercial corridors.
            </p>
            
            <div style={{ marginTop: '2rem' }}>
              <div style={{ 
                height: '4px', 
                width: '100%', 
                background: 'rgba(255,255,255,0.05)', 
                borderRadius: '2px',
                overflow: 'hidden'
              }}>
                <motion.div 
                  initial={{ width: '0%' }}
                  whileInView={{ width: '80%' }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                  style={{ height: '100%', background: 'var(--secondary)' }} 
                />
              </div>
              <div className="font-mono text-secondary" style={{ marginTop: '0.75rem', textAlign: 'right', fontSize: '11px', letterSpacing: '1px' }}>
                80% RAPID CHARGE IN 18 MIN
              </div>
            </div>
          </BentoCard>

          {/* Bottom Card: Enterprise */}
          <BentoCard 
            className="reveal stagger-2" 
            style={{ gridColumn: 'span 12', minHeight: '300px' }}
            color="rgba(0, 245, 255, 0.4)" // Cyan glow
          >
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              gap: '4rem',
              alignItems: 'center',
              height: '100%'
            }}>
              <div style={{ flex: '1 1 300px' }}>
                <motion.span 
                  className="material-symbols-outlined text-cyan" 
                  style={{ fontSize: '40px', marginBottom: '2rem', display: 'block' }}
                  whileHover={{ x: 10 }}
                >
                  domain
                </motion.span>
                <h3 className="font-headline" style={{ fontSize: '32px', marginBottom: '1rem', color: '#FFF' }}>Enterprise Fleet</h3>
                <p className="text-on-surface-variant font-body" style={{ marginBottom: '2rem', fontWeight: 300, lineHeight: 1.6 }}>
                  Scale your commercial operations with our integrated telematics and maintenance suite. Real-time tracking and unified billing for fleets of 10 to 10,000.
                </p>
                <button style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  background: 'transparent', 
                  border: '1px solid rgba(0, 245, 255, 0.3)', 
                  color: 'var(--electric-cyan)',
                  padding: '12px 24px',
                  borderRadius: '30px',
                  cursor: 'pointer', 
                  fontSize: '14px',
                  fontWeight: 600,
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(0, 245, 255, 0.1)'}
                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                >
                  Request Demo <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                </button>
              </div>
              
              <div style={{ 
                flex: '1 1 300px', 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                position: 'relative' 
              }}>
                {/* Abstract 3D/Tech representation */}
                <div style={{ position: 'absolute', width: '200px', height: '200px', border: '1px solid rgba(0,245,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '140px', height: '140px', border: '1px dashed rgba(0,245,255,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'spin 20s linear infinite' }}>
                    <div style={{ width: '80px', height: '80px', background: 'rgba(0,245,255,0.05)', borderRadius: '50%', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="material-symbols-outlined text-cyan" style={{ fontSize: '40px' }}>hub</span>
                    </div>
                  </div>
                </div>
                <style>{`
                  @keyframes spin { 100% { transform: rotate(360deg); } }
                `}</style>
              </div>
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
};

export default FeaturesBento;
