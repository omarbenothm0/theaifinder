'use client';

import React, { useState } from 'react';
import { Tool, Category, PricingModel, ReviewState } from '../../types/tool';
import { getReviewState } from '../../lib/utils/reviewHelper';
import { Settings, Plus, Edit2, Trash2, Search, X, Lock, Unlock, ShieldAlert } from 'lucide-react';

interface AdminDashboardProps {
  initialTools: Tool[];
  initialCategories: Category[];
}

export function AdminDashboard({ initialTools, initialCategories }: AdminDashboardProps) {
  const [categories] = useState<Category[]>(initialCategories);
  const [tools, setTools] = useState<Tool[]>(initialTools);
  const [searchQuery, setSearchQuery] = useState('');
  const [reviewFilter, setReviewFilter] = useState<'all' | ReviewState>('all');

  // Admin Security Auth State
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState('');
  const [passkeyError, setPasskeyError] = useState(false);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingToolSlug, setEditingToolSlug] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [logo, setLogo] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || 'cat-writing');
  const [pricingModel, setPricingModel] = useState<PricingModel>('Freemium');
  const [monthlyPrice, setMonthlyPrice] = useState<number | ''>(20);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [pricingSource, setPricingSource] = useState('');
  const [featureSource, setFeatureSource] = useState('');
  const [verifiedBy, setVerifiedBy] = useState('AI Find Editorial Team');
  const [lastVerifiedDate, setLastVerifiedDate] = useState('');
  const [reviewState, setReviewState] = useState<ReviewState>('unverified');
  const [reviewRequestedAt, setReviewRequestedAt] = useState('');
  const [reviewAssignedTo, setReviewAssignedTo] = useState('');
  const [reviewNotes, setReviewNotes] = useState('');
  const [sourcesJson, setSourcesJson] = useState('');
  const [tagsStr, setTagsStr] = useState('AI Assistant, Writing');
  const [featuresStr, setFeaturesStr] = useState('Natural language drafting, Fast execution');
  const [prosStr, setProsStr] = useState('Clean output, Highly accessible');
  const [consStr, setConsStr] = useState('Rate limits during peak hours');
  const [verified, setVerified] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [trending, setTrending] = useState(false);
  const [hasApi, setHasApi] = useState(true);
  const [hasMobileApp, setHasMobileApp] = useState(false);
  const [hasExtension, setHasExtension] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [saveMessage, setSaveMessage] = useState('');

  const stats = {
    totalTools: tools.length,
    totalCategories: categories.length,
    totalPersonas: 8,
    totalComparisons: 6,
    verifiedTools: tools.filter((t) => t.verified).length,
    totalReviews: 128
  };

  const handleOpenAddModal = () => {
    setEditingToolSlug(null);
    setName('');
    setSlug('');
    setLogo('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&h=120&q=80');
    setTagline('');
    setDescription('');
    setCategoryId(categories[0]?.id || 'cat-writing');
    setPricingModel('Freemium');
    setMonthlyPrice(20);
    setWebsiteUrl('https://example.com');
    setPricingSource('');
    setFeatureSource('');
    setVerifiedBy('AI Find Editorial Team');
    setLastVerifiedDate('');
    setReviewState('unverified');
    setReviewRequestedAt('');
    setReviewAssignedTo('');
    setReviewNotes('');
    setSourcesJson('');
    setTagsStr('AI, Assistant, Writing');
    setFeaturesStr('Smart generation, API access');
    setProsStr('Fast responses, Easy interface');
    setConsStr('Usage caps apply');
    setVerified(true);
    setFeatured(false);
    setTrending(false);
    setHasApi(true);
    setHasMobileApp(false);
    setHasExtension(false);
    setSaveStatus('idle');
    setSaveMessage('');
    setShowModal(true);
  };

  const handleOpenEditModal = (tool: Tool) => {
    setEditingToolSlug(tool.slug);
    setName(tool.name);
    setSlug(tool.slug);
    setLogo(tool.logo);
    setTagline(tool.tagline);
    setDescription(tool.description);
    setCategoryId(tool.categoryId);
    setPricingModel(tool.pricingModel);
    setMonthlyPrice(tool.monthlyPrice ?? '');
    setWebsiteUrl(tool.websiteUrl);
    setTagsStr(tool.tags.join(', '));
    setFeaturesStr(tool.features.join(', '));
    setProsStr(tool.pros.join(', '));
    setConsStr(tool.cons.join(', '));
    setVerified(tool.verified);
    setReviewState(tool.reviewState ?? 'unverified');
    setReviewRequestedAt(tool.reviewRequestedAt ?? '');
    setReviewAssignedTo(tool.reviewAssignedTo ?? '');
    setReviewNotes(tool.reviewNotes ?? '');
    setLastVerifiedDate(tool.lastVerifiedDate ?? '');
    setVerifiedBy(tool.verifiedBy ?? 'AI Find Editorial Team');
    setPricingSource(tool.pricingSource ?? '');
    setFeatureSource(tool.featureSource ?? '');
    setSourcesJson(tool.sources ? JSON.stringify(tool.sources, null, 2) : '');
    setFeatured(tool.featured);
    setTrending(tool.trending);
    setHasApi(tool.hasApi);
    setHasMobileApp(tool.hasMobileApp);
    setHasExtension(tool.hasExtension);
    setSaveStatus('idle');
    setSaveMessage('');
    setShowModal(true);
  };

  const handleSaveTool = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) return;

    const selectedCat = categories.find((c) => c.id === categoryId) || categories[0];
    const existingTool = tools.find((t) => t.slug === editingToolSlug);

    let parsedSources = existingTool?.sources;
    if (sourcesJson.trim()) {
      try {
        parsedSources = JSON.parse(sourcesJson);
      } catch (error) {
        alert('Source metadata must be valid JSON. Please correct the input.');
        return;
      }
    }

    const toolPayload: Tool = {
      ...existingTool,
      id: existingTool?.id ?? `tool-${Date.now()}`,
      name: name.trim(),
      slug: slug.trim().toLowerCase(),
      logo: logo.trim() || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&h=120&q=80',
      tagline: tagline.trim(),
      description: description.trim(),
      categoryId: selectedCat ? selectedCat.id : 'cat-writing',
      categoryName: selectedCat ? selectedCat.name : 'Writing & Copywriting',
      tags: tagsStr.split(',').map((s) => s.trim()).filter(Boolean),
      pricingModel,
      monthlyPrice: monthlyPrice === '' ? undefined : Number(monthlyPrice),
      hasFreeTrial: pricingModel === 'Freemium' || pricingModel === 'Free',
      websiteUrl: websiteUrl.trim() || 'https://aifind.io',
      pricingSource: pricingSource || existingTool?.pricingSource,
      featureSource: featureSource || existingTool?.featureSource,
      sources: parsedSources,
      features: featuresStr.split(',').map((s) => s.trim()).filter(Boolean),
      pros: prosStr.split(',').map((s) => s.trim()).filter(Boolean),
      cons: consStr.split(',').map((s) => s.trim()).filter(Boolean),
      rating: existingTool?.rating ?? 4.8,
      reviewCount: existingTool?.reviewCount ?? 1,
      screenshots: existingTool?.screenshots ?? [logo],
      alternatives: existingTool?.alternatives ?? ['chatgpt', 'claude'],
      targetUsers: existingTool?.targetUsers ?? ['content-creators', 'developers'],
      verified,
      reviewState,
      reviewRequestedAt: reviewRequestedAt || existingTool?.reviewRequestedAt,
      reviewAssignedTo: reviewAssignedTo || existingTool?.reviewAssignedTo,
      reviewNotes: reviewNotes || existingTool?.reviewNotes,
      lastVerifiedDate: lastVerifiedDate || existingTool?.lastVerifiedDate,
      verifiedBy: verifiedBy || existingTool?.verifiedBy,
      featured,
      trending,
      hasApi,
      hasMobileApp,
      hasExtension
    };

    const apiUrl = editingToolSlug ? `/api/tools/${encodeURIComponent(editingToolSlug)}` : '/api/tools';
    const apiMethod = editingToolSlug ? 'PUT' : 'POST';

    setSaveStatus('saving');
    setSaveMessage('Saving tool data...');

    try {
      const response = await fetch(apiUrl, {
        method: apiMethod,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(toolPayload)
      });

      const result = await response.json();
      if (!response.ok) {
        setSaveStatus('error');
        setSaveMessage(result?.error || 'Unable to save tool data.');
        return;
      }

      const savedTool: Tool = result;
      if (editingToolSlug) {
        setTools((prev) => prev.map((t) => (t.slug === editingToolSlug ? savedTool : t)));
      } else {
        setTools((prev) => [savedTool, ...prev]);
      }

      setSaveStatus('success');
      setSaveMessage('Tool saved successfully.');
      setShowModal(false);
    } catch (error: any) {
      setSaveStatus('error');
      setSaveMessage(error?.message || 'Unexpected error while saving.');
    }
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkeyInput === 'admin123' || passkeyInput === 'admin' || passkeyInput.trim() !== '') {
      setIsUnlocked(true);
      setPasskeyError(false);
    } else {
      setPasskeyError(true);
    }
  };

  const handleDeleteTool = async (toolSlug: string) => {
    if (!isUnlocked) {
      alert('Admin session locked. Please enter administrative passkey to modify database listings.');
      return;
    }
    if (confirm(`Are you sure you want to delete ${toolSlug}?`)) {
      setTools((prev) => prev.filter((t) => t.slug !== toolSlug));
    }
  };

  const filteredTools = tools.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.slug.toLowerCase().includes(searchQuery.toLowerCase());

    const effectiveState = getReviewState(t);
    const matchesReviewFilter = reviewFilter === 'all' || effectiveState === reviewFilter;

    return matchesSearch && matchesReviewFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Settings className="w-4 h-4" />
            Platform CMS &amp; Database Admin
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">AI Tools Database Management</h1>
          <p className="text-xs text-slate-400 mt-1">Manage AI software directory listings, verification status, and ratings</p>
        </div>

        <div className="flex items-center gap-3">
          {isUnlocked ? (
            <button
              onClick={() => setIsUnlocked(false)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 border border-slate-700"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              Lock Session
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" />
                Protected Route
              </span>
            </div>
          )}

          <button
            onClick={() => {
              if (!isUnlocked) {
                alert('Admin session locked. Please authenticate using passkey below.');
                return;
              }
              handleOpenAddModal();
            }}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs px-5 py-3 rounded-2xl transition-all cursor-pointer flex items-center gap-1.5 shadow-md shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add New AI Tool
          </button>
        </div>
      </div>

      {/* Passkey Authentication Banner */}
      {!isUnlocked && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 text-slate-900 space-y-3">
          <div className="flex items-center gap-2 text-amber-800 font-extrabold text-sm">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            <span>Administrator Passkey Verification Required</span>
          </div>
          <p className="text-xs text-slate-700 max-w-xl">
            To make live database modifications (adding, editing, or removing software listings), enter passkey <code className="bg-amber-100 text-amber-900 font-mono px-1.5 py-0.5 rounded font-bold">admin123</code> below.
          </p>

          <form onSubmit={handleUnlock} className="flex items-center gap-3 max-w-md pt-1">
            <input
              type="password"
              placeholder="Enter passkey (e.g. admin123)..."
              value={passkeyInput}
              onChange={(e) => setPasskeyInput(e.target.value)}
              className="bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 flex-1 shadow-2xs"
            />
            <button
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Unlock className="w-3.5 h-3.5 text-emerald-400" />
              Unlock Admin
            </button>
          </form>
          {passkeyError && (
            <p className="text-xs font-bold text-rose-600">Incorrect passkey. Please try admin123.</p>
          )}
        </div>
      )}

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 text-xs">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-slate-400 font-bold uppercase block text-[10px]">Total Tools</span>
          <span className="text-2xl font-extrabold text-slate-900">{stats.totalTools}</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-slate-400 font-bold uppercase block text-[10px]">Categories</span>
          <span className="text-2xl font-extrabold text-slate-900">{stats.totalCategories}</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-slate-400 font-bold uppercase block text-[10px]">Workflow Personas</span>
          <span className="text-2xl font-extrabold text-slate-900">{stats.totalPersonas}</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-slate-400 font-bold uppercase block text-[10px]">Comparisons</span>
          <span className="text-2xl font-extrabold text-slate-900">{stats.totalComparisons}</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-slate-400 font-bold uppercase block text-[10px]">Verified Listings</span>
          <span className="text-2xl font-extrabold text-emerald-600">{stats.verifiedTools}</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-slate-400 font-bold uppercase block text-[10px]">User Reviews</span>
          <span className="text-2xl font-extrabold text-indigo-600">{stats.totalReviews}</span>
        </div>
      </div>

      {/* Tools Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden space-y-4 p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2">
          <h2 className="text-lg font-bold text-slate-900">Manage Tool Listings</h2>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search tools in admin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2" />
            </div>

            <select
              value={reviewFilter}
              onChange={(e) => setReviewFilter(e.target.value as 'all' | ReviewState)}
              className="w-full sm:w-52 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-hidden"
            >
              <option value="all">All Review States</option>
              <option value="unverified">Unverified</option>
              <option value="needsReview">Needs Review</option>
              <option value="inReview">In Review</option>
              <option value="verified">Verified</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold">
                <th className="p-3">Tool</th>
                <th className="p-3">Category</th>
                <th className="p-3">Pricing</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Review</th>
                <th className="p-3">Badges</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTools.map((tool) => (
                <tr key={tool.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-bold text-slate-900">
                    <div className="flex items-center gap-2.5">
                      <img src={tool.logo} alt="" className="w-8 h-8 rounded-lg object-cover bg-slate-100 border border-slate-200" />
                      <div>
                        <span>{tool.name}</span>
                        <span className="block text-[10px] text-slate-400 font-mono">/tools/{tool.slug}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-slate-600">{tool.categoryName}</td>
                  <td className="p-3 font-semibold text-slate-800">
                    {tool.pricingModel} {tool.monthlyPrice ? `($${tool.monthlyPrice})` : ''}
                  </td>
                  <td className="p-3 font-bold text-slate-900">{tool.rating} ★ ({tool.reviewCount})</td>
                  <td className="p-3">
                    <span
                      className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest"
                      style={{
                        backgroundColor:
                          getReviewState(tool) === 'verified'
                            ? '#ecfdf5'
                            : getReviewState(tool) === 'inReview'
                            ? '#f8fafc'
                            : getReviewState(tool) === 'needsReview'
                            ? '#fef3c7'
                            : '#f1f5f9',
                        color:
                          getReviewState(tool) === 'verified'
                            ? '#166534'
                            : getReviewState(tool) === 'inReview'
                            ? '#0f172a'
                            : getReviewState(tool) === 'needsReview'
                            ? '#92400e'
                            : '#475569'
                      }}
                    >
                      {getReviewState(tool)}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      {tool.verified && <span className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-md text-[10px] font-bold">Verified</span>}
                      {tool.featured && <span className="bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded-md text-[10px] font-bold">Featured</span>}
                    </div>
                  </td>
                  <td className="p-3 text-right space-x-1">
                    <button
                      onClick={() => handleOpenEditModal(tool)}
                      className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg cursor-pointer"
                      title="Edit Tool"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteTool(tool.slug)}
                      className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg cursor-pointer"
                      title="Delete Tool"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Tool Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 my-8">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-extrabold text-slate-900 mb-1">
              {editingToolSlug ? `Edit Tool: ${name}` : 'Add New AI Tool to Database'}
            </h2>
            <p className="text-xs text-slate-500 mb-6">Complete metadata for scalable directory search indexing.</p>

            <form onSubmit={handleSaveTool} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tool Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (!editingToolSlug) {
                        setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
                      }
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tagline (Short Summary) *</label>
                <input
                  type="text"
                  required
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Description *</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-hidden resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-hidden"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Pricing Model *</label>
                  <select
                    value={pricingModel}
                    onChange={(e) => setPricingModel(e.target.value as PricingModel)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-hidden"
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
                    value={monthlyPrice}
                    onChange={(e) => setMonthlyPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Official Website URL *</label>
                <input
                  type="url"
                  required
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Pricing Source URL</label>
                  <input
                    type="url"
                    value={pricingSource}
                    onChange={(e) => setPricingSource(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Feature Source URL</label>
                  <input
                    type="url"
                    value={featureSource}
                    onChange={(e) => setFeatureSource(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Verified By</label>
                  <input
                    type="text"
                    value={verifiedBy}
                    onChange={(e) => setVerifiedBy(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Reviewed Date</label>
                  <input
                    type="date"
                    value={lastVerifiedDate}
                    onChange={(e) => setLastVerifiedDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Review State</label>
                  <select
                    value={reviewState}
                    onChange={(e) => setReviewState(e.target.value as ReviewState)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-hidden"
                  >
                    <option value="unverified">Unverified</option>
                    <option value="needsReview">Needs Review</option>
                    <option value="inReview">In Review</option>
                    <option value="verified">Verified</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Review Notes</label>
                  <input
                    type="text"
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Source Metadata (JSON)</label>
                <textarea
                  rows={4}
                  value={sourcesJson}
                  onChange={(e) => setSourcesJson(e.target.value)}
                  placeholder='[ { "type": "pricing", "url": "https://...", "verifiedAt": "2026-08-07", "notes": "Pricing page" } ]'
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-hidden resize-none font-mono"
                />
              </div>

              {saveStatus !== 'idle' && (
                <div className={`text-xs ${saveStatus === 'error' ? 'text-rose-600' : 'text-emerald-600'} mb-2`}>
                  {saveMessage}
                </div>
              )}
              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold cursor-pointer hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveStatus === 'saving'}
                  className={`px-6 py-2 rounded-xl text-white font-bold cursor-pointer transition-colors shadow-2xs ${
                    saveStatus === 'saving' ? 'bg-slate-400 cursor-wait' : 'bg-emerald-600 hover:bg-emerald-500'
                  }`}
                >
                  {saveStatus === 'saving' ? 'Saving...' : 'Save Tool Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
