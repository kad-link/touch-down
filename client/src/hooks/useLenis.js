import { useEffect } from 'react';
import Lenis from 'lenis';

export function useLenis() {
  useEffect(() => {
    // Prefer window.Lenis if loaded from CDN, fallback to npm Lenis
    const LenisClass = window.Lenis || Lenis;

    const lenis = new LenisClass({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothWheel: true,
      syncTouch: false,
    });

    window.lenis = lenis;

    let animationFrameId;

    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    // If GSAP ScrollTrigger is present
    if (window.gsap && window.ScrollTrigger) {
      lenis.on('scroll', window.ScrollTrigger.update);
      const tickerCallback = (time) => {
        lenis.raf(time * 1000);
      };
      window.gsap.ticker.add(tickerCallback);
      window.gsap.ticker.lagSmoothing(0);

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.gsap.ticker.remove(tickerCallback);
        lenis.destroy();
        window.lenis = null;
      };
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);
}
