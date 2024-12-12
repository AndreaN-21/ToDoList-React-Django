import {Navigate} from 'react-router-dom';
import {jwtDecode} from "jwt-decode"
import api from "../api"
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../constants"
import {useEffect, useState} from "react";


export default function ProtectedRoute({children}) {
 
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        checkAuth() 
    }, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        if (!refreshToken) {
            setIsAuthenticated(false);
            return;
        }
        try {
            const response = await api.post("/api/token/refresh/", {
                refresh: refreshToken
            });
            if (response.status !== 200) {
                setIsAuthenticated(false);
                return;
            }
            localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
            setIsAuthenticated(true);
        } catch (error) {
            console.error(error);
            setIsAuthenticated(false);
        } 
    }

    const checkAuth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 < Date.now()) {
                await refreshToken();
            }else 
                setIsAuthenticated(true);
            
        }
        else {
            setIsAuthenticated(false);
            return;
        } 
    }
 
    if(isAuthenticated === null){ 
        return <div>Loading...</div>
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
} 