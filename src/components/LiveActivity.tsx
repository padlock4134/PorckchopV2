import React from 'react';

interface Activity {
  id: string;
  user: {
    name: string;
    avatar: string;
    color: string;
  };
  action: string;
  timestamp: string;
}

const LiveActivity: React.FC = () => {
  // This would typically come from your backend
  const activities: Activity[] = [
    {
      id: '1',
      user: {
        name: 'Chef Sarah',
        avatar: '👩‍🍳',
        color: 'bg-pink-100'
      },
      action: 'Just created a new recipe: Mediterranean Pasta',
      timestamp: '2m ago'
    },
    {
      id: '2',
      user: {
        name: 'Chef Mike',
        avatar: '👨‍🍳',
        color: 'bg-blue-100'
      },
      action: 'Added a new collection: Quick Weeknight Dinners',
      timestamp: '5m ago'
    },
    {
      id: '3',
      user: {
        name: 'Chef Emma',
        avatar: '👩‍🍳',
        color: 'bg-green-100'
      },
      action: 'Shared a recipe: Homemade Pizza Dough',
      timestamp: '8m ago'
    }
  ];

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Live Activity</h2>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {activities.map((activity) => (
          <div 
            key={activity.id}
            className={`p-6 ${activity.id !== activities[0].id ? 'border-t border-gray-100' : ''}`}
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className={`w-12 h-12 rounded-full ${activity.user.color} flex items-center justify-center`}>
                  <span className="text-2xl">{activity.user.avatar}</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium">{activity.user.name}</p>
                <p className="text-gray-600">{activity.action}</p>
              </div>
              <div className="text-sm text-gray-500">{activity.timestamp}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveActivity; 