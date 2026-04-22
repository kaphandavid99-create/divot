# Backend Setup Guide

This document explains how to set up and run the PostgreSQL backend for the Divot car platform using Prisma ORM.

## Prerequisites

- PostgreSQL installed locally or a cloud PostgreSQL database (Supabase, Neon, etc.)
- Node.js and npm installed

## Installation

1. Install required dependencies:
```bash
cd divot/divot
npm install prisma @prisma/client bcryptjs jsonwebtoken
npm install -D @types/bcryptjs @types/jsonwebtoken
```

2. Initialize Prisma (already done):
```bash
npx prisma init
```

3. Generate Prisma Client:
```bash
npx prisma generate
```

## Environment Variables

Create a `.env` file in the `divot` directory (root) with the following variables:

```env
# PostgreSQL Database URL
# For local PostgreSQL: postgresql://username:password@localhost:5432/divot
# For cloud database (Supabase, Neon, etc.): use their provided connection string
DATABASE_URL=postgresql://postgres:password@localhost:5432/divot

# JWT Secret (change this to a secure random string in production)
JWT_SECRET=your-secret-key-change-in-production
```

## Database Setup

### Option 1: Local PostgreSQL

1. Install PostgreSQL from https://www.postgresql.org/download/windows/
2. During installation, set a password for the postgres user
3. Create a database:
```sql
CREATE DATABASE divot;
```

### Option 2: Cloud PostgreSQL (Recommended for Development)

**Supabase (Free):**
1. Go to https://supabase.com
2. Create a new project
3. Get the connection string from Settings > Database
4. Update your `.env` file with the connection string

**Neon (Free):**
1. Go to https://neon.tech
2. Create a new project
3. Copy the connection string
4. Update your `.env` file

## Running Migrations

After setting up your database, run the migrations to create tables:

```bash
npx prisma migrate dev --name init
```

This will create the following tables:
- `User` - User accounts
- `Car` - Car listings
- `Contact` - Contact form submissions

## Database Schema

### User Model
- `id`: UUID (primary key)
- `name`: String (required)
- `email`: String (required, unique)
- `phone`: String (optional)
- `password`: String (required, hashed)
- `role`: String ('user' or 'admin', default: 'user')
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Car Model
- `id`: UUID (primary key)
- `name`: String (required)
- `brand`: String (required)
- `carModel`: String (required)
- `year`: Integer (required)
- `price`: String (required)
- `category`: String ('rent' or 'buy', required)
- `location`: String (required)
- `image`: String (required)
- `images`: String array
- `mileage`: Integer (optional)
- `condition`: String ('excellent', 'good', 'fair', 'poor')
- `description`: String (required)
- `sellerId`: UUID (foreign key to User)
- `seller`: User relation
- `rating`: Float (0-5, default: 0)
- `isAvailable`: Boolean (default: true)
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Contact Model
- `id`: UUID (primary key)
- `name`: String (required)
- `email`: String (required)
- `phone`: String (optional)
- `subject`: String (required)
- `message`: String (required)
- `isRead`: Boolean (default: false)
- `createdAt`: DateTime
- `updatedAt`: DateTime

## API Endpoints

### Authentication

#### POST `/api/auth/signup`
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+237 677 889 900",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+237 677 889 900",
    "role": "user"
  }
}
```

#### POST `/api/auth/login`
Login an existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+237 677 889 900",
    "role": "user"
  }
}
```

### Cars

#### GET `/api/cars`
Get all cars with optional filtering.

**Query Parameters:**
- `category`: Filter by category ('rent' or 'buy')
- `location`: Filter by location
- `search`: Search by name, brand, or model
- `sortBy`: Sort by ('createdAt', 'price', 'rating')

**Example:**
```
GET /api/cars?category=rent&location=Douala&sortBy=price
```

**Response:**
```json
{
  "cars": [
    {
      "id": "car-id",
      "name": "Toyota Land Cruiser V8",
      "brand": "Toyota",
      "carModel": "Land Cruiser",
      "year": 2022,
      "price": "150.000 FCFA/jour",
      "category": "rent",
      "location": "Douala, Cameroon",
      "image": "image-url",
      "images": [],
      "mileage": 50000,
      "condition": "excellent",
      "description": "Description here",
      "seller": {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+237 677 889 900"
      },
      "rating": 4.8,
      "isAvailable": true
    }
  ]
}
```

#### POST `/api/cars`
Create a new car listing (requires authentication).

**Request Body:**
```json
{
  "token": "jwt-token-here",
  "name": "Toyota Land Cruiser V8",
  "brand": "Toyota",
  "carModel": "Land Cruiser",
  "year": 2022,
  "price": "150.000 FCFA/jour",
  "category": "rent",
  "location": "Douala, Cameroon",
  "image": "image-url",
  "images": ["image-url-1", "image-url-2"],
  "mileage": 50000,
  "condition": "excellent",
  "description": "Description here"
}
```

#### GET `/api/cars/:id`
Get a single car by ID.

#### PUT `/api/cars/:id`
Update a car (requires authentication and ownership).

**Request Body:**
```json
{
  "token": "jwt-token-here",
  "price": "200.000 FCFA/jour",
  "description": "Updated description"
}
```

#### DELETE `/api/cars/:id`
Delete a car (requires authentication and ownership).

**Request Body:**
```json
{
  "token": "jwt-token-here"
}
```

### Contact

#### POST `/api/contact`
Submit a contact form.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+237 677 889 900",
  "subject": "General Inquiry",
  "message": "Your message here"
}
```

**Response:**
```json
{
  "message": "Message sent successfully",
  "contact": {
    "id": "contact-id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+237 677 889 900",
    "subject": "General Inquiry",
    "message": "Your message here",
    "isRead": false
  }
}
```

## Running the Application

1. Make sure your `.env` file has the correct DATABASE_URL
2. Run database migrations:
```bash
npx prisma migrate dev --name init
```

3. Start the Next.js development server:
```bash
cd divot/divot
npm run dev
```

4. The application will be available at `http://localhost:3000`

## Prisma Studio (Optional)

Prisma Studio is a visual database editor:

```bash
npx prisma studio
```

This opens a web interface at `http://localhost:5555` where you can view and edit your data.

## Security Notes

- Change `JWT_SECRET` to a strong, random string in production
- Use HTTPS in production
- Consider using HTTP-only cookies for token storage instead of localStorage
- Implement rate limiting on API endpoints
- Add input validation and sanitization
- Use environment variables for sensitive data
- Never commit `.env` file to version control
