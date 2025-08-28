'use client';

import React, { useState } from 'react';
import { Moon, Stars, Eye, TrendingUp, Shield } from 'lucide-react';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import AuthForms from '@/components/auth/AuthForms';
import LightRays from '@/components/LightRays';
import { APP_CONFIG } from '@/utils/constants';

const LandingPage: React.FC = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');

  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-void via-shadow-veil to-deep-void relative">
      {/* LightRays Background Animation - Now covering the entire landing page */}
      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#fbbf24"
          raysSpeed={0.6}
          lightSpread={1.5}
          rayLength={3.0}
          pulsating={true}
          fadeDistance={1.5}
          saturation={1.3}
          followMouse={true}
          mouseInfluence={0.2}
          noiseAmount={0.05}
          distortion={0.03}
          className="w-full h-full"
        />
      </div>
      
      {/* Navigation - Positioned at the very top over everything */}
      <nav className="absolute top-0 left-0 right-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-cinzel font-bold text-astral-gold">
              ChronoArcana
            </h1>
            
            <div className="space-x-4">
              <Button
                variant="ghost"
                onClick={() => openAuthModal('signin')}
              >
                Sign In
              </Button>
              <Button
                variant="primary"
                onClick={() => openAuthModal('signup')}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero Section - Now positioned right below the navigation bar */}
      <section className="relative pt-20 pb-16 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-cinzel font-bold text-lunar-glow mb-8 leading-tight">
            Unveil Your
            <span className="text-astral-gold block">Daily Insights</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-lunar-glow opacity-95 mb-12 max-w-3xl mx-auto leading-relaxed">
            Track your daily Tarot card pulls, discover hidden patterns in your readings, 
            and embark on a profound journey of self-discovery with ChronoArcana.
          </p>
          
          <div className="space-y-4 sm:space-y-0 sm:space-x-6 sm:flex sm:justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => openAuthModal('signup')}
              className="animate-glow"
            >
              Begin Your Journey
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => openAuthModal('signin')}

            >
              Sign In
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-center text-lunar-glow mb-16">
            Your Mystical Companion
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-8 card">
              <div className="w-16 h-16 mx-auto mb-6 bg-astral-gold bg-opacity-20 rounded-full flex items-center justify-center">
                <Eye className="w-8 h-8 text-astral-gold" />
              </div>
              <h3 className="text-2xl font-cinzel font-semibold text-lunar-glow mb-4">
                Digital & Physical Pulls
              </h3>
              <p className="text-lunar-glow opacity-80 leading-relaxed">
                Draw cards digitally with our random selection or record your physical pulls. 
                Your practice, your way.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-8 card">
              <div className="w-16 h-16 mx-auto mb-6 bg-amethyst-dream bg-opacity-20 rounded-full flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-amethyst-dream" />
              </div>
              <h3 className="text-2xl font-cinzel font-semibold text-lunar-glow mb-4">
                Pattern Recognition
              </h3>
              <p className="text-lunar-glow opacity-80 leading-relaxed">
                Visualize your pull history with beautiful charts and discover the 
                recurring themes in your spiritual journey.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-8 card">
              <div className="w-16 h-16 mx-auto mb-6 bg-emerald-whisper bg-opacity-20 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-emerald-whisper" />
              </div>
              <h3 className="text-2xl font-cinzel font-semibold text-lunar-glow mb-4">
                Secure & Private
              </h3>
              <p className="text-lunar-glow opacity-80 leading-relaxed">
                Your personal reflections and readings are kept safe and private. 
                Your spiritual journey belongs to you.
              </p>
            </div>
          </div>
        </div>
      </section>      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-center text-lunar-glow mb-16">
            Choose Your Path
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className="card text-center">
              <h3 className="text-2xl font-cinzel font-semibold text-lunar-glow mb-4">
                Free Journey
              </h3>
              <div className="text-4xl font-bold text-astral-gold mb-6">
                $0<span className="text-lg text-lunar-glow opacity-70">/month</span>
              </div>
              <ul className="space-y-3 text-lunar-glow opacity-80 mb-8 text-left">
                <li>• Daily card pulls (digital & physical)</li>
                <li>• Personal notes and reflections</li>
                <li>• Basic analytics and patterns</li>
                <li>• {APP_CONFIG.FREE_TRIAL_DAYS} days of data retention</li>
                <li>• CSV data export</li>
              </ul>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => openAuthModal('signup')}
                className="w-full"
              >
                Start Free
              </Button>
            </div>

            {/* Premium Plan */}
            <div className="card text-center relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-astral-gold text-deep-void px-4 py-1 text-sm font-semibold rounded-full">
                  RECOMMENDED
                </span>
              </div>
              
              <h3 className="text-2xl font-cinzel font-semibold text-lunar-glow mb-4 mt-4">
                Premium Path
              </h3>
              <div className="text-4xl font-bold text-astral-gold mb-6">
                ${APP_CONFIG.PREMIUM_PRICE}<span className="text-lg text-lunar-glow opacity-70">/month</span>
              </div>
              <ul className="space-y-3 text-lunar-glow opacity-80 mb-8 text-left">
                <li>• Everything in Free Journey</li>
                <li>• <strong>Unlimited data retention</strong></li>
                <li>• Advanced analytics & insights</li>
                <li>• Priority customer support</li>
                <li>• Early access to new features</li>
              </ul>
              <Button
                variant="primary"
                size="lg"
                onClick={() => openAuthModal('signup')}
                className="w-full animate-glow"
              >
                Upgrade to Premium
              </Button>
            </div>
          </div>
        </div>
      </section>



      {/* Auth Modal */}
      <Modal
        isOpen={showAuthModal}
        onClose={() => {
          console.log('Auth modal closing');
          setShowAuthModal(false);
        }}
        size="md"
        className="z-50"
      >
        <AuthForms
          mode={authMode}
          onModeChange={setAuthMode}
          onSuccess={() => {
            console.log('Auth success callback triggered');
            setShowAuthModal(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default LandingPage;