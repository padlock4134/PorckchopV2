import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import App from './App';
import { SubscriptionProvider } from './context/SubscriptionContext';
import '@fontsource/libre-bodoni';
import './index.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'your_publishable_key');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Elements stripe={stripePromise}>
        <SubscriptionProvider>
          <App />
        </SubscriptionProvider>
      </Elements>
    </BrowserRouter>
  </React.StrictMode>
); 