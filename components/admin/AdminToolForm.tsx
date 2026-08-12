'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Tool,
  Category,
  Persona,
  PricingModel,
  ReviewState,
  PublishStatus,
  PricingTier,
  ToolSource,
} from '../../types/tool';
import { ToolMonitoringSummary } from '../../types/monitoring';
import {
  getMonitoringSignalEmoji,
  getMonitoringSignalLabel,
} from '../../lib/monitoring/freshness.service';
import {
  validateToolInput,
  validateToolForPublish,
  formatValidationErrors,
  groupValidationErrors,
  parseCsvField,
} from '../../lib/validation/tool.validation';
import { isToolIndexable } from '../../lib/seo/indexability';
import { Activity, RefreshCw, X, ExternalLink, AlertCircle } from 'lucide-react';

interface AdminToolFormProps {
  editingTool: Tool | null;
  categories: Category[];
  personas: Persona[];
  allTools: Tool[];
  onClose: () => void;
  onSaved: (tool: Tool) => void;
  monitoringSummary?: ToolMonitoringSummary;
  onRunMonitoringCheck?: () => void;
  monitoringStatus?: 'idle' | 'running' | 'error';
  monitoringMessage?: string;
}

function splitLines(value: string): string[] {
  return value
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function AdminToolForm({
  editingTool,
  categories,
  personas,
  allTools,
  onClose,
  onSaved,
  monitoringSummary,
  onRunMonitoringCheck,
  monitoringStatus = 'idle',
  monitoringMessage = '',
}: AdminToolFormProps) {
  const isEdit = Boolean(editingTool);

  const [name, setName] = useState(editingTool?.name ?? '');
  const [slug, setSlug] = useState(editingTool?.slug ?? '');
  const [logo, setLogo] = useState(editingTool?.logo ?? '');
  const [websiteUrl, setWebsiteUrl] = useState(editingTool?.websiteUrl ?? '');
  const [affiliateUrl, setAffiliateUrl] = useState(editingTool?.affiliateUrl ?? '');
  const [affiliateEnabled, setAffiliateEnabled] = useState(
    editingTool?.affiliateEnabled ?? false
  );
  const [affiliateProgram, setAffiliateProgram] = useState(
    editingTool?.affiliateProgram ?? ''
  );
  const [companyName, setCompanyName] = useState(editingTool?.companyName ?? '');
  const [tagline, setTagline] = useState(editingTool?.tagline ?? '');
  const [description, setDescription] = useState(editingTool?.description ?? '');
  const [categoryId, setCategoryId] = useState(
    editingTool?.categoryId ?? categories[0]?.id ?? ''
  );
  const [pricingModel, setPricingModel] = useState<PricingModel>(
    editingTool?.pricingModel ?? 'Freemium'
  );
  const [monthlyPrice, setMonthlyPrice] = useState<number | ''>(
    editingTool?.monthlyPrice ?? ''
  );
  const [pricingTiersJson, setPricingTiersJson] = useState(
    editingTool?.pricingTiers ? JSON.stringify(editingTool.pricingTiers, null, 2) : ''
  );
  const [tagsStr, setTagsStr] = useState(editingTool?.tags?.join(', ') ?? '');
  const [featuresStr, setFeaturesStr] = useState(editingTool?.features?.join(', ') ?? '');
  const [prosStr, setProsStr] = useState(editingTool?.pros?.join(', ') ?? '');
  const [consStr, setConsStr] = useState(editingTool?.cons?.join(', ') ?? '');
  const [platformsStr, setPlatformsStr] = useState(editingTool?.platforms?.join(', ') ?? '');
  const [screenshotsStr, setScreenshotsStr] = useState(
    editingTool?.screenshots?.join('\n') ?? ''
  );
  const [targetUsers, setTargetUsers] = useState<string[]>(editingTool?.targetUsers ?? []);
  const [alternatives, setAlternatives] = useState<string[]>(editingTool?.alternatives ?? []);
  const [verified, setVerified] = useState(editingTool?.verified ?? false);
  const [featured, setFeatured] = useState(editingTool?.featured ?? false);
  const [trending, setTrending] = useState(editingTool?.trending ?? false);
  const [hasApi, setHasApi] = useState(editingTool?.hasApi ?? false);
  const [hasMobileApp, setHasMobileApp] = useState(editingTool?.hasMobileApp ?? false);
  const [hasExtension, setHasExtension] = useState(editingTool?.hasExtension ?? false);
  const [rating, setRating] = useState<number>(editingTool?.rating ?? 0);
  const [reviewCount, setReviewCount] = useState<number>(editingTool?.reviewCount ?? 0);
  const [pricingSource, setPricingSource] = useState(editingTool?.pricingSource ?? '');
  const [featureSource, setFeatureSource] = useState(editingTool?.featureSource ?? '');
  const [verifiedBy, setVerifiedBy] = useState(
    editingTool?.verifiedBy ?? 'AI Find Editorial Team'
  );
  const [reviewState, setReviewState] = useState<ReviewState>(
    editingTool?.reviewState ?? 'unverified'
  );
  const [reviewRequestedAt, setReviewRequestedAt] = useState(
    editingTool?.reviewRequestedAt?.slice(0, 10) ?? ''
  );
  const [reviewAssignedTo, setReviewAssignedTo] = useState(
    editingTool?.reviewAssignedTo ?? ''
  );
  const [reviewNotes, setReviewNotes] = useState(editingTool?.reviewNotes ?? '');
  const [sourcesJson, setSourcesJson] = useState(
    editingTool?.sources ? JSON.stringify(editingTool.sources, null, 2) : ''
  );
  const [publishStatus, setPublishStatus] = useState<PublishStatus>(
    editingTool?.publishStatus ?? 'draft'
  );

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [saveMessage, setSaveMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const alternativeOptions = useMemo(
    () =>
      allTools
        .filter((t) => t.slug !== (editingTool?.slug ?? slug))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [allTools, editingTool?.slug, slug]
  );

  const buildPayload = (options?: { skipJsonValidation?: boolean }): Tool | null => {
    const selectedCat = categories.find((c) => c.id === categoryId) || categories[0];
    if (!selectedCat) return null;

    let parsedSources: ToolSource[] | undefined = editingTool?.sources;
    if (sourcesJson.trim()) {
      if (!options?.skipJsonValidation) {
        try {
          parsedSources = JSON.parse(sourcesJson) as ToolSource[];
        } catch {
          setFieldErrors({ sources: 'Source metadata must be valid JSON' });
          return null;
        }
      } else {
        try {
          parsedSources = JSON.parse(sourcesJson) as ToolSource[];
        } catch {
          parsedSources = [];
        }
      }
    } else {
      parsedSources = [];
    }

    let parsedPricingTiers: PricingTier[] | undefined = editingTool?.pricingTiers;
    if (pricingTiersJson.trim()) {
      if (!options?.skipJsonValidation) {
        try {
          parsedPricingTiers = JSON.parse(pricingTiersJson) as PricingTier[];
        } catch {
          setFieldErrors({ pricingTiers: 'Pricing tiers must be valid JSON' });
          return null;
        }
      } else {
        try {
          parsedPricingTiers = JSON.parse(pricingTiersJson) as PricingTier[];
        } catch {
          parsedPricingTiers = [];
        }
      }
    } else {
      parsedPricingTiers = [];
    }

    const screenshots = splitLines(screenshotsStr);
    const logoTrimmed = logo.trim();

    return {
      ...editingTool,
      id: editingTool?.id ?? `tool-${Date.now()}`,
      name: name.trim(),
      slug: slug.trim().toLowerCase(),
      logo: logoTrimmed,
      tagline: tagline.trim(),
      description: description.trim(),
      categoryId: selectedCat.id,
      categoryName: selectedCat.name,
      categorySlug: selectedCat.slug,
      tags: parseCsvField(tagsStr),
      pricingModel,
      monthlyPrice: monthlyPrice === '' ? undefined : Number(monthlyPrice),
      hasFreeTrial: pricingModel === 'Freemium' || pricingModel === 'Free',
      companyName: companyName.trim() || undefined,
      websiteUrl: websiteUrl.trim(),
      affiliateUrl: affiliateUrl.trim() || undefined,
      affiliateEnabled,
      affiliateProgram: affiliateProgram.trim() || undefined,
      pricingSource: pricingSource.trim() || undefined,
      featureSource: featureSource.trim() || undefined,
      sources: parsedSources,
      pricingTiers: parsedPricingTiers,
      features: parseCsvField(featuresStr),
      pros: parseCsvField(prosStr),
      cons: parseCsvField(consStr),
      platforms: parseCsvField(platformsStr),
      screenshots: screenshots.length > 0 ? screenshots : logoTrimmed ? [logoTrimmed] : [],
      alternatives,
      targetUsers,
      rating: Number(rating) || 0,
      reviewCount: Number(reviewCount) || 0,
      verified,
      featured,
      trending,
      hasApi,
      hasMobileApp,
      hasExtension,
      publishStatus,
      reviewState,
      reviewRequestedAt: reviewRequestedAt || undefined,
      reviewAssignedTo: reviewAssignedTo.trim() || undefined,
      reviewNotes: reviewNotes.trim() || undefined,
      verifiedBy: verifiedBy.trim() || undefined,
    };
  };

  const indexabilityPreview = useMemo(() => {
    const payload = buildPayload({ skipJsonValidation: true });
    if (!payload || publishStatus !== 'published') return null;
    return isToolIndexable(payload);
  }, [
    name,
    slug,
    logo,
    tagline,
    description,
    websiteUrl,
    affiliateUrl,
    affiliateEnabled,
    affiliateProgram,
    categoryId,
    publishStatus,
    categories,
    sourcesJson,
    pricingTiersJson,
    tagsStr,
    featuresStr,
    prosStr,
    consStr,
    platformsStr,
    screenshotsStr,
    targetUsers,
    alternatives,
    editingTool,
    pricingModel,
    monthlyPrice,
    companyName,
    verified,
    featured,
    trending,
    hasApi,
    hasMobileApp,
    hasExtension,
    rating,
    reviewCount,
  ]);

  const validate = (payload: Tool, forPublish: boolean) => {
    const errors = [
      ...validateToolInput(payload, { isCreate: !isEdit }),
      ...(forPublish ? validateToolForPublish(payload) : []),
    ];
    const grouped = groupValidationErrors(errors);
    setFieldErrors(grouped);
    return errors;
  };

  const submit = async (forcePublishStatus?: PublishStatus) => {
    setFieldErrors({});
    const payload = buildPayload();
    if (!payload) return;

    if (forcePublishStatus) {
      payload.publishStatus = forcePublishStatus;
    }

    const forPublish = payload.publishStatus === 'published';
    const errors = validate(payload, forPublish);
    if (errors.length > 0) {
      setSaveStatus('error');
      setSaveMessage(formatValidationErrors(errors));
      return;
    }

    const apiUrl = isEdit
      ? `/api/tools/${encodeURIComponent(editingTool!.slug)}`
      : '/api/tools';
    const apiMethod = isEdit ? 'PUT' : 'POST';

    setSaveStatus('saving');
    setSaveMessage('Saving tool...');

    try {
      const response = await fetch(apiUrl, {
        method: apiMethod,
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.status === 401) {
        setSaveStatus('error');
        setSaveMessage('Session expired. Redirecting to sign in...');
        window.location.assign('/admin/login?err=unauthorized&from=/admin');
        return;
      }

      const result = await response.json();
      if (!response.ok) {
        setSaveStatus('error');
        setSaveMessage(result?.error || 'Unable to save tool.');
        if (result?.validationErrors) {
          setFieldErrors(groupValidationErrors(result.validationErrors));
        }
        return;
      }

      setSaveStatus('success');
      setSaveMessage('Tool saved successfully.');
      onSaved(result as Tool);
    } catch (error) {
      setSaveStatus('error');
      setSaveMessage(error instanceof Error ? error.message : 'Unexpected error while saving.');
    }
  };

  const fieldClass = (field: string) =>
    fieldErrors[field]
      ? 'border-rose-300 bg-rose-50/50 focus:ring-rose-400'
      : 'border-slate-200 bg-slate-50 focus:ring-emerald-500';

  const FieldError = ({ field }: { field: string }) =>
    fieldErrors[field] ? (
      <p className="text-[10px] text-rose-600 mt-0.5">{fieldErrors[field]}</p>
    ) : null;

  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="border border-slate-200 rounded-2xl p-4 space-y-3">
      <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">{title}</h3>
      {children}
    </div>
  );

  const toggleArrayItem = (arr: string[], value: string, setter: (v: string[]) => void) => {
    setter(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
  };

  const latest = monitoringSummary?.latestCheck;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative my-8 max-h-[95vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-extrabold text-slate-900 mb-1">
          {isEdit ? `Edit Tool: ${name}` : 'Add New AI Tool'}
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          Save as draft while building the listing. Publish when all required fields are complete.
        </p>

        {isEdit && slug && (
          <Link
            href={`/tools/${slug}`}
            target="_blank"
            className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:underline mb-4"
          >
            Preview public page <ExternalLink className="w-3 h-3" />
          </Link>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="space-y-4 text-xs"
        >
          <Section title="Basic Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Tool Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!isEdit) setSlug(slugify(e.target.value));
                  }}
                  className={`w-full border rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 ${fieldClass('name')}`}
                />
                <FieldError field="name" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">URL Slug *</label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className={`w-full border rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 ${fieldClass('slug')}`}
                />
                <FieldError field="slug" />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Logo URL {publishStatus === 'published' ? '*' : '(required to publish)'}
              </label>
              <input
                type="url"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                placeholder="https://example.com/logo.png"
                className={`w-full border rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 ${fieldClass('logo')}`}
              />
              <FieldError field="logo" />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="OpenAI"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
              />
            </div>
          </Section>

          <Section title="Monetization & Links">
            <p className="text-[11px] text-slate-500 leading-relaxed -mt-2 mb-3">
              The <strong className="font-semibold text-slate-600">official website URL</strong> is
              used for monitoring, editorial reference, and validation. The optional{' '}
              <strong className="font-semibold text-slate-600">affiliate URL</strong> is used only
              for public outbound clicks when affiliate links are enabled.
            </p>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Official Website URL *
              </label>
              <input
                type="url"
                required
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://example.com"
                className={`w-full border rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 ${fieldClass('websiteUrl')}`}
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Used for website monitoring and as the canonical vendor destination. Never use an
                affiliate tracking link here.
              </p>
              <FieldError field="websiteUrl" />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Affiliate URL <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <input
                type="url"
                value={affiliateUrl}
                onChange={(e) => setAffiliateUrl(e.target.value)}
                placeholder="https://example.com/?ref=your-id"
                className={`w-full border rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 ${fieldClass('affiliateUrl')}`}
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Monetized outbound link shown to visitors when affiliate links are enabled below.
              </p>
              <FieldError field="affiliateUrl" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={affiliateEnabled}
                  onChange={(e) => setAffiliateEnabled(e.target.checked)}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-xs font-bold text-slate-700">Use affiliate link for outbound CTAs</span>
              </label>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Affiliate Program / Network{' '}
                  <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <input
                  type="text"
                  value={affiliateProgram}
                  onChange={(e) => setAffiliateProgram(e.target.value)}
                  placeholder="e.g. Impact, PartnerStack, direct"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
                />
              </div>
            </div>
          </Section>

          <Section title="Content">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Tagline * <span className="font-normal text-slate-400">(min 10 chars to publish)</span>
              </label>
              <input
                type="text"
                required
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className={`w-full border rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 ${fieldClass('tagline')}`}
              />
              <FieldError field="tagline" />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Full Description * <span className="font-normal text-slate-400">(min 50 chars to publish)</span>
              </label>
              <textarea
                required
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full border rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 resize-y min-h-[100px] ${fieldClass('description')}`}
              />
              <FieldError field="description" />
            </div>
          </Section>

          <Section title="Category & Pricing">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Category *</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className={`w-full border rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none ${fieldClass('categoryId')}`}
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <FieldError field="categoryId" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Pricing Model *</label>
                <select
                  value={pricingModel}
                  onChange={(e) => setPricingModel(e.target.value as PricingModel)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none"
                >
                  <option value="Free">Free</option>
                  <option value="Freemium">Freemium</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Monthly Cost ($ USD)</label>
                <input
                  type="number"
                  min={0}
                  value={monthlyPrice}
                  onChange={(e) =>
                    setMonthlyPrice(e.target.value === '' ? '' : Number(e.target.value))
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none"
                />
                <FieldError field="monthlyPrice" />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Pricing Tiers (JSON, optional)
              </label>
              <textarea
                rows={4}
                value={pricingTiersJson}
                onChange={(e) => setPricingTiersJson(e.target.value)}
                placeholder={`[\n  {\n    "name": "Free",\n    "price": 0,\n    "billingPeriod": "monthly",\n    "features": ["Basic access"]\n  }\n]`}
                className={`w-full border rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none resize-y ${fieldClass('pricingTiers')}`}
              />
              <FieldError field="pricingTiers" />
              <p className="text-[10px] text-slate-400 mt-1">
                billingPeriod: monthly, yearly, or custom. Leave empty if using simple pricing only.
              </p>
            </div>
          </Section>

          <Section title="Lists & Details">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={tagsStr}
                  onChange={(e) => setTagsStr(e.target.value)}
                  placeholder="AI Assistant, Writing, Coding"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Platforms (comma-separated)</label>
                <input
                  type="text"
                  value={platformsStr}
                  onChange={(e) => setPlatformsStr(e.target.value)}
                  placeholder="Web, iOS, Android, macOS"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Features (comma-separated)</label>
              <textarea
                rows={2}
                value={featuresStr}
                onChange={(e) => setFeaturesStr(e.target.value)}
                placeholder="Natural language drafting, Code generation"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none resize-y"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Pros (comma-separated)</label>
                <textarea
                  rows={2}
                  value={prosStr}
                  onChange={(e) => setProsStr(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none resize-y"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Cons (comma-separated)</label>
                <textarea
                  rows={2}
                  value={consStr}
                  onChange={(e) => setConsStr(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none resize-y"
                />
              </div>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Screenshot URLs (one per line, optional)
              </label>
              <textarea
                rows={2}
                value={screenshotsStr}
                onChange={(e) => setScreenshotsStr(e.target.value)}
                placeholder="https://example.com/screenshot.png"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none resize-y"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                If empty, logo URL is used as the screenshot on the tool page.
              </p>
            </div>
          </Section>

          <Section title="Personas & Alternatives">
            <div>
              <label className="block font-bold text-slate-700 mb-2">
                Target Personas <span className="font-normal text-slate-400">(shows on /for/[persona] pages)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {personas.map((p) => (
                  <label
                    key={p.id}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border cursor-pointer text-[11px] font-semibold ${
                      targetUsers.includes(p.slug)
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={targetUsers.includes(p.slug)}
                      onChange={() => toggleArrayItem(targetUsers, p.slug, setTargetUsers)}
                    />
                    {p.title}
                  </label>
                ))}
              </div>
              {personas.length === 0 && (
                <p className="text-[10px] text-slate-400 italic">No personas in database.</p>
              )}
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-2">
                Alternative Tools <span className="font-normal text-slate-400">(related tools section)</span>
              </label>
              <div className="max-h-32 overflow-y-auto border border-slate-200 rounded-xl p-2 space-y-1">
                {alternativeOptions.map((t) => (
                  <label
                    key={t.id}
                    className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-slate-50 cursor-pointer text-[11px]"
                  >
                    <input
                      type="checkbox"
                      checked={alternatives.includes(t.slug)}
                      onChange={() => toggleArrayItem(alternatives, t.slug, setAlternatives)}
                    />
                    <span className="font-semibold text-slate-800">{t.name}</span>
                    <span className="text-slate-400 font-mono">{t.slug}</span>
                  </label>
                ))}
              </div>
              <FieldError field="alternatives" />
            </div>
          </Section>

          <Section title="Badges & Listing Flags">
            <div className="flex flex-wrap gap-4">
              {[
                { label: 'Verified badge', checked: verified, set: setVerified },
                { label: 'Featured (homepage)', checked: featured, set: setFeatured },
                { label: 'Trending (homepage)', checked: trending, set: setTrending },
                { label: 'Has API', checked: hasApi, set: setHasApi },
                { label: 'Has Mobile App', checked: hasMobileApp, set: setHasMobileApp },
                { label: 'Has Extension', checked: hasExtension, set: setHasExtension },
              ].map(({ label, checked, set }) => (
                <label key={label} className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={checked} onChange={(e) => set(e.target.checked)} />
                  <span className="font-semibold text-slate-700">{label}</span>
                </label>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Editorial Rating (0–5)
                </label>
                <input
                  type="number"
                  min={0}
                  max={5}
                  step={0.1}
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
                />
                <FieldError field="rating" />
                <p className="text-[10px] text-slate-400 mt-1">
                  Admin-only editorial fields. Public hero and tool cards use approved visitor review aggregates via{' '}
                  <code className="text-[10px]">applyPublicReviewSignals()</code> — not these values.
                </p>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Editorial Review Count</label>
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={reviewCount}
                  onChange={(e) => setReviewCount(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
                />
                <FieldError field="reviewCount" />
              </div>
            </div>
          </Section>

          <Section title="Verification & Sources">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Pricing Source URL</label>
                <input
                  type="url"
                  value={pricingSource}
                  onChange={(e) => setPricingSource(e.target.value)}
                  className={`w-full border rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none ${fieldClass('pricingSource')}`}
                />
                <FieldError field="pricingSource" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Feature Source URL</label>
                <input
                  type="url"
                  value={featureSource}
                  onChange={(e) => setFeatureSource(e.target.value)}
                  className={`w-full border rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none ${fieldClass('featureSource')}`}
                />
                <FieldError field="featureSource" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Verified By</label>
                <input
                  type="text"
                  value={verifiedBy}
                  onChange={(e) => setVerifiedBy(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Review State</label>
                <select
                  value={reviewState}
                  onChange={(e) => setReviewState(e.target.value as ReviewState)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
                >
                  <option value="unverified">Unverified</option>
                  <option value="needsReview">Needs Review</option>
                  <option value="inReview">In Review</option>
                  <option value="verified">Verified</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Review Requested</label>
                <input
                  type="date"
                  value={reviewRequestedAt}
                  onChange={(e) => setReviewRequestedAt(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Review Assigned To</label>
                <input
                  type="text"
                  value={reviewAssignedTo}
                  onChange={(e) => setReviewAssignedTo(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Review Notes (internal)</label>
              <input
                type="text"
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Source Metadata (JSON)</label>
              <textarea
                rows={4}
                value={sourcesJson}
                onChange={(e) => setSourcesJson(e.target.value)}
                placeholder={`[\n  {\n    "type": "pricing",\n    "url": "https://...",\n    "verifiedAt": "2026-08-07",\n    "notes": "Pricing page"\n  }\n]`}
                className={`w-full border rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none resize-y ${fieldClass('sources')}`}
              />
              <FieldError field="sources" />
              <p className="text-[10px] text-slate-400 mt-1">
                Types: pricing, features, company, website, documentation, changelog, review, general
              </p>
            </div>
          </Section>

          {isEdit && onRunMonitoringCheck && (
            <Section title="Website Monitoring">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-slate-900">Manual Health Check</span>
                </div>
                <button
                  type="button"
                  onClick={onRunMonitoringCheck}
                  disabled={monitoringStatus === 'running'}
                  className="inline-flex items-center gap-1.5 bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg disabled:opacity-60"
                >
                  <RefreshCw
                    className={`w-3.5 h-3.5 ${monitoringStatus === 'running' ? 'animate-spin' : ''}`}
                  />
                  Run Website Check
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-slate-600">
                <div>
                  <span className="font-bold text-slate-700 block">Signal</span>
                  {monitoringSummary
                    ? `${getMonitoringSignalEmoji(monitoringSummary.signal)} ${getMonitoringSignalLabel(monitoringSummary.signal)}`
                    : '⚪ Not checked yet'}
                </div>
                <div>
                  <span className="font-bold text-slate-700 block">Last Checked</span>
                  {monitoringSummary?.lastCheckedAt
                    ? new Date(monitoringSummary.lastCheckedAt).toLocaleString()
                    : 'Never'}
                </div>
                {latest && (
                  <>
                    <div>
                      <span className="font-bold text-slate-700 block">HTTP Status</span>
                      {latest.httpStatus ?? 'N/A'}
                    </div>
                    {latest.errorMessage && (
                      <div className="sm:col-span-2 text-rose-700">
                        <span className="font-bold block">Error</span>
                        {latest.errorMessage}
                      </div>
                    )}
                  </>
                )}
              </div>
              {monitoringMessage && (
                <p
                  className={`text-[11px] ${monitoringStatus === 'error' ? 'text-rose-600' : 'text-slate-500'}`}
                >
                  {monitoringMessage}
                </p>
              )}
              <p className="text-[10px] text-slate-500">
                Monitoring checks website reachability only. Update editorial fields manually after review.
              </p>
            </Section>
          )}

          <Section title="Publish">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Publish Status</label>
              <select
                value={publishStatus}
                onChange={(e) => setPublishStatus(e.target.value as PublishStatus)}
                className={`w-full border rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none ${fieldClass('publishStatus')}`}
              >
                <option value="draft">Draft — hidden from public, not indexed</option>
                <option value="published">Published — live on site when complete</option>
                <option value="archived">Archived — hidden from public, not indexed</option>
              </select>
              <FieldError field="publishStatus" />
            </div>

            {publishStatus === 'published' && indexabilityPreview && (
              <div
                className={`flex items-start gap-2 rounded-xl p-3 text-[11px] ${
                  indexabilityPreview.indexable
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                    : 'bg-amber-50 border border-amber-200 text-amber-900'
                }`}
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  {indexabilityPreview.indexable ? (
                    <p className="font-bold">Ready for public indexing</p>
                  ) : (
                    <>
                      <p className="font-bold">Not yet indexable for SEO</p>
                      <p>{indexabilityPreview.reason}</p>
                    </>
                  )}
                </div>
              </div>
            )}
          </Section>

          {saveStatus !== 'idle' && (
            <div
              className={`text-xs rounded-xl px-3 py-2 ${
                saveStatus === 'error'
                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                  : saveStatus === 'success'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-slate-50 text-slate-600'
              }`}
            >
              {saveMessage}
            </div>
          )}

          <div className="pt-2 flex flex-wrap justify-end gap-2 sticky bottom-0 bg-white pb-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold cursor-pointer hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={saveStatus === 'saving'}
              onClick={() => submit('draft')}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-800 font-bold cursor-pointer hover:bg-slate-50 disabled:opacity-50"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              disabled={saveStatus === 'saving'}
              className={`px-6 py-2 rounded-xl text-white font-bold cursor-pointer transition-colors shadow-xs ${
                saveStatus === 'saving' ? 'bg-slate-400 cursor-wait' : 'bg-emerald-600 hover:bg-emerald-500'
              }`}
            >
              {saveStatus === 'saving' ? 'Saving...' : 'Save Tool'}
            </button>
            <button
              type="button"
              disabled={saveStatus === 'saving'}
              onClick={() => submit('published')}
              className="px-6 py-2 rounded-xl bg-slate-900 text-white font-bold cursor-pointer hover:bg-slate-800 disabled:opacity-50"
            >
              Save & Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
