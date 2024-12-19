const express = require('express');
const routes = express.Router(); // Use Router() for defining routes
const Candidate = require('../models/candidate');
const User = require('../models/user');
const { jwtAuthMiddleware } = require('./../jwt');

// Middleware to check if user is an admin
const checkAdminRole = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user && user.role === "admin"; // Ensure user exists and check role
    } catch (error) {
        return false;
    }
};

// POST route to add a new candidate
routes.post('/', jwtAuthMiddleware, async (req, res) => {
    try {
        if (!await checkAdminRole(req.user.id)) {
            return res.status(403).json({ message: "Unauthorized access, you are not an admin" });
        }
        
        const newCandidate = new Candidate(req.body); // Create a new candidate instance
        const response = await newCandidate.save(); // Save candidate to database
        res.status(201).json({ message: "Candidate added successfully!", response });
    } catch (error) {
        console.error("Error adding candidate:", error); // Log error for debugging
        res.status(500).json({ err: error.message });
    }
});

// GET route to fetch all candidates
routes.get('/', async (req, res) => { // Changed to '/' to align with POST
    try {
        const candidates = await Candidate.find();
        res.status(200).json(candidates); // Respond with candidates
    } catch (error) {
        console.error('Error fetching candidates:', error); // Log error for debugging
        res.status(500).json({ err: 'Internal server error' });
    }
});

// PUT route to update a candidate
routes.put('/:candidateId', jwtAuthMiddleware, async (req, res) => {
    try {
        if (!await checkAdminRole(req.user.id)) {
            return res.status(403).json({ err: "Unauthorized access, you are not an admin" });
        }

        const candidateId = req.params.candidateId;
        const updatedCandidateData = req.body;

        const response = await Candidate.findByIdAndUpdate(candidateId, updatedCandidateData, {
            new: true,
            runValidators: true
        });
        
        if (!response) {
            return res.status(404).json({ err: "Candidate not found" });
        }
        
        res.status(200).json({ message: "Candidate updated successfully!", response });
    } catch (error) {
        console.error("Error updating candidate:", error); // Log error for debugging
        res.status(500).json({ err: "Internal server error" });
    }
});

// DELETE route to remove a candidate
routes.delete('/:candidateId', jwtAuthMiddleware, async (req, res) => {
    try {
        if (!await checkAdminRole(req.user.id)) {
            return res.status(403).json({ err: "Unauthorized access, you are not an admin" });
        }

        const candidateId = req.params.candidateId;
        const response = await Candidate.findByIdAndDelete(candidateId);
        
        if (!response) {
            return res.status(404).json({ err: "Candidate not found" });
        }
        
        res.status(200).json({ message: "Candidate deleted successfully!", response });
    } catch (error) {
        console.error("Error deleting candidate:", error); // Log error for debugging
        res.status(500).json({ err: "Internal server error" });
    }
});

// POST route for voting
routes.post('/vote/:candidateId', jwtAuthMiddleware, async (req, res) => {
    const candidateId = req.params.candidateId;
    const userID = req.user.id;

    try {
        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ err: "Candidate not found" });
        }

        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ err: "User not found" });
        }

        if (user.isVoted) {
            return res.status(403).json({ err: "You have already voted" });
        }
        if (user.role === 'admin') {
            return res.status(403).json({ err: "Admin is not allowed to vote" });
        }

        // Update candidate's votes and user's voting status
        candidate.vote.push({ user: userID });
        candidate.voteCount++;
        await candidate.save();
        user.isVoted = true;
        await user.save();

        res.status(200).json({ message: "Vote recorded successfully!" });
    } catch (error) {
        console.error("Error recording vote:", error); // Log error for debugging
        res.status(500).json({ err: "Internal server error" });
    }
});

// GET route for vote count
routes.get("/vote/count", async (req, res) => {
    try {
        const candidates = await Candidate.find().sort({ voteCount: 'desc' });
        const response = candidates.map((item) => ({
            partyName: item.party,
            voteCount: item.voteCount
        }));
        res.status(200).json({ response });
    } catch (error) {
        console.error("Error fetching vote counts:", error); // Log error for debugging
        res.status(500).json({ err: "Internal server error" });
    }
});

// DELETE route to remove a candidate
routes.delete('/delete/:candidateId', jwtAuthMiddleware, async (req, res) => {
    try {
        if (!await checkAdminRole(req.user.id)) {
            return res.status(403).json({ err: "Unauthorized access, you are not an admin" });
        }

        const candidateId = req.params.candidateId;
        const response = await Candidate.findByIdAndDelete(candidateId);
        
        if (!response) {
            return res.status(404).json({ err: "Candidate not found" });
        }
        
        res.status(200).json({ message: "Candidate deleted successfully!", response });
    } catch (error) {
        console.error("Error deleting candidate:", error); // Log error for debugging
        res.status(500).json({ err: "Internal server error" });
    }
});


module.exports = routes;
