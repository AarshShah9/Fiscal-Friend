import User from '../models/User';
import { Request, Response } from 'express';
import { createSecretToken } from '../utils/secretToken';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

export const register = async (req: Request, res: Response) => {
  try {

	if (!req.body.email || !req.body.password) {
		return res.status(400).json({ success: false, message: 'Missing email or password'});
	}
	if (!req.body.firstName && !req.body.lastName) {
		return res.status(400).json({ success: false, message: 'Missing name'});
	}

		// Check if user already exists
		const existingUser = await User.findOne({
			email: req.body.email,
		});
		if (existingUser) {
			return res.status(400).json({ 
				success: false, 
				error: 'User already exists'
			});
		}

		// Create new user
    const newUser = await User.create({
		email: req.body.email,
      	password: req.body.password,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
    });
		
	return res.status(201).json({
		success: true,
		message: 'User created successfully',
		user: newUser,
	});
		
  } catch (error) {
    console.error('Failed to create user:', error);
    return res.status(400).json({ error: 'Failed to create user' });
  }
};

export const login = async (req: Request, res: Response) => {
	try {
		if (!req.body.email || !req.body.password) {
			return res.status(400).json({ success: false, message: 'Missing email or password'});
		}

		const user = await User.findOne({ email: req.body.email });

		if (!user) {
			return res.status(400).json({ success: false, message: 'User not found' });
		}
		
		// Check if password is correct
		const passwordMatch = await bcrypt.compare(req.body.password, user.password);
		if (!passwordMatch) {
			return res.status(400).json({ success: false, message: 'Invalid password'} );
		}

		// Create a JWT token
		try {
			const token = createSecretToken(user._id);

			// Send token as cookie
			try {
				res.status(201).cookie("token", token).json({
					success: true,
					message: "Login successful",
				});
			} catch (error) {
				console.log("Error sending token as cookie", error);
				res.status(500).json({ message: 'Error sending token as cookie', error: error });
			}

		} catch (error) {
			console.log("Error creating token", error);
			res.status(500).json({ message: 'Error creating token', error: error });
		}
		

	} catch (error) {
		res.status(500).json({ message: 'Authentication failed', error: error });
	}
};

export const logout = async (req: Request, res: Response) => {
	try {
		req.body.user = null;
		res.status(201).clearCookie('token').json({ success: true, message: 'Logged out successfully' });
	} catch (error) {
		res.status(500).json({ message: 'Failed to logout', error: error });
	}
};

export const me = async (req: Request, res: Response) => {
	if(req.body.user) {
		return res.status(201).json({ success: true, message: 'User authenticated', user: req.body.user });
	}
	return res.status(400).json({ success: false, message: 'User not authenticated' });
};