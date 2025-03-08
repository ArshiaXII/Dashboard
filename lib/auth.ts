import { getDb } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function createUser(userData: any) {
  const db = await getDb();
  
  // Check if user already exists
  const existingUser = await db.select().from(users).where(eq(users.email, userData.email)).get();
  
  if (existingUser) {
    throw new Error('User already exists');
  }
  
  // Hash the password
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  
  // Create the user
  const now = new Date();
  const newUser = {
    id: uuidv4(),
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
    role: userData.role || 'user',
    createdAt: now,
    updatedAt: now
  };
  
  await db.insert(users).values(newUser);
  
  // Return user without password
  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
}

export async function authenticateUser(email: string, password: string) {
  const db = await getDb();
  
  // Find the user
  const user = await db.select().from(users).where(eq(users.email, email)).get();
  
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  // Check the password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }
  
  // Generate a JWT token
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
} 