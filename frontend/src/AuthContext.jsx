import { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            refreshAuth();
        } else {
            setLoading(false);
        }
    }, [token]);

    const refreshAuth = async () => {
        console.log("Refreshing auth token");
        try {
            const response = await axios.get("http://localhost:3000/auth/refresh", {
                withCredentials: true,
            });
            console.log("response");
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
        } catch (error) {
            console.error("Session expired or invalid.");
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, loading, logout, refreshAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}