import crypto from 'crypto';
import { sign } from 'jsonwebtoken';

function generatePassHash (password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function generateToken (credentials: { userId: string, username: string, password: string }): string {
  const secretKey: string = process.env.SECRET_KEY as string;
  return sign(credentials, secretKey, { expiresIn: 300 });
}

export {
  generatePassHash,
  generateToken
};