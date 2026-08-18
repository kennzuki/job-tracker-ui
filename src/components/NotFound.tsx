import { Link, useRouterState } from '@tanstack/react-router'
import { Home, Briefcase, ArrowLeft, SearchX, HelpCircle } from 'lucide-react'

interface NotFoundProps {
  children?: React.ReactNode
}

export default function NotFound({ children }: NotFoundProps) {
  const routerState = useRouterState()
  const pathname = routerState.location.pathname

  return (
    <main className="min-h-[75vh] flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl text-center">
        {/* Card container */}
        <div className="rounded-[2.5rem] border border-slate-200/80 bg-white/90 p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-12">
          {/* Badge */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600 shadow-inner">
            <SearchX className="h-10 w-10" />
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-800 mb-4">
            404 Error · Not Found
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Page doesn't exist
          </h1>

          <p className="mt-4 text-base leading-7 text-slate-600 max-w-md mx-auto">
            Sorry, we couldn’t find the page you’re looking for. The route{' '}
            <code className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-800 border border-slate-200">
              {pathname}
            </code>{' '}
            might have been moved, renamed, or deleted.
          </p>

          {children}

          {/* Action buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="cursor-pointer inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Link>

            <Link
              to="/jobs"
              className="cursor-pointer inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              <Briefcase className="h-4 w-4" />
              View Applications
            </Link>
          </div>

          {/* Helpful suggestions */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-4 text-xs text-slate-500">
            <Link to="/about" className="hover:text-slate-900 transition underline underline-offset-2">
              About
            </Link>
            <span>•</span>
            <Link to="/jobs/new" className="hover:text-slate-900 transition underline underline-offset-2">
              Add Job
            </Link>
            <span>•</span>
            <a
              href="mailto:support@jobtracker.app"
              className="hover:text-slate-900 transition underline underline-offset-2 inline-flex items-center gap-1"
            >
              <HelpCircle className="h-3 w-3" />
              Help & Support
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
