import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'

export async function POST(req) {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')

        const body = await req.json();
        const tier = body.tier;
        const userId = body.userId;
        const buyerName = body.buyerName;

        let priceId = '';
        if (tier === 'pro') {
            priceId = 'price_1TlkHiIorcejeeSXcWTKubJC';
        } else if (tier === 'premium') {
            priceId = 'price_1Tll7OIorcejeeSXZmRNGWX7';
        } else if (tier === 'free') {
            priceId = 'price_1Tll6lIorcejeeSXjRzhswJf';
        }

        if (!priceId) {
            return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
        }

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/#pricing`,
            metadata: {
                type: 'subscription',
                tier: tier,
                userId: userId,
                buyerName: buyerName
            }
        });
        
        return NextResponse.json({ url: session.url });
    } catch (err) {
        console.error("Stripe Checkout Error:", err);
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}