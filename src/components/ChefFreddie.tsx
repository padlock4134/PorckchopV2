import React, { useState, useEffect } from 'react';
import { Recipe } from '../utils/recipeData';

interface Timer {
  id: string;
  name: string;
  duration: number;
  remaining: number;
  isRunning: boolean;
}

interface ChefFreddieProps {
  selectedRecipe: Recipe | null;
  isVisible: boolean;
  onClose: () => void;
}

const ChefFreddie: React.FC<ChefFreddieProps> = ({ selectedRecipe, isVisible, onClose }) => {
  const [customQuestion, setCustomQuestion] = useState('');
  const [timers, setTimers] = useState<Timer[]>([]);
  const [chefMessage, setChefMessage] = useState('');

  useEffect(() => {
    // Update running timers every second
    const interval = setInterval(() => {
      setTimers(prevTimers => 
        prevTimers.map(timer => {
          if (!timer.isRunning) return timer;
          const newRemaining = timer.remaining - 1;
          if (newRemaining <= 0) {
            // Timer completed
            handleTimerComplete(timer);
            return { ...timer, remaining: 0, isRunning: false };
          }
          return { ...timer, remaining: newRemaining };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleTimerComplete = (timer: Timer) => {
    setChefMessage(`Your ${timer.name} timer is done! 🔔`);
    // You could add sound notification here
  };

  const startNewTimer = (name: string, minutes: number) => {
    const duration = minutes * 60;
    const newTimer: Timer = {
      id: Date.now().toString(),
      name,
      duration,
      remaining: duration,
      isRunning: true
    };
    setTimers(prev => [...prev, newTimer]);
    setChefMessage(`I'll keep an eye on your ${name} for ${minutes} minutes! 👨‍🍳`);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    // Check if it's a timer request
    const timerMatch = customQuestion.match(/timer for (\d+)\s*(?:minute|min|m)/i);
    if (timerMatch) {
      const minutes = parseInt(timerMatch[1]);
      startNewTimer('Custom Timer', minutes);
    } else {
      // Handle other questions (to be implemented)
      setChefMessage("Let me help you with that! (Coming soon)");
    }
    setCustomQuestion('');
  };

  if (!isVisible || !selectedRecipe) return null;

  // Common cooking tips and timers based on recipe type
  const getSuggestedTimers = (recipe: Recipe) => {
    // Example timers - this would be customized based on actual recipe steps
    return [
      { name: "Rest Time", duration: 10 },
      { name: "Cooking Time", duration: 20 },
      { name: "Prep Time", duration: 5 }
    ];
  };

  return (
    <div 
      className={`fixed bottom-4 right-4 flex items-end gap-4 transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      {/* Speech Bubble */}
      <div className="max-w-sm bg-white rounded-2xl shadow-xl p-6 mb-2 relative border-2 border-porkchop-100">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-4">
          <h3 className="text-xl font-bold text-porkchop-900 mb-2">
            Chef Freddie at your service! 👨‍🍳
          </h3>
          {chefMessage && (
            <p className="text-sm text-porkchop-700 bg-porkchop-50 p-3 rounded-lg mb-3 animate-fade-in">
              {chefMessage}
            </p>
          )}
          <p className="text-sm text-gray-600">
            Ready to help you master {selectedRecipe.title}! Need a timer or have a question?
          </p>
        </div>

        {/* Active Timers */}
        {timers.length > 0 && (
          <div className="space-y-2 mb-4">
            {timers.map(timer => (
              <div 
                key={timer.id}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  timer.isRunning ? 'border-porkchop-300 bg-porkchop-50' : 'border-gray-200'
                }`}
              >
                <span className="text-sm font-medium text-porkchop-900">{timer.name}</span>
                <span className={`text-sm ${timer.isRunning ? 'text-porkchop-700' : 'text-gray-500'}`}>
                  {formatTime(timer.remaining)}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Suggested Timers */}
        <div className="space-y-2 mb-4">
          {getSuggestedTimers(selectedRecipe).map((timer, index) => (
            <button
              key={index}
              onClick={() => startNewTimer(timer.name, timer.duration)}
              className="w-full text-left px-4 py-3 text-sm rounded-xl hover:bg-porkchop-50 text-porkchop-700 transition-colors duration-200 border border-porkchop-100 hover:border-porkchop-200 hover:shadow-sm flex justify-between items-center"
            >
              <span>Set timer for {timer.name}</span>
              <span className="text-porkchop-500">{timer.duration}m</span>
            </button>
          ))}
        </div>

        {/* Custom Question/Timer Input */}
        <form onSubmit={handleSubmitQuestion} className="relative">
          <input
            type="text"
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            placeholder='Ask a question or "Timer for X minutes"'
            className="w-full px-4 py-2 pr-12 text-sm border-2 border-porkchop-100 rounded-xl focus:outline-none focus:border-porkchop-300 focus:ring-2 focus:ring-porkchop-100"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-porkchop-500 hover:text-porkchop-700 disabled:opacity-50"
            disabled={!customQuestion.trim()}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
        
        {/* Triangle pointer */}
        <div className="absolute -bottom-3 right-12 w-6 h-6 bg-white border-b-2 border-r-2 border-porkchop-100 transform rotate-45"></div>
      </div>

      {/* Chef Freddie Icon */}
      <div className="w-24 h-24 bg-porkchop-50 rounded-full shadow-xl border-2 border-porkchop-200 flex items-center justify-center overflow-hidden hover:scale-110 transition-transform duration-200 cursor-pointer p-3">
        <svg 
          viewBox="0 0 500 500" 
          className="w-full h-full text-porkchop-900"
          fill="currentColor"
        >
          <path d="M250 10c-132.3 0-240 107.7-240 240s107.7 240 240 240 240-107.7 240-240S382.3 10 250 10zm0 460c-121.5 0-220-98.5-220-220S128.5 30 250 30s220 98.5 220 220-98.5 220-220 220z"/>
          <path d="M250 70c-99.4 0-180 80.6-180 180s80.6 180 180 180 180-80.6 180-180S349.4 70 250 70zm0 340c-88.4 0-160-71.6-160-160s71.6-160 160-160 160 71.6 160 160-71.6 160-160 160z"/>
          <path d="M250 130c-66.3 0-120 53.7-120 120s53.7 120 120 120 120-53.7 120-120-53.7-120-120-120zm0 220c-55.2 0-100-44.8-100-100s44.8-100 100-100 100 44.8 100 100-44.8 100-100 100z"/>
          <path d="M250 190c-33.1 0-60 26.9-60 60s26.9 60 60 60 60-26.9 60-60-26.9-60-60-60zm0 100c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z"/>
          <path d="M250 250c0-11 9-20 20-20s20 9 20 20-9 20-20 20-20-9-20-20z"/>
          <path d="M190 250c0-11 9-20 20-20s20 9 20 20-9 20-20 20-20-9-20-20z"/>
          <path d="M220 290c0-11 9-20 20-20s20 9 20 20-9 20-20 20-20-9-20-20z"/>
          <path d="M280 290c0-11 9-20 20-20s20 9 20 20-9 20-20 20-20-9-20-20z"/>
          <path d="M310 250c0-11 9-20 20-20s20 9 20 20-9 20-20 20-20-9-20-20z"/>
          <path d="M250 310c-33.1 0-60 26.9-60 60s26.9 60 60 60 60-26.9 60-60-26.9-60-60-60zm0 100c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z"/>
        </svg>
      </div>
    </div>
  );
};

export default ChefFreddie; 