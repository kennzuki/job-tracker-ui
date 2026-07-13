import { Link } from '@tanstack/react-router'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200/80 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">&copy; {year} Job Tracker. All rights reserved.</p>
        <div className="flex gap-4 text-sm text-slate-600">
          <Link to="/" className="transition hover:text-slate-900">
            Home
          </Link>
          <Link to="/about" className="transition hover:text-slate-900">
            About
          </Link>
        </div>
      </div>
    </footer>
  )
}
