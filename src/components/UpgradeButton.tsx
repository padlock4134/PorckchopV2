import React from 'react';
import { useNavigate } from 'react-router-dom';

const UpgradeButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/pricing')}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      Upgrade to El Dente
    </button>
  );
};

export default UpgradeButton; 