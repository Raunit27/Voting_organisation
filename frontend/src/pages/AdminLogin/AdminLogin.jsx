import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/user/admin_login', formData);
            console.log('Login Response:', response.data);

            // Save the token in localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user',JSON.stringify(response.data.user));
            // Clear any previous error messages
            setErrorMessage('');

            // Check the role and navigate accordingly
            if (response.data.user.role === 'admin') {
                navigate('/admin_dashboard',{replace:true});
                window.location.reload();
            } else {
                setErrorMessage('You are not admin');
            }

           

        } catch (error) {
            console.error('Login Error:', error.response?.data || error.message);
            // Display an error message if login fails
            setErrorMessage('Invalid email or password. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md lg:max-w-lg"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Admin  Login</h2>

                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
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
    );
};

export default Login;
