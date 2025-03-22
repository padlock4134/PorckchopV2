import React, { useState, useEffect } from 'react';
import { Popover } from '@headlessui/react';
import { cookingTips } from '../data/cookingTips';

const TipOfTheDay: React.FC = () => {
  const [currentTip, setCurrentTip] = useState(cookingTips[0]);

  useEffect(() => {
    const getRandomTip = () => {
      const randomIndex = Math.floor(Math.random() * cookingTips.length);
      return cookingTips[randomIndex];
    };

    const checkAndUpdateTip = () => {
      const now = new Date();
      const lastTipDate = localStorage.getItem('lastTipDate');
      const lastTipIndex = localStorage.getItem('lastTipIndex');

      // If no last tip date or it's a different day, update the tip
      if (!lastTipDate || new Date(lastTipDate).getDate() !== now.getDate()) {
        const newTip = getRandomTip();
        const newTipIndex = cookingTips.findIndex(tip => tip === newTip);
        
        // Store the new tip date and index
        localStorage.setItem('lastTipDate', now.toISOString());
        localStorage.setItem('lastTipIndex', newTipIndex.toString());
        
        setCurrentTip(newTip);
      } else if (lastTipIndex) {
        // If it's the same day, use the stored tip
        setCurrentTip(cookingTips[parseInt(lastTipIndex)]);
      }
    };

    // Check and update tip on component mount
    checkAndUpdateTip();

    // Set up interval to check for midnight
    const checkForMidnight = () => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        checkAndUpdateTip();
      }
    };

    // Check every minute for midnight
    const interval = setInterval(checkForMidnight, 60 * 1000);

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