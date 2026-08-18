import { createFileRoute, Link } from '@tanstack/react-router'
import { Show, SignInButton, SignUpButton, useUser } from '@clerk/tanstack-react-start'
import { ArrowRight, Briefcase, Plus, Sparkles, CheckCircle2 } from 'lucide-react'

export const Route = createFileRoute('/')({ component: HomePage })

const highlights = [
  {
    title: 'Track applications',
    description: 'Keep every role, company, salary, and follow-up in one calm view.',
  },
  {
    title: 'Plan interviews',
    description: 'Capture prep notes and next steps without losing momentum.',
  },
  {
    title: 'Stay focused',
    description: 'A simple layout helps you spend less time organizing and more time applying.',
  },
]

function HomePage() {
  const { user } = useUser()

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/80 p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-10 lg:p-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-3 rounded-full bg-emerald-100/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800">
              <Sparkles className="w-3.5 h-3.5" />
              Job Tracker
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Keep your search organized without the noise.
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              A calm, minimal workspace for tracking applications, interviews,
              and the next right step.
            </p>

            {/* Signed-in user view */}
            <Show when="signed-in">
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/jobs"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                >
                  <Briefcase className="w-4 h-4" />
                  View Applications
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/jobs/new"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  <Plus className="w-4 h-4" />
                  Add New Job
                </Link>
                {user && (
                  <span className="text-xs text-slate-500 font-medium pl-1">
                    Logged in as <strong className="text-slate-800">{user.firstName || user.username || user.emailAddresses[0]?.emailAddress}</strong>
                  </span>
                )}
              </div>
            </Show>

            {/* Signed-out user view */}
            <Show when="signed-out">
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <SignUpButton mode="modal">
                  <button
                    type="button"
                    className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                  >
                    Get Started Free
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </SignUpButton>
                <SignInButton mode="modal">
                  <button
                    type="button"
                    className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                  >
                    Sign In
                  </button>
                </SignInButton>
                <Link
                  to="/about"
                  className="rounded-full px-4 py-3 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
                >
                  Learn more
                </Link>
              </div>
            </Show>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {highlights.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5"
              >
                <h2 className="text-base font-semibold text-slate-900">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white/80 p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
              What this app focuses on
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">
              Simple workflows, clearer momentum.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Use this space to collect roles you care about, keep follow-up dates
              visible, and bring structure to a process that can otherwise feel
              scattered.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-900 p-8 text-slate-100 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
              Today’s focus
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Review the next two applications to follow up on.
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Add interview notes while they are still fresh.
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Keep the pipeline moving one small step at a time.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  )
}
