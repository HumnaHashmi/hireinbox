import { createClient } from '@/lib/supabase/server'
import { createSessionCookie } from '@/lib/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { email, password } = body

  if (!email || !password) {
    return NextResponse.json(
      { message: 'Email and password are required' },
      { status: 400 }
    )
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error || !data.session) {
    return NextResponse.json(
      { message: error?.message || 'Login failed' },
      { status: 401 }
    )
  }

  const response = NextResponse.json({ user: data.user })
  const { name, value, options } = createSessionCookie(data.session.access_token)
  response.cookies.set(name, value, options)
  return response
}
