import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { SESSION_COOKIE_NAME, getAdminCredentials } from '../../../lib/auth/adminSession';
import { generatePageMetadata } from '../../../lib/seo/metadata';
import { Shield, Lock, ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: 'Admin Login | AIFind',
    description: 'Secure administrator access to the AIFind database management dashboard.',
    canonicalUrl: '/admin/login',
    noIndex: true,
  });
}

export default async function AdminLoginPage(props: {
  searchParams?: Promise<{ from?: string; err?: string }>;
}) {
  const params = (await (props.searchParams ?? Promise.resolve({}))) as { from?: string; err?: string };
  const fromParam = params.from || '/admin';
  const errParam = params.err;

  try {
    const cookieStore = await cookies();
    const existing = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (existing) {
      redirect(fromParam);
    }
  } catch {
    // ignore
  }

  try {
    getAdminCredentials();
  } catch {
    // ignore
  }

  return (
    <div className="min-h-[calc(100vh-220px)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to site
          </Link>
          <div className="flex justify-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center shadow-lg">
              <Shield className="w-7 h-7 text-emerald-400" />
            </div>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Administrator Sign-In
          </h1>
          <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
            Authorized personnel only. Enter credentials to access the database management panel.
          </p>
        </div>

        <form
          action="/api/admin/login"
          method="post"
          className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-5"
        >
          <input type="hidden" name="redirect" value="true" />
          <input type="hidden" name="from" value={fromParam} />

          {errParam === 'unauthorized' && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold px-3 py-2 rounded-lg">
              Your session expired or you are not authenticated. Please sign in again.
            </div>
          )}
          {errParam === 'invalid' && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold px-3 py-2 rounded-lg">
              Invalid username or password.
            </div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="username" className="block text-xs font-bold text-slate-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              placeholder="admin"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-xs font-bold text-slate-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••••••"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-5 py-3 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <Lock className="w-4 h-4 text-emerald-400" />
            Sign In to Admin Panel
          </button>

          <p className="text-[11px] text-slate-400 text-center leading-relaxed">
            Sessions expire after 1 hour of inactivity. All actions are logged.
            Configure ADMIN_USERNAME and ADMIN_PASSWORD in your environment to change defaults.
          </p>
        </form>
      </div>
    </div>
  );
}
