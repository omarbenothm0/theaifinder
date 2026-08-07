import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'AIFind - Discover, Compare & Choose the Best AI Tools';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
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
                fontSize: '24px',
                color: '#FFFFFF',
              }}
            >
              AI
            </div>
            <span style={{ fontSize: '28px', fontWeight: '800', letterSpacing: '-0.5px' }}>
              AIFind<span style={{ color: '#10B981' }}>.io</span>
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
            AI DISCOVERY PLATFORM
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
            Discover, Compare & Choose the Best AI Tools
          </div>
          <div
            style={{
              fontSize: '22px',
              lineHeight: '1.5',
              color: '#94A3B8',
            }}
          >
            Find the right AI tool for any task. Search, compare, and filter 100+ top-rated AI software for writing, coding, video, images, and productivity.
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
          <span>Verified AI Software Directory &bull; 2026 Rankings</span>
          <span style={{ color: '#10B981', fontWeight: '600' }}>aifind.io</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
