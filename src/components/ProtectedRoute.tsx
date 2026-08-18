import { ReactNode } from 'react'
import { useAuth, SignInButton, SignUpButton } from '@clerk/tanstack-react-start'
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react'
import { Link } from '@tanstack/react-router'

interface ProtectedRouteProps {
  children: ReactNode
  title?: string
  description?: string
}

export default function ProtectedRoute({
  children,
  title = 'Sign in to access your jobs',
  description = 'You need to be signed in to view, create, and manage your job applications and interview pipeline.',
}: ProtectedRouteProps) {
  const { isLoaded, isSignedIn } = useAuth()

  // 1. Loading state while Clerk initializes
  if (!isLoaded) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
          <p className="text-sm font-medium text-slate-500">Checking authentication...</p>
        </div>
      </main>
    )
  }

  // 2. Protected prompt when signed out
  if (!isSignedIn) {
    return (
      <main className="min-h-[75vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 sm:p-10 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-inner">
            <Lock className="h-8 w-8" />
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-3">
            <ShieldCheck className="h-3.5 w-3.5" />
            Protected Workspace
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {title}
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            {description}
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <SignInButton mode="modal">
              <button
                type="button"
                className="cursor-pointer inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
              >
                Sign In to Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button
                type="button"
                className="cursor-pointer inline-flex w-full items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Create an Account
              </button>
            </SignUpButton>

            <Link
              to="/"
              className="mt-2 text-xs font-medium text-slate-500 hover:text-slate-800 transition"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    )
  }

  // 3. User is signed in
  return <>{children}</>
}
