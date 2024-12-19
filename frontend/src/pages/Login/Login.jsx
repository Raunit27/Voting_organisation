import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        aadharCardNumber: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Clear session or credentials when entering the Home page
        localStorage.removeItem('token'); // Replace with your session key
        sessionStorage.clear();
        localStorage.removeItem('user');

        // Disable back navigation
        const handlePopState = (event) => {
            event.preventDefault();
            window.history.pushState(null, null, window.location.href);
        };

        window.history.pushState(null, null, window.location.href); // Push current state to history
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateAadharNumber = (number) => {
        const regex = /^\d{12}$/; // Aadhar card should have 12 digits
        return regex.test(number);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateAadharNumber(formData.aadharCardNumber)) {
            setErrorMessage('Invalid Aadhar Card Number. It should be 12 digits.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/user/login', formData);

            // Save token and user information in localStorage
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // Clear previous error messages
            setErrorMessage('');

            if (user?.role === 'voter') {
                if (user?.isVerified) {
                    console.log('Login successful for verified voter');
                    navigate('/userhome'); // Redirect to user home
                } else {
                    setErrorMessage('Your account is not verified. Please contact support.');
                }
            } else {
                setErrorMessage('You are not authorized as a voter. Please register.');
            }
        } catch (error) {
            const errorMsg =
                error.response?.data?.message ||
                'Login failed. Please check your credentials and try again.';
            setErrorMessage(errorMsg);
            console.error('Login Error:', errorMsg);
        }
    };

    return (
        <>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <h2 className="text-3xl font-bold flex-1 text-center"></h2>
                <Link to="/">
                    <button className="mt-4 mb-2 p-3 text-white font-medium rounded bg-blue-500 hover:bg-blue-600">
                        Back to Home
                    </button>
                </Link>
            </div>
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Voter Login</h2>

                <div className="mb-4">
                    <label className="block text-gray-700">Aadhar Card Number</label>
                    <input
                        type="text"
                        name="aadharCardNumber"
                        value={formData.aadharCardNumber}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        maxLength={12}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full text-white bg-orange-700 hover:bg-orange-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    Login
                </button>

                {errorMessage && (
                    <div className="mt-4 text-red-500 text-center">
                        {errorMessage}
                    </div>
                )}
            </form>
        </div>
        </>
    );
};

export default Login;
