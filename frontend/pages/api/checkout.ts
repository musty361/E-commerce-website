import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

interface CartItem {
  name: string;
  price: number;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { cart } = req.body;
    const total = cart.reduce((sum: number, item: CartItem) => sum + item.price, 0);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total * 100,
      currency: "usd",
      metadata: { cart: JSON.stringify(cart) },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err: unknown) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
  }
}
