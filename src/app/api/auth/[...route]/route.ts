import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSessionCookie, clearSessionCookie } from "@/lib/auth";
import { validateLoginForm, validateRegisterForm } from "@/lib/validations";
import type { ApiError } from "@/types";

function errorResponse(message: string, status: number, details?: Record<string, string[]>): NextResponse {
  return NextResponse.json(
    { error: "auth_error", message, statusCode: status, details } satisfies ApiError,
    { status },
  );
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ route: string[] }> }) {
  const { route } = await params;
  const action = route[0];

  if (action === "login") {
    const body = await request.json().catch(() => ({}));
    const result = validateLoginForm(body);

    if (!result.success) {
      return errorResponse("Validation failed", 422, result.errors as unknown as Record<string, string[]>);
    }

    // Replace with your actual auth logic (DB lookup, password hash compare, JWT sign)
    // This is a placeholder response shape
    const mockUser = {
      id: "user_1",
      email: result.data.email,
      name: "Jane Smith",
      role: "candidate" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const mockToken = Buffer.from(
      JSON.stringify({ user: mockUser, exp: Math.floor(Date.now() / 1000) + 604800 }),
    ).toString("base64");
    const fakeJwt = `header.${mockToken}.sig`;

    const cookieDef = createSessionCookie(fakeJwt);
    const cookieStore = await cookies();
    cookieStore.set(cookieDef.name, cookieDef.value, cookieDef.options as Parameters<typeof cookieStore.set>[2]);

    return NextResponse.json({
      user: mockUser,
      session: { user: mockUser, accessToken: fakeJwt, expiresAt: new Date(Date.now() + 604800000).toISOString() },
    });
  }

  if (action === "register") {
    const body = await request.json().catch(() => ({}));
    const result = validateRegisterForm(body);

    if (!result.success) {
      return errorResponse("Validation failed", 422, result.errors as unknown as Record<string, string[]>);
    }

    // Replace with your actual registration logic
    const mockUser = {
      id: "user_new",
      email: result.data.email,
      name: result.data.name,
      role: result.data.role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const mockToken = Buffer.from(JSON.stringify({ user: mockUser, exp: Math.floor(Date.now() / 1000) + 604800 })).toString("base64");
    const fakeJwt = `header.${mockToken}.sig`;

    const cookieDef = createSessionCookie(fakeJwt);
    const cookieStore = await cookies();
    cookieStore.set(cookieDef.name, cookieDef.value, cookieDef.options as Parameters<typeof cookieStore.set>[2]);

    return NextResponse.json({ user: mockUser, session: { user: mockUser, accessToken: fakeJwt, expiresAt: new Date(Date.now() + 604800000).toISOString() } }, { status: 201 });
  }

  if (action === "logout") {
    const cookieDef = clearSessionCookie();
    const cookieStore = await cookies();
    cookieStore.set(cookieDef.name, cookieDef.value, cookieDef.options as Parameters<typeof cookieStore.set>[2]);
    return NextResponse.json({ message: "Signed out" });
  }

  return errorResponse("Not found", 404);
}
