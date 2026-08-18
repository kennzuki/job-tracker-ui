export type JobStatus =
  | 'open'
  | 'applied'
  | 'interviewing'
  | 'interview'
  | 'offer'
  | 'rejected'
  | 'closed'
  | 'review'

export interface Job {
  _id: string
  id?: string
  title: string
  company: string
  status: JobStatus
  location?: string
  link?: string
  salary?: string
  notes?: string
  clerkId?: string
  user?: string
  createdAt: string
  updatedAt?: string
}

export interface JobInput {
  title: string
  company: string
  status?: JobStatus
  location?: string
  link?: string
  salary?: string
  notes?: string
}

export interface Pagination {
  total: number
  page: number
  pages: number
  limit: number
}

export interface JobsResponse {
  success: boolean
  jobs: Job[]
  pagination?: Pagination
  message?: string
}

export interface SingleJobResponse {
  success: boolean
  job: Job
  message?: string
}

export interface JobStatsResponse {
  success: boolean
  total: number
  stats: Record<string, number>
  message?: string
}
