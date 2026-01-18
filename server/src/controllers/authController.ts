import { Request, Response } from 'express';
import { User } from '../models/User.js';
import { generateToken, AuthRequest } from '../middleware/auth.js';
import type { AuthResponse, PublicUser } from '@castle-combo/shared';

/**
 * Convert user document to public user
 */
function toPublicUser(user: { _id: unknown; username: string; email: string; gamesPlayed: number; gamesWon: number; totalScore: number; createdAt: Date }): PublicUser {
  return {
    id: String(user._id),
    username: user.username,
    email: user.email,
    gamesPlayed: user.gamesPlayed,
    gamesWon: user.gamesWon,
    totalScore: user.totalScore,
    createdAt: user.createdAt.getTime(),
  };
}

/**
 * Register a new user
 */
export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      res.status(400).json({
        success: false,
        error: 'Username, email, and password are required',
      } as AuthResponse);
      return;
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      const field = existingUser.email === email ? 'Email' : 'Username';
      res.status(400).json({
        success: false,
        error: `${field} already in use`,
      } as AuthResponse);
      return;
    }

    // Create new user
    const user = new User({
      username,
      email,
      password,
    });

    await user.save();

    // Generate token
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      user: toPublicUser(user),
      token,
    } as AuthResponse);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Registration failed',
    } as AuthResponse);
  }
}

/**
 * Login user
 */
export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      res.status(400).json({
        success: false,
        error: 'Email and password are required',
      } as AuthResponse);
      return;
    }

    // Find user by email (include password for comparison)
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      } as AuthResponse);
      return;
    }

    // Check password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      } as AuthResponse);
      return;
    }

    // Generate token
    const token = generateToken(user);

    res.json({
      success: true,
      user: toPublicUser(user),
      token,
    } as AuthResponse);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Login failed',
    } as AuthResponse);
  }
}

/**
 * Get current user profile
 */
export async function getProfile(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Not authenticated',
      } as AuthResponse);
      return;
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(404).json({
        success: false,
        error: 'User not found',
      } as AuthResponse);
      return;
    }

    res.json({
      success: true,
      user: toPublicUser(user),
    } as AuthResponse);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get profile',
    } as AuthResponse);
  }
}
