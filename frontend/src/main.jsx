import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { FourSquare } from "react-loading-indicators";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"; 
import "./index.css";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { useAuth, AuthProvider } from "./AuthContext.jsx";

const AuthWrapper = ({ children }) => {
  const { loading, token } = useAuth();


  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-200">
        <FourSquare color="#00FF7F" size="large" text="" textColor="" />
      </div>
    );
  }

  return token ? children : <Navigate to="/login" />; 
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <AuthWrapper>
        <App />
      </AuthWrapper>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);