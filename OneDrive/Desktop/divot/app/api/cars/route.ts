import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Helper function to verify JWT token
function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as any;
  } catch (error) {
    return null;
  }
}

// GET all cars
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const location = searchParams.get('location');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'createdAt';

    const where: any = { isAvailable: true };

    if (category && category !== 'all') {
      where.category = category;
    }

    if (location) {
      where.location = { contains: location, mode: 'insensitive' };
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } },
        { carModel: { contains: search, mode: 'insensitive' } },
      ];
    }

    let orderBy: any = {};
    if (sortBy === 'price') {
      orderBy = { price: 'asc' };
    } else if (sortBy === 'rating') {
      orderBy = { rating: 'desc' };
    } else {
      orderBy = { createdAt: 'desc' };
    }

    const cars = await prisma.car.findMany({
      where,
      orderBy,
      include: {
        seller: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    return NextResponse.json({ cars }, { status: 200 });
  } catch (error) {
    console.error('Get cars error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST create new car
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token, ...carData } = body;

    // Verify token
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Create car with seller ID from token
    const car = await prisma.car.create({
      data: {
        ...carData,
        sellerId: decoded.userId,
      },
      include: {
        seller: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    return NextResponse.json(
      { message: 'Car created successfully', car },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create car error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
