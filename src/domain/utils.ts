import crypto from 'crypto';
import jwt from 'jsonwebtoken';

function generatePassHash (password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function generateToken (credentials: { username: string, password: string }): string {
  const secretKey: string = process.env.SECRET_KEY || 'secretKey';
  return jwt.sign(credentials, secretKey, { expiresIn: 300 });
}

export {
  generatePassHash,
  generateToken
};