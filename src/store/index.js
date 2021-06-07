import Vue from 'vue'
import Vuex from 'vuex'
import { Task } from '../models/Task'

Vue.use(Vuex)

const twelveHours = 1000 * 60 * 60 * 12

let tasks = [
  {
    title: 'Cook dinner',
    description: 'Feed the kids, or they will eat me',
    dueDate: new Date().getTime() + twelveHours,
    categories: [Task.categories.home.key],
    status: Task.statuses.done.key
  },
  {
    title: 'Change guitar strings',
    description: 'It has been 2 years',
    dueDate: new Date().getTime() + twelveHours,
    categories: [Task.categories.home.key, Task.categories.selfCare.key],
    subtasks: [
      new Task({
        title: 'Buy strings',
        description: 'Make a trip to GuitarCenter',
        dueDate: new Date().getTime() + twelveHours
      }),
      new Task({
        title: 'Put new strings on',
        description: 'Duh!',
        dueDate: new Date().getTime() + twelveHours
      }),
      new Task({
        title: 'Rock!',
        description: 'Learn how to play some new Radiohead song',
        dueDate: new Date().getTime() + twelveHours
      }),
    ]
  },
  {
    title: 'Complete coding challenge',
    description: 'Make it happen!',
    dueDate: new Date().getTime() + twelveHours,
    categories: [Task.categories.home.key, Task.categories.work.key]
  },
  {
    title: 'Take care of the dog',
    description: 'Gotta avoid stepping in the pee puddle',
    dueDate: new Date().getTime() + twelveHours,
    categories: [Task.categories.home.key, Task.categories.selfCare.key],
    subtasks: [
      new Task({
        title: 'Feed',
        description: 'Make sure it doesn\'t starve',
        dueDate: new Date().getTime() + twelveHours
      }),
      new Task({
        title: 'Walk',
        description: 'Number 1 and 2 outside, please!',
        dueDate: new Date().getTime() + twelveHours
      }),
    ]
  },
]

export default new Vuex.Store({
  state: {
    tasks: [
      new Task(tasks[0]),
      new Task(tasks[1]),
      new Task(tasks[2]),
      new Task(tasks[3]),
    ]
  },
  getters: {
    getTasksByStatus: state => status => {
      let tasks = state.tasks.filter(task => task.status === status)
      return tasks
    },
    getTasksByCategory: state => category => {
      let tasks = state.tasks.filter(task => task.categories.includes(category))
      return tasks
    }
  },
  mutations: {
    removeTask(state, payload) {
      if(payload.parentId) {
        let parent = state.tasks.find(task => task.id === payload.parentId)
        parent.subtasks = parent.subtasks.filter(subtask => subtask.id !== payload.taskId)
      } else {
        state.tasks = state.tasks.filter(task => task.id !== payload.taskId)
      }
    },
    saveTask(state, payload) {
      if(payload.taskId) {
        let task = state.tasks.find(task => task.id === payload.taskId)
        task.subtasks.push(payload.task)
      } else
      state.tasks.push(payload.task)
    }
  },
  actions: {
  },
  modules: {
  }
})
