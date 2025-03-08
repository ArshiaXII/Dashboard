import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }
    
    const user = await createUser(body);
    
    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    console.error('Error registering user:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to register user' },
      { status: error.message === 'User already exists' ? 409 : 500 }
    );
  }
} 