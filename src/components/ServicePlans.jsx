import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const PlanCard = ({ title, price, features, isPopular, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10 }}
      style={{
        position: 'relative',
        flex: '1',
        minWidth: '300px',
        maxWidth: '400px',
        padding: '3rem 2rem',
        borderRadius: '24px',
        background: isPopular 
          ? 'linear-gradient(180deg, rgba(30,41,59,0.5) 0%, rgba(10,10,10,0.8) 100%)' 
          : 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(20px)',
        border: isPopular ? '1px solid rgba(0,201,81,0.5)' : '1px solid rgba(255,255,255,0.05)',
        boxShadow: isPopular ? '0 20px 40px rgba(0,201,81,0.1)' : '0 10px 30px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {isPopular && (
        <div style={{
          position: 'absolute',
          top: '-15px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--primary)',
          color: '#000',
          padding: '6px 16px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 800,
          letterSpacing: '1px'
        }}>
          MOST POPULAR
        </div>
      )}

      <h3 className="font-display" style={{ fontSize: '24px', marginBottom: '1rem', color: isPopular ? 'var(--primary)' : '#FFF' }}>{title}</h3>
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <span style={{ fontSize: '48px', fontWeight: 800, lineHeight: 1 }}>{price}</span>
        <span style={{ color: 'var(--on-surface-variant)' }}>/month</span>
      </div>

      <div style={{ flex: 1, marginBottom: '2rem' }}>
        {features.map((feature, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span className="material-symbols-outlined" style={{ color: isPopular ? 'var(--primary)' : 'var(--on-surface-variant)', fontSize: '20px' }}>
              check_circle
            </span>
            <span className="font-body" style={{ color: '#E2E8F0', fontSize: '15px' }}>{feature}</span>
          </div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          width: '100%',
          padding: '16px',
          borderRadius: '12px',
          background: isPopular ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
          color: isPopular ? '#000' : '#FFF',
          border: isPopular ? 'none' : '1px solid rgba(255,255,255,0.1)',
          fontWeight: 700,
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        Choose Plan
      </motion.button>
    </motion.div>
  );
};

const ServicePlans = () => {
  return (
    <section className="section-padding bg-background" style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* Background ambient glow */}
      <div style={{ position: 'absolute', top: '20%', left: '30%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(0,201,81,0.05) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div className="font-mono text-primary" style={{ letterSpacing: '0.2em', marginBottom: '1rem', fontSize: '12px' }}>SUBSCRIPTION PRICING</div>
          <h2 className="font-headline" style={{ fontSize: 'clamp(36px, 5vw, 56px)', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>Service Without Limits</h2>
          <p className="text-on-surface-variant font-body" style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto', fontWeight: 300 }}>
            Choose an intelligent care plan that matches your driving habits. From essential upkeep to white-glove concierge coverage.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
          <PlanCard 
            title="Essential"
            price="$89"
            delay={0.1}
            features={[
              "Biannual AI diagnostics scan",
              "Standard software updates",
              "Priority scheduling",
              "Tire & brake pad monitoring"
            ]}
          />
          <PlanCard 
            title="Luxe-Drive™"
            price="$199"
            isPopular={true}
            delay={0.3}
            features={[
              "Monthly remote diagnostics",
              "Doorstep valet service pickup",
              "Free annual detailing & sanitization",
              "Over-the-air performance tuning",
              "24/7 dedicated EV concierge"
            ]}
          />
          <PlanCard 
            title="Enterprise Fleet"
            price="Custom"
            delay={0.5}
            features={[
              "Unified billing & telematics",
              "On-site charging infrastructure repair",
              "Automated dispatch routing",
              "Volume discounts on OEM parts"
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default ServicePlans;
