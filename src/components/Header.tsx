import { Link } from '@tanstack/react-router'
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
          <Link to="/about" className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
            About
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
