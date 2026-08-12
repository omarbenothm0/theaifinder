'use client';

import { useId } from 'react';

type LogoMarkProps = {
  className?: string;
  /** Render height in CSS pixels (width scales from viewBox aspect ratio). */
  height?: number;
};

const STRIPE_COUNT = 9;
const VIEWBOX = { w: 28, h: 28 };

/** Radar-sweep beam: striped cone + origin dot. Monochrome via currentColor. */
export function LogoMark({ className = '', height = 26 }: LogoMarkProps) {
  const clipId = useId();

  // Cone: curved top, apex at bottom center (beam origin).
  const conePath = 'M 14 27.2 L 3.8 8.2 Q 14 3.8 24.2 8.2 Z';

  const stripeTop = 8.4;
  const stripeBottom = 25.2;
  const stripeSpan = stripeBottom - stripeTop;
  const stripeHeight = stripeSpan / (STRIPE_COUNT * 2 - 1);
  const stripeGap = stripeHeight;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
      height={height}
      width={(height * VIEWBOX.w) / VIEWBOX.h}
      className={`block shrink-0 ${className}`}
      fill="currentColor"
      aria-hidden
    >
      <defs>
        <clipPath id={clipId}>
          <path d={conePath} />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        {Array.from({ length: STRIPE_COUNT }, (_, i) => {
          const y = stripeTop + i * (stripeHeight + stripeGap);
          return (
            <rect
              key={i}
              x="0"
              y={y}
              width={VIEWBOX.w}
              height={stripeHeight}
              fill="currentColor"
            />
          );
        })}
      </g>

      <circle cx="14" cy="27.2" r="1.65" fill="currentColor" />
    </svg>
  );
}
