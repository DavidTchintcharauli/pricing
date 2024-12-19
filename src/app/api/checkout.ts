import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-12-18.acacia',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { priceId } = req.body;

        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'subscription',
                line_items: [
                    {
                        price: priceId,
                        quantity: 1,
                    },
                ],
                success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
                cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
            });
            
            res.status(200).json({ sessionId: session.id });
        } catch (error) {
          console.error('Error creating checkout session:', error);
          res.status(500).json({ error: 'Failed to create checkout session.' });
        }
      } else {
        res.status(405).json({ error: 'Method Not Allowed' });
      }
}
