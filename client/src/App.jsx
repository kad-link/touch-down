import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useLenis } from './hooks/useLenis';
import { TransitionProvider } from './components/SquareMorphTransition';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

export default function App() {
  // Global Lenis Smooth Scrolling Engine
  useLenis();

  return (
    <TransitionProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </TransitionProvider>
  );
}

