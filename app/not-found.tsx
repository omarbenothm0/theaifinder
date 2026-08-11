import type { Metadata } from 'next';
import Link from 'next/link';
import { FileQuestion, Home, Search } from 'lucide-react';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="w-16 h-16 bg-slate-100 text-slate-700 rounded-2xl flex items-center justify-center border border-slate-200 shadow-2xs">
        <FileQuestion className="w-8 h-8" />
      </div>

      <div className="space-y-2 max-w-md">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">404 - Page Not Found</h1>
        <p className="text-sm text-slate-600">
          The requested AI tool, category, or page could not be located in our directory.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <Home className="w-4 h-4" />
          Back to Homepage
        </Link>
        <Link
          href="/ai-tools"
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Search className="w-4 h-4" />
          Browse All Tools
        </Link>
      </div>
    </div>
  );
}
