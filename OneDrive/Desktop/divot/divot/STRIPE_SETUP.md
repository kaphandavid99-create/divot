# Stripe Payment Integration Setup

## Overview
This document outlines how to set up Stripe payment integration for the Divot car rental platform.

## Prerequisites
1. A Stripe account (sign up at https://stripe.com)
2. Node.js and npm installed

## Installation

1. Install Stripe dependencies:
```bash
npm install stripe @stripe/stripe-js
```

2. Create a `.env.local` file in your project root with the following variables:
```
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

## Getting Your Stripe Keys

1. Log in to your Stripe Dashboard
2. Navigate to Developers → API keys
3. Copy your Secret key (starts with `sk_test_` for test mode, `sk_live_` for production)
4. Copy your Publishable key (starts with `pk_test_` for test mode, `pk_live_` for production)

## Setting Up Webhooks (Optional)

For production, you'll want to set up webhooks to handle payment success/failure events:

1. In Stripe Dashboard, go to Developers → Webhooks
2. Add a new endpoint: `https://yourdomain.com/api/payment/webhook`
3. Select events to listen for:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. Copy the webhook signing secret

## How It Works

1. **Payment Intent Creation**: When a user confirms a booking, the frontend sends booking details to `/api/payment/create-intent`
2. **Stripe Processing**: Stripe creates a payment intent and returns a client secret
3. **Payment Confirmation**: The frontend uses Stripe Elements to collect and confirm payment
4. **Completion**: On successful payment, the booking is confirmed

## Testing

Use Stripe test cards for testing:
- Card number: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits
- ZIP: Any 5 digits

## Currency
The integration is set up for XAF (Central African CFA Franc). To change currency, modify the `currency` parameter in the payment intent creation.

## Security Notes

- Never commit your Stripe secret keys to version control
- Use environment variables for all sensitive data
- Use test mode for development, switch to live mode for production
- Implement proper webhook verification in production
