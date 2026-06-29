import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useVideoFrames } from './GlobalPreloader'; // Import the context hook

gsap.registerPlugin(ScrollTrigger);

// Draws a bitmap onto a canvas with CSS object-fit:cover behaviour
const drawCover = (ctx, bmp, W, H) => {
  if (!bmp) return;
  const ir = bmp.width / bmp.height; // image ratio
  const cr = W / H;                  // canvas ratio
  let sx, sy, sw, sh;
  if (ir > cr) {
    sh = bmp.height; sw = sh * cr;
    sx = (bmp.width - sw) / 2; sy = 0;
  } else {
    sw = bmp.width; sh = sw / cr;
    sx = 0; sy = (bmp.height - sh) / 2;
  }
  ctx.drawImage(bmp, sx, sy, sw, sh, 0, 0, W, H);
};

const LabCentreShowcase = () => {
  const wrapperRef = useRef(null);
  const canvasRef  = useRef(null);
  const { frames, isReady } = useVideoFrames(); // Get pre-loaded frames globally

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isReady || frames.length === 0) return;

    const ctx = canvas.getContext('2d', { alpha: false }); // Optimize for opaque drawing

    // ── Handle resizing & initial draw ──
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      drawCover(ctx, frames[0], canvas.width, canvas.height); // draw first frame
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Scroll scrubbing ──
    const st = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        // Map scroll progress (0 to 1) to the array index
        const idx   = Math.round(self.progress * (frames.length - 1));
        const frame = frames[idx];
        drawCover(ctx, frame, canvas.width, canvas.height);
      },
    });

    return () => {
      st.kill();
      window.removeEventListener('resize', resize);
    };
  }, [frames, isReady]);

  return (
    <div
      ref={wrapperRef}
      style={{ position: 'relative', height: '800vh', background: '#050505' }}
    >
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
      }}>
        {/* Render pre-extracted frames */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%',
            height: '100%',
            display: 'block',
            zIndex: 0,
          }}
        />

        {/* Cinematic overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.78) 38%, rgba(0,0,0,0.08) 100%)',
          zIndex: 1,
        }} />

        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '180px',
          background: 'linear-gradient(to bottom, transparent, #050505)',
          zIndex: 2,
        }} />

        {/* UI Overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 10,
          display: 'flex', alignItems: 'center',
          padding: '0 var(--margin-desktop)',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: '520px' }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 14px', borderRadius: '30px',
              border: '1px solid rgba(0,201,81,0.4)',
              background: 'rgba(0,201,81,0.1)', backdropFilter: 'blur(10px)',
              marginBottom: '2rem',
            }}>
              <span className="material-symbols-outlined text-primary" style={{ fontSize: '16px' }}>view_in_ar</span>
              <span className="font-mono text-primary" style={{ fontSize: '12px', letterSpacing: '1px' }}>3D Model · Lab Configuration</span>
            </div>

            <h2 className="font-headline" style={{
              fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800,
              lineHeight: 1.1, letterSpacing: '-0.02em',
              color: '#FFF', marginBottom: '1.5rem',
            }}>
              Step inside a My EV<br />Service Centre.
            </h2>

            <p className="font-body text-on-surface-variant" style={{
              fontSize: '16px', lineHeight: 1.7,
              marginBottom: '2.5rem', fontWeight: 300,
            }}>
              Every franchise outlet is built to a standardised lab-grade
              configuration — from service bay layout to equipment placement.
              Not improvised. Engineered.
            </p>

            <div style={{ display: 'flex', gap: '2.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
              {[
                { label: 'Standardised Layout', sub: 'Same setup, every city' },
                { label: 'Inspection-Ready',    sub: 'Equipment pre-specced'  },
                { label: 'Fast to Deploy',      sub: 'Centre-in-a-box model'  },
              ].map(item => (
                <div key={item.label}>
                  <div className="font-display" style={{ fontSize: '14px', fontWeight: 700, color: '#FFF' }}>{item.label}</div>
                  <div className="font-body" style={{ fontSize: '12px', color: 'var(--on-surface-variant)', marginTop: '4px' }}>{item.sub}</div>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(0,201,81,0.4)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                padding: '14px 28px', borderRadius: '50px',
                background: 'var(--primary)', color: '#000',
                fontWeight: 700, fontSize: '15px',
                border: 'none', cursor: 'pointer',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>storefront</span>
              Explore Franchise →
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LabCentreShowcase;
