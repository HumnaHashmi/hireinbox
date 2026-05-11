import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { billing } = await request.json().catch(() => ({ billing: "monthly" }));

  // TODO: create real Stripe checkout session
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  // const checkoutSession = await stripe.checkout.sessions.create({
  //   mode: "subscription",
  //   customer_email: session.user.email,
  //   line_items: [{ price: billing === "yearly" ? process.env.STRIPE_YEARLY_PRICE_ID : process.env.STRIPE_MONTHLY_PRICE_ID, quantity: 1 }],
  //   success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/upgrade/success`,
  //   cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/upgrade`,
  //   metadata: { userId: session.user.id },
  // });
  // return NextResponse.json({ url: checkoutSession.url });

  return NextResponse.json({
    url: `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/dashboard/upgrade/success`,
  });
}
