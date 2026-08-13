'use client';

import { useState } from 'react';

type MarqueeLogoImageProps = {
  src: string;
  name: string;
  fallbackSrc?: string;
};

export function MarqueeLogoImage({ src, name, fallbackSrc }: MarqueeLogoImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span aria-hidden className="home-marquee-logo-fallback">
        {name.charAt(0).toUpperCase()}
      </span>
    );
  }

  return (
    <img
      src={currentSrc}
      alt=""
      width={32}
      height={32}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      className="home-marquee-logo"
      onError={() => {
        if (fallbackSrc && currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
          return;
        }
        setFailed(true);
      }}
    />
  );
}
