import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { CategoryService } from '../../lib/services/category.service';
import { ToolService } from '../../lib/services/tool.service';
import { dbRepository } from '../../lib/dbRepository';
import { MonitoringService } from '../../lib/monitoring/monitoring.service';
import { AdminDashboard } from '../../components/admin/AdminDashboard';
import { generatePageMetadata } from '../../lib/seo/metadata';
import { sitePageTitle } from '../../lib/brand';
import {
  SESSION_COOKIE_NAME,
  getSessionFromCookie,
  isAdminAuthenticated,
} from '../../lib/auth/adminSession';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: sitePageTitle('Admin Management Dashboard'),
    description: 'Manage tools, categories, and database listings.',
    canonicalUrl: '/admin',
    noIndex: true,
  });
}

export default async function AdminPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
    redirect('/admin/login?err=unauthorized&from=/admin');
  }

  let sessionInfo: { sub: string; exp: number } | null = null;
  try {
    const sess = await getSessionFromCookie();
    if (sess) {
      sessionInfo = { sub: sess.sub, exp: sess.exp };
    }
  } catch {
    sessionInfo = null;
  }

  const [categories, toolsRes, adminStats] = await Promise.all([
    CategoryService.getCategories({ includeUnpublished: true }),
    ToolService.getTools({ limit: 500, includeUnpublished: true }),
    dbRepository.getAdminStats(),
  ]);

  const monitoringSummaries = await MonitoringService.getSummariesForTools(toolsRes.tools);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <AdminDashboard
        initialTools={toolsRes.tools}
        initialCategories={categories}
        initialStats={adminStats}
        initialMonitoringSummaries={monitoringSummaries}
        adminUser={sessionInfo?.sub}
        sessionExpiresAtEpoch={sessionInfo?.exp}
      />
    </div>
  );
}
