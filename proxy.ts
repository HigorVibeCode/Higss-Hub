import { NextResponse, type NextRequest } from 'next/server';
import { clientSlugFromHost } from '@/lib/domain';
import { env } from '@/lib/env';
import { LOCALE_COOKIE } from '@/lib/i18n';

const LEGACY_LOCALE_PATH = /^\/(en|pt|de|fr|es|it)(\/.*)?$/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Old institutional site lived under /pt, /en/... — send those visitors to the hub in their language.
  const legacy = pathname.match(LEGACY_LOCALE_PATH);
  if (legacy) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    const res = NextResponse.redirect(url, 308);
    res.cookies.set(LOCALE_COOKIE, legacy[1], { path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' });
    return res;
  }

  // <slug>.higsshub.com serves the client page; anything else on that host goes to the main domain.
  const hostHeader = request.headers.get('host');
  const slug = clientSlugFromHost(hostHeader, env.rootDomain);
  if (slug && pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = `/c/${slug}`;
    return NextResponse.rewrite(url);
  }
  if (slug && !pathname.startsWith('/_next') && !hostHeader?.split(':')[0].endsWith('.localhost')) {
    // In dev (*.localhost) Next would turn this into a same-origin relative redirect and loop, so skip it there.
    return NextResponse.redirect(new URL(`https://${env.rootDomain}${pathname}${request.nextUrl.search}`));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|icon.svg|robots.txt|.*\\.(?:png|jpg|jpeg|svg|webp|ico)$).*)'],
};
