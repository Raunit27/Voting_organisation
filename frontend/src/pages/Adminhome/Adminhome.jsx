// AdminDashboard.js
import React, { useEffect } from 'react';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';

const AdminDashboard = () => {
    return (
        <div className="flex h-screen">
            <Sidebar /> {/* Sidebar will stay on the left side */}
            <div className="flex-1 p-4"> {/* Main content area */}
                <Dashboard />
            </div>
        </div>
    );
};

export default AdminDashboard;
