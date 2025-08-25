# Development Setup Guide

This guide will help you set up ChronoArcana for local development.

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Git
- A Supabase account
- A Stripe account

## Step-by-Step Setup

### 1. Environment Setup

1. **Clone the repository** (if not already done)
2. **Install dependencies**:
   ```bash
   npm install
   ```

### 2. Supabase Setup

1. **Create a new Supabase project** at [supabase.com](https://supabase.com)
2. **Get your project credentials**:
   - Go to Settings > API
   - Copy the Project URL and anon public key
   - Copy the service_role secret key (be careful with this!)

3. **Set up the database schema**:
   - Go to SQL Editor in your Supabase dashboard
   - Run the contents of `supabase/migrations/20240101000000_initial_schema.sql`
   - Run the contents of `supabase/migrations/20240101000001_rls_and_functions.sql`

4. **Seed the database**:
   ```bash
   npm run seed
   ```

### 3. Stripe Setup

1. **Create a Stripe account** at [stripe.com](https://stripe.com)
2. **Create a product** for the premium subscription:
   - Go to Products in your Stripe dashboard
   - Create a new product called "ChronoArcana Premium"
   - Add a recurring price of $8/month
   - Copy the price ID (starts with `price_`)

3. **Set up webhooks**:
   - Go to Webhooks in your Stripe dashboard
   - Add endpoint: `http://localhost:3000/api/webhooks/stripe` (for development)
   - Select events: `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`
   - Copy the webhook signing secret

### 4. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Start Development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Testing the Application

### 1. User Registration
- Create a new account
- Verify that the user is created in the Supabase `users` table

### 2. Deck Selection
- Choose a preferred tarot deck
- Verify the `chosen_deck_id` is updated in the database

### 3. Daily Pulls
- Try both digital and physical pulls
- Add notes to your pulls
- Verify data is saved in the `daily_pulls` table

### 4. Analytics
- Make several pulls to see analytics
- Test the chart customization features

### 5. Subscription (Test Mode)
- Use Stripe test cards (e.g., `4242 4242 4242 4242`)
- Test the upgrade flow
- Verify webhook handling

## Common Issues

### Database Connection Issues
- Verify your Supabase credentials
- Check that RLS policies are set up correctly
- Make sure you're using the correct environment

### Stripe Webhook Issues
- Use ngrok for local webhook testing: `ngrok http 3000`
- Update your webhook URL in Stripe dashboard
- Check webhook logs in Stripe dashboard

### Build Issues
- Clear `.next` folder: `rm -rf .next`
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run type-check`

## Development Workflow

1. **Feature Development**:
   - Create a feature branch
   - Make your changes
   - Test locally
   - Run linting: `npm run lint`
   - Check TypeScript: `npm run type-check`

2. **Database Changes**:
   - Create migration files in `supabase/migrations/`
   - Test migrations on development database
   - Update seed data if necessary

3. **Component Development**:
   - Follow the existing component structure
   - Use TypeScript interfaces
   - Follow the design system colors and styles
   - Test responsive design

## Useful Commands

```bash
# Development
npm run dev                 # Start development server
npm run build              # Build for production
npm run lint               # Run ESLint
npm run type-check         # Check TypeScript

# Database
npm run seed               # Seed database with sample data

# Formatting
npm run format             # Format code with Prettier
npm run format:check       # Check code formatting
```

## Next Steps

After setting up your development environment:

1. Familiarize yourself with the codebase structure
2. Read the component documentation
3. Try implementing a small feature
4. Set up your preferred development tools (VS Code extensions, etc.)

## Support

If you encounter issues during setup:
1. Check the troubleshooting section above
2. Review the error logs carefully
3. Check that all environment variables are set correctly
4. Verify database schema and data

Happy coding! 🔮✨