import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/jobs/$jobId/')({
  component: JobDetailPage,
})

function JobDetailPage() {
  const { jobId } = Route.useParams()

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans p-6 sm:p-10">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <Link
            to="/jobs"
            className="text-xs font-medium text-gray-500 hover:text-gray-700 inline-flex items-center gap-1 mb-3"
          >
            ← Back to applications
          </Link>
          <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-gray-500 mb-1">
            job-tracker · view entry
          </div>
          <h1 className="text-2xl text-slate-900 font-semibold tracking-tight">
            Job Details ({jobId})
          </h1>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-600">
            Viewing application details for ID: <span className="font-mono font-medium text-slate-900">{jobId}</span>
          </p>
          <div className="mt-4 flex gap-3">
            <Link
              to="/jobs/$jobId/edit"
              params={{ jobId }}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-semibold transition-colors"
            >
              Edit job
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
