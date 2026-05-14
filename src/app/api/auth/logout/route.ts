import { createClient } from '@/lib/supabase/server'
import { clearSessionCookie } from '@/lib/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  await supabase.auth.signOut()

  const response = NextResponse.json({ ok: true })
  const { name, value, options } = clearSessionCookie()
  response.cookies.set(name, value, options)
  return response
}
