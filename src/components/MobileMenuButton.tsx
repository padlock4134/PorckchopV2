import React from 'react';

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center p-2 rounded-md text-porkchop-500 hover:text-porkchop-900 hover:bg-porkchop-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-porkchop-500"
      aria-expanded={isOpen}
    >
      <span className="sr-only">Open main menu</span>
      {/* Icon when menu is closed */}
      <svg
        className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
      {/* Icon when menu is open */}
      <svg
        className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
};

export default MobileMenuButton; 