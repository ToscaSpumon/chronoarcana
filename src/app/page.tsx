'use client';

import { useAuth } from '@/contexts/AuthContext';
import LandingPage from '@/components/LandingPage';
import Dashboard from '@/components/Dashboard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import TiltedCard from '@/components/daily_pull/TiltedCard';
import { useEffect } from 'react';

export default function Home() {
  const { user, userProfile, loading } = useAuth();

  // Debug logging
  useEffect(() => {
    console.log('Auth state changed:', { user: !!user, userProfile: !!userProfile, loading });
  }, [user, userProfile, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  // Ensure we have both user and userProfile before showing dashboard
  if (user && userProfile) {
    return <Dashboard />;
  }

  return (
    <main>
      <LandingPage />
      
      {/* TiltedCard Demo Section */}
      <section className="py-16 bg-gradient-to-b from-deep-void to-shadow-veil">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-cinzel font-bold text-lunar-glow mb-4">
              Experience the Magic
            </h2>
            <p className="text-xl text-lunar-glow opacity-80 max-w-2xl mx-auto">
              Discover your daily tarot card with our interactive 3D tilt effect. 
              Move your mouse over the cards to see them come to life.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Sample Card 1 */}
            <div className="flex justify-center">
              <TiltedCard
                imageSrc="/assets/tarot_decks/rider_waite/0.jpg"
                altText="The Fool"
                captionText="The Fool - Major Arcana"
                containerHeight="300px"
                containerWidth="200px"
                imageHeight="300px"
                imageWidth="200px"
                scaleOnHover={1.05}
                rotateAmplitude={15}
                showMobileWarning={true}
                showTooltip={true}
              />
            </div>
            
            {/* Sample Card 2 */}
            <div className="flex justify-center">
              <TiltedCard
                imageSrc="/assets/tarot_decks/rider_waite/1.jpg"
                altText="The Magician"
                captionText="The Magician - Major Arcana"
                containerHeight="300px"
                containerWidth="200px"
                imageHeight="300px"
                imageWidth="200px"
                scaleOnHover={1.05}
                rotateAmplitude={15}
                showMobileWarning={true}
                showTooltip={true}
              />
            </div>
            
            {/* Sample Card 3 */}
            <div className="flex justify-center">
              <TiltedCard
                imageSrc="/assets/tarot_decks/rider_waite/2.jpg"
                altText="The High Priestess"
                captionText="The High Priestess - Major Arcana"
                containerHeight="300px"
                containerWidth="200px"
                imageHeight="300px"
                imageWidth="200px"
                scaleOnHover={1.05}
                rotateAmplitude={15}
                showMobileWarning={true}
                showTooltip={true}
              />
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lunar-glow opacity-70 text-sm">
              ✨ Hover over the cards to experience the interactive 3D effect ✨
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
