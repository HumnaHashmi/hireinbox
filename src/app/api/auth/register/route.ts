import { createClient } from '@/lib/supabase/server'
import { createSessionCookie } from '@/lib/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { email, password, name, role } = body

  if (!email || !password || !name) {
    return NextResponse.json(
      { message: 'Email, password, and name are required' },
      { status: 400 }
    )
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name, role: role || 'candidate' },
    },
  })

  if (error || !data.session) {
    return NextResponse.json(
      { message: error?.message || 'Registration failed' },
      { status: 400 }
    )
  }

  const response = NextResponse.json({ user: data.user })
  const { name: cookieName, value, options } = createSessionCookie(data.session.access_token)
  response.cookies.set(cookieName, value, options)
  return response
}
