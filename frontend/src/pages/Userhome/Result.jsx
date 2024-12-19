import React from 'react';
import VoteCountResult from '../Adminhome/Components/VoteCountResult';
import { Link } from 'react-router-dom';

const Result = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-6">
            <div className="w-full max-w-3xl flex justify-start mb-6">
                <Link to="/userhome">
                    <button className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        Back to Home
                    </button>
                </Link>
            </div>
            <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
                
                <VoteCountResult />
            </div>
        </div>
    );
};

export default Result;
