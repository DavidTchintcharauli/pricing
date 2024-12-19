'use client';

import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-12-18.acacia',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { subscriptionId } = req.body;
            const deletedSubscription = await stripe.subscriptions.cancel(subscriptionId);
            res.status(200).json({ subscription: deletedSubscription });
        } catch (err) {
            res.status(500).json({ error: "error in line 15" });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}