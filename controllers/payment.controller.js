import { stripe } from "../lib/stripe.js";

export const createPayment = async (req, res) => {
  const { products } = req.body;

  const line_items = products.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.name || product.title,
        description: product.description,
        images: product.images || [product.image],
      },
      unit_amount: Math.round(product.price * 100),
    },
    quantity: product.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    return res.status(200).json({ success: true, sessionId: session.id });
  } catch (error) {
    console.error("Error creating payment session:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

