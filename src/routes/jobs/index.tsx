import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ExternalLink, Eye } from 'lucide-react'

export type Status = 'open' | 'applied' | 'interviewing' | 'offer' | 'rejected' | 'closed'

export type Job = {
  id: string
  title: string
  company: string
  status: Status
  location: string
  link: string
  createdAt: string
}

export const SAMPLE_JOBS: Job[] = [
  {
    id: '1',
    title: 'Backend Engineer',
    company: 'Simplepay Capital',
    status: 'interviewing',
    location: 'Nairobi, KE · Hybrid',
    link: 'https://simplepay.example.com/careers/backend-engineer',
    createdAt: 'Aug 12, 2026',
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    company: 'Andela',
    status: 'applied',
    location: 'Remote',
    link: 'https://andela.example.com/jobs/fullstack',
    createdAt: 'Aug 10, 2026',
  },
  {
    id: '3',
    title: 'Node.js Engineer',
    company: 'Turing',
    status: 'open',
    location: 'Remote',
    link: 'https://turing.example.com/jobs/node',
    createdAt: 'Aug 8, 2026',
  },
  {
    id: '4',
    title: 'Software Engineer, Fintech',
    company: 'Cellulant',
    status: 'offer',
    location: 'Nairobi, KE',
    link: 'https://cellulant.example.com/careers/se-fintech',
    createdAt: 'Aug 3, 2026',
  },
  {
    id: '5',
    title: 'Junior Backend Developer',
    company: 'M-KOPA',
    status: 'rejected',
    location: 'Nairobi, KE',
    link: 'https://mkopa.example.com/careers/junior-backend',
    createdAt: 'Jul 29, 2026',
  },
  {
    id: '6',
    title: 'API Developer',
    company: 'Flutterwave',
    status: 'closed',
    location: 'Remote · Africa',
    link: 'https://flutterwave.example.com/jobs/api-dev',
    createdAt: 'Jul 22, 2026',
  },
]

export const STATUS_STYLES: Record<Status, string> = {
  open: 'bg-slate-100 text-slate-700 border-slate-300',
  applied: 'bg-blue-50 text-blue-700 border-blue-200',
  interviewing: 'bg-amber-50 text-amber-800 border-amber-200',
  offer: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  rejected: 'bg-red-50 text-red-700 border-red-200',
  closed: 'bg-gray-100 text-gray-600 border-gray-300',
}

export const STATUS_DOTS: Record<Status, string> = {
  open: 'bg-slate-400',
  applied: 'bg-blue-500',
  interviewing: 'bg-amber-500',
  offer: 'bg-emerald-500',
  rejected: 'bg-red-500',
  closed: 'bg-gray-400',
}

export const Route = createFileRoute('/jobs/')({
  component: JobsListPage,
})

function JobsListPage() {
  const [jobList] = useState<Job[]>(SAMPLE_JOBS)

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans p-6 sm:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-gray-500 mb-2">
              job-tracker · {jobList.length} entries
            </div>
            <h1 className="text-2xl text-black uppercase font-semibold tracking-tight">
              Applications
            </h1>
          </div>
          <Link
            to="/jobs/new"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors shadow-sm"
          >
            + New job
          </Link>
        </div>

        {/* Table (desktop) */}
        <div className="hidden md:block bg-white text-black border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left bg-gray-50/50">
                <th className="font-medium text-gray-500 text-xs uppercase tracking-wide px-5 py-3.5">
                  Role
                </th>
                <th className="font-medium text-gray-500 text-xs uppercase tracking-wide px-5 py-3.5">
                  Company
                </th>
                <th className="font-medium text-gray-500 text-xs uppercase tracking-wide px-5 py-3.5">
                  Location
                </th>
                <th className="font-medium text-gray-500 text-xs uppercase tracking-wide px-5 py-3.5">
                  Status
                </th>
                <th className="font-medium text-gray-500 text-xs uppercase tracking-wide px-5 py-3.5">
                  Added
                </th>
                <th className="font-medium text-gray-500 text-xs uppercase tracking-wide px-5 py-3.5 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {jobList.map((job) => (
                <tr
                  key={job.id}
                  className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/80 transition-colors"
                >
                  <td className="px-5 py-4 font-medium">
                    <Link
                      to="/jobs/$jobId"
                      params={{ jobId: job.id }}
                      className="text-slate-900 hover:text-blue-600 font-medium hover:underline"
                    >
                      {job.title}
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-gray-600">{job.company}</td>
                  <td className="px-5 py-4 text-gray-500">{job.location}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${STATUS_STYLES[job.status]}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${STATUS_DOTS[job.status]}`}
                      />
                      {job.status[0].toUpperCase() + job.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-400 font-mono text-xs">
                    {job.createdAt}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-3 text-xs font-medium">
                      <a
                        href={job.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-700"
                      >
                        Link <ExternalLink className="w-3 h-3" />
                      </a>
                      <Link
                        to="/jobs/$jobId"
                        params={{ jobId: job.id }}
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-semibold"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards (mobile) */}
        <div className="md:hidden flex flex-col gap-3">
          {jobList.map((job) => (
            <div
              key={job.id}
              className="bg-white text-black border border-gray-200 rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <Link
                    to="/jobs/$jobId"
                    params={{ jobId: job.id }}
                    className="font-semibold text-slate-900 hover:text-blue-600 hover:underline"
                  >
                    {job.title}
                  </Link>
                  <div className="text-gray-500 text-sm">{job.company}</div>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${STATUS_STYLES[job.status]}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${STATUS_DOTS[job.status]}`}
                  />
                  {job.status[0].toUpperCase() + job.status.slice(1)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400 mt-3 pt-3 border-t border-gray-100">
                <span>{job.location}</span>
                <span className="font-mono">{job.createdAt}</span>
              </div>
              <div className="flex items-center justify-between gap-4 mt-3 pt-3 border-t border-gray-100 text-xs font-medium">
                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-700"
                >
                  Link <ExternalLink className="w-3 h-3" />
                </a>
                <Link
                  to="/jobs/$jobId"
                  params={{ jobId: job.id }}
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-semibold"
                >
                  <Eye className="w-3.5 h-3.5" />
                  View details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
