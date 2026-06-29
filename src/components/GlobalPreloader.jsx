import React, { useEffect, useState, useRef, createContext, useContext } from 'react';

// Create a context so any component can access the pre-extracted frames
export const VideoContext = createContext({ frames: [], isReady: false });

export const useVideoFrames = () => useContext(VideoContext);

const GlobalPreloader = ({ children }) => {
  const [loadPct, setLoadPct] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const framesRef = useRef([]);

  useEffect(() => {
    // 1. Create a hidden video element
    const video = document.createElement('video');
    video.muted = true;
    video.preload = 'auto';
    video.crossOrigin = 'anonymous';
    video.src = '/lab-3d-centre.mp4';

    const seekTo = (t) =>
      new Promise((res) => {
        const done = () => { video.removeEventListener('seeked', done); res(); };
        video.addEventListener('seeked', done);
        video.currentTime = t;
      });

    const extract = async () => {
      // Wait for metadata
      if (video.readyState < 1)
        await new Promise((res) => video.addEventListener('loadedmetadata', res, { once: true }));

      // Wait for buffer
      if (video.readyState < 4)
        await new Promise((res) => video.addEventListener('canplaythrough', res, { once: true }));

      const duration = video.duration;
      const FPS = 24; // 24 FPS extraction for smooth playback
      const totalFrames = Math.round(duration * FPS);
      const extractedFrames = [];

      // Render frames to a reasonable max size for performance
      const CAP = 1280;
      const scale = Math.min(1, CAP / video.videoWidth);
      const offW = Math.round(video.videoWidth * scale);
      const offH = Math.round(video.videoHeight * scale);

      for (let i = 0; i <= totalFrames; i++) {
        await seekTo((i / totalFrames) * duration);
        const bmp = await createImageBitmap(video, {
          resizeWidth: offW,
          resizeHeight: offH,
          resizeQuality: 'medium',
        });
        extractedFrames.push(bmp);
        
        // Update UI
        setLoadPct(Math.round((i / totalFrames) * 100));
      }

      framesRef.current = extractedFrames;
      
      // Add a slight delay at 100% so it feels complete
      setTimeout(() => {
        setIsReady(true);
      }, 500);
    };

    extract().catch(console.error);

    return () => {
      // cleanup if component unmounts during load (rare)
      video.src = '';
    };
  }, []);

  return (
    <VideoContext.Provider value={{ frames: framesRef.current, isReady }}>
      {/* ─── Global Loading Screen ─── */}
      {!isReady && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: '#050505',
          zIndex: 9999, // On top of everything
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
        }}>
          <span className="font-mono text-primary" style={{ fontSize: '12px', letterSpacing: '3px' }}>
            LOADING LAB MODEL
          </span>
          <div style={{ width: '250px', height: '2px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
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

      {/* Render the actual site underneath */}
      {/* We keep it mounted so animations initialize correctly, but hidden if not ready */}
      <div style={{ opacity: isReady ? 1 : 0, transition: 'opacity 0.8s ease' }}>
        {children}
      </div>
    </VideoContext.Provider>
  );
};

export default GlobalPreloader;
