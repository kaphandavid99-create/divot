import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Resend } from 'resend';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await request.json();
    const { name, email, phone, password } = body;

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
      },
    });

    // Send confirmation email
    try {
      console.log('Sending email to:', email);
      console.log('API Key present:', !!process.env.RESEND_API_KEY);
      const result = await resend.emails.send({
        from: 'Divot <onboarding@resend.dev>',
        to: email,
        subject: 'Welcome to Divot!',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .header h1 { color: white; margin: 0; font-size: 32px; }
                .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                .welcome { font-size: 20px; font-weight: bold; margin-bottom: 20px; color: #0ea5e9; }
                .button { display: inline-block; background: #0ea5e9; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Divot</h1>
                </div>
                <div class="content">
                  <p class="welcome">Welcome to Divot, ${name}!</p>
                  <p>Thank you for signing up. Your account has been successfully created.</p>
                  <p>You can now:</p>
                  <ul>
                    <li>Browse and rent cars</li>
                    <li>List your cars for sale or rent</li>
                    <li>Contact sellers directly</li>
                  </ul>
                  <p>If you have any questions, feel free to contact our support team.</p>
                  <div style="text-align: center;">
                    <a href="http://localhost:3010" class="button">Get Started</a>
                  </div>
                  <p>Best regards,<br>The Divot Team</p>
                </div>
                <div class="footer">
                  <p>This email was sent to ${email}. If you didn't create an account, please ignore this email.</p>
                </div>
              </div>
            </body>
          </html>
        `,
      });
      console.log('Email sent successfully:', result);
    } catch (emailError) {
      console.error('Email send error:', emailError);
      // Continue even if email fails
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, name: user.name, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json(
      {
        message: 'User created successfully',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
