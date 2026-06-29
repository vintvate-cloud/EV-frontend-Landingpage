import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// ── Lenis smooth scroll wired to GSAP ScrollTrigger ──────────────────────────
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const lenis = new Lenis({
  duration: 1.4,            // seconds for 1 full scroll step (higher = silkier)
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential ease
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
})

// Pipe Lenis scroll events into GSAP ticker so ScrollTrigger stays in sync
lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000) // GSAP time is in seconds, Lenis wants ms
})

gsap.ticker.lagSmoothing(0) // Prevent lag spikes from throwing off scrub

// ─────────────────────────────────────────────────────────────────────────────

import GlobalPreloader from './components/GlobalPreloader'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalPreloader>
      <App />
    </GlobalPreloader>
  </StrictMode>,
)
