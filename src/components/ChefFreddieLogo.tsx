import React from 'react';

interface ChefFreddieLogoProps {
  className?: string;
}

const ChefFreddieLogo: React.FC<ChefFreddieLogoProps> = ({ className = "w-full h-full" }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Circle background */}
    <circle cx="50" cy="50" r="48" fill="currentColor" className="text-white" />
    
    {/* Chef Hat */}
    <path
      d="M30 25h40c0 0 5-15-20-15s-20 15-20 15z"
      fill="currentColor"
      className="text-black"
    />
    
    {/* Chef Coat */}
    <path
      d="M20 60v25c0 0 15 10 30 10s30-10 30-10v-25c-5 15-25 20-30 20s-25-5-30-20z"
      fill="currentColor"
      className="text-gray-100"
    />
    <path
      d="M20 60v25c0 0 15 10 30 10s30-10 30-10v-25"
      stroke="currentColor"
      strokeWidth="2"
      className="text-gray-400"
    />
    
    {/* Pig Face */}
    <path
      d="M25 50c0-13.8 11.2-25 25-25s25 11.2 25 25-11.2 25-25 25S25 63.8 25 50z"
      fill="currentColor"
      className="text-pink-200"
    />
    
    {/* Eyes */}
    <circle cx="40" cy="45" r="5" fill="currentColor" className="text-black" />
    <circle cx="60" cy="45" r="5" fill="currentColor" className="text-black" />
    
    {/* Snout */}
    <circle cx="50" cy="55" r="8" fill="currentColor" className="text-pink-300" />
    <circle cx="47" cy="54" r="2" fill="currentColor" className="text-black" />
    <circle cx="53" cy="54" r="2" fill="currentColor" className="text-black" />
    
    {/* Bow Tie */}
    <path
      d="M45 65l5 5 5-5-5-5z"
      fill="currentColor"
      className="text-black"
    />
    
    {/* Chef Uniform Buttons */}
    <circle cx="50" cy="75" r="2" fill="currentColor" className="text-black" />
    <circle cx="50" cy="82" r="2" fill="currentColor" className="text-black" />
    
    {/* Spatula */}
    <path
      d="M70 40l15 10-5 5-15-10z"
      fill="currentColor"
      className="text-black"
    />
  </svg>
);

export default ChefFreddieLogo; 