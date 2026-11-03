import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

const COOKIE = 'hh_admin';
const MAX_AGE = 60 * 60 * 24 * 30; // 30 dias

const password = () => process.env.ADMIN_PASSWORD ?? '';

export const isAuthConfigured = () => password().length > 0;

// Keyed by the password itself, so changing ADMIN_PASSWORD logs out every session.
function sign(value: string) {
  return createHmac('sha256', `higss-hub:${password()}`).update(value).digest('base64url');
}

function same(a: string, b: string) {
  return a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

export function checkPassword(input: string) {
  return isAuthConfigured() && same(sign(input), sign(password()));
}

export async function startSession() {
  const exp = String(Date.now() + MAX_AGE * 1000);
  (await cookies()).set(COOKIE, `${exp}.${sign(exp)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE,
  });
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}

export async function isAdmin() {
  if (!isAuthConfigured()) return false;
  const [exp, sig] = ((await cookies()).get(COOKIE)?.value ?? '').split('.');
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  return same(sig, sign(exp));
}
