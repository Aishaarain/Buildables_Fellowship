
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config(); 
import { JWT_SECRET } from '../env.js';

// Middleware to protect routes
export const AuthMiddleware = (req, res, next) => {

  const authHeader = req.cookie.token;

  // if (!authHeader || !authHeader.startsWith('Bearer ')) {
  //   return res.status(401).json({ error: 'Unauthorized: No token provided' });
  // }

  const token = authHeader.split(' ')[1];   // in jwt token there is beare and then jwttoken so to add only token value we use index 1 value which is token
   if(!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next();
  } catch (err) {
    console.error('JWT error:', err.message);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Function to generate JWT
export const generateToken = (userData) => {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is undefined!');
  }

  const payload = {
    id: userData.id,
    username: userData.username,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: 30000 });
};

export default AuthMiddleware;
