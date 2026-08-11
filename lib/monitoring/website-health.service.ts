import { getMonitoringConfig } from './config';
import { validateMonitoringUrl } from './url-validation';
import type { WebsiteHealthResult } from '../../types/monitoring';

function isRedirectStatus(status: number): boolean {
  return status === 301 || status === 302 || status === 303 || status === 307 || status === 308;
}

async function fetchWithTimeout(
  url: string,
  method: 'HEAD' | 'GET',
  timeoutMs: number,
  userAgent: string
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      method,
      redirect: 'manual',
      signal: controller.signal,
      headers: {
        'User-Agent': userAgent,
        Accept: 'text/html,application/xhtml+xml',
      },
    });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Server-side website health probe.
 * Stores observational data only — never mutates editorial tool fields.
 */
export async function checkWebsiteHealth(requestedUrl: string): Promise<WebsiteHealthResult> {
  const config = getMonitoringConfig();
  const startedAt = Date.now();

  const initialValidation = validateMonitoringUrl(requestedUrl);
  if (initialValidation.valid === false) {
    return {
      status: 'invalid_url',
      responseTimeMs: Date.now() - startedAt,
      redirectCount: 0,
      errorCode: initialValidation.errorCode,
      errorMessage: initialValidation.reason,
      requestedUrl,
    };
  }

  let currentUrl = initialValidation.normalizedUrl;
  let redirectCount = 0;
  let lastHttpStatus: number | null = null;

  while (redirectCount <= config.maxRedirects) {
    const hopValidation = validateMonitoringUrl(currentUrl);
    if (hopValidation.valid === false) {
      return {
        status: 'invalid_url',
        httpStatus: lastHttpStatus,
        finalUrl: currentUrl,
        responseTimeMs: Date.now() - startedAt,
        isHttps: currentUrl.startsWith('https://'),
        redirectCount,
        errorCode: hopValidation.errorCode,
        errorMessage: hopValidation.reason,
        requestedUrl,
      };
    }

    currentUrl = hopValidation.normalizedUrl;

    try {
      let response = await fetchWithTimeout(
        currentUrl,
        'HEAD',
        config.requestTimeoutMs,
        config.userAgent
      );

      if (response.status === 405 || response.status === 501) {
        response = await fetchWithTimeout(
          currentUrl,
          'GET',
          config.requestTimeoutMs,
          config.userAgent
        );
      }

      lastHttpStatus = response.status;

      if (isRedirectStatus(response.status)) {
        const location = response.headers.get('location');
        if (!location) {
          return {
            status: 'failed',
            httpStatus: response.status,
            finalUrl: currentUrl,
            responseTimeMs: Date.now() - startedAt,
            isHttps: currentUrl.startsWith('https://'),
            redirectCount,
            errorCode: 'redirect_without_location',
            errorMessage: `Redirect ${response.status} missing Location header`,
            requestedUrl,
          };
        }

        currentUrl = new URL(location, currentUrl).toString();
        redirectCount += 1;
        continue;
      }

      const finalValidation = validateMonitoringUrl(currentUrl);
      const finalUrl = finalValidation.valid ? finalValidation.normalizedUrl : currentUrl;
      const isSuccess = response.status >= 200 && response.status < 400;

      return {
        status: isSuccess ? 'success' : 'failed',
        httpStatus: response.status,
        finalUrl,
        responseTimeMs: Date.now() - startedAt,
        isHttps: finalUrl.startsWith('https://'),
        redirectCount,
        errorCode: isSuccess ? undefined : 'http_error',
        errorMessage: isSuccess ? undefined : `HTTP ${response.status}`,
        requestedUrl,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown network error';
      const isTimeout =
        error instanceof Error &&
        (error.name === 'AbortError' || message.toLowerCase().includes('aborted'));

      return {
        status: isTimeout ? 'timeout' : 'failed',
        httpStatus: lastHttpStatus,
        finalUrl: currentUrl,
        responseTimeMs: Date.now() - startedAt,
        isHttps: currentUrl.startsWith('https://'),
        redirectCount,
        errorCode: isTimeout ? 'timeout' : 'network_error',
        errorMessage: message,
        requestedUrl,
      };
    }
  }

  return {
    status: 'failed',
    httpStatus: lastHttpStatus,
    finalUrl: currentUrl,
    responseTimeMs: Date.now() - startedAt,
    isHttps: currentUrl.startsWith('https://'),
    redirectCount,
    errorCode: 'too_many_redirects',
    errorMessage: `Exceeded ${config.maxRedirects} redirects`,
    requestedUrl,
  };
}
