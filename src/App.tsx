import { AuthProvider } from "./context/AuthContext";
import { ChefFreddieProvider } from "./context/ChefFreddieContext";
import Navigation from "./components/Navigation";
import AppRoutes from "./components/AppRoutes";
import GlobalChefFreddie from "./components/GlobalChefFreddie";

function App() {
  return (
    <AuthProvider>
      <ChefFreddieProvider>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <AppRoutes />
          <GlobalChefFreddie />
        </div>
      </ChefFreddieProvider>
    </AuthProvider>
  );
}

export default App; 