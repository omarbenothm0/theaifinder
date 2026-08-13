import { ImageResponse } from 'next/og';
import { SITE_OG_BADGE_DEFAULT, SITE_HERO_TITLE } from '../lib/brand';
import { getDisplayDomain } from '../lib/seo/base-url';
import { SITE_DESCRIPTION, SITE_OG_FOOTER } from '../lib/seo/site-copy';

export const runtime = 'edge';

export const alt = `${SITE_HERO_TITLE} | TheRadarHub`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

const DS = {
  brand: '#1c1b19',
  brandRaised: '#2a2826',
  foreground: '#f5f3ef',
  muted: '#6b6963',
  border: '#d9d5cf',
} as const;

export default async function Image() {
  const displayDomain = getDisplayDomain();

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
          backgroundColor: DS.brand,
          backgroundImage: `radial-gradient(circle at 80% 20%, ${DS.brandRaised} 0%, ${DS.brand} 70%)`,
          padding: '60px',
          fontFamily: 'sans-serif',
          color: DS.foreground,
        }}
      >
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
                backgroundColor: DS.foreground,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 500,
                fontSize: '20px',
                color: DS.brand,
              }}
            >
              TR
            </div>
            <span style={{ fontSize: '28px', fontWeight: 500, letterSpacing: '-0.5px', color: DS.foreground }}>
              TheRadarHub
            </span>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(245, 243, 239, 0.1)',
              color: DS.foreground,
              border: `1px solid rgba(217, 213, 207, 0.35)`,
              padding: '8px 20px',
              borderRadius: '9999px',
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            {SITE_OG_BADGE_DEFAULT}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '1000px' }}>
          <div
            style={{
              fontSize: '52px',
              fontWeight: 500,
              lineHeight: '1.2',
              letterSpacing: '-1px',
              color: DS.foreground,
            }}
          >
            {SITE_HERO_TITLE}
          </div>
          <div
            style={{
              fontSize: '22px',
              lineHeight: '1.5',
              color: DS.muted,
            }}
          >
            {SITE_DESCRIPTION}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: `1px solid ${DS.border}`,
            paddingTop: '24px',
            fontSize: '16px',
            color: DS.muted,
          }}
        >
          <span>{SITE_OG_FOOTER}</span>
          <span style={{ color: DS.foreground, fontWeight: 500 }}>{displayDomain}</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
