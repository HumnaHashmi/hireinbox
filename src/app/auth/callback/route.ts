import { createClient } from '@/lib/supabase/server'
import { createSessionCookie } from '@/lib/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error && data.session) {
      const response = NextResponse.redirect(`${origin}/dashboard`)
      const { name, value, options } = createSessionCookie(data.session.access_token)
      response.cookies.set(name, value, options)
      return response
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}
