export type Priority = 'low' | 'medium' | 'high'

export interface Task {
  id: number
  name: string
  done: boolean
  priority: Priority
  photo?: string
}

export function useTaskStore(): {
  tasks: Task[]
  totalCount: number
  doneCount: number
  pendingCount: number
  addTask: (name: string, priority?: Priority) => void
  toggleTask: (id: number) => void
  removeTask: (id: number) => void
  clearAll: () => void
  addPhotoToTask: (id: number, path: string) => void
  saveTasks: () => Promise<void>
  loadTasks: () => Promise<void>
}
