require('dotenv').config();
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function run() {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Test Product',
                        images: ['https://cdn.dummyjson.com/product-images/1/1.jpg'],
                    },
                    unit_amount: 2998,
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `http://localhost:3000/orders?success=true`,
            cancel_url: `http://localhost:3000/cart?canceled=true`,
            metadata: {
                orderId: 'test_order_123'
            }
        });
        console.log("Stripe Success:", session.id);
    } catch (e) {
        console.error("Stripe Error:", e.message);
    }
}
run();
