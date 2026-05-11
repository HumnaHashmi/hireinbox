import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await request.formData();
    const file = formData.get("cv") as File | null;
    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
      return NextResponse.json({ error: "Only PDF, DOC, DOCX files are allowed" }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large. Max 5 MB." }, { status: 400 });
    }

    // TODO: use pdf-parse to extract text, save cv_text to users table in Supabase
    // const buffer = Buffer.from(await file.arrayBuffer());
    // const parsed = await pdfParse(buffer);
    // const cvText = parsed.text.slice(0, 3000);
    // await supabase.from("users").update({ cv_text: cvText }).eq("id", session.user.id);
    // const wordCount = cvText.split(/\s+/).filter(Boolean).length;

    const wordCount = Math.floor(file.size / 6); // rough estimate until real parsing

    return NextResponse.json({ success: true, wordCount, fileName: file.name });
  } catch {
    return NextResponse.json({ error: "Failed to process CV" }, { status: 500 });
  }
}
