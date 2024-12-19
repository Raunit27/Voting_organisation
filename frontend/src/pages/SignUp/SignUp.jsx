import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        email: '',
        mobile: '',
        address: '',
        pincode: '',
        VoterID: '',
        aadharCardNumber: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        if (!formData.name.trim()) return 'Name is required.';
        if (!formData.age || formData.age < 18) return 'Age must be at least 18.';
        if (!/^\S+@\S+\.\S+$/.test(formData.email)) return 'Invalid email address.';
        if (!/^\d{10}$/.test(formData.mobile)) return 'Mobile number must be 10 digits.';
        if (!formData.address.trim()) return 'Address is required.';
        if (!/^\d{6}$/.test(formData.pincode)) return 'Pincode must be 6 digits.';
        if (!/^[a-zA-Z0-9]{8,12}$/.test(formData.VoterID)) return 'Invalid Voter ID.';
        if (!/^\d{12}$/.test(formData.aadharCardNumber)) return 'Aadhar Card Number must be 12 digits.';
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10}$/.test(formData.VoterID)) 
            return 'Voter ID must be exactly 10 characters long and contain both alphabets and numbers.';
        if (formData.password.length < 6) return 'Password must be at least 6 characters.';
        if (formData.password !== formData.confirmPassword) return 'Passwords do not match.';
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        const validationError = validateForm();
        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await axios.post('http://localhost:3000/user/signup', formData);
            console.log('Response:', response.data);

            setSuccessMessage('Registration successful! Redirecting to the login page...');
            setTimeout(() => navigate('/login'), 3000);
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            setErrorMessage('An error occurred during registration. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md lg:max-w-2xl">
                <h2 className="text-2xl font-bold mb-6 text-center">Voter Registration</h2>

                {/* Input fields */}
                {[
                    { label: 'Name', name: 'name', type: 'text' },
                    { label: 'Age', name: 'age', type: 'number' },
                    { label: 'Email', name: 'email', type: 'email' },
                    { label: 'Mobile', name: 'mobile', type: 'text' },
                    { label: 'Address', name: 'address', type: 'text' },
                    { label: 'Pincode', name: 'pincode', type: 'text' },
                    { label: 'Voter ID', name: 'VoterID', type: 'text' },
                    { label: 'Aadhar Card Number', name: 'aadharCardNumber', type: 'text' },
                ].map((field) => (
                    <div className="mb-4" key={field.name}>
                        <label className="block text-gray-700">{field.label}</label>
                        <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg"
                            aria-label={field.label}
                            required
                        />
                    </div>
                ))}

                {/* Password fields with toggle */}
                {[
                    { label: 'Password', name: 'password' },
                    { label: 'Confirm Password', name: 'confirmPassword' },
                ].map((field) => (
                    <div className="mb-4 relative" key={field.name}>
                        <label className="block text-gray-700">{field.label}</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg"
                            aria-label={field.label}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                ))}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full text-white ${
                        isSubmitting ? 'bg-gray-500' : 'bg-orange-700 hover:bg-orange-800'
                    } font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                >
                    {isSubmitting ? 'Submitting...' : 'Register'}
                </button>

                {errorMessage && (
                    <div className="mt-4 text-red-500 text-center">
                        {errorMessage}
                    </div>
                )}

                {successMessage && (
                    <div className="mt-4 text-green-500 text-center">
                        {successMessage}
                    </div>
                )}
            </form>
        </div>
    );
};

export default SignUp;
