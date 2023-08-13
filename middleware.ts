import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const {
    data: { session },
  } = await supabase.auth.getSession()
  console.log(`ミドルウェア${session?.user.id}`)
  // if (session?.user.email?.endsWith('@gmail.com')) {
  //   // Authentication successful, forward request to protected route.
  //   return res
  // }
  if (session) {
    const userIdFromSession = session.user.id

    const urlEndsWithUserId = req.nextUrl.pathname.endsWith(
      `/${userIdFromSession}`
    )

    if (urlEndsWithUserId) {
      return res
    }
  }

  const redirectUrl = req.nextUrl.clone()
  redirectUrl.pathname = '/'
  redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
  return NextResponse.redirect(redirectUrl)
}

export const config = {
  matcher: '/profile/:path*',
}
