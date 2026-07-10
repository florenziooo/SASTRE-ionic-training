export interface Task {
  id: number
  name: string
  done: boolean
}

export function useTaskStore(): {
  tasks: Task[]
  totalCount: number
  doneCount: number
  pendingCount: number
  addTask: (name: string) => void
  toggleTask: (id: number) => void
  removeTask: (id: number) => void
}
