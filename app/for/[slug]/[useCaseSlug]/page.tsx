import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { UseCaseService } from '../../../../lib/services/use-case.service';
import { CategoryService } from '../../../../lib/services/category.service';
import { PersonaService } from '../../../../lib/services/persona.service';
import { JsonLd } from '../../../../components/shared/JsonLd';
import { InternalLinks } from '../../../../components/shared/InternalLinks';
import { UseCaseToolCard } from '../../../../components/tool/UseCaseToolCard';
import {
  generateUseCaseMetadata,
  generateNotFoundMetadata,
} from '../../../../lib/seo/metadata';
import { isUseCasePageIndexable } from '../../../../lib/seo/indexability';
import { generateBreadcrumbSchema } from '../../../../lib/seo/jsonld';
import { getBaseUrl, absoluteUrl } from '../../../../lib/seo/base-url';
import { ToolWithUseCaseFit } from '../../../../types/tool';
import { ArrowLeft, CheckCircle2, Kanban } from 'lucide-react';

export const revalidate = 3600;

const SECTION_LABELS: Record<string, string> = {
  task: 'AI Task Management',
  planning: 'AI Project Planning',
};

function groupToolsBySection(tools: ToolWithUseCaseFit[]): Array<{ key: string; label: string; tools: ToolWithUseCaseFit[] }> {
  const sections = new Map<string, ToolWithUseCaseFit[]>();

  for (const tool of tools) {
    const key = tool.useCaseFit.section || 'default';
    const list = sections.get(key) ?? [];
    list.push(tool);
    sections.set(key, list);
  }

  const orderedKeys =
    sections.has('task') || sections.has('planning')
      ? ['task', 'planning', 'default']
      : ['default'];

  return orderedKeys
    .filter((key) => sections.has(key))
    .map((key) => ({
      key,
      label: SECTION_LABELS[key] ?? 'Verified Tools',
      tools: sections.get(key) ?? [],
    }));
}

export async function generateStaticParams() {
  const pages = await UseCaseService.getIndexablePages();
  return pages.map((page) => ({
    slug: page.personaSlug,
    useCaseSlug: page.useCaseSlug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; useCaseSlug: string }>;
}): Promise<Metadata> {
  const { slug, useCaseSlug } = await params;
  const page = await UseCaseService.getPersonaUseCasePage(slug, useCaseSlug);
  if (!page) return generateNotFoundMetadata('Use Case Not Found');

  return generateUseCaseMetadata(
    page.persona,
    page.useCase,
    page.strongPlusCount,
    page.link.pageEnabled
  );
}

export default async function PersonaUseCasePage({
  params,
}: {
  params: Promise<{ slug: string; useCaseSlug: string }>;
}) {
  const { slug, useCaseSlug } = await params;
  const page = await UseCaseService.getPersonaUseCasePage(slug, useCaseSlug);

  if (!page) {
    notFound();
  }

  const indexResult = isUseCasePageIndexable(page.strongPlusCount, page.link.pageEnabled);
  if (!indexResult.indexable) {
    notFound();
  }

  const [categories, personas] = await Promise.all([
    CategoryService.getCategories(),
    PersonaService.getPersonas(),
  ]);

  const groupedTools = groupToolsBySection(page.tools);
  const isMergedTaskPage = useCaseSlug === 'task-management';

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: getBaseUrl() },
    { name: 'Workflows', url: absoluteUrl('/ai-tools-directory') },
    { name: page.persona.title, url: absoluteUrl(`/for/${page.persona.slug}`) },
    { name: page.useCase.title, url: absoluteUrl(`/for/${page.persona.slug}/${page.useCase.slug}`) },
  ]);

  return (
    <div className="space-y-10">
      <JsonLd schema={breadcrumbSchema} />

      <div className="max-w-4xl mx-auto space-y-4">
        <Link
          href={`/for/${page.persona.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground-strong transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to {page.persona.title}
        </Link>

        <div className="bg-inverted text-inverted-foreground rounded-3xl p-8 sm:p-12 shadow-lg text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-accent/10 border border-accent/30 text-accent px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Kanban className="w-4 h-4 text-accent" />
            {page.persona.title} &bull; {page.useCase.title}
          </div>
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight">{page.useCase.title}</h1>
          <p className="text-sm sm:text-base text-inverted-foreground/70 max-w-2xl mx-auto leading-relaxed">
            {page.useCase.description}
          </p>
          {isMergedTaskPage && (
            <p className="text-xs text-inverted-foreground/70 max-w-xl mx-auto">
              Project planning is merged here — verified overlap between task and planning tools exceeded 70%.
            </p>
          )}
        </div>
      </div>

      {groupedTools.map((section) => (
        <div key={section.key} className="space-y-4">
          <div className="flex items-center justify-between border-b border-border/50 pb-3">
            <h2 className="text-xl font-medium text-foreground-strong flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              {section.label} ({section.tools.length})
            </h2>
          </div>
          <div className="grid gap-4">
            {section.tools.map((tool) => (
              <UseCaseToolCard key={`${tool.slug}-${tool.useCaseFit.section}`} tool={tool} />
            ))}
          </div>
        </div>
      ))}

      <InternalLinks categories={categories} personas={personas} />
    </div>
  );
}
