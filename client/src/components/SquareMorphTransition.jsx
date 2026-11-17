import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TransitionContext = createContext(null);

export function TransitionProvider({ children }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Reset scroll to top on route change using Lenis or native
  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  const morphNavigate = (to) => {
    if (location.pathname === to) return;
    setIsTransitioning(true);
    setTimeout(() => {
      navigate(to);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 250);
    }, 450);
  };

  return (
    <TransitionContext.Provider value={{ morphNavigate, isTransitioning }}>
      {children}
      <div className={`page-transition-overlay ${isTransitioning ? 'active' : ''}`}>
        <div className="flex flex-col items-center gap-6">
          <div className="square-morph"></div>
          <div className="font-display text-xs font-bold tracking-[0.3em] uppercase text-[#F1F1EE] flex items-center justify-center">
            TOUCHDOWN
          </div>
        </div>
      </div>
    </TransitionContext.Provider>
  );
}

export function useMorphNavigate() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useMorphNavigate must be used within a TransitionProvider');
  }
  return context.morphNavigate;
}
