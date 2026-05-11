import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const sig = request.headers.get("stripe-signature");
  const body = await request.text();

  // TODO: verify Stripe webhook signature and handle events
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  // const event = stripe.webhooks.constructEvent(body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
  //
  // if (event.type === "checkout.session.completed") {
  //   const session = event.data.object;
  //   const userId = session.metadata?.userId;
  //   // Update users.plan = "pro" in Supabase
  //   // Create subscriptions row
  // }
  //
  // if (event.type === "customer.subscription.deleted") {
  //   // Revert users.plan = "free"
  // }

  return NextResponse.json({ received: true });
}
