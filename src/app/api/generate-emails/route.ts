import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { campaignId, drafts } = await request.json().catch(() => ({}));
  if (!campaignId || !Array.isArray(drafts)) {
    return NextResponse.json({ error: "campaignId and drafts[] required" }, { status: 400 });
  }

  // TODO: integrate Groq — llama-3.1-70b-versatile
  // For each draft: read cv_text + portfolio_url from users table,
  // call Groq with the HR email + optional job description,
  // parse JSON response { subject, body }, save to email_drafts table.

  return NextResponse.json({
    generated: drafts.map((d: { hrEmail: string; jd?: string }) => ({
      hrEmail: d.hrEmail,
      subject: `Application — ${d.hrEmail.split("@")[1]?.split(".")[0]}`,
      body: "Hi,\n\nI'm reaching out to express my interest…\n\n[AI content goes here]\n\nBest,\n${session.user.name}",
      status: "ready",
    })),
  });
}
