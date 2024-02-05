import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from '@/app/routes';
import NextAuth from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

const getUserIp = (req: NextRequest) => {
  let userIp = req.ip ?? req.headers.get('x-real-ip');

  const forwardedFor = req.headers.get('x-forwarded-for');

  if (!userIp && forwardedFor) {
    userIp = forwardedFor.split(',').at(0) ?? 'Unknown';
  }

  return userIp ?? 'Unknown';
};

const { auth } = NextAuth({
  providers: [],
});

export default auth((req: any) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(new URL(`/auth/signin?callbackUrl=${encodedCallbackUrl}`, nextUrl));
  }

  const response = NextResponse.next();
  const userIp = getUserIp(req);

  if (userIp !== 'Unknown') {
    response.cookies.set('user-ip', userIp, {
      httpOnly: false,
    });
  }

  return response;
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
