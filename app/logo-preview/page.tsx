import { Metadata } from 'next';
import Link from 'next/link';
import { LogoMark } from '../../components/layout/LogoMark';
import { LogoWordmark } from '../../components/layout/LogoWordmark';

export const metadata: Metadata = {
  title: 'Logo preview',
  robots: { index: false, follow: false },
};

export default function LogoPreviewPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 space-y-10">
      <div>
        <h1 className="text-lg font-medium text-foreground-strong">Navbar logo</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Comfortaa wordmark · satellite antenna mark · preview at /logo-preview
        </p>
      </div>

      <section className="space-y-3">
        <div className="h-16 flex items-center px-6 bg-background border border-border/50 rounded-lg">
          <Link href="/" className="inline-flex items-end gap-2.5 h-16 text-foreground-strong focus:outline-hidden">
            <LogoMark height={31} />
            <LogoWordmark />
          </Link>
        </div>
      </section>
    </div>
  );
}
