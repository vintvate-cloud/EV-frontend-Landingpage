import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const StatCounter = ({ value, label, suffix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value);
      if (start === end) return;
      
      const duration = 2000;
      let startTimestamp = null;
      
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        // easeOutQuart
        const ease = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(ease * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(end);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
        <span style={{ fontSize: '48px', fontWeight: 800, fontFamily: 'Plus Jakarta Sans', color: 'var(--pure-white)' }}>
          {count.toLocaleString()}
        </span>
        <span className="text-gradient-primary" style={{ fontSize: '32px', fontWeight: 700 }}>{suffix}</span>
      </div>
      <span style={{ color: 'var(--on-surface-variant)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', fontFamily: 'JetBrains Mono' }}>
        {label}
      </span>
    </div>
  );
};

const NationwideMap = () => {
  return (
    <section style={{ position: 'relative', overflow: 'hidden' }} className="section-padding bg-surface">
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: '48px', fontWeight: 700, fontFamily: 'Plus Jakarta Sans', marginBottom: '16px' }}
          >
            Powering a <span className="text-gradient-cyan">Nationwide</span> Grid
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ color: 'var(--on-surface-variant)', maxWidth: '600px', margin: '0 auto' }}
          >
            From predictive maintenance algorithms to on-ground certified technicians, our ecosystem operates at unprecedented scale.
          </motion.p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '40px',
          background: 'var(--surface-glass)',
          border: '1px solid rgba(255,255,255,0.05)',
          backdropFilter: 'blur(24px)',
          borderRadius: '24px',
          padding: '60px',
          boxShadow: '0 30px 60px -10px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)'
        }}>
          <StatCounter value="10000" label="Active Vehicles Serviced" suffix="+" />
          <StatCounter value="50" label="Major Cities Connected" suffix="+" />
          <StatCounter value="500" label="Certified Technicians" suffix="+" />
          <StatCounter value="99" label="Customer Satisfaction" suffix="%" />
        </div>
      </div>
      
      {/* Background Glowing Orb simulating map energy */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '800px',
        background: 'radial-gradient(circle, rgba(0,245,255,0.05) 0%, rgba(10,10,10,0) 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />
    </section>
  );
};

export default NationwideMap;
