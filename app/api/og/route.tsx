import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { SITE_OG_BADGE_DEFAULT } from '../../../lib/brand';
import { getDisplayDomain } from '../../../lib/seo/base-url';
import { SITE_OG_DEFAULT_DESCRIPTION, SITE_OG_FOOTER } from '../../../lib/seo/site-copy';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const title = searchParams.get('title') || 'Discover, Compare & Choose Best AI Tools';
    const description =
      searchParams.get('description') ||
      SITE_OG_DEFAULT_DESCRIPTION;
    const badge = searchParams.get('badge') || SITE_OG_BADGE_DEFAULT;
    const type = searchParams.get('type') || 'default';
    const displayDomain = getDisplayDomain();

    const badgeStyles: Record<string, { bg: string; text: string; border: string }> = {
      default: { bg: 'rgba(245, 243, 239, 0.1)', text: '#f5f3ef', border: 'rgba(217, 213, 207, 0.35)' },
      comparison: { bg: '#b8860b', text: '#f5f3ef', border: 'transparent' },
      persona: { bg: '#6d28d9', text: '#f5f3ef', border: 'transparent' },
      tool: { bg: '#2a7a3a', text: '#f5f3ef', border: 'transparent' },
    };
    const { bg: badgeBg, text: badgeText, border: badgeBorder } = badgeStyles[type] ?? badgeStyles.default;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            backgroundColor: '#1c1b19',
            backgroundImage:
              'radial-gradient(circle at 80% 20%, #2a2826 0%, #1c1b19 70%)',
            padding: '60px',
            fontFamily: 'sans-serif',
            color: '#f5f3ef',
          }}
        >
          {/* Top Row: Brand Logo & Type Badge */}
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: '#f5f3ef',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 500,
                  fontSize: '24px',
                  color: '#1c1b19',
                }}
              >
                TR
              </div>
              <span style={{ fontSize: '28px', fontWeight: 500, letterSpacing: '-0.5px', color: '#f5f3ef' }}>
                TheRadarHub
              </span>
            </div>

            <div
              style={{
                backgroundColor: badgeBg,
                color: badgeText,
                border: `1px solid ${badgeBorder}`,
                padding: '8px 20px',
                borderRadius: '9999px',
                fontSize: '14px',
                fontWeight: 500,
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              {badge}
            </div>
          </div>

          {/* Center Content: Title & Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '1000px' }}>
            <div
              style={{
                fontSize: title.length > 50 ? '42px' : '52px',
                fontWeight: 500,
                lineHeight: '1.2',
                letterSpacing: '-1px',
                color: '#f5f3ef',
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: '20px',
                lineHeight: '1.5',
                color: '#6b6963',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                overflow: 'hidden',
              }}
            >
              {description}
            </div>
          </div>

          {/* Bottom Footer Row */}
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid #d9d5cf',
              paddingTop: '24px',
              fontSize: '16px',
              color: '#6b6963',
            }}
          >
            <span>{SITE_OG_FOOTER}</span>
            <span style={{ color: '#f5f3ef', fontWeight: 500 }}>{displayDomain}</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate OG image: ${e.message}`, { status: 500 });
  }
}
