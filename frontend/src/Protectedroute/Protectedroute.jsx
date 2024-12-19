import React from 'react';
import { Navigate } from 'react-router-dom';

const Protectedroute = ({ children }) => {
    const token = localStorage.getItem('token'); // Check for token

    return token ? children : <Navigate to="/login" replace />;
};

export default Protectedroute;
