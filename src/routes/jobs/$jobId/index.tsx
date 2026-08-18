import { useState, useEffect, useCallback } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useAuth } from '@clerk/tanstack-react-start'
import {
  ArrowLeft,
  Building2,
  Calendar,
  ExternalLink,
  MapPin,
  Pencil,
  Trash2,
  Briefcase,
  DollarSign,
  FileText,
  AlertCircle,
  RefreshCw,
} from 'lucide-react'
import ProtectedRoute from '../../../components/ProtectedRoute'
import { fetchJobById, deleteJob } from '../../../lib/api'
import type { Job } from '../../../lib/types'
import { STATUS_STYLES, STATUS_DOTS } from '../index'

export const Route = createFileRoute('/jobs/$jobId/')({
  component: JobDetailPageWithProtection,
})

function JobDetailPageWithProtection() {
  return (
    <ProtectedRoute
      title="Sign in to view application details"
      description="Sign in to view full job notes, interview schedules, and application links."
    >
      <JobDetailPage />
    </ProtectedRoute>
  )
}

function JobDetailPage() {
  const { jobId } = Route.useParams()
  const { getToken } = useAuth()
  const navigate = useNavigate()

  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadJob = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const token = (await getToken()) || undefined
      const data = await fetchJobById(jobId, token)
      setJob(data)
    } catch (err: any) {
      console.error('Error fetching job details:', err)
      setError(err.message || 'Could not load job details.')
    } finally {
      setLoading(false)
    }
  }, [jobId, getToken])

  useEffect(() => {
    loadJob()
  }, [loadJob])

  async function handleDelete() {
    if (!job) return
    const confirmed = window.confirm(
      `Delete application for "${job.title}" at "${job.company}"? This cannot be undone.`
    )
    if (!confirmed) return

    try {
      setDeleting(true)
      const token = (await getToken()) || undefined
      await deleteJob(jobId, token)
      navigate({ to: '/jobs' })
    } catch (err: any) {
      console.error('Failed to delete job:', err)
      alert(err.message || 'Failed to delete application')
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
          <p className="text-sm font-medium text-slate-500">Loading application details...</p>
        </div>
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-slate-50/60 p-6 sm:p-10 flex items-center justify-center">
        <div className="max-w-md w-full text-center bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-slate-900">Application not found</h2>
          <p className="text-sm text-slate-600 mt-2">{error || 'This job does not exist or you do not have permission.'}</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              to="/jobs"
              className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Back to applications
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const statusKey = job.status?.toLowerCase() || 'open'
  const dateFormatted = job.createdAt
    ? new Date(job.createdAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recent'

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 font-sans p-4 sm:p-8 lg:p-12">
      <div className="max-w-3xl mx-auto">
        {/* Navigation / Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Link
              to="/jobs"
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1.5 mb-2 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to applications
            </Link>
            <div className="font-mono text-[11px] tracking-[0.15em] uppercase text-emerald-600 font-semibold">
              pipeline tracker · application details
            </div>
          </div>
        </div>

        {/* Job Detail Card */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
          {/* Card Top Row: Company & Status Badge */}
          <div className="flex items-start justify-between gap-4 pb-6 border-b border-slate-100 flex-wrap">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                <Building2 className="w-4 h-4 text-emerald-600" />
                {job.company}
              </span>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                {job.title}
              </h1>
            </div>
            <span
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border ${
                STATUS_STYLES[statusKey] || STATUS_STYLES.open
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  STATUS_DOTS[statusKey] || STATUS_DOTS.open
                }`}
              />
              {job.status ? job.status[0].toUpperCase() + job.status.slice(1) : 'Open'}
            </span>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-b border-slate-100">
            <div className="flex items-center gap-3.5 p-3.5 bg-slate-50/80 rounded-2xl">
              <div className="p-2.5 bg-white rounded-xl shadow-xs border border-slate-200/60 text-emerald-600">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Location</p>
                <p className="text-sm font-semibold text-slate-900">{job.location || 'Remote / Unspecified'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 bg-slate-50/80 rounded-2xl">
              <div className="p-2.5 bg-white rounded-xl shadow-xs border border-slate-200/60 text-emerald-600">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Date Added</p>
                <p className="text-sm font-semibold text-slate-900">{dateFormatted}</p>
              </div>
            </div>

            {job.salary && (
              <div className="flex items-center gap-3.5 p-3.5 bg-slate-50/80 rounded-2xl sm:col-span-2">
                <div className="p-2.5 bg-white rounded-xl shadow-xs border border-slate-200/60 text-emerald-600">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Salary / Compensation</p>
                  <p className="text-sm font-semibold text-slate-900">{job.salary}</p>
                </div>
              </div>
            )}

            {job.link && (
              <div className="flex items-center gap-3.5 p-3.5 bg-slate-50/80 rounded-2xl sm:col-span-2">
                <div className="p-2.5 bg-white rounded-xl shadow-xs border border-slate-200/60 text-emerald-600">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-slate-500">Job Posting Link</p>
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 hover:underline inline-flex items-center gap-1.5 truncate max-w-full"
                  >
                    <span className="truncate">{job.link}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Notes Section */}
          {job.notes && (
            <div className="py-6 border-b border-slate-100">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                Notes & Activity
              </div>
              <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap bg-slate-50/80 p-4 rounded-2xl border border-slate-200/50">
                {job.notes}
              </p>
            </div>
          )}

          {/* Action Buttons: Edit & Delete */}
          <div className="flex items-center justify-between pt-6 gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <Link
                to="/jobs/$jobId/edit"
                params={{ jobId }}
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white rounded-full px-5 py-2.5 text-sm font-semibold transition shadow-xs"
              >
                <Pencil className="w-4 h-4" />
                Edit Application
              </Link>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="cursor-pointer inline-flex items-center gap-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-full px-5 py-2.5 text-sm font-semibold transition disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                {deleting ? 'Removing...' : 'Delete'}
              </button>
            </div>

            <Link
              to="/jobs"
              className="text-xs font-medium text-slate-500 hover:text-slate-800 transition"
            >
              Back to all
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
