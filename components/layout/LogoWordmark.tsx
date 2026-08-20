import { comfortaaWordmark } from '../../lib/fonts/wordmark-font';

type LogoWordmarkProps = {
  className?: string;
};

export function LogoWordmark({ className = '' }: LogoWordmarkProps) {
  return (
    <span
      className={`${comfortaaWordmark.className} text-[19px] font-semibold tracking-[-0.02em] text-foreground leading-none truncate ${className}`}
    >
      theradarhub
    </span>
  );
}
