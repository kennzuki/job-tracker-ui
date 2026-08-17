import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/addJob')({
  component:AddJobPage,
})

function AddJobPage() {
  return <main className="px-4 py-8 sm:px-6 lg:px-8">
    <h1 className="text-xl font-bold uppercase">Add a job</h1>
     <div className="min-h-screen bgwhite text-[#e6e8eb] flex items-center justify-center p-10 font-sans">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-gray-500 mb-2">
            job-tracker · new entry
          </div>
          <h1 className="text-2xl text-gray-600 font-semibold tracking-tight">
            Log an application
          </h1>
        </div>
 
        <form className="bg-white border border-[#262b35] rounded-2xl p-6 flex flex-col gap-5">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-gray-400">
              Job title <span className="text-red-400">*</span>
            </span>
            <input
              type="text"
              name="title"
              required
              placeholder="Backend Engineer"
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-[#e6e8eb] placeholder-gray-600 outline-none focus:border-blue-500"
            />
          </label>
 
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-gray-400">
              Company <span className="text-red-400">*</span>
            </span>
            <input
              type="text"
              name="company"
              required
              placeholder="Simplepay Capital"
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-[#e6e8eb] placeholder-gray-600 outline-none focus:border-blue-500"
            />
          </label>
 
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-gray-400">
              Status <span className="text-red-400">*</span>
            </span>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-500" />
              <select
                name="status"
                defaultValue="open"
                className="w-full appearance-none cursor-pointer bg-white border border-gray-300 rounded-lg pl-8 pr-3 py-2.5 text-sm text-[#e6e8eb] outline-none focus:border-blue-500"
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
            <span className="text-xs font-medium text-gray-400">
              Location
            </span>
            <input
              type="text"
              name="location"
              placeholder="Nairobi, KE · Remote"
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-[#e6e8eb] placeholder-gray-600 outline-none focus:border-blue-500"
            />
          </label>
 
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-gray-400">
              Job link
            </span>
            <input
              type="url"
              name="link"
              placeholder="https://company.com/careers/123"
              className="w-full bg-white border border-gray-300rounded-lg px-3 py-2.5 text-sm text-[#e6e8eb] placeholder-gray-600 outline-none focus:border-blue-500"
            />
          </label>
 
          <div className="flex gap-2.5 mt-1">
            <button
              type="submit"
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors"
            >
              Save job
            </button>
            <button
              type="reset"
              className="border border-[#2a2f3a] text-gray-400 hover:text-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
}
