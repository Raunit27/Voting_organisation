// Import mongoose
const mongoose = require('mongoose');

// Define the candidate schema
const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    party: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    aadharCardNumber: {
        type: String,
        required: true,
        unique: true
    },
    voterCardNumber: {
        type: String,
        required: true,
        unique: true
    },
    vote: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            votedAt: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    voteCount: {
        type: Number,
        default: 0
    }
});

// Create the candidate model
const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
