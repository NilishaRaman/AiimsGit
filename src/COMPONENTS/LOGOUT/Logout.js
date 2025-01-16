import React from "react"; 
import { useAuth } from "../AUTHENTICATION/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const LogoutButton = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return <a className="fa fa-sign-out" onClick={handleLogout} style={{color: "#f00000",}}></a>;
};

export default LogoutButton;