'use client';

import PricingCard from "../components/PricingCard";

export default function Pricing() {
    const handleSubscribe = async (priceId: string) => {
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ priceId }),
            });

            const data = await response.json()

            if (data.url) {
                window.location.href = data.url
            } else {
                console.error('Error creating checkout session:', data.error)
            }
        } catch (error) {
            console.error('An Unexpected error occurred:', error)
        }
    };
 
    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold text-center mb-8">Pricing</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <PricingCard
                    title="Free Plan"
                    description="Access to basic features"
                    price="$0"
                    buttonText="Current Plan"
                    isCurrentPlan={true}
                />
                <PricingCard
                    title="Premium Plan"
                    description="Access to all features"
                    price="$19"
                    buttonText="Subscribe"
                    onButtonClick={() => handleSubscribe('price_12345')}
                />
            </div>
        </div>
    );
 };