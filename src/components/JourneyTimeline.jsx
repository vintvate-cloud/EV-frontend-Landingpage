import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const JourneyTimeline = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    // We get the total width of the container minus the viewport width to know how much to scroll
    const scrollWidth = containerRef.current.scrollWidth - window.innerWidth;
    
    // Create the horizontal scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1, // Smooth scrubbing
        start: "top top",
        end: () => `+=${scrollWidth}`, // Scroll duration based on content width
        invalidateOnRefresh: true
      }
    });

    tl.to(containerRef.current, {
      x: () => -scrollWidth,
      ease: "none"
    });

    // Fade out the header text as we start scrolling horizontally
    gsap.to(headerRef.current, {
      opacity: 0,
      y: -50,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=300",
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const steps = [
    {
      id: "01",
      title: "DIGITAL BOOKING",
      heading: "Instant Access",
      desc: "Book your service or charging slot through our encrypted concierge app in under 30 seconds.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBw4jpJ-d50ih8lTYu-nNxzNYNcyXbKkHF3T8beY8vcEXI_pR6Tuq3cCNI93stLnUPjNfr6gRP_12Ce3TcP_nIHdcUBwu_CdSYPvtST_PjvY-mrjdZcRmcLeknkhByMRRiy4FNCC0-IUZF8EGsEpUHUHMuE9gGZSGvYz7cC77FT0BhsLCctNgqn7ubZF6D1qno74y_heZyRk2Nq3h2AaoRfECkYVA47A4il07NulUFbi7EUAs3vzqlA0bHynSQ80-3ERAYKeCEsJQ4",
      color: "var(--primary)"
    },
    {
      id: "02",
      title: "PRECISION SERVICE",
      heading: "Expert Handling",
      desc: "Our certified technicians utilize state-of-the-art telemetry to perform non-invasive maintenance and software optimizations.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNU2pv1tPqLrRlr8a7p3SJd6HYH6iDe-K3gi4wj7DVirV1g5GiBjVAVUCqWQj40OIgmm3vxMPUcWztQ1yN9A8eqrRbo8TViaCuN0psX7AvqE3Kafo9Qi4a5dWfEg9l0-zuv0quQ3cFDNkpvLKyOWwhsrOrnwA55sttyDOe52L4bRni8KyHMEuO1CH2QxIF2ILCTz8KckQ85Q2azfNz3MG9T_Nns4gHD-VWJJMMCYssbZt67Ta0ttW98UIOxIQ6znQoMUDGggDM1PA",
      color: "var(--secondary)"
    },
    {
      id: "03",
      title: "WHITE GLOVE DELIVERY",
      heading: "The Return",
      desc: "Your vehicle is sanitized, detailed, and delivered to your doorstep, fully charged and optimized for performance.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPKybiGSIWEYOHcdroNJDQbqBsLimka3HW5BSmjeCmTkri65hhA5DuFRLv-UXDxe0vOexRpA4LKf4Qf_0hF40tpfZ1NIFnySKSZtyEQQF-vsnL4dJ9lGZ5r9H21gSkxGQgSQtBOsUjroQ1zF4ovwoKoHvC5ctzXLkwsX0c4IRKDhu7Nov2TIyOa-yR62nnfwsJgwgxsIbzOIcs9ZBzz0lhAv6r3RBbzNFhEtM27qROw4-AKwVeyKTPPiKO5pYMVKO7FBmWqQaQT98",
      color: "var(--electric-cyan)"
    }
  ];

  return (
    <section ref={sectionRef} className="bg-background" style={{ overflow: 'hidden', height: '100vh', display: 'flex', alignItems: 'center', position: 'relative' }}>
      
      {/* Title that stays fixed during pin until scrolled past */}
      <div 
        ref={headerRef} 
        style={{ 
          position: 'absolute', 
          top: '15%', 
          left: '0',
          width: '100%',
          textAlign: 'center', 
          zIndex: 10 
        }}
      >
        <div className="font-mono text-primary" style={{ letterSpacing: '0.2em', marginBottom: '1rem' }}>THE MYEV EXPERIENCE</div>
        <h2 className="font-headline" style={{ fontSize: '48px', margin: 0 }}>From Request to Road</h2>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={containerRef} 
        style={{ 
          display: 'flex', 
          width: '300vw', 
          height: '100%', 
          alignItems: 'center' 
        }}
      >
        {steps.map((step, index) => (
          <div 
            key={index} 
            style={{ 
              width: '100vw', 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              padding: '0 5vw',
              position: 'relative'
            }}
          >
            {/* Step Content */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '4rem',
              alignItems: 'center',
              maxWidth: '1200px',
              width: '100%',
              marginTop: '5rem' // offset for header
            }}>
              {/* Text Side */}
              <div style={{ order: index % 2 === 0 ? 1 : 2 }}>
                <span className="font-mono" style={{ color: step.color }}>{step.id}. {step.title}</span>
                <h4 className="font-headline" style={{ fontSize: '40px', margin: '1rem 0' }}>{step.heading}</h4>
                <p className="text-on-surface-variant font-body" style={{ fontSize: '18px', lineHeight: '1.6' }}>{step.desc}</p>
                
                {/* Visual Indicator */}
                <div style={{ 
                  marginTop: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <div style={{ 
                    width: '12px', height: '12px', borderRadius: '50%', backgroundColor: step.color,
                    boxShadow: `0 0 15px ${step.color}`
                  }} />
                  <div style={{ height: '1px', width: '100px', background: 'rgba(255,255,255,0.2)' }} />
                </div>
              </div>

              {/* Image Side */}
              <div style={{ order: index % 2 === 0 ? 2 : 1 }}>
                <div style={{ 
                  aspectRatio: '4/3', 
                  backgroundColor: 'var(--surface-container)', 
                  borderRadius: '1rem', 
                  overflow: 'hidden', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                }}>
                  <img src={step.img} 
                       alt={step.heading}
                       style={{ 
                         width: '100%', 
                         height: '100%', 
                         objectFit: 'cover', 
                         filter: 'grayscale(100%)', 
                         transition: 'all 0.7s ease' 
                       }}
                       onMouseOver={e => e.currentTarget.style.filter = 'grayscale(0%)'}
                       onMouseOut={e => e.currentTarget.style.filter = 'grayscale(100%)'} 
                  />
                </div>
              </div>
            </div>
            
            {/* Background Step Number Overlay */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '30vw',
              fontWeight: 800,
              color: 'rgba(255,255,255,0.02)',
              zIndex: -1,
              pointerEvents: 'none',
              fontFamily: 'var(--font-display)'
            }}>
              {step.id}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default JourneyTimeline;
