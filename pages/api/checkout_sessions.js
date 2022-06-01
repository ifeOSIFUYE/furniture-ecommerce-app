const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log(req.body);
    try {
      const params = {
        submit_type: 'pay',
        payment_method_types: ['card', 'klarna'],
        line_items: {
          price_data: {
            currency: 'eur',
            product_data: {
              name: req.body.name,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: 1,
          },
        },

        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      };
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
