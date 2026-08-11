/**
 * Manual monitoring engine smoke tests (run with: npx tsx scripts/test-monitoring.ts)
 */
import { validateMonitoringUrl } from '../lib/monitoring/url-validation';
import { getVerificationFreshness } from '../lib/monitoring/freshness.service';
import { checkWebsiteHealth } from '../lib/monitoring/website-health.service';
import type { Tool } from '../types/tool';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

async function testUrlValidation() {
  const blocked = validateMonitoringUrl('http://127.0.0.1/');
  assert(blocked.valid === false && blocked.errorCode === 'blocked_host', '127.0.0.1 should be blocked');

  const localhost = validateMonitoringUrl('http://localhost:3000/');
  assert(localhost.valid === false, 'localhost should be blocked');

  const malformed = validateMonitoringUrl('not-a-url');
  assert(malformed.valid === false && malformed.errorCode === 'malformed_url', 'malformed URL rejected');

  const ftp = validateMonitoringUrl('ftp://example.com/file');
  assert(ftp.valid === false && ftp.errorCode === 'unsupported_protocol', 'ftp rejected');

  const https = validateMonitoringUrl('https://example.com');
  assert(https.valid, 'public https URL accepted');

  const http = validateMonitoringUrl('http://example.com');
  assert(http.valid, 'public http URL accepted');

  console.log('✓ URL validation tests passed');
}

function testFreshness() {
  const recentTool = {
    lastVerifiedDate: new Date().toISOString().split('T')[0],
  } as Tool;
  const recent = getVerificationFreshness(recentTool);
  assert(recent.freshness === 'recent', 'recent verification detected');

  const staleTool = {
    lastVerifiedDate: '2020-01-01',
  } as Tool;
  const stale = getVerificationFreshness(staleTool);
  assert(stale.freshness === 'stale', 'stale verification detected');

  const neverTool = {} as Tool;
  const never = getVerificationFreshness(neverTool);
  assert(never.freshness === 'never_verified', 'never verified detected');

  console.log('✓ Freshness tests passed');
}

async function testWebsiteHealth() {
  const example = await checkWebsiteHealth('https://example.com');
  assert(example.status === 'success', 'example.com should succeed');
  assert((example.httpStatus ?? 0) >= 200, 'example.com returns HTTP status');

  const redirect = await checkWebsiteHealth('http://example.com');
  assert(redirect.status === 'success', 'example.com redirect should succeed');

  const notFound = await checkWebsiteHealth('https://example.com/this-path-should-not-exist-404-test');
  assert(notFound.status === 'failed', '404 path should fail health check');

  const invalid = await checkWebsiteHealth('http://127.0.0.1/');
  assert(invalid.status === 'invalid_url', 'private IP should be invalid_url');

  const unreachable = await checkWebsiteHealth('https://this-domain-definitely-does-not-exist-xyz123.invalid/');
  assert(unreachable.status === 'failed' || unreachable.status === 'timeout', 'unreachable domain fails');

  console.log('✓ Website health tests passed');
}

async function main() {
  await testUrlValidation();
  testFreshness();
  await testWebsiteHealth();
  console.log('\nAll monitoring smoke tests passed.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
