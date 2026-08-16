'use client';

import { useEffect, useState } from 'react';

interface ToolChange {
  id: string;
  toolId: string;
  toolName: string;
  toolSlug: string;
  category: string;
  fieldName: string;
  previousValue: string | null;
  currentValue: string | null;
  sourceUrl: string | null;
  severity: string;
  status: string;
  detectedAt: string;
}

interface MonitoringSummary {
  toolsTotal: number;
  toolsChecked: number;
  toolsSkipped: number;
  toolsFailed: number;
  changesDetected: number;
  results: Array<{
    toolSlug: string;
    toolName: string;
    success: boolean;
    error?: string;
    changesDetected: number;
  }>;
}

export default function MonitoringChangesPage() {
  const [changes, setChanges] = useState<ToolChange[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [runningMonitoring, setRunningMonitoring] = useState(false);
  const [lastRunSummary, setLastRunSummary] = useState<MonitoringSummary | null>(null);

  useEffect(() => {
    fetchChanges();
  }, []);

  const fetchChanges = async () => {
    try {
      const response = await fetch('/api/admin/monitoring/changes');
      if (!response.ok) {
        throw new Error('Failed to fetch changes');
      }
      const data = await response.json();
      setChanges(data.changes || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleRunMonitoring = async () => {
    setRunningMonitoring(true);
    try {
      const response = await fetch('/api/admin/monitoring/run', {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to run monitoring');
      }
      const summary: MonitoringSummary = await response.json();
      setLastRunSummary(summary);
      await fetchChanges();
    } catch (err) {
      alert('Failed to run monitoring: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setRunningMonitoring(false);
    }
  };

  const handleMarkReviewed = async (changeId: string) => {
    try {
      const response = await fetch('/api/admin/monitoring/changes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ changeId, action: 'review' }),
      });
      if (!response.ok) {
        throw new Error('Failed to mark as reviewed');
      }
      await fetchChanges();
    } catch (err) {
      alert('Failed to mark as reviewed');
    }
  };

  const handleMarkResolved = async (changeId: string) => {
    try {
      const response = await fetch('/api/admin/monitoring/changes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ changeId, action: 'resolve' }),
      });
      if (!response.ok) {
        throw new Error('Failed to mark as resolved');
      }
      await fetchChanges();
    } catch (err) {
      alert('Failed to mark as resolved');
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'info':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'needs_review':
        return 'bg-red-100 text-red-800';
      case 'reviewed':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Tool Change Monitoring</h1>
        <p>Loading changes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Tool Change Monitoring</h1>
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tool Change Monitoring</h1>
        <div className="flex gap-2">
          <button
            onClick={handleRunMonitoring}
            disabled={runningMonitoring}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
          >
            {runningMonitoring ? 'Running...' : 'Run Monitoring'}
          </button>
          <button
            onClick={fetchChanges}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>
      </div>

      {lastRunSummary && (
        <div className="mb-6 p-4 bg-gray-100 rounded">
          <h2 className="font-bold mb-2">Last Run Summary</h2>
          <div className="grid grid-cols-5 gap-4 text-sm">
            <div>
              <div className="text-gray-600">Total Tools</div>
              <div className="font-medium">{lastRunSummary.toolsTotal}</div>
            </div>
            <div>
              <div className="text-gray-600">Checked</div>
              <div className="font-medium">{lastRunSummary.toolsChecked}</div>
            </div>
            <div>
              <div className="text-gray-600">Failed</div>
              <div className="font-medium">{lastRunSummary.toolsFailed}</div>
            </div>
            <div>
              <div className="text-gray-600">Changes Detected</div>
              <div className="font-medium">{lastRunSummary.changesDetected}</div>
            </div>
          </div>
        </div>
      )}

      {changes.length === 0 ? (
        <p className="text-gray-600">No changes detected yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left border-b">Tool</th>
                <th className="px-4 py-2 text-left border-b">Category</th>
                <th className="px-4 py-2 text-left border-b">Field</th>
                <th className="px-4 py-2 text-left border-b">Previous</th>
                <th className="px-4 py-2 text-left border-b">Current</th>
                <th className="px-4 py-2 text-left border-b">Severity</th>
                <th className="px-4 py-2 text-left border-b">Status</th>
                <th className="px-4 py-2 text-left border-b">Detected</th>
                <th className="px-4 py-2 text-left border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {changes.map((change) => (
                <tr key={change.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">
                    <div>
                      <div className="font-medium">{change.toolName}</div>
                      <div className="text-sm text-gray-500">{change.toolSlug}</div>
                    </div>
                  </td>
                  <td className="px-4 py-2 border-b">{change.category}</td>
                  <td className="px-4 py-2 border-b">{change.fieldName}</td>
                  <td className="px-4 py-2 border-b text-gray-600">
                    {change.previousValue || '-'}
                  </td>
                  <td className="px-4 py-2 border-b text-gray-900">
                    {change.currentValue || '-'}
                  </td>
                  <td className="px-4 py-2 border-b">
                    <span className={`px-2 py-1 rounded text-xs ${getSeverityColor(change.severity)}`}>
                      {change.severity}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(change.status)}`}>
                      {change.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-b text-sm">
                    {new Date(change.detectedAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {change.status === 'needs_review' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleMarkReviewed(change.id)}
                          className="px-2 py-1 text-xs bg-yellow-600 text-white rounded hover:bg-yellow-700"
                        >
                          Review
                        </button>
                        <button
                          onClick={() => handleMarkResolved(change.id)}
                          className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Resolve
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
