import { cookies } from 'next/headers';
import crypto from 'crypto';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const SESSION_COOKIE_NAME = 'admin_session';
export const SESSION_MAX_AGE_SEC = 60 * 60; // 1 hour
export const CREDENTIALS_ROTATION_SUFFIX = '';

const base64UrlSafe = (buf: Buffer): string =>
  buf.toString('base64url');

const getAuthSecret = (): string => {
  const secret = process.env.ADMIN_AUTH_SECRET || process.env.NEXTAUTH_SECRET || 'fallback-dev-secret-change-immediately-9780e2';
  if (secret.length < 16) {
    console.warn('[ADMIN AUTH] ADMIN_AUTH_SECRET is too short. Please set a strong secret in env.');
  }
  return secret;
};

export const getAdminCredentials = (): { username: string; passwordHash: string } => {
  const username = process.env.ADMIN_USERNAME || 'admin';
  const envPassword = process.env.ADMIN_PASSWORD;

  let passwordHash: string;
  if (envPassword && envPassword.startsWith('sha256:')) {
    passwordHash = envPassword.slice('sha256:'.length);
  } else if (envPassword) {
    passwordHash = crypto
      .createHash('sha256')
      .update(envPassword + getAuthSecret().slice(0, 8))
      .digest('hex');
  } else {
    passwordHash = crypto
      .createHash('sha256')
      .update('admin123' + getAuthSecret().slice(0, 8))
      .digest('hex');
    console.warn('[ADMIN AUTH] Using default fallback admin password. Set ADMIN_PASSWORD in env.');
  }

  return { username, passwordHash };
};

export const hashPasswordForEnv = (password: string): string => {
  return (
    'sha256:' +
    crypto
      .createHash('sha256')
      .update(password + getAuthSecret().slice(0, 8))
      .digest('hex')
  );
};

export const verifyAdminPassword = (password: string): boolean => {
  const { passwordHash } = getAdminCredentials();
  const attemptHash = crypto
    .createHash('sha256')
    .update(password + getAuthSecret().slice(0, 8))
    .digest('hex');
  try {
    const a = Buffer.from(attemptHash, 'hex');
    const b = Buffer.from(passwordHash, 'hex');
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
};

const signToken = (payload: Record<string, any>): string => {
  const secret = getAuthSecret();
  const encoded = base64UrlSafe(Buffer.from(JSON.stringify(payload), 'utf-8'));
  const signature = base64UrlSafe(
    crypto.createHmac('sha256', secret).update(encoded).digest()
  );
  return `${encoded}.${signature}`;
};

const verifyToken = (token: string): Record<string, any> | null => {
  try {
    const secret = getAuthSecret();
    const [encoded, signature] = token.split('.');
    if (!encoded || !signature) return null;
    const expectedSig = base64UrlSafe(
      crypto.createHmac('sha256', secret).update(encoded).digest()
    );
    const sigOk = crypto.timingSafeEqual(
      Buffer.from(signature, 'utf-8'),
      Buffer.from(expectedSig, 'utf-8')
    );
    if (!sigOk) return null;
    const payload = JSON.parse(
      Buffer.from(encoded, 'base64url').toString('utf-8')
    );
    return payload;
  } catch {
    return null;
  }
};

export const createSession = (username: string): string => {
  const issuedAt = Math.floor(Date.now() / 1000);
  const expiresAt = issuedAt + SESSION_MAX_AGE_SEC;
  const randomJti = base64UrlSafe(crypto.randomBytes(16));
  const payload = {
    sub: username,
    role: 'admin',
    iat: issuedAt,
    exp: expiresAt,
    jti: randomJti,
  };
  return signToken(payload);
};

export const getSessionFromCookie = async (): Promise<{ sub: string; role: string; exp: number; valid: boolean } | null> => {
  try {
    const cookieStore = await cookies();
    const raw = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!raw) return null;
    const payload = verifyToken(raw);
    if (!payload) return null;
    const now = Math.floor(Date.now() / 1000);
    const valid = payload.role === 'admin' && payload.exp > now;
    return {
      sub: payload.sub,
      role: payload.role,
      exp: payload.exp,
      valid,
    };
  } catch {
    return null;
  }
};

export const getSessionFromRequest = async (
  request: NextRequest
): Promise<{ sub: string; role: string; exp: number; valid: boolean } | null> => {
  try {
    const raw = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!raw) return null;
    const payload = verifyToken(raw);
    if (!payload) return null;
    const now = Math.floor(Date.now() / 1000);
    const valid = payload.role === 'admin' && payload.exp > now;
    return {
      sub: payload.sub,
      role: payload.role,
      exp: payload.exp,
      valid,
    };
  } catch {
    return null;
  }
};

export const isAdminAuthenticated = async (): Promise<boolean> => {
  const s = await getSessionFromCookie();
  return !!s && s.valid;
};

export const isAdminAuthenticatedFromRequest = async (
  request: NextRequest
): Promise<boolean> => {
  const s = await getSessionFromRequest(request);
  return !!s && s.valid;
};

export const setAdminSessionCookie = (
  response: NextResponse,
  sessionToken: string
): void => {
  response.cookies.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_MAX_AGE_SEC,
    priority: 'high',
  });
};

export const clearAdminSessionCookie = (response: NextResponse): void => {
  response.cookies.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
    expires: new Date(0),
    priority: 'high',
  });
};
