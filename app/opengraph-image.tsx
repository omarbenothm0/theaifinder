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
          backgroundColor: '#0F172A',
          backgroundImage:
            'radial-gradient(circle at 80% 20%, #1E293B 0%, #0F172A 70%), radial-gradient(circle at 20% 80%, #064E3B 0%, transparent 50%)',
          padding: '60px',
          fontFamily: 'sans-serif',
          color: '#FFFFFF',
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
                backgroundColor: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '20px',
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
              backgroundColor: '#10B981',
              color: '#FFFFFF',
              padding: '8px 20px',
              borderRadius: '9999px',
              fontSize: '14px',
              fontWeight: '700',
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
              fontWeight: '800',
              lineHeight: '1.2',
              letterSpacing: '-1px',
              color: '#F8FAFC',
            }}
          >
            {SITE_HERO_TITLE}
          </div>
          <div
            style={{
              fontSize: '22px',
              lineHeight: '1.5',
              color: '#94A3B8',
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
      ...size,
    }
  );
}
