import React, { useEffect, useState } from 'react';

export const AmbientPageEffects: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Smooth scroll progress bar calculation
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth interactive mouse spotlight glow
  useEffect(() => {
    // Only enable mouse glow if pointer can hover (avoid unnecessary calculations on mobile touch)
    if (window.matchMedia('(hover: hover)').matches) {
      let rafId: number | null = null;
      let targetX = window.innerWidth / 2;
      let targetY = 200;

      const handleMouseMove = (e: MouseEvent) => {
        targetX = e.clientX;
        targetY = e.clientY;

        if (rafId === null) {
          rafId = requestAnimationFrame(() => {
            document.documentElement.style.setProperty('--spotlight-x', `${targetX}px`);
            document.documentElement.style.setProperty('--spotlight-y', `${targetY}px`);
            rafId = null;
          });
        }
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        if (rafId !== null) cancelAnimationFrame(rafId);
      };
    }
  }, []);

  return (
    <>
      {/* Sleek 2px reading scroll progress bar at top of screen */}
      <div
        className="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-[#E11D48] via-[#FF5E62] to-[#E11D48] z-50 transition-all duration-75 pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Interactive spotlight glow overlay - subtle luxury ambient light that tracks the cursor */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-40 dark:opacity-60 transition-opacity duration-500 overflow-hidden"
        style={{
          background:
            'radial-gradient(650px circle at var(--spotlight-x, 50vw) var(--spotlight-y, 25vh), rgba(225, 29, 72, 0.075), transparent 60%)',
        }}
        aria-hidden="true"
      />

      {/* Ambient background mesh orbs for depth & spatial luxury */}
      <div
        className="pointer-events-none fixed -top-32 -left-32 w-96 h-96 bg-red-500/10 dark:bg-red-600/10 rounded-full blur-[100px] animate-ambient-drift z-0"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed top-1/2 -right-32 w-80 h-80 bg-rose-500/5 dark:bg-red-500/8 rounded-full blur-[90px] animate-ambient-drift [animation-delay:4s] z-0"
        aria-hidden="true"
      />
    </>
  );
};
