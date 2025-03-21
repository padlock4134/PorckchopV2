import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Dashboard from './components/Dashboard';
import ProfilePage from './components/ProfilePage';
import CreateRecipe from './components/CreateRecipe';
import PricingPage from './components/PricingPage';
import SubscriptionManagement from './components/SubscriptionManagement';

// Protected route wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-porkchop-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/pricing" element={<PricingPage />} />

      {/* Protected routes */}
      <Route
        path="/create-recipe"
        element={
          <ProtectedRoute>
            <CreateRecipe />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/subscription"
        element={
          <ProtectedRoute>
            <SubscriptionManagement
              subscription={{
                id: 'sub_mock',
                status: 'active',
                currentPeriodEnd: '2024-04-01',
                trialEnd: null,
                cancelAtPeriodEnd: false
              }}
              paymentMethod={{
                id: 'pm_mock',
                brand: 'visa',
                last4: '4242',
                expMonth: 12,
                expYear: 2024
              }}
              customerId="cus_mock"
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          user ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};

export default AppRoutes; 