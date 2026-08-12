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

    // Badge styling colors
    let badgeBg = '#10B981'; // Emerald
    let badgeText = '#FFFFFF';

    if (type === 'comparison') {
      badgeBg = '#F59E0B'; // Amber
    } else if (type === 'persona') {
      badgeBg = '#6366F1'; // Indigo
    } else if (type === 'tool') {
      badgeBg = '#06B6D4'; // Cyan
    }

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
            backgroundColor: '#0F172A', // Slate 900
            backgroundImage:
              'radial-gradient(circle at 80% 20%, #1E293B 0%, #0F172A 70%), radial-gradient(circle at 20% 80%, #064E3B 0%, transparent 50%)',
            padding: '60px',
            fontFamily: 'sans-serif',
            color: '#FFFFFF',
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
                  backgroundColor: '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '24px',
                  color: '#FFFFFF',
                }}
              >
                TR
              </div>
              <span style={{ fontSize: '28px', fontWeight: '800', letterSpacing: '-0.5px' }}>
                TheRadar<span style={{ color: '#10B981' }}>Hub</span>
              </span>
            </div>

            <div
              style={{
                backgroundColor: badgeBg,
                color: badgeText,
                padding: '8px 20px',
                borderRadius: '9999px',
                fontSize: '14px',
                fontWeight: '700',
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
                fontWeight: '800',
                lineHeight: '1.2',
                letterSpacing: '-1px',
                color: '#F8FAFC',
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: '20px',
                lineHeight: '1.5',
                color: '#94A3B8',
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
              borderTop: '1px solid #334155',
              paddingTop: '24px',
              fontSize: '16px',
              color: '#64748B',
            }}
          >
            <span>{SITE_OG_FOOTER}</span>
            <span style={{ color: '#10B981', fontWeight: '600' }}>{displayDomain}</span>
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
