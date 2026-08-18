import { createServerFn } from '@tanstack/react-start'
import type {
  JobInput,
  JobsResponse,
  SingleJobResponse,
  JobStatsResponse,
} from './types'

const BACKEND_URL =
  process.env.API_URL ||
  process.env.VITE_API_URL ||
  'http://localhost:8000'

/**
 * Helper to build auth headers
 */
function getHeaders(token?: string) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

/**
 * Server function: Fetch all jobs for the authenticated user
 */
export const getJobsServerFn = createServerFn({ method: 'GET' })
  .validator((d: { token?: string; status?: string; search?: string; page?: number; limit?: number }) => d)
  .handler(async ({ data }): Promise<JobsResponse> => {
    const params = new URLSearchParams()
    if (data?.status && data.status !== 'all') params.append('status', data.status)
    if (data?.search) params.append('search', data.search)
    if (data?.page) params.append('page', String(data.page))
    if (data?.limit) params.append('limit', String(data.limit))

    const url = `${BACKEND_URL}/api/jobs?${params.toString()}`
    const res = await fetch(url, {
      method: 'GET',
      headers: getHeaders(data?.token),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Failed to fetch jobs' }))
      throw new Error(err.message || `Error ${res.status}: Failed to fetch jobs`)
    }

    return res.json()
  })

/**
 * Server function: Fetch single job by ID
 */
export const getJobByIdServerFn = createServerFn({ method: 'GET' })
  .validator((d: { id: string; token?: string }) => d)
  .handler(async ({ data }): Promise<SingleJobResponse> => {
    const res = await fetch(`${BACKEND_URL}/api/jobs/${data.id}`, {
      method: 'GET',
      headers: getHeaders(data.token),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Failed to fetch job' }))
      throw new Error(err.message || `Error ${res.status}: Failed to fetch job`)
    }

    return res.json()
  })

/**
 * Server function: Create a new job application
 */
export const createJobServerFn = createServerFn({ method: 'POST' })
  .validator((d: { job: JobInput; token?: string }) => d)
  .handler(async ({ data }): Promise<SingleJobResponse> => {
    const res = await fetch(`${BACKEND_URL}/api/jobs`, {
      method: 'POST',
      headers: getHeaders(data.token),
      body: JSON.stringify(data.job),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Failed to create job' }))
      throw new Error(err.message || `Error ${res.status}: Failed to create job`)
    }

    return res.json()
  })

/**
 * Server function: Update an existing job application
 */
export const updateJobServerFn = createServerFn({ method: 'POST' })
  .validator((d: { id: string; job: Partial<JobInput>; token?: string }) => d)
  .handler(async ({ data }): Promise<SingleJobResponse> => {
    const res = await fetch(`${BACKEND_URL}/api/jobs/${data.id}`, {
      method: 'PUT',
      headers: getHeaders(data.token),
      body: JSON.stringify(data.job),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Failed to update job' }))
      throw new Error(err.message || `Error ${res.status}: Failed to update job`)
    }

    return res.json()
  })

/**
 * Server function: Delete a job application
 */
export const deleteJobServerFn = createServerFn({ method: 'POST' })
  .validator((d: { id: string; token?: string }) => d)
  .handler(async ({ data }): Promise<{ success: boolean; message: string }> => {
    const res = await fetch(`${BACKEND_URL}/api/jobs/${data.id}`, {
      method: 'DELETE',
      headers: getHeaders(data.token),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Failed to delete job' }))
      throw new Error(err.message || `Error ${res.status}: Failed to delete job`)
    }

    return res.json()
  })

/**
 * Server function: Get job pipeline statistics
 */
export const getJobStatsServerFn = createServerFn({ method: 'GET' })
  .validator((d: { token?: string }) => d)
  .handler(async ({ data }): Promise<JobStatsResponse> => {
    const res = await fetch(`${BACKEND_URL}/api/jobs/stats`, {
      method: 'GET',
      headers: getHeaders(data?.token),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Failed to fetch job stats' }))
      throw new Error(err.message || `Error ${res.status}: Failed to fetch job stats`)
    }

    return res.json()
  })
