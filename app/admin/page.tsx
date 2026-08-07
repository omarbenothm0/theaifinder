import { Metadata } from 'next';
import { CategoryService } from '../../lib/services/category.service';
import { ToolService } from '../../lib/services/tool.service';
import { AdminDashboard } from '../../components/admin/AdminDashboard';
import { generatePageMetadata } from '../../lib/seo/metadata';
import { siteUrl } from '../../lib/site-config';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: 'Admin Management Dashboard | AIFind',
    description: 'Manage tools, categories, and database listings.',
    canonicalUrl: siteUrl('/admin')
  });
}

export default async function AdminPage() {
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
