import { Metadata } from 'next';
import Link from 'next/link';
import { LogoWordmark, LOGO_VARIANT_LABELS, type LogoWordmarkVariant } from '../../components/layout/LogoWordmark';

export const metadata: Metadata = {
  title: 'Logo preview',
  robots: { index: false, follow: false },
};

const VARIANTS: LogoWordmarkVariant[] = ['1', '2', '3'];

export default function LogoPreviewPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 space-y-10">
      <div>
        <h1 className="text-lg font-medium text-foreground-strong">Navbar wordmark options</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Stack Sans Notch · preview at /logo-preview · pick variant 1, 2, or 3.
        </p>
      </div>

      {VARIANTS.map((variant) => {
        const meta = LOGO_VARIANT_LABELS[variant];
        return (
          <section key={variant} className="space-y-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.015em] text-muted-foreground">
                Variant {variant} — {meta.name}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{meta.description}</p>
            </div>
            <div className="h-16 flex items-center px-6 bg-background border border-border/50 rounded-lg">
              <Link href="/" className="inline-flex items-center h-16 focus:outline-hidden">
                <LogoWordmark variant={variant} />
              </Link>
            </div>
          </section>
        );
      })}
    </div>
  );
}
