import type { EmailOtpType } from '@supabase/supabase-js';
import { NextResponse, type NextRequest } from 'next/server';
import { getSupabase } from '@/lib/supabase/server';

/** Landing point of the magic link e-mail: turns the code into a session and opens the panel. */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const supabase = await getSupabase();
  if (!supabase) return NextResponse.redirect(`${origin}/admin/login?erro=config`);

  const code = searchParams.get('code');
  const tokenHash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;

  const { error } = code
    ? await supabase.auth.exchangeCodeForSession(code)
    : tokenHash && type
      ? await supabase.auth.verifyOtp({ token_hash: tokenHash, type })
      : { error: new Error('missing code') };

  return NextResponse.redirect(error ? `${origin}/admin/login?erro=link` : `${origin}/admin`);
}
