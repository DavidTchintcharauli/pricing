'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import PricingCard from "./PricingCard";

// import CheckoutForm from "../components/CheckoutForm";
// import CompletePage from "../components/CompletePage";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);


const plans = [
    {
        id: 'free',
        title: 'Free Plan',
        description: 'Access to basic features',
        price: '$0',
        buttonText: 'Current Plan',
    },
    {
        id: 'premium',
        title: 'Premium Plan',
        description: 'Access to all features',
        price: '$19',
        buttonText: 'Subscribe',
        priceId: 'price_12345',
    },
    {
        id: 'enterprise',
        title: 'Enterprise Plan',
        description: 'Custom solutions for teams',
        price: '$99',
        buttonText: 'Contact Us',
        priceId: 'price_enterprise',
    },
];

export default function Pricing() {
    const [currentPlan, setCurrentPlan] = useState<string>('free');

    const handleSubscribe = async (priceId: string, planId: string) => {
        try {
            const stripe = await stripePromise;

            if (!stripe) {
                console.error('Stripe failed to initialize');
                return;
            }

            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ priceId }),
            });

            const data = await response.json();

            if (data.sessionId) {
                setCurrentPlan(planId);
                await stripe.redirectToCheckout({ sessionId: data.sessionId });
            } else {
                console.error('Error creating checkout session:', data.error);
            }
        } catch (error) {
            console.error('An unexpected error occurred:', error);
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold text-center mb-8">Pricing</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan) => (
                    <PricingCard
                        key={plan.id}
                        title={plan.title}
                        description={plan.description}
                        price={plan.price}
                        buttonText={plan.buttonText}
                        isCurrentPlan={currentPlan === plan.id}
                        onButtonClick={
                            plan.id === 'free'
                                ? undefined
                                : () => handleSubscribe(plan.priceId || '', plan.id)
                        }
                    />
                ))}
            </div>
        </div>
    );
}