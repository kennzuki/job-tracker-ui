import type {
  Job,
  JobInput,
  JobsResponse,
  SingleJobResponse,
  JobStatsResponse,
} from './types'
import {
  getJobsServerFn,
  getJobByIdServerFn,
  createJobServerFn,
  updateJobServerFn,
  deleteJobServerFn,
  getJobStatsServerFn,
} from './serverFunctions'

export const API_BASE_URL =
  (import.meta as any).env?.VITE_API_URL ||
  (import.meta as any).env?.API_URL ||
  'http://localhost:8000'

/**
 * Fetch all jobs for user using Server Function
 */
export async function fetchJobs(options?: {
  token?: string
  status?: string
  search?: string
  page?: number
  limit?: number
}): Promise<JobsResponse> {
  return getJobsServerFn({
    data: {
      token: options?.token,
      status: options?.status,
      search: options?.search,
      page: options?.page,
      limit: options?.limit,
    },
  })
}

/**
 * Fetch single job by ID using Server Function
 */
export async function fetchJobById(id: string, token?: string): Promise<Job> {
  const res = await getJobByIdServerFn({
    data: { id, token },
  })
  return res.job
}

/**
 * Create new job using Server Function
 */
export async function createJob(job: JobInput, token?: string): Promise<Job> {
  const res = await createJobServerFn({
    data: { job, token },
  })
  return res.job
}

/**
 * Update job using Server Function
 */
export async function updateJob(
  id: string,
  job: Partial<JobInput>,
  token?: string
): Promise<Job> {
  const res = await updateJobServerFn({
    data: { id, job, token },
  })
  return res.job
}

/**
 * Delete job using Server Function
 */
export async function deleteJob(id: string, token?: string): Promise<void> {
  await deleteJobServerFn({
    data: { id, token },
  })
}

/**
 * Fetch job statistics using Server Function
 */
export async function fetchJobStats(token?: string): Promise<JobStatsResponse> {
  return getJobStatsServerFn({
    data: { token },
  })
}
