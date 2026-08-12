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
      <span
        aria-hidden
        className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground/10 text-[11px] font-medium text-foreground/70"
      >
        {name.charAt(0).toUpperCase()}
      </span>
    );
  }

  return (
    <img
      src={currentSrc}
      alt=""
      width={112}
      height={32}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      className="home-marquee-logo block max-h-8 max-w-full w-auto object-contain"
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
