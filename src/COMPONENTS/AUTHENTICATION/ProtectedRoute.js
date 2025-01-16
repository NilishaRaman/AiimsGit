import React, { children } from "react";
import {useAuth} from './AuthProvider';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
     const {checkAuth} = useAuth();

     if(!checkAuth()){
        return <Navigate to="/login" />
     }

     return children;
}
      
export default ProtectedRoute;