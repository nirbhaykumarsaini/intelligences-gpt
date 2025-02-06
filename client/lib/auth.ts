// utils/auth.ts
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/lib/models/User';
import dbConnect from '@/lib/db';

export async function getUserIdFromToken(req: NextRequest): Promise<string> {
  // 1. Check Authorization header exists
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    throw new Error('Authorization header missing');
  }

  // 2. Verify Bearer token format
  const [bearer, token] = authHeader.split(' ');
  if (bearer !== 'Bearer' || !token) {
    throw new Error('Invalid token format');
  }

  // 3. Verify JWT signature
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
  } catch (error) {
    throw new Error('Invalid or expired token'+error);
  }

  // 4. Validate in database
  await dbConnect();
  const user = await User.findById(decoded.userId).select('_id');

  
  if (!user) {
    throw new Error('User no longer exists');
  }

  return user._id.toString();
}