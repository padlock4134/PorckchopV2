import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SavedRecipesProvider } from './context/SavedRecipesContext';
import { ChefFreddieProvider } from './context/ChefFreddieContext';
import Navigation from './components/Navigation';
import Home from './components/Home';
import CreateRecipe from './components/CreateRecipe';
import MyCookbook from './components/MyCookbook';
import ButcherShop from './components/ButcherShop';
import ProfilePage from './components/ProfilePage';
import Login from './components/Login';
import Signup from './components/Signup';
import PrivateRoute from './components/PrivateRoute.tsx';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <SavedRecipesProvider>
        <ChefFreddieProvider>
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <main className="pt-16">
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
              </Routes>
            </main>
          </div>
        </ChefFreddieProvider>
      </SavedRecipesProvider>
    </AuthProvider>
  );
};

export default App; 