import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CategoryService } from '../../../lib/services/category.service';
import { ToolService } from '../../../lib/services/tool.service';
import { PersonaService } from '../../../lib/services/persona.service';
import { ToolCard } from '../../../components/tool/ToolCard';
import { InternalLinks } from '../../../components/shared/InternalLinks';
import { JsonLd } from '../../../components/shared/JsonLd';
import { generateCategoryMetadata, generateNotFoundMetadata } from '../../../lib/seo/metadata';
import { isCategoryIndexable } from '../../../lib/seo/indexability';
import { generateBreadcrumbSchema } from '../../../lib/seo/jsonld';
import { getBaseUrl, absoluteUrl } from '../../../lib/seo/base-url';
import { Layers, Sparkles } from 'lucide-react';
import { RealEstateWorkflowLinks } from '../../../components/persona/RealEstateWorkflowLinks';
import { WritingCategoryContent } from '../../../components/category/WritingCategoryContent';
import { CodingCategoryContent } from '../../../components/category/CodingCategoryContent';
import { ProjectManagementCategoryContent } from '../../../components/category/ProjectManagementCategoryContent';
import { StudyEducationCategoryContent } from '../../../components/category/StudyEducationCategoryContent';
import { ProductivityCategoryContent } from '../../../components/category/ProductivityCategoryContent';
import { MarketingCategoryContent } from '../../../components/category/MarketingCategoryContent';
import { SeoCategoryContent } from '../../../components/category/SeoCategoryContent';

const BASE_URL = getBaseUrl();

export const revalidate = 3600;

export async function generateStaticParams() {
  const categories = await CategoryService.getCategories();
  return categories
    .filter((c) => isCategoryIndexable(c).indexable)
    .map((c) => ({
      slug: c.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = await CategoryService.getCategoryBySlug(slug);
  if (!category) return generateNotFoundMetadata('Category Not Found');
  return generateCategoryMetadata(category);
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await CategoryService.getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const [toolsRes, categories, personas] = await Promise.all([
    ToolService.getTools({ category: category.slug, limit: 100 }),
    CategoryService.getCategories(),
    PersonaService.getPersonas()
  ]);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: BASE_URL },
    { name: 'Categories', url: absoluteUrl('/ai-tools-directory') },
    { name: category.name, url: absoluteUrl(`/category/${category.slug}`) },
  ]);

  if (category.slug === 'writing') {
    return (
      <>
        <JsonLd schema={breadcrumbSchema} />
        <WritingCategoryContent category={category} categories={categories} personas={personas} />
      </>
    );
  }

  if (category.slug === 'coding') {
    return (
      <>
        <JsonLd schema={breadcrumbSchema} />
        <CodingCategoryContent category={category} categories={categories} personas={personas} />
      </>
    );
  }

  if (category.slug === 'project-management') {
    return (
      <>
        <JsonLd schema={breadcrumbSchema} />
        <ProjectManagementCategoryContent
          category={category}
          categories={categories}
          personas={personas}
        />
      </>
    );
  }

  if (category.slug === 'study-education') {
    return (
      <>
        <JsonLd schema={breadcrumbSchema} />
        <StudyEducationCategoryContent
          category={category}
          categories={categories}
          personas={personas}
        />
      </>
    );
  }

  if (category.slug === 'productivity') {
    return (
      <>
        <JsonLd schema={breadcrumbSchema} />
        <ProductivityCategoryContent
          category={category}
          categories={categories}
          personas={personas}
        />
      </>
    );
  }

  if (category.slug === 'marketing') {
    return (
      <>
        <JsonLd schema={breadcrumbSchema} />
        <MarketingCategoryContent
          category={category}
          categories={categories}
          personas={personas}
        />
      </>
    );
  }

  if (category.slug === 'seo') {
    return (
      <>
        <JsonLd schema={breadcrumbSchema} />
        <SeoCategoryContent category={category} categories={categories} personas={personas} />
      </>
    );
  }

  return (
    <div className="space-y-10">
      <JsonLd schema={breadcrumbSchema} />

      {/* Hero Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-lg max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <Layers className="w-4 h-4 text-emerald-400" />
          Category Hub &bull; {category.toolCount} Software Listings
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          {category.name} AI Tools
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {category.description}
        </p>
      </div>

      {(category.slug === 'image' || category.slug === 'presentations') && (
        <RealEstateWorkflowLinks variant="category" />
      )}

      {/* Tools Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            Available Tools in {category.name} ({toolsRes.tools.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolsRes.tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>

      <InternalLinks
        categories={categories}
        personas={personas}
        excludeCategorySlug={category.slug}
      />
    </div>
  );
}
