// Sidebar.js
import { Button } from 'flowbite-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    return (
        <aside className="w-64 bg-white h-full shadow-md fixed lg:relative lg:flex lg:flex-col lg:w-64 lg:h-auto transition-transform transform -translate-x-full lg:translate-x-0">
            <div className="p-6">
                <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>
                <nav className="space-y-2">
                    <Link to="/add-candidate" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                        <span>Add Candidate</span>
                    </Link>

                    <Link to="/view-candidate" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                        <span>View Candidate</span>
                    </Link>
                    <Link to="/register-voters" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                        <span>Register Voters</span>
                    </Link>
                    <Link to="/verified-voters" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                        <span>Verified Voters</span>
                    </Link>
                    <Link to="/manage-elections" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                        <span>Manage Election</span>
                    </Link>
                    <Link to="/dashboard-analysis" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                        <span>Dashboard Analysis</span>
                    </Link>
                </nav>
                <Button className='bg-red-600 mt-8'
                 onClick={() => {
                    localStorage.removeItem('token'); // Remove the token from localStorage
                    localStorage.removeItem('user');
                    navigate('/', { replace: true }); // Redirect to the homepage or login page
                    window.location.reload();
                }}>
                        Logout
                    </Button>
            </div>
        </aside>
    );
};

export default Sidebar;
