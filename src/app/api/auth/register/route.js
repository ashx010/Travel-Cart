import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/app/lib/prisma';

export async function POST(req) {
  try {
    const { name, username, email, password, country, contactNumber, address } = await req.json();
    
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

    const hashedPassword = await bcrypt.hash(password, 10);
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
        // Other fields will use their default values
      },
    });

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}