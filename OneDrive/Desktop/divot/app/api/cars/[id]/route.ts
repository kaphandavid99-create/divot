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

// GET single car by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const car = await prisma.car.findUnique({
      where: { id: params.id },
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

    if (!car) {
      return NextResponse.json(
        { error: 'Car not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ car }, { status: 200 });
  } catch (error) {
    console.error('Get car error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT update car
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { token, ...updateData } = body;

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

    const car = await prisma.car.findUnique({
      where: { id: params.id },
    });

    if (!car) {
      return NextResponse.json(
        { error: 'Car not found' },
        { status: 404 }
      );
    }

    // Check if user is the seller or admin
    if (car.sellerId !== decoded.userId && decoded.role !== 'admin') {
      return NextResponse.json(
        { error: 'Not authorized to update this car' },
        { status: 403 }
      );
    }

    const updatedCar = await prisma.car.update({
      where: { id: params.id },
      data: updateData,
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
      { message: 'Car updated successfully', car: updatedCar },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update car error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE car
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { token } = body;

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

    const car = await prisma.car.findUnique({
      where: { id: params.id },
    });

    if (!car) {
      return NextResponse.json(
        { error: 'Car not found' },
        { status: 404 }
      );
    }

    // Check if user is the seller or admin
    if (car.sellerId !== decoded.userId && decoded.role !== 'admin') {
      return NextResponse.json(
        { error: 'Not authorized to delete this car' },
        { status: 403 }
      );
    }

    await prisma.car.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: 'Car deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete car error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
