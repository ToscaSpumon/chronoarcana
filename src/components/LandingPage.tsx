'use client';

import React, { useState } from 'react';
import { Eye, TrendingUp, Shield } from 'lucide-react';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import AuthForms from '@/components/auth/AuthForms';
import { APP_CONFIG } from '@/utils/constants';
import LightRays from '@/components/background/LightRays';

const LandingPage: React.FC = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');

  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen relative">
      {/* LightRays Background Effects */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-deep-void via-deep-void to-deep-void">
        <LightRays 
          raysOrigin="top-center"
          raysColor="#fbbf24"
          raysSpeed={0.6}
          lightSpread={1.3}
          rayLength={2.2}
          pulsating={true}
          fadeDistance={1.1}
          saturation={1.1}
          followMouse={true}
          mouseInfluence={0.12}
          noiseAmount={0.08}
          distortion={0.03}
        />
        
        <LightRays 
          raysOrigin="left"
          raysColor="#a855f7"
          raysSpeed={0.45}
          lightSpread={0.9}
          rayLength={1.8}
          pulsating={false}
          fadeDistance={0.9}
          saturation={0.95}
          followMouse={false}
          mouseInfluence={0}
          noiseAmount={0.05}
          distortion={0.02}
        />
        
        <LightRays 
          raysOrigin="bottom-right"
          raysColor="#10b981"
          raysSpeed={0.55}
          lightSpread={1.1}
          rayLength={1.6}
          pulsating={true}
          fadeDistance={1.0}
          saturation={1.05}
          followMouse={true}
          mouseInfluence={0.08}
          noiseAmount={0.06}
          distortion={0.04}
        />
      </div>

      {/* Navigation */}
      <nav className="border-b border-midnight-aura border-opacity-30">
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

      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          
          <h1 className="text-5xl md:text-7xl font-cinzel font-bold text-lunar-glow mb-8 leading-tight">
            Unveil Your
            <span className="text-astral-gold block">Daily Insights</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-lunar-glow opacity-90 mb-12 max-w-3xl mx-auto leading-relaxed">
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
      </section>      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-center text-lunar-glow mb-16">
            Your Mystical Companion
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-8 card">
              <div className="w-16 h-16 mx-auto mb-6 bg-astral-gold bg-opacity-10 rounded-full flex items-center justify-center backdrop-blur-sm">
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
              <div className="w-16 h-16 mx-auto mb-6 bg-amethyst-dream bg-opacity-10 rounded-full flex items-center justify-center backdrop-blur-sm">
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
              <div className="w-16 h-16 mx-auto mb-6 bg-emerald-whisper bg-opacity-10 rounded-full flex items-center justify-center backdrop-blur-sm">
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
      <section className="py-16 px-4 sm:px-6 lg:px-8">
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
            <div className="card text-center border-2 border-astral-gold relative">
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

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-lunar-glow mb-8">
            Begin Your Journey Today
          </h2>
          <p className="text-xl text-lunar-glow opacity-90 mb-12">
            Join thousands of spiritual seekers who have discovered deeper insights 
            through their daily Tarot practice.
          </p>
          
          <Button
            variant="primary"
            size="lg"
            onClick={() => openAuthModal('signup')}
            className="animate-glow"
          >
            Start Your Free Journey
          </Button>
        </div>
      </section>

      {/* Auth Modal */}
      <Modal
        className="z-50"
        isOpen={showAuthModal}
        onClose={() => {
          console.log('Auth modal closing');
          setShowAuthModal(false);
        }}
        size="md"
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