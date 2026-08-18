import { useState } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useAuth } from '@clerk/tanstack-react-start'
import { ArrowLeft, AlertCircle, Sparkles, Check } from 'lucide-react'
import ProtectedRoute from '../../components/ProtectedRoute'
import { createJob } from '../../lib/api'
import type { JobStatus } from '../../lib/types'

export const Route = createFileRoute('/jobs/new')({
  component: AddJobPageWithProtection,
})

function AddJobPageWithProtection() {
  return (
    <ProtectedRoute
      title="Sign in to add applications"
      description="Create an account or sign in to track new job opportunities, interviews, and application statuses."
    >
      <AddJobPage />
    </ProtectedRoute>
  )
}

function AddJobPage() {
  const { getToken } = useAuth()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)
      const title = String(formData.get('title') || '').trim()
      const company = String(formData.get('company') || '').trim()
      const status = (String(formData.get('status') || 'applied') as JobStatus)
      const location = String(formData.get('location') || '').trim()
      const link = String(formData.get('link') || '').trim()
      const salary = String(formData.get('salary') || '').trim()
      const notes = String(formData.get('notes') || '').trim()

      if (!title || !company) {
        throw new Error('Job title and company name are required.')
      }

      const token = (await getToken()) || undefined
      const created = await createJob(
        { title, company, status, location, link, salary, notes },
        token
      )

      navigate({ to: '/jobs/$jobId', params: { jobId: created._id || created.id! } })
    } catch (err: any) {
      console.error('Failed to create job:', err)
      setError(err.message || 'Failed to save job application. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50/60 font-sans p-4 sm:p-8 lg:p-12">
      <div className="max-w-lg mx-auto">
        <div className="mb-6">
          <Link
            to="/jobs"
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1.5 mb-3 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to applications
          </Link>
          <div className="font-mono text-[11px] tracking-[0.15em] uppercase text-emerald-600 font-semibold mb-1">
            pipeline tracker · new entry
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Log an Application
          </h1>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 flex flex-col gap-5 shadow-[0_20px_50px_rgba(15,23,42,0.06)] text-slate-900"
        >
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-slate-700">
              Job Title <span className="text-red-500">*</span>
            </span>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. Senior Frontend Engineer"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-slate-700">
              Company <span className="text-red-500">*</span>
            </span>
            <input
              type="text"
              name="company"
              required
              placeholder="e.g. Acme Corp"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-slate-700">
                Status <span className="text-red-500">*</span>
              </span>
              <select
                name="status"
                defaultValue="applied"
                className="cursor-pointer bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 outline-none focus:bg-white focus:border-emerald-500"
              >
                <option value="applied">Applied</option>
                <option value="interviewing">Interviewing</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-slate-700">
                Location
              </span>
              <input
                type="text"
                name="location"
                placeholder="e.g. Remote / Nairobi"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-slate-700">
                Salary / Compensation
              </span>
              <input
                type="text"
                name="salary"
                placeholder="e.g. $120,000 / yr"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-slate-700">
                Job Posting Link
              </span>
              <input
                type="url"
                name="link"
                placeholder="https://company.com/careers/..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-slate-700">
              Notes & Next Steps
            </span>
            <textarea
              name="notes"
              rows={3}
              placeholder="e.g. Connected with the recruiter on LinkedIn. Interview scheduled for Tuesday."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none"
            />
          </label>

          <div className="flex items-center gap-3 mt-4 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="cursor-pointer flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-5 py-3 text-sm font-semibold transition shadow-sm disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving to Pipeline...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Save Application
                </>
              )}
            </button>
            <Link
              to="/jobs"
              className="border border-slate-300 text-slate-600 hover:bg-slate-50 rounded-full px-5 py-3 text-sm font-medium transition"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  )
}
