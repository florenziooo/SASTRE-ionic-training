// =============================================================
//  DAY 1 ASSIGNMENT
// =============================================================
//
//

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Preferences } from '@capacitor/preferences'

const TASKS_KEY = 'day4Tasks'

// TODO 1: Export a useTaskStore function using defineStore
// The store ID is 'day4Tasks' — must be unique across all stores.
export const useTaskStore = defineStore('day4Tasks', () => {

  // TODO 2: Define state using ref()
  const tasks  = ref([])
  const nextId = ref(1)

  // TODO 3: Define getters using computed()
  const totalCount   = computed(() => tasks.value.length)
  const doneCount    = computed(() => tasks.value.filter(t => t.done).length)
  const pendingCount = computed(() => tasks.value.filter(t => !t.done).length)

  // TODO 4: Define addTask(name) action
  function addTask(name, priority = 'medium') {
    if (!name.trim()) return
    tasks.value.push({ id: nextId.value++, name: name.trim(), done: false, priority })
    saveTasks()
  }

  // TODO 5: Define toggleTask(id) action
  function toggleTask(id) {
    const task = tasks.value.find(t => t.id === id)
    if (task) task.done = !task.done
    saveTasks()
  }

  // TODO 6: Define removeTask(id) action
  function removeTask(id) {
    tasks.value = tasks.value.filter(t => t.id !== id)
    saveTasks()
  }

  // Remove every task and reset the id counter
  function clearAll() {
    tasks.value = []
    nextId.value = 1
  }

  function addPhotoToTask(id, path) {
    const task = tasks.value.find(t => t.id === id)
    if (task) task.photo = path
    saveTasks()
  }

  async function saveTasks() {
    await Preferences.set({
      key: TASKS_KEY,
      value: JSON.stringify({ tasks: tasks.value, nextId: nextId.value }),
    })
  }

  async function loadTasks() {
    const { value } = await Preferences.get({ key: TASKS_KEY })
    if (!value) return
    const { tasks: storedTasks, nextId: storedNextId } = JSON.parse(value)
    tasks.value = storedTasks ?? []
    nextId.value = storedNextId ?? 1
  }

  // TODO 7: Return everything the component needs to access
  return { tasks, totalCount, doneCount, pendingCount, addTask, toggleTask, removeTask, clearAll, addPhotoToTask, saveTasks, loadTasks }
}, { persist: true })
