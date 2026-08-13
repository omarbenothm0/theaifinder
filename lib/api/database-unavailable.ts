/**
 * Shared helpers for API routes when Prisma/PostgreSQL is unreachable.
 * Never expose driver messages, codes, or stack traces to clients.
 */

const CONNECTION_ERROR_CODES = new Set([
  'P1001', // Can't reach database server
  'P1002', // Database server timed out
  'P1008', // Operations timed out
  'P1017', // Server closed the connection
  'P2024', // Timed out fetching a new connection from the pool
]);

function getErrorCode(error: unknown): string | undefined {
  if (!error || typeof error !== 'object') return undefined;
  if ('code' in error && typeof error.code === 'string') return error.code;
  return undefined;
}

function getErrorMessage(error: unknown): string {
  if (!error || typeof error !== 'object' || !('message' in error)) return '';
  return typeof error.message === 'string' ? error.message : '';
}

export function isDatabaseUnavailableError(error: unknown): boolean {
  const code = getErrorCode(error);
  if (code && CONNECTION_ERROR_CODES.has(code)) return true;

  const message = getErrorMessage(error).toLowerCase();
  return (
    message.includes('e57p01') ||
    message.includes('terminating connection due to administrator command') ||
    message.includes("can't reach database server") ||
    message.includes('server has closed the connection')
  );
}

export function databaseUnavailableResponse() {
  return Response.json(
    { error: 'Service temporarily unavailable' },
    { status: 503, headers: { 'Cache-Control': 'no-store' } }
  );
}
