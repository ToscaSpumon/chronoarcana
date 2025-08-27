import React from 'react';
import LightRays from './LightRays';

const LightRaysDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 relative">
      {/* Basic LightRays with default settings */}
      <LightRays 
        raysOrigin="top-center"
        raysColor="#4f46e5"
        raysSpeed={1.5}
        lightSpread={1.2}
        rayLength={2.5}
        pulsating={true}
        fadeDistance={1.2}
        saturation={1.1}
        followMouse={true}
        mouseInfluence={0.15}
        noiseAmount={0.1}
        distortion={0.05}
      />
      
      {/* Content overlay */}
      <div className="relative z-10 flex items-center justify-center min-h-screen text-white">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">LightRays Background</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            This is a demo of the LightRays component. Move your mouse around to see the interactive effects!
          </p>
        </div>
      </div>
    </div>
  );
};

export default LightRaysDemo;
