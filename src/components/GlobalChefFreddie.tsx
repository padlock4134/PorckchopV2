import React, { useState, KeyboardEvent, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import ChefFreddieLogo from './ChefFreddieLogo';

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
  const { 
    isVisible, 
    currentRecipe, 
    recommendedRecipe,
    currentRoute, 
    getContextualHelp, 
    getRouteContext,
    getRecipeContext 
  } = useChefFreddie();
  const [showBubble, setShowBubble] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update initial message when context changes or when recommended recipe changes
  useEffect(() => {
    if (showBubble) {
      setIsTyping(true);
      setTimeout(() => {
        const context = getRouteContext();
        const recipeContext = getRecipeContext();
        
        // Clear existing messages
        setMessages([{ 
          text: recipeContext ? getContextualHelp() : context.description,
          from: 'chef',
          type: 'greeting',
          suggestedQuestions: recipeContext ? recipeContext.suggestedQuestions : context.suggestedQuestions
        }]);
        setIsTyping(false);
      }, 1000);
    }
  }, [showBubble, currentRoute, currentRecipe, recommendedRecipe]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isVisible && (currentRecipe || recommendedRecipe)) {
      // Automatically show the bubble when a recipe is selected
      setShowBubble(true);
      setIsTyping(true);
      setTimeout(() => {
        const recipeContext = getRecipeContext();
        // Clear existing messages and set new recipe-specific message
        setMessages([{ 
          text: getContextualHelp(),
          from: 'chef',
          type: 'recipe',
          suggestedQuestions: recipeContext?.suggestedQuestions || []
        }]);
        setIsTyping(false);
      }, 500); // Reduced delay for faster response
    }
  }, [isVisible, currentRecipe, recommendedRecipe]);

  const handleCloseBubble = () => {
    setShowBubble(false);
    // Clear the message history and input when closing
    setMessages([]);
    setInputValue('');
    setIsTyping(false);
  };

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

  const bubbleVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 400, // Increased stiffness for snappier animation
        damping: 20,    // Reduced damping for more bounce
        duration: 0.5   // Faster overall animation
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  const typingIndicatorVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.2, 1],
      transition: { duration: 0.6, repeat: Infinity }
    }
  };

  // Add a bounce animation for the Chef Freddie icon when a recipe is selected
  const iconVariants = {
    normal: { scale: 1 },
    selected: {
      scale: [1, 1.2, 1],
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 0.5,
        times: [0, 0.2, 0.4, 0.6, 0.8]
      }
    }
  };

  return isVisible ? (
    <AnimatePresence>
      {showBubble && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-24 right-4 w-96 bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200"
        >
          <div className="bg-pink-100 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8">
                <ChefFreddieLogo />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Chef Freddie</h3>
            </div>
            <button
              onClick={() => setShowBubble(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            <AnimatePresence mode="popLayout">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  {message.from === 'chef' && (
                    <div className="w-8 h-8 mr-2 flex-shrink-0">
                      <ChefFreddieLogo />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.from === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm sm:text-base leading-relaxed">{message.text}</p>
                    {message.additionalInfo && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3 pt-3 border-t border-gray-200/20"
                      >
                        {message.additionalInfo.tips && (
                          <div className="text-sm space-y-2">
                            <p className={`font-medium ${message.from === 'user' ? 'text-white' : 'text-gray-700'}`}>
                              Tips:
                            </p>
                            <ul className="list-disc list-inside space-y-1.5">
                              {message.additionalInfo.tips.map((tip, i) => (
                                <li key={i} className={message.from === 'user' ? 'text-white/90' : 'text-gray-600'}>
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {message.additionalInfo.examples && (
                          <div className="mt-2 text-sm">
                            {message.additionalInfo.examples.map((example, i) => (
                              <p key={i} className={message.from === 'user' ? 'text-white/90' : 'text-gray-600'}>
                                {example}
                              </p>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                    {message.suggestedQuestions && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="mt-3 pt-3 border-t border-gray-200/20 space-y-2"
                      >
                        <p className={`text-sm font-medium ${message.from === 'user' ? 'text-white' : 'text-gray-700'}`}>
                          Suggested questions:
                        </p>
                        <div className="space-y-1">
                          {message.suggestedQuestions.map((question, i) => (
                            <button
                              key={i}
                              onClick={() => handleSuggestedQuestion(question)}
                              className={`block text-sm text-left w-full px-3 py-2.5 rounded-lg transition-colors ${
                                message.from === 'user'
                                  ? 'hover:bg-blue-600/50 active:bg-blue-600/70 text-white/90'
                                  : 'hover:bg-gray-100 active:bg-gray-200 text-gray-600'
                              }`}
                            >
                              {question}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex items-end space-x-2"
                >
                  <div className="w-10 h-10 rounded-full bg-white flex-shrink-0 flex items-center justify-center p-1.5 shadow-sm">
                    <ChefFreddieLogo />
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className="flex space-x-2">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          variants={typingIndicatorVariants}
                          initial="initial"
                          animate="animate"
                          className="w-2 h-2 bg-blue-400 rounded-full"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="sticky bottom-0 p-4 bg-white border-t border-gray-100 shadow-sm">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Chef Freddie anything..."
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
              />
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSendMessage(inputValue)}
                className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 active:bg-blue-700 transition-colors shadow-sm"
              >
                <span className="sr-only">Send message</span>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
      <motion.button
        onClick={() => setShowBubble(!showBubble)}
        className="fixed bottom-4 right-4 z-50 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={currentRecipe || recommendedRecipe ? "selected" : "normal"}
        variants={iconVariants}
      >
        <div className="relative w-16 h-16">
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={false}
            animate={showBubble ? { opacity: 1 } : { opacity: 0 }}
          >
            <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute inset-0 flex items-center justify-center p-2"
            initial={false}
            animate={showBubble ? { opacity: 0 } : { opacity: 1 }}
          >
            <ChefFreddieLogo />
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                transition: { duration: 2, repeat: Infinity }
              }}
            />
          </motion.div>
        </div>
      </motion.button>
    </AnimatePresence>
  ) : null;
};

export default GlobalChefFreddie; 