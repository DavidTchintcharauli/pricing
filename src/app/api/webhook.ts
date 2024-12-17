'use client';

import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-11-20.acacia',
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const sig = req.headers['stripe-signature'] as string;

        let event;

        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET!
            );
        } catch (err) {
            return res.status(400).send(`Webhook Error: errro in line 21`);
        }

        switch (event.type) {
            case 'customer.subscription.created':
            case 'customer.subscription.updated':
                const subscription = event.data.object as Stripe.Subscription;
                break;
            case 'customer.subscription.deleted':
                const deletedSubscription = event.data.object as Stripe.Subscription;
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        res.status(200).json({ received: true });
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}