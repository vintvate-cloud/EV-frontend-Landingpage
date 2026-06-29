import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const MagneticButton = ({ children, primary = true }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      style={{
        padding: '16px 32px',
        borderRadius: '50px',
        fontFamily: 'Plus Jakarta Sans',
        fontWeight: 600,
        fontSize: '16px',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        border: primary ? 'none' : '1px solid rgba(255,255,255,0.2)',
        background: primary ? 'linear-gradient(135deg, #00C951 0%, #10B981 100%)' : 'rgba(255,255,255,0.02)',
        color: primary ? '#0A0A0A' : '#FFFFFF',
        boxShadow: primary ? '0 10px 30px -10px rgba(0, 201, 81, 0.5)' : 'none',
        backdropFilter: primary ? 'none' : 'blur(10px)'
      }}
    >
      {children}
    </motion.button>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  
  // Parallax effects
  // Background image moves down slightly and scales up
  const backgroundY = useTransform(scrollY, [0, 1000], ['0%', '20%']);
  const backgroundScale = useTransform(scrollY, [0, 1000], [1, 1.15]);
  
  // Text moves up faster than background, creating depth
  const textY = useTransform(scrollY, [0, 1000], ['0%', '-50%']);
  const textOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  // Video overlay darkens on scroll
  const overlayOpacity = useTransform(scrollY, [0, 500], [0.4, 0.8]);

  return (
    <section style={{
      position: 'relative',
      height: '100vh',
      width: '100%',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
    }}>
      
      {/* Parallax Background */}
      <motion.div 
        style={{
          position: 'absolute',
          top: -50,
          left: -50,
          right: -50,
          bottom: -50,
          y: backgroundY,
          scale: backgroundScale,
          zIndex: 0,
          // Using a high-res unspash image of a sleek dark EV charging. 
          // (Simulating a video with slow ken burns scale & parallax)
          backgroundImage: 'url("https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Dynamic Overlay for Text Legibility & Mood */}
      <motion.div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#0A0A0A',
          opacity: overlayOpacity,
          zIndex: 1
        }}
      />
      
      {/* Edge gradient blending */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(10,10,10,0) 60%, rgba(10,10,10,1) 100%)',
        zIndex: 2
      }}/>

      {/* Cinematic UI Overlay with Parallax */}
      <motion.div 
        className="container" 
        style={{ 
          position: 'relative', 
          zIndex: 10, 
          padding: '0 var(--margin-desktop)',
          y: textY,
          opacity: textOpacity
        }}
      >
        <div style={{ maxWidth: '900px' }}>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Minimalist Subtitle */}
            <div style={{
              display: 'inline-block',
              padding: '6px 16px',
              border: '1px solid rgba(0, 201, 81, 0.3)',
              borderRadius: '30px',
              backgroundColor: 'rgba(0, 201, 81, 0.1)',
              backdropFilter: 'blur(10px)',
              color: '#00C951',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '2rem'
            }}>
              Next-Gen EV Maintenance
            </div>

            <h1 style={{ 
              fontFamily: 'Plus Jakarta Sans', 
              fontSize: 'clamp(56px, 7vw, 100px)', 
              fontWeight: 800, 
              lineHeight: 1.05, 
              letterSpacing: '-0.04em',
              marginBottom: '32px',
              color: '#FFF',
              textShadow: '0 20px 40px rgba(0,0,0,0.5)'
            }}>
              The Future of <br />
              <span className="text-gradient-primary">EV Service</span> is Here.
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              fontSize: 'clamp(18px, 2vw, 22px)', 
              color: 'var(--on-surface-variant)',
              marginBottom: '48px',
              maxWidth: '650px',
              fontWeight: 300,
              lineHeight: 1.6
            }}
          >
            India's first unified multi-brand EV servicing ecosystem. Certified doorstep servicing, AI-powered diagnostics, and genuine spare parts engineered with perfection.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}
          >
            <MagneticButton primary={true}>Book an EV Service</MagneticButton>
            <MagneticButton primary={false}>Explore Franchise</MagneticButton>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
