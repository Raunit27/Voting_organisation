import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carosel from "../../components/Carousel/Carosel";
import axios from "axios";
import img1 from "../../assets/images/img_1.png";
import img2 from "../../assets/images/img_2.png";
import img3 from "../../assets/images/img_3.png";

function UserHome() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [toshowResult, setToshowResult] = useState(false); // Store the result visibility flag
  const navigate = useNavigate();

  // Fetch user profile data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);

        // Check if the user is admin and toshowResult is true
        if (res.data.role === 'voter' && res.data.toshowResult) {
          setToshowResult(true);  // Make the button clickable
        } else {
          setToshowResult(false); // Disable the button if not admin or toshowResult is false
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [token]);

  const images = [img1, img2, img3];

  return (
    <div className="mx-auto w-full max-w-7xl">
      <aside className="relative overflow-hidden text-black rounded-lg sm:mx-32 mx-4 sm:py-16 py-8">
        <div className="relative z-10 max-w-screen-xl px-4 sm:px-6 lg:px-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-12  bg-slate-200 pb-8 pt-8 rounded-lg">
          {/* User Information */}
          <div className="relative z-30 max-w-xl sm:mt-1 mt-8 text-left sm:ml-auto sm:bg-white sm:bg-opacity-75 sm:p-6 rounded-lg shadow-lg">
            <h4 className="text-2xl font-bold text-gray-800">User Information</h4>
            {user ? (
              <>
                <p className="text-xl">Name: {user.name}</p>
                <p className="text-xl">Aadhar: {user.aadharCardNumber}</p>
                <p className="text-xl">VoterId: {user.VoterID}</p>
                <p className="text-xl">Address: {user.address}</p>
                <p className="text-xl">Pincode: {user.pincode}</p>
              </>
            ) : (
              <p>Loading user information...</p>
            )}

            <button
              onClick={() => navigate("/userhome/vote", { replace: true })}
              className="w-full mt-5 text-white bg-orange-700 hover:bg-orange-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Click to Vote
            </button>

            {/* Result Button (only clickable if toshowResult is true for admin) */}
            <button
              onClick={() => navigate("/result", { replace: true })}
              disabled={!toshowResult} // Disable button if toshowResult is false
              className={`w-full mt-3 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ${toshowResult ? "bg-orange-700 hover:bg-orange-800" : "bg-gray-400 cursor-not-allowed"}`}
              title={toshowResult ? "Click to view results" : "Results are not available yet"}
              aria-disabled={!toshowResult}
            >
              Result
            </button>
          </div>

          {/* Carousel Section */}
          <div className="h-56 sm:h-64 2xl:h-96 sm:w-2/3 w-full flex justify-center items-center">
            <Carosel images={images} />
          </div>
        </div>

        {/* Logout Button */}
        <div className="flex justify-center items-center">
        <button
          onClick={() => {
            localStorage.removeItem("token"); // Remove the token from localStorage
            localStorage.removeItem("user");
            navigate("/", { replace: true }); // Redirect to the homepage or login page
          }}
          className=" text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-8"
        >
          Logout
        </button>
        </div>
      </aside>

      <h1 className="text-center text-xl sm:text-2xl py-10 font-semibold text-gray-700">
        "Choose the candidate who not only fits the role but also fuels the future."
      </h1>
    </div>
  );
}

export default UserHome;
