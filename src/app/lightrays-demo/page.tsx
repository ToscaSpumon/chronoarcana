'use client';

import React from 'react';
import LightRays from '@/components/background/LightRays';

const LightRaysDemoPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 relative">
      {/* Multiple LightRays with different configurations */}
      
      {/* Primary light rays from top */}
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
      
      {/* Secondary light rays from left */}
      <LightRays 
        raysOrigin="left"
        raysColor="#ec4899"
        raysSpeed={0.8}
        lightSpread={0.8}
        rayLength={1.8}
        pulsating={false}
        fadeDistance={0.8}
        saturation={0.9}
        followMouse={false}
        mouseInfluence={0}
        noiseAmount={0.05}
        distortion={0.02}
      />
      
      {/* Accent light rays from bottom-right */}
      <LightRays 
        raysOrigin="bottom-right"
        raysColor="#10b981"
        raysSpeed={1.2}
        lightSpread={1.5}
        rayLength={1.5}
        pulsating={true}
        fadeDistance={1.0}
        saturation={1.2}
        followMouse={true}
        mouseInfluence={0.08}
        noiseAmount={0.15}
        distortion={0.08}
      />
      
      {/* Content overlay */}
      <div className="relative z-10 flex items-center justify-center min-h-screen text-white">
        <div className="text-center max-w-4xl mx-auto px-4">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            LightRays Background
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            This demo showcases the LightRays component with multiple configurations. 
            Move your mouse around to see the interactive effects!
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
            <div className="bg-black bg-opacity-30 p-6 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-400 mb-3">Primary Rays</h3>
              <p className="text-gray-300 text-sm">
                Blue rays from top-center with mouse following, pulsating effect, and distortion
              </p>
            </div>
            
            <div className="bg-black bg-opacity-30 p-6 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-pink-400 mb-3">Secondary Rays</h3>
              <p className="text-gray-300 text-sm">
                Pink rays from left side, static with subtle noise and lower intensity
              </p>
            </div>
            
            <div className="bg-black bg-opacity-30 p-6 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-green-400 mb-3">Accent Rays</h3>
              <p className="text-gray-300 text-sm">
                Green rays from bottom-right with moderate mouse influence and pulsating
              </p>
            </div>
            
            <div className="bg-black bg-opacity-30 p-6 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-purple-400 mb-3">Interactive</h3>
              <p className="text-gray-300 text-sm">
                Move your mouse to see how the rays respond to your movement
              </p>
            </div>
          </div>
          
          <div className="mt-12">
            <a 
              href="/"
              className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LightRaysDemoPage;
