import React, { useState, useEffect } from 'react';
import { Popover } from '@headlessui/react';
import { cookingTips } from '../data/cookingTips';

const TipOfTheDay: React.FC = () => {
  const [currentTip, setCurrentTip] = useState(cookingTips[0]);

  useEffect(() => {
    // Change tip every 24 hours
    const getRandomTip = () => {
      const randomIndex = Math.floor(Math.random() * cookingTips.length);
      setCurrentTip(cookingTips[randomIndex]);
    };

    // Set initial tip
    getRandomTip();

    // Change tip every 24 hours
    const interval = setInterval(getRandomTip, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Popover className="relative">
      <Popover.Button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
        <span className="text-xl">{currentTip.icon}</span>
        <span className="text-sm font-medium">Tip of the Day</span>
      </Popover.Button>

      <Popover.Panel className="absolute z-10 w-80 mt-2 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
        <div className="p-4">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">{currentTip.icon}</span>
            <div>
              <h3 className="text-sm font-medium text-gray-900">{currentTip.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{currentTip.content}</p>
              <span className="mt-2 inline-block text-xs text-porkchop-600">{currentTip.category}</span>
            </div>
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  );
};

export default TipOfTheDay; 