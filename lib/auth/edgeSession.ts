import type { NextRequest } from 'next/server';

export const SESSION_COOKIE_NAME = 'admin_session';

const base64UrlSafe = (buf: ArrayBuffer | Buffer): string => {
  const b = Buffer.isBuffer(buf) ? buf : Buffer.from(buf);
  return b.toString('base64url');
};

const getAuthSecret = (): string => {
  return (
    process.env.ADMIN_AUTH_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    'fallback-dev-secret-change-immediately-9780e2'
  );
};

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

const verifyToken = async (token: string): Promise<Record<string, unknown> | null> => {
  try {
    const [encoded, signature] = token.split('.');
    if (!encoded || !signature) return null;

    const key = await getHmacKey();
    const signatureBytes = Buffer.from(signature, 'base64url');

    const sigOk = await globalThis.crypto.subtle.verify(
      'HMAC',
      key,
      signatureBytes,
      new TextEncoder().encode(encoded)
    );

    if (!sigOk) return null;

    return JSON.parse(Buffer.from(encoded, 'base64url').toString('utf-8'));
  } catch {
    return null;
  }
};

/** Edge-runtime-safe session verification for middleware. */
export async function isAdminAuthenticatedFromRequest(
  request: NextRequest
): Promise<boolean> {
  try {
    const raw = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!raw) return false;

    const payload = await verifyToken(raw);
    if (!payload) return false;

    const now = Math.floor(Date.now() / 1000);
    return payload.role === 'admin' && Number(payload.exp) > now;
  } catch {
    return false;
  }
}

export { base64UrlSafe, getAuthSecret, getHmacKey, verifyToken };
