import { cookies } from 'next/headers';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const SESSION_COOKIE_NAME = 'admin_session';
export const SESSION_MAX_AGE_SEC = 60 * 60; // 1 hour
export const CREDENTIALS_ROTATION_SUFFIX = '';

const base64UrlSafe = (buf: ArrayBuffer | Buffer): string => {
  const b = Buffer.isBuffer(buf) ? buf : Buffer.from(buf);
  return b.toString('base64url');
};

const getAuthSecret = (): string => {
  const secret =
    process.env.ADMIN_AUTH_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    'fallback-dev-secret-change-immediately-9780e2';

  if (process.env.NODE_ENV === 'production') {
    if (
      !process.env.ADMIN_AUTH_SECRET ||
      secret.length < 32 ||
      secret.includes('fallback-dev') ||
      secret.includes('change-me')
    ) {
      throw new Error(
        '[ADMIN AUTH] ADMIN_AUTH_SECRET must be set to a strong random value (>= 32 chars) in production.'
      );
    }
  } else if (secret.length < 16) {
    console.warn(
      '[ADMIN AUTH] ADMIN_AUTH_SECRET is too short. Please set a strong secret in env.'
    );
  }

  return secret;
};

// Web Crypto API key import — works in both Node.js and Edge runtime
const getHmacKey = async (): Promise<CryptoKey> => {
  const secret = getAuthSecret();
  const keyData = new TextEncoder().encode(secret);

  return globalThis.crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
};

export const getAdminCredentials = (): {
  username: string;
  passwordHash: string;
  hashType: 'sha256' | 'bcrypt';
} => {
  const username = process.env.ADMIN_USERNAME || 'admin';
  const envPassword = process.env.ADMIN_PASSWORD;

  let passwordHash: string;
  let hashType: 'sha256' | 'bcrypt' = 'sha256';

  if (envPassword && envPassword.startsWith('bcrypt:')) {
    passwordHash = envPassword.slice('bcrypt:'.length);
    hashType = 'bcrypt';
  } else if (envPassword && envPassword.startsWith('sha256:')) {
    passwordHash = envPassword.slice('sha256:'.length);
    hashType = 'sha256';
  } else if (envPassword) {
    // New passwords default to bcrypt
    passwordHash = bcrypt.hashSync(envPassword, 12);
    hashType = 'bcrypt';
  } else if (process.env.NODE_ENV === 'production') {
    throw new Error('[ADMIN AUTH] ADMIN_PASSWORD must be set in production.');
  } else {
    // Development fallback: use SHA-256 for backward compatibility
    passwordHash = crypto
      .createHash('sha256')
      .update('admin123' + getAuthSecret().slice(0, 8))
      .digest('hex');
    hashType = 'sha256';

    console.warn(
      '[ADMIN AUTH] Using default fallback admin password. Set ADMIN_PASSWORD in env.'
    );
  }

  return { username, passwordHash, hashType };
};

export const hashPasswordForEnv = (password: string): string => {
  // Always use bcrypt for new passwords
  const hash = bcrypt.hashSync(password, 12);
  return `bcrypt:${hash}`;
};

export const verifyAdminPassword = (password: string): boolean => {
  const { passwordHash, hashType } = getAdminCredentials();

  try {
    if (hashType === 'bcrypt') {
      return bcrypt.compareSync(password, passwordHash);
    } else {
      // SHA-256 fallback for backward compatibility
      const attemptHash = crypto
        .createHash('sha256')
        .update(password + getAuthSecret().slice(0, 8))
        .digest('hex');

      const a = Buffer.from(attemptHash, 'hex');
      const b = Buffer.from(passwordHash, 'hex');

      return crypto.timingSafeEqual(a, b);
    }
  } catch {
    return false;
  }
};

const signToken = async (payload: Record<string, any>): Promise<string> => {
  const key = await getHmacKey();

  const encoded = base64UrlSafe(
    Buffer.from(JSON.stringify(payload), 'utf-8')
  );

  const signatureBuf = await globalThis.crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(encoded)
  );

  const signature = base64UrlSafe(signatureBuf);

  return `${encoded}.${signature}`;
};

const verifyToken = async (token: string): Promise<Record<string, any> | null> => {
  try {
    const parts = token.split('.');

    const [encoded, signature] = parts;
    if (!encoded || !signature) {
      return null;
    }

    const key = await getHmacKey();

    const signatureBytes = Buffer.from(signature, 'base64url');

    const sigOk = await globalThis.crypto.subtle.verify(
      'HMAC',
      key,
      signatureBytes,
      new TextEncoder().encode(encoded)
    );

    if (!sigOk) {
      return null;
    }

    const payload = JSON.parse(
      Buffer.from(encoded, 'base64url').toString('utf-8')
    );

    return payload;
  } catch {
    return null;
  }
};

export const createSession = async (username: string): Promise<string> => {
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

export const getSessionFromCookie = async (): Promise<{
  sub: string;
  role: string;
  exp: number;
  valid: boolean;
} | null> => {
  try {
    const cookieStore = await cookies();
    const raw = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!raw) return null;

    const payload = await verifyToken(raw);

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
): Promise<{
  sub: string;
  role: string;
  exp: number;
  valid: boolean;
} | null> => {
  try {
    const raw = request.cookies.get(SESSION_COOKIE_NAME)?.value;

    if (!raw) return null;

    const payload = await verifyToken(raw);
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

export const clearAdminSessionCookie = (
  response: NextResponse
): void => {
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