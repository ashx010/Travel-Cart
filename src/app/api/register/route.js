import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function POST(req) {
  try {
    const { name, username, email, password, country, contactNumber, address } = await req.json();
    
    // Validate input data (you can use a library like Joi or custom validation)
    if (!name || !username || !email || !password || !country || !contactNumber || !address) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username },
          { contactNumber }
        ]
      }
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const saltIndex = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, saltIndex);
    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        country,
        contactNumber,
        address,
        status: true,
      },
    });

    return NextResponse.json({ message: 'User registered successfully', user }, { status: 201 });
  } catch (error) {
    console.error('Error during user registration:', error);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}