import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Environment configuration
 */
export const config = {
  // Server
  port: parseInt(process.env['PORT'] || '3000', 10),
  nodeEnv: process.env['NODE_ENV'] || 'development',
  isDev: process.env['NODE_ENV'] !== 'production',

  // MongoDB
  mongodbUri: process.env['MONGODB_URI'] || 'mongodb://localhost:27017/castle_combo',

  // JWT
  jwtSecret: process.env['JWT_SECRET'] || 'dev-secret-change-in-production',
  jwtExpiresIn: process.env['JWT_EXPIRES_IN'] || '7d',

  // CORS
  clientUrl: process.env['CLIENT_URL'] || 'http://localhost:5173',
};

/**
 * Validate required environment variables
 */
export function validateEnv(): void {
  const required = ['MONGODB_URI', 'JWT_SECRET'];
  const missing: string[] = [];

  for (const key of required) {
    if (!process.env[key] && config.nodeEnv === 'production') {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}
