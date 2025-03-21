import React, { useState, KeyboardEvent, useEffect, useRef } from 'react';
import { useChefFreddie } from '../context/ChefFreddieContext';
import {
  findTipsByCategory,
  findSubstitutesForIngredient,
  getTechniqueByDifficulty,
  findSolutionsForProblem,
  getRecipeGuidelines,
  cookingTips,
  cookingTechniques,
  findTimingGuide,
  getFlavorPairings,
  getBestCookingMethod,
  getSeasonalPairings,
  flavorCombinations
} from '../utils/chefKnowledge';

interface ChefResponse {
  text: string;
  type: Message['type'];
  suggestedQuestions?: string[];
  additionalInfo?: {
    tips?: string[];
    solutions?: string[];
    techniques?: string[];
    examples?: string[];
    temperature?: string;
    equipment?: string[];
    pairings?: string[];
    avoidList?: string[];
    seasonalSuggestions?: string[];
  };
}

interface QueryAnalysis {
  type: Message['type'];
  keywords: string[];
  intent: string;
}

interface Message {
  text: string;
  from: 'user' | 'chef';
  type?: 'greeting' | 'help' | 'recipe' | 'general' | 'technique' | 'problem' | 'substitution' | 'timing' | 'pairing' | 'method';
  isTyping?: boolean;
  suggestedQuestions?: string[];
  additionalInfo?: {
    tips?: string[];
    solutions?: string[];
    techniques?: string[];
    examples?: string[];
    temperature?: string;
    equipment?: string[];
    pairings?: string[];
    avoidList?: string[];
    seasonalSuggestions?: string[];
  };
}

interface RouteFeature {
  name: string;
  suggestedQuestions: string[];
}

interface RouteContextBase {
  features: RouteFeature[];
}

const GlobalChefFreddie: React.FC = () => {
  const { isVisible, currentRecipe, currentRoute, getContextualHelp, getRouteContext } = useChefFreddie();
  const [showBubble, setShowBubble] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update initial message when context changes
  useEffect(() => {
    if (showBubble && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        const context = getRouteContext();
        setMessages([{ 
          text: getContextualHelp(),
          from: 'chef',
          type: 'greeting',
          suggestedQuestions: context.suggestedQuestions
        }]);
        setIsTyping(false);
      }, 1000);
    }
  }, [showBubble, currentRoute, currentRecipe]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const analyzeUserQuery = (text: string): QueryAnalysis => {
    const lowerText = text.toLowerCase();
    const words = lowerText.split(' ');

    // Check for timing questions
    if (lowerText.includes('how long') || lowerText.includes('time') || lowerText.includes('minutes')) {
      return {
        type: 'timing',
        keywords: words,
        intent: 'cooking_time'
      };
    }

    // Check for pairing questions
    if (lowerText.includes('pair') || lowerText.includes('goes with') || lowerText.includes('combine')) {
      return {
        type: 'pairing',
        keywords: words,
        intent: 'flavor_pairing'
      };
    }

    // Check for method questions
    if (lowerText.includes('best way') || lowerText.includes('how should') || lowerText.includes('method')) {
      return {
        type: 'method',
        keywords: words,
        intent: 'cooking_method'
      };
    }

    // Check for cooking problems
    if (lowerText.includes('problem') || lowerText.includes('help') || lowerText.includes('wrong')) {
      return {
        type: 'problem',
        keywords: words,
        intent: 'problem_solving'
      };
    }

    // Check for substitution requests
    if (lowerText.includes('substitute') || lowerText.includes('replace') || lowerText.includes('instead of')) {
      return {
        type: 'substitution',
        keywords: words,
        intent: 'ingredient_substitution'
      };
    }

    // Check for technique questions
    if (lowerText.includes('how to') || lowerText.includes('technique') || lowerText.includes('method')) {
      return {
        type: 'technique',
        keywords: words,
        intent: 'learn_technique'
      };
    }

    // Default response
    return {
      type: 'help',
      keywords: words,
      intent: 'general_help'
    };
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { text, from: 'user', type: 'general' }]);
    setInputValue('');
    setIsTyping(true);

    const processMessage = (): ChefResponse => {
      const { type, keywords, intent } = analyzeUserQuery(text);
      const routeContext = getRouteContext();
      const lowerText = text.toLowerCase();

      // Route-specific responses
      if (currentRoute === '/create-recipe') {
        if (lowerText.includes('title') || lowerText.includes('name')) {
          const guidelines = getRecipeGuidelines('Title');
          if (guidelines) {
            return {
              text: 'Here are some tips for creating a great recipe title:',
              type: 'help',
              suggestedQuestions: [
                'Show me examples',
                'What about the description?',
                'Help with ingredients'
              ],
              additionalInfo: {
                tips: guidelines.guidelines,
                examples: guidelines.examples
              }
            };
          }
        }
      }

      // Handle timing questions
      if (type === 'timing') {
        const foodItem = keywords.find(word => {
          const guide = findTimingGuide(word);
          return guide !== undefined;
        });

        if (foodItem) {
          const guide = findTimingGuide(foodItem);
          if (guide) {
            return {
              text: `Here's how to time your ${guide.item}:`,
              type: 'timing',
              suggestedQuestions: [
                'What temperature should I use?',
                'How do I know it\'s done?',
                'Any preparation tips?'
              ],
              additionalInfo: {
                tips: guide.tips,
                temperature: guide.temperature,
                examples: [`Cooking time: ${guide.time}`]
              }
            };
          }
        }
      }

      // Handle pairing questions
      if (type === 'pairing') {
        const ingredient = keywords.find(word => {
          const pairings = getFlavorPairings(word);
          return pairings !== undefined;
        });

        if (ingredient) {
          const pairings = getFlavorPairings(ingredient);
          if (pairings) {
            const currentSeason = getCurrentSeason();
            const seasonalPairings = getSeasonalPairings(ingredient, currentSeason);

            return {
              text: `Let me help you pair ${ingredient}:`,
              type: 'pairing',
              suggestedQuestions: [
                'What should I avoid?',
                'Show seasonal options',
                'Any classic combinations?'
              ],
              additionalInfo: {
                pairings: pairings.pairsWith,
                avoidList: pairings.avoidWith,
                seasonalSuggestions: seasonalPairings
              }
            };
          }
        }
      }

      // Handle method questions
      if (type === 'method') {
        const foodType = keywords.find(word => {
          const method = getBestCookingMethod(word);
          return method !== undefined;
        });

        if (foodType) {
          const method = getBestCookingMethod(foodType);
          if (method) {
            return {
              text: `The best way to cook ${foodType} is ${method.method}:`,
              type: 'method',
              suggestedQuestions: [
                'What equipment do I need?',
                'Show me the steps',
                'What temperature should I use?'
              ],
              additionalInfo: {
                tips: method.tips,
                equipment: method.equipment,
                temperature: method.temperature ? 
                  `Low: ${method.temperature.low}, Medium: ${method.temperature.medium}, High: ${method.temperature.high}` 
                  : undefined
              }
            };
          }
        }
      }

      // Handle problems and solutions
      if (type === 'problem') {
        const problem = findSolutionsForProblem(text);
        if (problem) {
          const relatedTips = problem.relatedTips
            .map(tipId => cookingTips.find(tip => tip.id === tipId))
            .filter(Boolean)
            .map(tip => tip!.description);

          return {
            text: `I can help you with that! Here are some solutions:`,
            type: 'problem' as const,
            suggestedQuestions: [
              'Tell me more about these solutions',
              'Any prevention tips?',
              'What else should I know?'
            ],
            additionalInfo: {
              solutions: problem.solutions,
              tips: relatedTips
            }
          };
        }
      }

      // Handle substitution requests
      if (type === 'substitution') {
        const ingredientWord = keywords.find(word => {
          const sub = findSubstitutesForIngredient(word);
          return sub !== undefined;
        });

        if (ingredientWord) {
          const substitution = findSubstitutesForIngredient(ingredientWord);
          if (substitution) {
            return {
              text: `Here are some substitutes for ${ingredientWord}:`,
              type: 'substitution' as const,
              suggestedQuestions: [
                'How do I use these substitutes?',
                'Which is the best option?',
                'Any other alternatives?'
              ],
              additionalInfo: {
                tips: substitution.substitutes.map(sub => 
                  `${sub.name} (${sub.ratio})${sub.notes ? ` - ${sub.notes}` : ''}`
                )
              }
            };
          }
        }
      }

      // Handle technique questions
      if (type === 'technique') {
        const technique = cookingTechniques.find(t => 
          keywords.some(word => t.name.toLowerCase().includes(word))
        );

        if (technique) {
          return {
            text: `Let me teach you about ${technique.name}:`,
            type: 'technique' as const,
            suggestedQuestions: [
              'What are common mistakes?',
              'Show me more tips',
              'What recipes use this technique?'
            ],
            additionalInfo: {
              tips: technique.tips,
              solutions: technique.commonMistakes
            }
          };
        }
      }

      // Feature-specific responses based on current route
      const featureMatch = routeContext.features.find(feature => 
        lowerText.includes(feature.name.toLowerCase())
      );

      if (featureMatch) {
        return {
          text: `Let me help you with ${featureMatch.name}. What specific aspect would you like to know more about?`,
          type: 'help',
          suggestedQuestions: featureMatch.suggestedQuestions
        };
      }

      // Default response with contextual suggestions
      return {
        text: "I'm here to help! Feel free to ask about cooking times, ingredient pairings, or best methods for cooking different foods.",
        type: 'general',
        suggestedQuestions: [
          'How long to cook chicken?',
          'What goes well with tomatoes?',
          'Best way to cook vegetables?'
        ]
      };
    };

    setTimeout(() => {
      const response = processMessage();
      setMessages(prev => [...prev, { ...response, from: 'chef' }]);
      setIsTyping(false);
    }, 1500);
  };

  // Helper function to get current season
  const getCurrentSeason = (): 'spring' | 'summer' | 'fall' | 'winter' => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'fall';
    return 'winter';
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage(inputValue);
    }
  };

  const handleCloseBubble = () => {
    setShowBubble(false);
    // Clear the message history and input when closing
    setMessages([]);
    setInputValue('');
    setIsTyping(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Speech Bubble */}
      {showBubble && (
        <div 
          className="absolute bottom-full mb-4 right-0 bg-white p-4 rounded-lg shadow-lg w-96 transform transition-all duration-200 ease-out"
          style={{ 
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
            animation: 'slideIn 0.3s ease-out'
          }}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-porkchop-900">Chef Freddie</h3>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleCloseBubble();
              }}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Container */}
          <div 
            id="messages-container"
            className="space-y-3 mb-3 max-h-96 overflow-y-auto scroll-smooth"
          >
            {messages.map((message, index) => (
              <div key={index} className="space-y-2">
                <div
                  className={`p-2 rounded-lg transform transition-all duration-200 ${
                    message.from === 'user'
                      ? 'bg-porkchop-100 text-porkchop-900 ml-4 animate-slideInRight'
                      : 'bg-gray-100 text-gray-800 mr-4 animate-slideInLeft'
                  }`}
                >
                  {message.text}
                  {message.additionalInfo && (
                    <div className="mt-2 space-y-2">
                      {message.additionalInfo.tips && (
                        <ul className="list-disc list-inside text-sm">
                          {message.additionalInfo.tips.map((tip, i) => (
                            <li key={i} className="text-gray-700">{tip}</li>
                          ))}
                        </ul>
                      )}
                      {message.additionalInfo.pairings && (
                        <div className="text-sm">
                          <p className="font-semibold">Great pairings:</p>
                          <p className="text-gray-700">{message.additionalInfo.pairings.join(', ')}</p>
                        </div>
                      )}
                      {message.additionalInfo.avoidList && (
                        <div className="text-sm">
                          <p className="font-semibold">Avoid combining with:</p>
                          <p className="text-gray-700">{message.additionalInfo.avoidList.join(', ')}</p>
                        </div>
                      )}
                      {message.additionalInfo.seasonalSuggestions && message.additionalInfo.seasonalSuggestions.length > 0 && (
                        <div className="text-sm">
                          <p className="font-semibold">Seasonal suggestions:</p>
                          <p className="text-gray-700">{message.additionalInfo.seasonalSuggestions.join(', ')}</p>
                        </div>
                      )}
                      {message.additionalInfo.equipment && (
                        <div className="text-sm">
                          <p className="font-semibold">Equipment needed:</p>
                          <p className="text-gray-700">{message.additionalInfo.equipment.join(', ')}</p>
                        </div>
                      )}
                      {message.additionalInfo.temperature && (
                        <div className="text-sm">
                          <p className="font-semibold">Temperature guide:</p>
                          <p className="text-gray-700">{message.additionalInfo.temperature}</p>
                        </div>
                      )}
                      {message.additionalInfo.examples && (
                        <div className="text-sm italic text-gray-600">
                          {message.additionalInfo.examples.join(', ')}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {message.from === 'chef' && message.suggestedQuestions && (
                  <div className="flex flex-wrap gap-2 ml-4">
                    {message.suggestedQuestions.map((question, qIndex) => (
                      <button
                        key={qIndex}
                        onClick={() => handleSuggestedQuestion(question)}
                        className="text-sm px-3 py-1 rounded-full bg-porkchop-50 text-porkchop-700 hover:bg-porkchop-100 transition-colors duration-200"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="bg-gray-100 text-gray-800 mr-4 p-2 rounded-lg animate-pulse">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={currentRecipe ? `Ask about ${currentRecipe.title}...` : "Ask Chef Freddie..."}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-porkchop-500 focus:border-transparent transition-all duration-200"
            />
            <button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim()}
              className="px-3 py-2 bg-porkchop-500 text-white rounded-md hover:bg-porkchop-600 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>

          {/* Triangle pointer */}
          <div 
            className="absolute bottom-0 right-8 transform translate-y-full"
            style={{
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '8px solid white'
            }}
          />
        </div>
      )}

      {/* Chef Freddie Icon */}
      <button
        onClick={() => setShowBubble(!showBubble)}
        className="bg-white rounded-full p-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        style={{
          animation: showBubble ? 'bounce 0.5s ease' : undefined
        }}
      >
        <svg
          className="w-16 h-16 text-porkchop-900"
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M250 10c-132.3 0-240 107.7-240 240s107.7 240 240 240 240-107.7 240-240S382.3 10 250 10zm0 460c-121.5 0-220-98.5-220-220S128.5 30 250 30s220 98.5 220 220-98.5 220-220 220z"
            fill="currentColor"
          />
          <path
            d="M250 150c-55.2 0-100 44.8-100 100s44.8 100 100 100 100-44.8 100-100-44.8-100-100-100zm0 180c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"
            fill="currentColor"
          />
          <circle cx="200" cy="200" r="20" fill="currentColor" />
          <circle cx="300" cy="200" r="20" fill="currentColor" />
          <path
            d="M250 280c-27.6 0-50 22.4-50 50h100c0-27.6-22.4-50-50-50z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  );
};

export default GlobalChefFreddie; 