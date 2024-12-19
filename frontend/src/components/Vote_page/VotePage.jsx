import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const VotePage = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isVoted, setIsVoted] = useState(false); // State to track if the user has voted

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get("http://localhost:3000/candidate");
        setCandidates(response.data);
      } catch (err) {
        setError("Failed to load candidates");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsVoted(res.data.isVoted); // Set the user's vote status
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    if (token) {
      fetchUser();
    }
  }, []);

  const handleVote = async (candidateId) => {
    setMessage(null); // Reset any previous messages
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token); // Log token to check if it's available

      if (!token) {
        setMessage("No token found. Please login.");
        return;
      }

      const response = await axios.post(
        `http://localhost:3000/candidate/vote/${candidateId}`, // Correct URL
        {}, // Empty body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in the header
          },
        }
      );

      setMessage(response.data.message); // Display success message
      setIsVoted(true); // Mark the user as voted after successful vote
    } catch (err) {
      console.error("Voting Error:", err); // Log the error for debugging
      if (err.response && err.response.data) {
        setMessage(err.response.data.err); // Display specific error from the backend
      } else {
        setMessage("An error occurred while voting");
      }
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading candidates...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 py-10">{error}</div>;
  }

  return (
    <div className="mx-auto w-full max-w-4xl p-5">
      <h1 className="text-2xl font-bold text-center mb-5">Candidates List</h1>
      <Link to="/userhome">
          <button className="mt-8 mb-4 p-3 text-white font-medium rounded bg-blue-500 hover:bg-blue-600">
            Back to Home
          </button>
        </Link>
      {message && (
        <div className="text-center mb-5">
          <p className="text-lg font-medium text-blue-600">{message}</p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {candidates.map((candidate) => (
          <div
            key={candidate._id} // Use _id as the unique identifier
            className="border rounded-lg p-4 shadow-md bg-white"
          >
            <h2 className="text-xl font-semibold">{candidate.name}</h2>
            <p className="text-gray-700">Party: {candidate.party}</p>
            <p className="text-gray-700">Age: {candidate.age}</p>

            <button
              className={`mt-3 w-full text-white ${
                isVoted ? "bg-gray-600" : "bg-blue-600"
              } hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5`}
              onClick={() => handleVote(candidate._id)} // Trigger voting API call
              disabled={isVoted} // Disable button if the user has voted
            >
              {isVoted ? "You have voted" : "Vote"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VotePage;
