'use client';

import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-11-20.acacia',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { priceId } = req.body;

        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [{ price: priceId, quantity: 1 }],
                mode: 'subscription',
                success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/profile?success=true`,
                cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing?cancel=true`,
            });
            res.status(200).json({ url: session.url });
        } catch (error: any) {
            console.error('Stripe Checkout Error:', error.message);
            res.status(400).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
