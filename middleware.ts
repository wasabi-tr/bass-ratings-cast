import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: ['/', '/index'],
}

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization')
  const url = req.nextUrl

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, pwd] = atob(authValue).split(':')

    if (
      user === process.env.NEXT_PUBLIC_BASIC_AUTH_NAME &&
      pwd === process.env.NEXT_PUBLIC_BASIC_AUTH_PASSWORD
    ) {
      return NextResponse.next()
    }
  }
  url.pathname = '/api/auth'

  return NextResponse.rewrite(url)
}
