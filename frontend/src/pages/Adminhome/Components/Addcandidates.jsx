import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddCandidateForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        party: '',
        age: '',
        aadharCardNumber: '',
        voterCardNumber: ''
    });
    const [errors, setErrors] = useState({});
    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validate = () => {
        const newErrors = {};
        const nameRegex = /^[A-Za-z\s]+$/;
        const aadharRegex = /^\d{12}$/;
        const voterRegex = /^[A-Z0-9]{10,}$/;

        if (!formData.name || !nameRegex.test(formData.name)) {
            newErrors.name = 'Name should only contain alphabets and spaces.';
        }
        if (!formData.party) {
            newErrors.party = 'Party name is required.';
        }
        if (!formData.age || formData.age < 25 || formData.age > 100) {
            newErrors.age = 'Age must be between 25 and 100.';
        }
        if (!formData.aadharCardNumber || !aadharRegex.test(formData.aadharCardNumber)) {
            newErrors.aadharCardNumber = 'Aadhar Card Number must be 12 digits.';
        }
        if (!formData.voterCardNumber || !voterRegex.test(formData.voterCardNumber)) {
            newErrors.voterCardNumber = 'Voter Card Number must be at least 10 alphanumeric characters.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const response = await axios.post(
                'http://localhost:3000/candidate',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            alert('Candidate added successfully!');
            setFormData({
                name: '',
                party: '',
                age: '',
                aadharCardNumber: '',
                voterCardNumber: ''
            });
            setErrors({});
        } catch (error) {
            console.error('Error adding candidate:', error.response ? error.response.data : error);
            alert('Error adding candidate. Please try again.');
        }
    };

    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <h2 className="text-3xl font-bold flex-1 text-center"></h2>
                <Link to="/admin_dashboard">
                    <button className="mt-8 mb-4 p-3 text-white font-medium rounded bg-blue-500 hover:bg-blue-600">
                        Back to Home
                    </button>
                </Link>
            </div>
            <div className="flex justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
                >
                    <h2 className="text-2xl font-bold mb-6 text-center">Add Candidate</h2>

                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                        {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Party</label>
                        <input
                            type="text"
                            name="party"
                            value={formData.party}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                        {errors.party && <p className="text-red-600 text-sm">{errors.party}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                        {errors.age && <p className="text-red-600 text-sm">{errors.age}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Aadhar Card Number</label>
                        <input
                            type="text"
                            name="aadharCardNumber"
                            value={formData.aadharCardNumber}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                        {errors.aadharCardNumber && (
                            <p className="text-red-600 text-sm">{errors.aadharCardNumber}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Voter Card Number</label>
                        <input
                            type="text"
                            name="voterCardNumber"
                            value={formData.voterCardNumber}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                        {errors.voterCardNumber && (
                            <p className="text-red-600 text-sm">{errors.voterCardNumber}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full text-white bg-orange-700 hover:bg-orange-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Add Candidate
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCandidateForm;
