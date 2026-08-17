import { Link } from '@tanstack/react-router'
import { SignInButton, SignUpButton, Show, UserButton } from '@clerk/tanstack-react-start'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-base font-semibold text-slate-900">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          Job Tracker
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
            Home
          </Link>
          <Link to="/jobs" className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
            Jobs
          </Link>
          <Link to="/jobs/new" className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
            Add Job
          </Link>
          <Link to="/about" className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
            About
          </Link>

          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="cursor-pointer text-sm font-medium text-slate-600 transition hover:text-slate-900">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="cursor-pointer rounded-full bg-emerald-600 px-3.5 py-1.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700">
                Sign Up
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>

          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
