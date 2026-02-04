import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/login.jsx";
import Signup from "./auth/signup.jsx";
import Dashboard from "./pages/dashboard.jsx";
import ProtectedRoute from "./routes/protectedroutes.jsx";
import { AuthProvider } from "./auth/authcontext.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
