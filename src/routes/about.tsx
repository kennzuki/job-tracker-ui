import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

const details = [
  'A focused layout that keeps the experience calm and easy to scan.',
  'Tailwind utility classes for rapid visual updates without extra styling overhead.',
  'A simple route structure you can build on as the app grows.',
]

function About() {
  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white/80 p-8 shadow-[0_20px_50px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:p-10 lg:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-600">
          About this workspace
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          A clean starting point for your next product.
        </h1>
        <p className="mt-5 text-base leading-8 text-slate-600">
          This app uses Tailwind for styling and a minimal layout so you can focus
          on your core experience instead of fighting starter content.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {details.map((item) => (
            <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm leading-6 text-slate-600">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
