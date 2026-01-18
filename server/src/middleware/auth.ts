import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Socket } from 'socket.io';
import { config } from '../config/environment.js';
import { User, IUser } from '../models/User.js';

/**
 * JWT payload structure
 */
export interface JwtPayload {
  userId: string;
  username: string;
}

/**
 * Extended request with user
 */
export interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
  };
}

/**
 * Generate JWT token
 */
export function generateToken(user: IUser): string {
  const payload: JwtPayload = {
    userId: user._id.toString(),
    username: user.username,
  };

  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
}

/**
 * Verify JWT token
 */
export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, config.jwtSecret) as JwtPayload;
  } catch {
    return null;
  }
}

/**
 * Express middleware for authenticating requests
 */
export async function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    res.status(401).json({ error: 'Access token required' });
    return;
  }

  const payload = verifyToken(token);
  if (!payload) {
    res.status(403).json({ error: 'Invalid or expired token' });
    return;
  }

  // Verify user still exists
  const user = await User.findById(payload.userId);
  if (!user) {
    res.status(403).json({ error: 'User not found' });
    return;
  }

  req.user = {
    id: payload.userId,
    username: payload.username,
  };

  next();
}

/**
 * Socket.io middleware for authenticating connections
 */
export async function authenticateSocket(
  socket: Socket,
  next: (err?: Error) => void
): Promise<void> {
  const token = socket.handshake.auth['token'] as string | undefined;

  if (!token) {
    return next(new Error('Authentication token required'));
  }

  const payload = verifyToken(token);
  if (!payload) {
    return next(new Error('Invalid or expired token'));
  }

  // Verify user still exists
  const user = await User.findById(payload.userId);
  if (!user) {
    return next(new Error('User not found'));
  }

  // Attach user data to socket
  socket.data['userId'] = payload.userId;
  socket.data['username'] = payload.username;

  next();
}
