import { AuthProvider } from "./context/AuthContext";
import { ChefFreddieProvider } from "./context/ChefFreddieContext";
import { SavedRecipesProvider } from "./context/SavedRecipesContext";
import Navigation from "./components/Navigation";
import AppRoutes from "./components/AppRoutes";
import GlobalChefFreddie from "./components/GlobalChefFreddie";
import CreateRecipeForm from './components/CreateRecipeForm';

function App() {
  return (
    <AuthProvider>
      <ChefFreddieProvider>
        <SavedRecipesProvider>
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <AppRoutes />
            <GlobalChefFreddie />
          </div>
        </SavedRecipesProvider>
      </ChefFreddieProvider>
    </AuthProvider>
  );
}

export default App; 