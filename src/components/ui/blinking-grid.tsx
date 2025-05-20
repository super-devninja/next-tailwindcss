'use client';

import React from 'react';

export const BlinkingGrid = () => {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none bg-black">
      {/* Background Image */}
      <div 
        className="absolute right-40 top-40 w-1/2 h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/background_image.png)',
          opacity: 0.2,
          transform: 'scale(1.8)',
          transformOrigin: 'center left'
        }}
      />
    </div>
  );
}; 