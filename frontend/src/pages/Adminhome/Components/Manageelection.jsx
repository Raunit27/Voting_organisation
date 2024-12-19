import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import VoteCountResult from "./VoteCountResult";

const ManageElection = () => {
    const [showResults, setShowResults] = useState(false); // Toggles results visibility
    const [toshowResult, setToShowResult] = useState(false); // Tracks `toshowResult` from the database
    const [loading, setLoading] = useState(false); // Loading state for API calls
    const token = localStorage.getItem("token"); // Token for authorization

    // Fetch the initial value of `toshowResult` from the backend
    useEffect(() => {
        const fetchToShowResult = async () => {
            try {
                setLoading(true);
                const res = await axios.get("http://localhost:3000/user/admin/toshowresult", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("API Response:", res.data.toshowResult); // Log the response
                setToShowResult(res.data.toshowResult == true); // Ensure boolean value

            } catch (error) {
                console.error("Error fetching toShowResult:", error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchToShowResult();
    }, [token]);

    // Toggle `toshowResult` in the database
    const handleToggleToShowResult = async () => {
        const newValue = !toshowResult;
        try {
            setLoading(true);
            const res = await axios.put(
                "http://localhost:3000/user/admin/toshowresult",
                { toshowResult: newValue }, // Send new value
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setToShowResult(res.data.toShowResult); // Update state after successful update
            // Reload the window after updating the `toshowResult`
            window.location.reload(); // Forces a reload of the window
            if (!newValue) setShowResults(false); // Hide results if `toshowResult` is set to false
        } catch (error) {
            console.error("Error updating toShowResult:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    // Show results button handler
    const handleShowResults = () => setShowResults(true);


    return (
        <div className="p-4 max-h-screen">
            <h1 className="text-2xl font-bold mb-4">Election Results Management</h1>
            <Link to="/admin_dashboard">
                <button className="mt-8 mb-4 p-3 text-white font-medium rounded bg-blue-500 hover:bg-blue-600">
                    Back to Home
                </button>
            </Link>

            <div className="flex items-center space-x-4">
                {/* Button to show results */}
                <button
                    onClick={handleShowResults}
                    className={`p-3 text-white font-medium rounded ${toshowResult
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-gray-400 cursor-not-allowed"
                        }`}
                    disabled={!toshowResult || loading} // Ensure this logic is correct
                >
                    {loading ? "Loading..." : "Show Results"}
                </button>


                {/* Button to toggle `toshowResult` */}
                <button
                    onClick={handleToggleToShowResult}
                    className={`p-3 text-white font-medium rounded ${toshowResult
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                        }`}
                    disabled={loading} // Disable during API call
                >
                    {loading
                        ? "Processing..."
                        : toshowResult
                            ? "Hide User Results"
                            : "Allow User Results"}
                </button>
            </div>

            {/* Conditionally render results */}
            {showResults && toshowResult && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-3">Election Results</h2>
                    <VoteCountResult /> {/* Display the VoteCountResult component */}
                </div>
            )}
        </div>
    );
};

export default ManageElection;
