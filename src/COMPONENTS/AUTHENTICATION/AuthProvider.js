import React, {createContext,useState,useContext,useEffect} from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) =>{

    const[isAuthenticated,setIsAuthenticated] = useState(false);

    const login = (token) => {
        localStorage.setItem('token',token);
        setIsAuthenticated(true);
    }

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    }

    const checkAuth = () => {
        const token = localStorage.getItem('token');
        if(!token) {
            return false;
        }

        try{
            // THIS I NEED TO UNDERSTAND 
            const payload = JSON.parse(atob(token.split('.')[1]));
            const isExpired = payload.exp * 1000  < Date.now();
            return !isExpired;
        }
        catch(error){
            return false;
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const expiryTime = payload.exp * 1000 - Date.now();

            const timeout = setTimeout(() => {
                logout();
                alert("Session expired. Please log in again.");
            }, expiryTime);

            return () => clearTimeout(timeout);
        }
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, checkAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);