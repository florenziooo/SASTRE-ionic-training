import { mount } from '@vue/test-utils'
import TasksPage from '@/views/TasksPage.vue'
import { describe, expect, test } from 'vitest'

describe('TasksPage.vue', () => {
  test('renders TasksPage', () => {
    const wrapper = mount(TasksPage)
    expect(wrapper.text()).toMatch('Tasks')
  })
})
