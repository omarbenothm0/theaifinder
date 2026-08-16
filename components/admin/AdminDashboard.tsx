'use client';

import React, { useState, useMemo } from 'react';
import { Tool, Category, Persona, ReviewState } from '../../types/tool';
import { getReviewState } from '../../lib/utils/reviewHelper';
import { ToolMonitoringSummary } from '../../types/monitoring';
import { getMonitoringSignalEmoji, getMonitoringSignalLabel } from '../../lib/monitoring/freshness.service';
import {
  Settings,
  Plus,
  Edit2,
  Trash2,
  Search,
  X,
  Lock,
  LogOut,
  ShieldCheck,
  User,
  Clock,
  Activity,
} from 'lucide-react';
import { AdminReviewModeration } from './AdminReviewModeration';
import { AdminToolForm } from './AdminToolForm';

interface AdminDashboardProps {
  initialTools: Tool[];
  initialCategories: Category[];
  initialPersonas?: Persona[];
  initialMonitoringSummaries?: ToolMonitoringSummary[];
  initialStats?: {
    totalTools: number;
    totalCategories: number;
    totalPersonas: number;
    totalComparisons: number;
    totalReviews: number;
    pendingReviews?: number;
    verifiedTools: number;
    featuredTools: number;
  };
  adminUser?: string;
  sessionExpiresAtEpoch?: number;
}

export function AdminDashboard({
  initialTools,
  initialCategories,
  initialPersonas = [],
  initialMonitoringSummaries = [],
  initialStats,
  adminUser = 'admin',
  sessionExpiresAtEpoch,
}: AdminDashboardProps) {
  const [categories] = useState<Category[]>(initialCategories);
  const [personas] = useState<Persona[]>(initialPersonas);
  const [tools, setTools] = useState<Tool[]>(initialTools);
  const [monitoringByToolId, setMonitoringByToolId] = useState<Record<string, ToolMonitoringSummary>>(
    () =>
      Object.fromEntries(initialMonitoringSummaries.map((summary) => [summary.toolId, summary]))
  );
  const [monitoringStatus, setMonitoringStatus] = useState<'idle' | 'running' | 'error'>('idle');
  const [monitoringMessage, setMonitoringMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [reviewFilter, setReviewFilter] = useState<'all' | ReviewState>('all');

  const [showModal, setShowModal] = useState(false);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);

  const stats = useMemo(
    () =>
      initialStats ?? {
        totalTools: tools.length,
        totalCategories: categories.length,
        totalPersonas: 0,
        totalComparisons: 0,
        verifiedTools: tools.filter((t) => t.verified).length,
        totalReviews: 0,
        featuredTools: tools.filter((t) => t.featured).length,
      },
    [tools, categories.length, initialStats]
  );

  const sessionExpiresLabel = useMemo(() => {
    if (!sessionExpiresAtEpoch) return '';
    try {
      const d = new Date(sessionExpiresAtEpoch * 1000);
      return d.toLocaleString();
    } catch {
      return '';
    }
  }, [sessionExpiresAtEpoch]);

  const getMonitoringSummary = (tool: Tool): ToolMonitoringSummary | undefined =>
    monitoringByToolId[tool.id];

  const handleRunMonitoringCheck = async (tool: Tool) => {
    setMonitoringStatus('running');
    setMonitoringMessage('Running website health check...');

    try {
      const res = await fetch('/api/admin/monitoring/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolId: tool.id }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Monitoring check failed');
      }

      if (data.summary) {
        setMonitoringByToolId((prev) => ({
          ...prev,
          [tool.id]: data.summary as ToolMonitoringSummary,
        }));
      }

      setMonitoringStatus('idle');
      setMonitoringMessage('Website check completed.');
    } catch (error) {
      setMonitoringStatus('error');
      setMonitoringMessage(error instanceof Error ? error.message : 'Monitoring check failed');
    }
  };

  const handleOpenAddModal = () => {
    setEditingTool(null);
    setShowModal(true);
  };

  const handleOpenEditModal = (tool: Tool) => {
    setEditingTool(tool);
    setShowModal(true);
  };

  const handleToolSaved = (savedTool: Tool) => {
    if (editingTool) {
      setTools((prev) =>
        prev.map((t) => (t.id === savedTool.id || t.slug === editingTool.slug ? savedTool : t))
      );
    } else {
      setTools((prev) => [savedTool, ...prev]);
    }
    setShowModal(false);
    setEditingTool(null);
  };

  const handleDeleteTool = async (toolSlug: string) => {
    if (!confirm(`Are you sure you want to delete ${toolSlug}?`)) return;
    try {
      const response = await fetch(`/api/tools/${encodeURIComponent(toolSlug)}`, {
        method: 'DELETE',
        credentials: 'same-origin',
      });

      if (response.status === 401) {
        alert('Session expired. Redirecting to sign in...');
        window.location.assign('/admin/login?err=unauthorized&from=/admin');
        return;
      }

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        alert(data?.error || 'Failed to delete tool.');
        return;
      }

      setTools((prev) => prev.filter((t) => t.slug !== toolSlug));
    } catch (error: any) {
      alert(error?.message || 'Error deleting tool.');
    }
  };

  const filteredTools = useMemo(() => {
    return tools.filter((t) => {
      const matchesSearch =
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.slug.toLowerCase().includes(searchQuery.toLowerCase());

      const effectiveState = getReviewState(t);
      const matchesReviewFilter = reviewFilter === 'all' || effectiveState === reviewFilter;

      return matchesSearch && matchesReviewFilter;
    });
  }, [tools, searchQuery, reviewFilter]);

  return (
    <div className="space-y-8">
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Settings className="w-4 h-4" />
            Platform CMS &amp; Database Admin
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            AI Tools Database Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage AI software directory listings, verification status, and ratings
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-3 bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <div className="flex flex-col leading-none">
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                  Signed In
                </span>
                <span className="text-xs font-semibold text-white flex items-center gap-1.5 mt-0.5">
                  <User className="w-3 h-3 text-slate-400" />
                  {adminUser}
                </span>
              </div>
            </div>
            {sessionExpiresLabel && (
              <div className="hidden sm:flex flex-col leading-none border-l border-slate-700 pl-3 ml-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                  Session Expires
                </span>
                <span className="text-[11px] text-slate-300 flex items-center gap-1 mt-0.5 font-mono">
                  <Clock className="w-3 h-3 text-slate-500" />
                  {sessionExpiresLabel}
                </span>
              </div>
            )}
          </div>

          <form action="/api/admin/logout" method="post" className="contents">
            <button
              type="submit"
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 border border-slate-700"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </form>

          <button
            onClick={handleOpenAddModal}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs px-5 py-3 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add New AI Tool
          </button>

          <a
            href="/admin/monitoring/changes"
            className="bg-indigo-500 hover:bg-indigo-400 text-white font-extrabold text-xs px-5 py-3 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shrink-0"
          >
            <Activity className="w-4 h-4" />
            Change Monitoring
          </a>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 text-xs">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-slate-400 font-bold uppercase block text-[10px]">
            Total Tools
          </span>
          <span className="text-2xl font-extrabold text-slate-900">{stats.totalTools}</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-slate-400 font-bold uppercase block text-[10px]">
            Categories
          </span>
          <span className="text-2xl font-extrabold text-slate-900">{stats.totalCategories}</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-slate-400 font-bold uppercase block text-[10px]">
            Workflow Personas
          </span>
          <span className="text-2xl font-extrabold text-slate-900">{stats.totalPersonas}</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-slate-400 font-bold uppercase block text-[10px]">
            Comparisons
          </span>
          <span className="text-2xl font-extrabold text-slate-900">{stats.totalComparisons}</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-slate-400 font-bold uppercase block text-[10px]">
            Verified Listings
          </span>
          <span className="text-2xl font-extrabold text-emerald-600">{stats.verifiedTools}</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-slate-400 font-bold uppercase block text-[10px]">
            Approved Reviews
          </span>
          <span className="text-2xl font-extrabold text-indigo-600">{stats.totalReviews}</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-slate-400 font-bold uppercase block text-[10px]">
            Pending Reviews
          </span>
          <span className="text-2xl font-extrabold text-amber-600">
            {stats.pendingReviews ?? 0}
          </span>
        </div>
      </div>

      <AdminReviewModeration initialPendingCount={stats.pendingReviews ?? 0} />

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
                className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2" />
            </div>

            <select
              value={reviewFilter}
              onChange={(e) => setReviewFilter(e.target.value as 'all' | ReviewState)}
              className="w-full sm:w-52 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
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
                <th className="p-3">Monitor</th>
                <th className="p-3">Badges</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTools.map((tool) => (
                <tr key={tool.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-bold text-slate-900">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={tool.logo}
                        alt=""
                        className="w-8 h-8 rounded-lg object-cover bg-slate-100 border border-slate-200"
                      />
                      <div>
                        <span>{tool.name}</span>
                        <span className="block text-[10px] text-slate-400 font-mono">
                          /tools/{tool.slug}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-slate-600">{tool.categoryName}</td>
                  <td className="p-3 font-semibold text-slate-800">
                    {tool.pricingModel} {tool.monthlyPrice ? `($${tool.monthlyPrice})` : ''}
                  </td>
                  <td className="p-3 font-bold text-slate-900">
                    {tool.rating} ★ ({tool.reviewCount})
                  </td>
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
                            : '#475569',
                      }}
                    >
                      {getReviewState(tool)}
                    </span>
                  </td>
                  <td className="p-3">
                    {(() => {
                      const summary = getMonitoringSummary(tool);
                      const signal = summary?.signal ?? 'unchecked';
                      return (
                        <span
                          className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold text-slate-700 bg-slate-100"
                          title={getMonitoringSignalLabel(signal)}
                        >
                          <span>{getMonitoringSignalEmoji(signal)}</span>
                          <span className="hidden xl:inline">{getMonitoringSignalLabel(signal)}</span>
                        </span>
                      );
                    })()}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      {tool.verified && (
                        <span className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-md text-[10px] font-bold">
                          Verified
                        </span>
                      )}
                      {tool.featured && (
                        <span className="bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded-md text-[10px] font-bold">
                          Featured
                        </span>
                      )}
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

      {showModal && (
        <AdminToolForm
          editingTool={editingTool}
          categories={categories}
          personas={personas}
          allTools={tools}
          onClose={() => {
            setShowModal(false);
            setEditingTool(null);
          }}
          onSaved={handleToolSaved}
          monitoringSummary={
            editingTool ? getMonitoringSummary(editingTool) : undefined
          }
          onRunMonitoringCheck={
            editingTool ? () => handleRunMonitoringCheck(editingTool) : undefined
          }
          monitoringStatus={monitoringStatus}
          monitoringMessage={monitoringMessage}
        />
      )}
    </div>
  );
}
