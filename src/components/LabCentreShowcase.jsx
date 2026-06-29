import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LabCentreShowcase = () => {
  const wrapperRef  = useRef(null);
  const canvasRef   = useRef(null);
  const videoRef    = useRef(null);     // hidden video element used only for frame extraction
  const framesRef   = useRef([]);       // array of ImageBitmap
  const [loadPct, setLoadPct] = useState(0);  // 0-100 loading progress
  const [ready, setReady]     = useState(false);

  // ─── Extract every frame at target FPS ────────────────────────
  useEffect(() => {
    const video  = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    video.preload  = 'auto';
    video.muted    = true;
    video.src      = '/lab-3d-centre.mp4';

    const seekTo = (t) =>
      new Promise((resolve) => {
        const onSeeked = () => {
          video.removeEventListener('seeked', onSeeked);
          resolve();
        };
        video.addEventListener('seeked', onSeeked);
        video.currentTime = t;
      });

    const extract = async () => {
      // Wait for metadata
      await new Promise((resolve) => {
        if (video.readyState >= 1) return resolve();
        video.addEventListener('loadedmetadata', resolve, { once: true });
      });

      // Buffer whole file first so seeks are instant
      await new Promise((resolve) => {
        if (video.readyState === 4) return resolve();
        video.addEventListener('canplaythrough', resolve, { once: true });
      });

      const duration   = video.duration;
      const targetFPS  = 24;           // 24 frames per second extracted
      const totalFrames = Math.round(duration * targetFPS);

      // Set canvas to video's natural resolution (capped for performance)
      const CAP = 1280;
      const scale = Math.min(1, CAP / video.videoWidth);
      canvas.width  = Math.round(video.videoWidth  * scale);
      canvas.height = Math.round(video.videoHeight * scale);

      const frames = [];

      for (let i = 0; i <= totalFrames; i++) {
        const t = (i / totalFrames) * duration;
        await seekTo(t);

        // createImageBitmap is GPU-accelerated; much faster to draw than raw video
        const bmp = await createImageBitmap(video, {
          resizeWidth:  canvas.width,
          resizeHeight: canvas.height,
          resizeQuality: 'medium',
        });
        frames.push(bmp);
        setLoadPct(Math.round((i / totalFrames) * 100));
      }

      framesRef.current = frames;
      setReady(true);

      // Draw first frame immediately
      const ctx = canvas.getContext('2d');
      if (frames[0]) ctx.drawImage(frames[0], 0, 0);

      // ─── Scroll-drive: index into frames array (zero seeking) ───
      const st = ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const idx = Math.round(self.progress * (frames.length - 1));
          const frame = frames[idx];
          if (frame) ctx.drawImage(frame, 0, 0);
        },
      });

      return () => st.kill();
    };

    let cleanup;
    extract().then((fn) => { cleanup = fn; });
    return () => { cleanup?.(); };
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{ position: 'relative', height: '800vh', background: '#050505' }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {/* Hidden video — only used for frame extraction */}
        <video
          ref={videoRef}
          style={{ display: 'none' }}
          crossOrigin="anonymous"
        />

        {/* Canvas renders pre-extracted frames — perfectly smooth */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        />

        {/* Loading overlay */}
        {!ready && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: '#050505',
            zIndex: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
          }}>
            <span className="font-mono text-primary" style={{ fontSize: '12px', letterSpacing: '3px' }}>
              LOADING LAB MODEL
            </span>
            <div style={{ width: '200px', height: '2px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${loadPct}%`,
                background: 'var(--primary)',
                borderRadius: '2px',
                transition: 'width 0.2s linear',
                boxShadow: '0 0 10px rgba(0,201,81,0.6)',
              }} />
            </div>
            <span className="font-mono" style={{ fontSize: '11px', color: 'var(--on-surface-variant)' }}>{loadPct}%</span>
          </div>
        )}

        {/* Dark cinematic overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.78) 38%, rgba(0,0,0,0.08) 100%)',
          zIndex: 1,
        }} />

        {/* Bottom fade */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '180px',
          background: 'linear-gradient(to bottom, transparent, #050505)',
          zIndex: 2,
        }} />

        {/* UI Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          padding: '0 var(--margin-desktop)',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: '520px' }}
          >
            {/* Tag badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '30px',
              border: '1px solid rgba(0, 201, 81, 0.4)',
              background: 'rgba(0, 201, 81, 0.1)',
              backdropFilter: 'blur(10px)',
              marginBottom: '2rem',
            }}>
              <span className="material-symbols-outlined text-primary" style={{ fontSize: '16px' }}>view_in_ar</span>
              <span className="font-mono text-primary" style={{ fontSize: '12px', letterSpacing: '1px' }}>3D Model · Lab Configuration</span>
            </div>

            <h2 className="font-headline" style={{
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#FFF',
              marginBottom: '1.5rem',
            }}>
              Step inside a My EV<br />Service Centre.
            </h2>

            <p className="font-body text-on-surface-variant" style={{
              fontSize: '16px',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
              fontWeight: 300,
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
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 28px',
                borderRadius: '50px',
                background: 'var(--primary)',
                color: '#000',
                fontWeight: 700,
                fontSize: '15px',
                border: 'none',
                cursor: 'pointer',
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
