# Porkchop Recipe App

A modern recipe discovery and cooking companion app with a delightful 1930s Warner Bros. aesthetic.

## Features

- Recipe discovery with card-based swiping interface
- Premium subscription tiers with free trial periods
- AI-powered cooking assistant (Chef Freddie)
- User profiles with cooking progression
- Personalized recipe recommendations
- Subscription management with Stripe integration

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher
- A Stripe account for payment processing

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/porkchop.git
cd porkchop
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the environment variables in `.env` with your Stripe API keys and other configuration.

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### Testing Stripe Integration

Use these test card numbers for different scenarios:

- Successful payment: 4242 4242 4242 4242
- Payment declined: 4000 0000 0000 0002
- Insufficient funds: 4000 0000 0009 995
- Processing error: 4000 0000 0000 0069

For all test cards:
- Any future expiration date
- Any three-digit CVC
- Any billing postal code

## Project Structure

```
porkchop/
├── public/
│   └── assets/
├── src/
│   ├── components/
│   │   ├── PricingPage.tsx
│   │   ├── SubscriptionManagement.tsx
│   │   ├── TrialNotification.tsx
│   │   └── withSubscriptionGuard.tsx
│   ├── contexts/
│   │   └── SubscriptionContext.tsx
│   ├── hooks/
│   │   └── useTrialStatus.ts
│   ├── services/
│   │   └── stripe.ts
│   ├── config/
│   │   └── stripe.ts
│   └── App.tsx
├── data/
│   ├── csv/
│   └── images/
└── package.json
```

## Subscription Tiers

### Rare (Free)
- Basic recipe access
- Save favorite recipes
- Track cooking progress

### Al Dente (Premium)
- All Rare features
- Chef Freddie AI assistant
- Advanced recipe filtering
- Premium recipe collection
- Priority support

Both tiers come with a 7-day free trial.

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow React best practices and hooks
- Use Tailwind CSS for styling
- Implement proper error handling
- Write meaningful comments
- Follow the established folder structure

### Testing

Run the test suite:
```bash
npm test
```

### Building for Production

Create a production build:
```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 