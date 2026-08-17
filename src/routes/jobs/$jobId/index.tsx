import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import {
  ArrowLeft,
  Building2,
  Calendar,
  ExternalLink,
  MapPin,
  Pencil,
  Trash2,
  Briefcase,
} from 'lucide-react'
import { SAMPLE_JOBS, STATUS_DOTS, STATUS_STYLES } from '../index'

export const Route = createFileRoute('/jobs/$jobId/')({
  component: JobDetailPage,
})

function JobDetailPage() {
  const { jobId } = Route.useParams()
  const navigate = useNavigate()

  // Find job from sample jobs or construct a fallback
  const job = SAMPLE_JOBS.find((j) => j.id === jobId) || {
    id: jobId,
    title: 'Software Engineer',
    company: 'Company ' + jobId,
    status: 'applied' as const,
    location: 'Remote',
    link: 'https://example.com',
    createdAt: 'Recent',
  }

  function handleDelete() {
    const confirmed = window.confirm(`Delete application for "${job.title}" at "${job.company}"? This cannot be undone.`)
    if (!confirmed) return

    // In full implementation, invoke DELETE api/jobs/:id here
    navigate({ to: '/jobs' })
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans p-6 sm:p-10">
      <div className="max-w-2xl mx-auto">
        {/* Navigation / Header */}
        <div className="mb-6">
          <Link
            to="/jobs"
            className="text-xs font-medium text-green-400 text-gray-500 hover:text-gray-800 inline-flex items-center gap-1.5 mb-3 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 " />
            Back to applications
          </Link>
          <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-gray-500 mb-1">
            job-tracker · application details
          </div>
          <h1 className="text-2xl text-slate-900 font-semibold tracking-tight">
            Job Overview
          </h1>
        </div>

        {/* Job Detail Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          {/* Card Top Row: Company & Status Badge */}
          <div className="flex items-start justify-between gap-4 pb-6 border-b border-gray-100 flex-wrap">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                <Building2 className="w-3.5 h-3.5" />
                {job.company}
              </span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                {job.title}
              </h2>
            </div>
            <span
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${STATUS_STYLES[job.status]}`}
            >
              <span
                className={`w-2 h-2 rounded-full ${STATUS_DOTS[job.status]}`}
              />
              {job.status[0].toUpperCase() + job.status.slice(1)}
            </span>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-b border-gray-100">
            <div className="flex items-center gap-3 p-3 bg-gray-50/70 rounded-xl">
              <div className="p-2 bg-white rounded-lg shadow-2xs border border-gray-200/60 text-gray-600">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Location</p>
                <p className="text-sm font-semibold text-slate-900">{job.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50/70 rounded-xl">
              <div className="p-2 bg-white rounded-lg shadow-2xs border border-gray-200/60 text-gray-600">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Date Added</p>
                <p className="text-sm font-semibold text-slate-900">{job.createdAt}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50/70 rounded-xl sm:col-span-2">
              <div className="p-2 bg-white rounded-lg shadow-2xs border border-gray-200/60 text-gray-600">
                <Briefcase className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500">Job Posting Link</p>
                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center gap-1 truncate max-w-full"
                >
                  <span className="truncate">{job.link}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>
            </div>
          </div>

          {/* Action Buttons: Edit & Delete */}
          <div className="flex items-center justify-between pt-6 gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <Link
                to="/jobs/$jobId/edit"
                params={{ jobId }}
                className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors shadow-xs"
              >
                <Pencil className="w-4 h-4" />
                Edit job
              </Link>
              <button
                type="button"
                onClick={handleDelete}
                className="cursor-pointer inline-flex items-center gap-1.5 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete job
              </button>
            </div>

            <Link
              to="/jobs"
              className="text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
