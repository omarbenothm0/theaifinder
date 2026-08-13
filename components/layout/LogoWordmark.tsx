type LogoWordmarkProps = {
  className?: string;
};

export function LogoWordmark({ className = '' }: LogoWordmarkProps) {
  return (
    <span
      className={`font-[family-name:var(--font-wordmark)] text-[19px] font-semibold tracking-[-0.02em] text-foreground leading-none truncate ${className}`}
    >
      theradarhub
    </span>
  );
}
