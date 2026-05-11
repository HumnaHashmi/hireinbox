import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { draftId, to, subject, body } = await request.json().catch(() => ({}));
  if (!draftId || !to || !subject || !body) {
    return NextResponse.json({ error: "draftId, to, subject, body required" }, { status: 400 });
  }

  // TODO: wire up Nodemailer + Gmail SMTP
  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
  // });
  // await transporter.sendMail({ from: process.env.GMAIL_USER, to, subject, text: body });
  // Update email_drafts: status = "sent", sent_at = now()
  // Increment users.daily_count

  return NextResponse.json({ success: true, sentAt: new Date().toISOString() });
}
