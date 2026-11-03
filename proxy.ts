import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { clientSlugFromHost } from '@/lib/domain';
import { env, isSupabaseConfigured } from '@/lib/env';
import { LOCALE_COOKIE } from '@/lib/i18n';

const LEGACY_LOCALE_PATH = /^\/(en|pt|de|fr|es|it)(\/.*)?$/;

export async function proxy(request: NextRequest) {
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
  let rewriteTo: URL | null = null;
  if (slug && pathname === '/') {
    rewriteTo = request.nextUrl.clone();
    rewriteTo.pathname = `/c/${slug}`;
  } else if (slug && !pathname.startsWith('/_next') && !hostHeader?.split(':')[0].endsWith('.localhost')) {
    // In dev (*.localhost) Next would turn this into a same-origin relative redirect and loop, so skip it there.
    return NextResponse.redirect(new URL(`https://${env.rootDomain}${pathname}${request.nextUrl.search}`));
  }

  const forward = () => (rewriteTo ? NextResponse.rewrite(rewriteTo, { request }) : NextResponse.next({ request }));
  let response = forward();

  // Keep the admin session fresh; skip the work for anonymous visitors.
  const hasSession = request.cookies.getAll().some((c) => c.name.startsWith('sb-'));
  if (isSupabaseConfigured && hasSession) {
    const supabase = createServerClient(env.supabaseUrl, env.supabaseKey, {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (toSet) => {
          toSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = forward();
          toSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    });
    await supabase.auth.getClaims();
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|icon.svg|robots.txt|.*\\.(?:png|jpg|jpeg|svg|webp|ico)$).*)'],
};
