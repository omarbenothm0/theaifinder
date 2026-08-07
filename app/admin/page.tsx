import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { CategoryService } from '../../lib/services/category.service';
import { ToolService } from '../../lib/services/tool.service';
import { AdminDashboard } from '../../components/admin/AdminDashboard';
import { generatePageMetadata } from '../../lib/seo/metadata';
import { verifySessionTokenFromCookie } from '../../lib/auth/adminSession';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: 'Admin Management Dashboard | AIFind',
    description: 'Manage tools, categories, and database listings.',
    canonicalUrl: 'https://aifind.io/admin'
  });
}

export default async function AdminPage() {
  // Defense-in-depth: middleware already gates /admin, verify again server-side
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('admin_session')?.value;

  if (!sessionCookie || !(await verifySessionTokenFromCookie(sessionCookie))) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-rose-700">
          Unauthorized. <a href="/admin/login" className="underline font-bold">Log in</a>.
        </div>
      </div>
    );
  }

  const [categories, toolsRes] = await Promise.all([
    CategoryService.getCategories(),
    ToolService.getTools({ limit: 100 })
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <AdminDashboard initialTools={toolsRes.tools} initialCategories={categories} />
    </div>
  );
}
