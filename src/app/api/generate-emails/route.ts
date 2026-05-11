import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { drafts, portfolioUrl } = await request.json().catch(() => ({}));
  if (!Array.isArray(drafts) || drafts.length === 0) {
    return NextResponse.json({ error: "drafts[] required" }, { status: 400 });
  }

  // TODO: integrate Groq — llama-3.1-70b-versatile
  // For each draft: read cv_text from users table,
  // call Groq with hr email + optional jd + optional portfolioUrl,
  // parse JSON response { subject, body }.
  // portfolioUrl is available as a hint for personalisation.
  void portfolioUrl;

  return NextResponse.json({
    generated: drafts.map((d: { hrEmail: string; jd?: string }) => ({
      hrEmail: d.hrEmail,
      subject: `Job Application — ${d.hrEmail.split("@")[1]?.split(".")[0]}`,
      body: `Hi,\n\nI came across ${d.hrEmail.split("@")[1]?.split(".")[0]} and would love to apply. I have strong experience in software development and believe I would be a great fit.\n\nI've attached my CV for your review. Happy to connect at your convenience.\n\nBest regards,\n${session.user.name ?? "Applicant"}`,
      status: "ready",
    })),
  });
}
