const express = require('express');
const routes = express.Router();
const User = require('../models/user');
const { jwtAuthMiddleware, generateToken } = require('./../jwt');

// Check if admin exists
const adminExists = async () => {
   try {
      const admin = await User.findOne({ role: 'admin' });
      return !admin; // Returns true if no admin exists
   } catch (error) {
      console.error('Error checking admin existence:', error);
      return false;
   }
};

// Add user (signup)
routes.post('/signup', async (req, res) => {
   try {
      const data = req.body;

      if (data.role === 'admin') {
         if (!await adminExists()) {
            return res.status(403).json({ error: 'Admin already exists' });
         }
      }

      const newUser = new User(data);
      const response = await newUser.save();

      const token = generateToken({ id: response.id });
      res.status(200).json({ response, token });
   } catch (err) {
      console.error('Error during signup:', err);
      res.status(500).json({ error: 'Internal server error' });
   }
});

// Login user
routes.post('/login', async (req, res) => {
   try {
      const { aadharCardNumber, password } = req.body;
      const user = await User.findOne({ aadharCardNumber });

      if (!user || !(await user.comparePassword(password))) {
         return res.status(401).json({ error: 'Invalid username or password' });
      }

      const token = generateToken({ id: user.id });
      res.status(200).json({
         token,
         user: {
            role: user.role,
            isVerified: user.isVerified
         }
      });
   } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal server error' });
   }
});

// Admin login
routes.post('/admin_login', async (req, res) => {
   try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user || !(await user.comparePassword(password))) {
         return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = generateToken({ id: user.id });
      res.status(200).json({
         token,
         user: {
            email: user.email,
            role: user.role
         }
      });
   } catch (error) {
      console.error('Error during admin login:', error);
      res.status(500).json({ error: 'Internal server error' });
   }
});

// Fetch profile
routes.get('/profile', jwtAuthMiddleware, async (req, res) => {
   try {
      const user = await User.findById(req.user.id);
      res.status(200).json(user);
   } catch (err) {
      console.error('Error fetching profile:', err);
      res.status(500).json({ error: 'Internal server error' });
   }
});

// Update password
routes.put('/profile/password', jwtAuthMiddleware, async (req, res) => {
   try {
      const userId = req.user.id;
      const { oldPassword, newPassword } = req.body;

      const user = await User.findById(userId);

      if (!(await user.comparePassword(oldPassword))) {
         return res.status(401).json({ error: 'Invalid old password' });
      }

      user.password = newPassword;
      await user.save();
      res.status(200).json({ message: 'Password updated successfully' });
   } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).json({ error: 'Internal server error' });
   }
});

// Fetch all users
routes.get('/users', async (req, res) => {
   try {
      const users = await User.find({}, { password: 0 });
      res.status(200).json(users);
   } catch (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Internal server error' });
   }
});

// Delete user
routes.delete('/delete/:id', async (req, res) => {
   const { id } = req.params;
   try {
      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
         return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ message: 'User deleted successfully' });
   } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal server error' });
   }
});

// Update user verification
routes.put('/verify/:id', async (req, res) => {
   const { id } = req.params;
   const { isVerified } = req.body;

   try {
      const user = await User.findByIdAndUpdate(
         id,
         { isVerified },
         { new: true }
      );

      if (!user) {
         return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ message: 'User verified successfully', user });
   } catch (error) {
      console.error('Error updating user verification:', error);
      res.status(500).json({ error: 'Internal server error' });
   }
});

// GET route to fetch `toshowResult` for the admin
routes.get('/admin/toshowresult', async (req, res) => {
   try {
      console.log('Fetching current toshowResult value for admin.');

      // Find the admin user
      const admin = await User.findOne({ role: 'admin' });

      // Handle case where admin user is not found
      if (!admin) {
         console.error('Admin user not found');
         return res.status(404).json({ error: 'Admin not found' });
      }

      res.status(200).json({
         message: 'Fetched toshowResult successfully',
         toshowResult: admin.toshowResult,
      });
   } catch (error) {
      console.error('Error fetching toshowResult:', error);
      res.status(500).json({ error: 'Internal server error' });
   }
});


// PUT route to update `toshowResult` for all users
routes.put('/admin/toshowresult', async (req, res) => {
   const { toshowResult } = req.body; // Extract `toshowResult` from the request body

   try {
      console.log('Incoming request to update toshowResult:', toshowResult);

      // Validate input
      if (typeof toshowResult !== 'boolean') {
         return res.status(400).json({ error: '`toshowResult` must be a boolean' });
      }

      // Update the `toshowResult` field for all users
      const result = await User.updateMany(
         {},                             // No condition to apply for users
         { $set: { toshowResult } },     // Set `toshowResult` to the value from the request body
         { multi: true }                 // Update multiple users
      );

      console.log('Update result:', result);

      // Respond with success
      res.status(200).json({ message: 'toshowResult updated for all users successfully' });
   } catch (error) {
      console.error('Error updating toshowResult:', error);
      res.status(500).json({ error: 'Failed to update toshowResult' });
   }
});




   
module.exports = routes;
