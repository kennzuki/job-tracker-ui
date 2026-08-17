import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { SAMPLE_JOBS } from '../index'

export const Route = createFileRoute('/jobs/$jobId/edit')({
  component: EditJobPage,
})

function EditJobPage() {
  const { jobId } = Route.useParams()
  const navigate = useNavigate()

  const job = SAMPLE_JOBS.find((j) => j.id === jobId) || {
    id: jobId,
    title: 'Backend Engineer',
    company: 'Simplepay Capital',
    status: 'interviewing' as const,
    location: 'Nairobi, KE · Hybrid',
    link: 'https://simplepay.example.com/careers/backend-engineer',
    createdAt: 'Recent',
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // In full implementation, invoke PUT /api/jobs/:id here
    navigate({ to: '/jobs/$jobId', params: { jobId } })
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans p-6 sm:p-10">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <Link
            to="/jobs/$jobId"
            params={{ jobId }}
            className="text-xs font-medium text-gray-500 hover:text-gray-800 inline-flex items-center gap-1 mb-3 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to job overview
          </Link>
          <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-gray-500 mb-1">
            job-tracker · edit entry
          </div>
          <h1 className="text-2xl text-slate-900 font-semibold tracking-tight">
            Edit application
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-5 shadow-sm text-slate-900"
        >
          <p className="text-xs text-gray-500">Editing application #{jobId}</p>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-gray-600">
              Job title <span className="text-red-500">*</span>
            </span>
            <input
              type="text"
              name="title"
              required
              defaultValue={job.title}
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-gray-600">
              Company <span className="text-red-500">*</span>
            </span>
            <input
              type="text"
              name="company"
              required
              defaultValue={job.company}
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-gray-600">
              Status <span className="text-red-500">*</span>
            </span>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-500" />
              <select
                name="status"
                defaultValue={job.status}
                className="w-full appearance-none cursor-pointer bg-white border border-gray-300 rounded-lg pl-8 pr-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="open">Open</option>
                <option value="applied">Applied</option>
                <option value="interviewing">Interviewing</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-gray-600">
              Location
            </span>
            <input
              type="text"
              name="location"
              defaultValue={job.location}
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-gray-600">
              Job link
            </span>
            <input
              type="url"
              name="link"
              defaultValue={job.link}
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </label>

          <div className="flex gap-2.5 mt-2">
            <button
              type="submit"
              className="flex-1 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors"
            >
              Save changes
            </button>
            <Link
              to="/jobs/$jobId"
              params={{ jobId }}
              className="inline-flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
