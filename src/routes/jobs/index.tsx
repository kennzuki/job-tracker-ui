import { useState, useEffect, useCallback } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useAuth } from '@clerk/tanstack-react-start'
import {
  ExternalLink,
  Eye,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Briefcase,
  AlertCircle,
} from 'lucide-react'
import ProtectedRoute from '../../components/ProtectedRoute'
import { fetchJobs, fetchJobStats } from '../../lib/api'
import type { Job, JobStatus } from '../../lib/types'

export const STATUS_STYLES: Record<string, string> = {
  open: 'bg-slate-100 text-slate-700 border-slate-300',
  applied: 'bg-blue-50 text-blue-700 border-blue-200',
  interviewing: 'bg-amber-50 text-amber-800 border-amber-200',
  interview: 'bg-amber-50 text-amber-800 border-amber-200',
  offer: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  rejected: 'bg-red-50 text-red-700 border-red-200',
  closed: 'bg-gray-100 text-gray-600 border-gray-300',
  review: 'bg-purple-50 text-purple-700 border-purple-200',
}

export const STATUS_DOTS: Record<string, string> = {
  open: 'bg-slate-400',
  applied: 'bg-blue-500',
  interviewing: 'bg-amber-500',
  interview: 'bg-amber-500',
  offer: 'bg-emerald-500',
  rejected: 'bg-red-500',
  closed: 'bg-gray-400',
  review: 'bg-purple-500',
}

export const Route = createFileRoute('/jobs/')({
  component: JobsPageWithProtection,
})

function JobsPageWithProtection() {
  return (
    <ProtectedRoute
      title="View your job applications"
      description="Sign in to view, search, and track all your active applications in one place."
    >
      <JobsListPage />
    </ProtectedRoute>
  )
}

function JobsListPage() {
  const { getToken } = useAuth()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [stats, setStats] = useState<Record<string, number>>({})

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const token = (await getToken()) || undefined

      const [jobsRes, statsRes] = await Promise.all([
        fetchJobs({
          token,
          status: statusFilter !== 'all' ? statusFilter : undefined,
          search: search.trim() || undefined,
        }),
        fetchJobStats(token).catch(() => ({ stats: {}, total: 0 })),
      ])

      setJobs(jobsRes.jobs || [])
      if (statsRes?.stats) {
        setStats(statsRes.stats)
      }
    } catch (err: any) {
      console.error('Error loading jobs:', err)
      setError(err.message || 'Failed to fetch jobs from backend')
    } finally {
      setLoading(false)
    }
  }, [getToken, statusFilter, search])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 font-sans p-4 sm:p-8 lg:p-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-slate-200/80">
          <div>
            <div className="font-mono text-[11px] tracking-[0.15em] uppercase text-emerald-600 font-semibold mb-1">
             job tracker
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Applications
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => loadData()}
              disabled={loading}
              title="Refresh jobs"
              className="cursor-pointer p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <Link
              to="/jobs/new"
              className="cursor-pointer inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              New Application
            </Link>
          </div>
        </div>

        {/* Stats Pill Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          <div
            onClick={() => setStatusFilter('all')}
            className={`cursor-pointer rounded-2xl p-4 border transition ${
              statusFilter === 'all'
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-white text-slate-800 border-slate-200/80 hover:border-slate-300'
            }`}
          >
            <p className="text-xs uppercase font-medium tracking-wider opacity-70">Total</p>
            <p className="text-2xl font-bold mt-1">{jobs.length}</p>
          </div>

          {['applied', 'interview', 'interviewing', 'offer', 'rejected'].map((st) => {
            const count = stats[st] || 0
            if (st === 'interview' && stats['interviewing']) return null
            const label = st === 'interviewing' ? 'Interview' : st[0].toUpperCase() + st.slice(1)
            const isActive = statusFilter === st

            return (
              <div
                key={st}
                onClick={() => setStatusFilter(isActive ? 'all' : st)}
                className={`cursor-pointer rounded-2xl p-4 border transition ${
                  isActive
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-white text-slate-800 border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <p className="text-xs uppercase font-medium tracking-wider opacity-70">{label}</p>
                <p className="text-2xl font-bold mt-1">{count}</p>
              </div>
            )
          })}
        </div>

        {/* Filters & Search Bar */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search role or company..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="cursor-pointer bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 outline-none focus:bg-white focus:border-emerald-500"
            >
              <option value="all">All Statuses</option>
              <option value="applied">Applied</option>
              <option value="interviewing">Interviewing</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-700 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
            <div className="flex-1">{error}</div>
            <button
              onClick={() => loadData()}
              className="underline font-semibold hover:text-red-900 text-xs"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center flex flex-col items-center justify-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
            <p className="text-sm text-slate-500 font-medium">Connecting to backend & fetching jobs...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && jobs.length === 0 && (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-16 text-center flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Briefcase className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No applications found</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm">
              {search || statusFilter !== 'all'
                ? 'Try adjusting your filters or search keywords.'
                : 'Start organizing your career search by logging your first application.'}
            </p>
            <Link
              to="/jobs/new"
              className="mt-6 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-5 py-2.5 text-sm font-semibold transition"
            >
              <Plus className="w-4 h-4" />
              Add Your First Job
            </Link>
          </div>
        )}

        {/* Table View (Desktop) */}
        {!loading && jobs.length > 0 && (
          <div className="hidden md:block bg-white text-slate-900 border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left bg-slate-50/60">
                  <th className="font-semibold text-slate-500 text-xs uppercase tracking-wider px-5 py-4">
                    Role
                  </th>
                  <th className="font-semibold text-slate-500 text-xs uppercase tracking-wider px-5 py-4">
                    Company
                  </th>
                  <th className="font-semibold text-slate-500 text-xs uppercase tracking-wider px-5 py-4">
                    Location
                  </th>
                  <th className="font-semibold text-slate-500 text-xs uppercase tracking-wider px-5 py-4">
                    Status
                  </th>
                  <th className="font-semibold text-slate-500 text-xs uppercase tracking-wider px-5 py-4">
                    Date
                  </th>
                  <th className="font-semibold text-slate-500 text-xs uppercase tracking-wider px-5 py-4 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jobs.map((job) => {
                  const jobId = job._id || job.id
                  const statusKey = job.status?.toLowerCase() || 'open'
                  const dateStr = job.createdAt
                    ? new Date(job.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    : 'Recent'

                  return (
                    <tr
                      key={jobId}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="px-5 py-4 font-semibold">
                        <Link
                          to="/jobs/$jobId"
                          params={{ jobId }}
                          className="text-slate-900 hover:text-emerald-600 transition"
                        >
                          {job.title}
                        </Link>
                      </td>
                      <td className="px-5 py-4 text-slate-600">{job.company}</td>
                      <td className="px-5 py-4 text-slate-500">{job.location || 'Remote'}</td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                            STATUS_STYLES[statusKey] || STATUS_STYLES.open
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              STATUS_DOTS[statusKey] || STATUS_DOTS.open
                            }`}
                          />
                          {job.status ? job.status[0].toUpperCase() + job.status.slice(1) : 'Open'}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-400 font-mono text-xs">
                        {dateStr}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-3 text-xs font-medium">
                          {job.link && (
                            <a
                              href={job.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-700"
                            >
                              Link <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          <Link
                            to="/jobs/$jobId"
                            params={{ jobId }}
                            className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-semibold"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            View
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Cards View (Mobile) */}
        {!loading && jobs.length > 0 && (
          <div className="md:hidden flex flex-col gap-3">
            {jobs.map((job) => {
              const jobId = job._id || job.id
              const statusKey = job.status?.toLowerCase() || 'open'
              const dateStr = job.createdAt
                ? new Date(job.createdAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'Recent'

              return (
                <div
                  key={jobId}
                  className="bg-white text-slate-900 border border-slate-200 rounded-2xl p-4 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <Link
                        to="/jobs/$jobId"
                        params={{ jobId }}
                        className="font-bold text-slate-900 hover:text-emerald-600"
                      >
                        {job.title}
                      </Link>
                      <div className="text-slate-500 text-sm">{job.company}</div>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${
                        STATUS_STYLES[statusKey] || STATUS_STYLES.open
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          STATUS_DOTS[statusKey] || STATUS_DOTS.open
                        }`}
                      />
                      {job.status ? job.status[0].toUpperCase() + job.status.slice(1) : 'Open'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mt-3 pt-3 border-t border-slate-100">
                    <span>{job.location || 'Remote'}</span>
                    <span className="font-mono">{dateStr}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 mt-3 pt-3 border-t border-slate-100 text-xs font-medium">
                    {job.link ? (
                      <a
                        href={job.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-700"
                      >
                        Link <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : <span />}
                    <Link
                      to="/jobs/$jobId"
                      params={{ jobId }}
                      className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-semibold"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View details
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
