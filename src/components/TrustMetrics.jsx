import React, { useEffect, useRef } from 'react';

const TrustMetrics = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observerOptions = { threshold: 0.5 };
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll('.counter');
          counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const startTime = performance.now();
            
            const updateCounter = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeOut = 1 - Math.pow(1 - progress, 3);
              counter.textContent = Math.floor(easeOut * target);
              
              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              } else {
                counter.textContent = target;
              }
            };
            requestAnimationFrame(updateCounter);
          });
          counterObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (sectionRef.current) {
      counterObserver.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) counterObserver.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-surface">
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--gutter)' }}>
        
        <div className="bento-card reveal">
          <div className="font-mono text-primary" style={{ marginBottom: '1rem', fontSize: '14px' }}>ACTIVE ADOPTION</div>
          <div className="font-display" style={{ fontSize: '48px', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span className="counter" data-target="10000">0</span>
            <span className="text-primary" style={{ fontSize: '32px' }}>+</span>
          </div>
          <div className="text-on-surface-variant font-body" style={{ marginTop: '0.5rem' }}>Satisfied Premium Users</div>
        </div>

        <div className="bento-card reveal stagger-1">
          <div className="font-mono text-secondary" style={{ marginBottom: '1rem', fontSize: '14px' }}>PAN-INDIA NETWORK</div>
          <div className="font-display" style={{ fontSize: '48px', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span className="counter" data-target="50">0</span>
            <span className="text-secondary" style={{ fontSize: '32px' }}>+</span>
          </div>
          <div className="text-on-surface-variant font-body" style={{ marginTop: '0.5rem' }}>Major Cities Connected</div>
        </div>

        <div className="bento-card reveal stagger-2">
          <div className="font-mono text-cyan" style={{ marginBottom: '1rem', fontSize: '14px' }}>SUSTAINABILITY</div>
          <div className="font-display" style={{ fontSize: '48px', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span className="counter" data-target="100">0</span>
            <span className="text-cyan" style={{ fontSize: '32px' }}>%</span>
          </div>
          <div className="text-on-surface-variant font-body" style={{ marginTop: '0.5rem' }}>Green Energy Powered</div>
        </div>

      </div>
    </section>
  );
};

export default TrustMetrics;
