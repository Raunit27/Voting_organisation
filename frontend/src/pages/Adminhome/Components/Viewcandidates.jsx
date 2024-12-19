import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get('http://localhost:3000/candidate');
        setCandidates(response.data);
      } catch (err) {
        console.error("Error fetching candidates:", err);
        setError('Failed to load candidates');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const handleDelete = async (candidateId) => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      try {
        await axios.delete(`http://localhost:3000/candidate/${candidateId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setCandidates((prevCandidates) =>
          prevCandidates.filter((candidate) => candidate._id !== candidateId)
        );
        alert('Candidate deleted successfully!');
      } catch (error) {
        console.error('Error deleting candidate:', error);
        alert('Failed to delete the candidate. Please try again.');
      }
    }
  };

  if (loading) {
    return <div className="text-center py-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="mb-16 bg-slate-200 p-8 rounded-md mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold flex-1 text-center">View Candidates</h2>
        <Link to="/admin_dashboard">
          <button className="mt-8 mb-4 p-3 text-white font-medium rounded bg-blue-500 hover:bg-blue-600">
            Back to Home
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl px-4">
        {candidates.map((candidate) => (
          <div key={candidate._id} className="bg-white border rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{candidate.name}</h3>
              <p className="text-gray-700"><strong>Party:</strong> {candidate.party}</p>
              <p className="text-gray-700"><strong>Age:</strong> {candidate.age}</p>
              <p className="text-gray-700"><strong>Aadhar Card Number:</strong> {candidate.aadharCardNumber}</p>
              <p className="text-gray-700"><strong>Voter Card Number:</strong> {candidate.voterCardNumber}</p>
              <div className='flex justify-center mt-4'>
              <button
                onClick={() => handleDelete(candidate._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewCandidates;
