// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    // Check if a token exists on initial load
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (formData) => {
        try {
            const response = await axios.post('http://localhost:3000/user/login', formData);
            localStorage.setItem('token', response.data.token);
            setIsAuthenticated(true);
            setUserRole(response.data.user.role);

            // Navigate based on the user role
            if (response.data.user.role === 'voter') {
                navigate('/userhome');
            } else {
                setIsAuthenticated(false);
                setUserRole(null);
                alert('You are not a voter. Please register as a voter.');
            }
        } catch (error) {
            console.error('Login Error:', error.response?.data || error.message);
            alert('Invalid Voter ID or Password. Please try again.');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUserRole(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
