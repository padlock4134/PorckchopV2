import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SavedRecipesProvider } from './context/SavedRecipesContext';
import { ChefFreddieProvider } from './context/ChefFreddieContext';
import { useAuth } from './context/AuthContext';
import Navigation from './components/Navigation';
import Home from './components/Home';
import CreateRecipe from './components/CreateRecipe';
import MyCookbook from './components/MyCookbook';
import ButcherShop from './components/ButcherShop';
import ProfilePage from './components/ProfilePage';
import Login from './components/Login';
import Signup from './components/Signup';
import PrivateRoute from './components/PrivateRoute.tsx';
import GlobalChefFreddie from './components/GlobalChefFreddie';
import ChefsCorner from './components/ChefsCorner';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      {!isAuthPage && <Navigation />}
      <main className={!isAuthPage ? "pt-16" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/create-recipe"
            element={
              <PrivateRoute>
                <CreateRecipe />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-cookbook"
            element={
              <PrivateRoute>
                <MyCookbook />
              </PrivateRoute>
            }
          />
          <Route
            path="/butcher-shop"
            element={
              <PrivateRoute>
                <ButcherShop />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/chefs-corner"
            element={
              <PrivateRoute>
                <ChefsCorner />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      {!isAuthPage && <GlobalChefFreddie />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <SavedRecipesProvider>
        <ChefFreddieProvider>
          <AppContent />
        </ChefFreddieProvider>
      </SavedRecipesProvider>
    </AuthProvider>
  );
};

export default App; 