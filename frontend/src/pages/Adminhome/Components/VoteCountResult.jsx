import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VoteCountResult() {
    const [candidates, setCandidates] = useState([]); // State for storing candidate data
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error handling
  
    // Fetch candidates from API when the component mounts
    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await axios.get('http://localhost:3000/candidate'); // API call to fetch candidates
                setCandidates(response.data);
            } catch (err) {
                console.error("Error fetching candidates:", err);
                setError('Failed to load candidates'); // Set error if API fails
            } finally {
                setLoading(false); // Update loading status after API call
            }
        };
    
        fetchCandidates(); // Call the fetch function
    }, []); // Empty dependency array ensures this runs once on component mount
  
    // Show loading indicator while data is being fetched
    if (loading) {
        return <div className="text-center py-6">Loading...</div>;
    }
  
    // Show error message if there's an error fetching data
    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }
  
    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 py-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Election Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl px-4">
                {candidates.map((candidate) => (
                    <div key={candidate._id} className="bg-white border rounded-lg shadow-md overflow-hidden">
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2">{candidate.name}</h3>
                            <p className="text-gray-700"><strong>Party:</strong> {candidate.party}</p>
                            <p className="text-gray-700"><strong>Age:</strong> {candidate.age}</p>
                            <p className="text-gray-700"><strong>Vote Count:</strong> {candidate.voteCount}</p> {/* Display vote count */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default VoteCountResult;
