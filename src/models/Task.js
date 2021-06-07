import { nanoid } from 'nanoid'

export class Task {
  constructor(data) {
    data = data || {}
    this.id = data.id || nanoid()
    this.title = data.title
    this.description = data.description
    this.status = data.status || Task.statuses.pending.key
    this.dueDate = data.dueDate,
    this.featured = !!data.featured
    this.categories = data.categories || []
    this.subtasks = data.subtasks || []
  }

  static statuses = {
    pending: {
      key: 'pending',
      value: 'Pending'
    },
    done: {
      key: 'done',
      value: 'Done'
    }
  }

  static categories = {
    home: {
      key: 'home',
      value: 'Home',
      icon: 'home'
    },

    work: {
      key: 'work',
      value: 'Work',
      icon: 'briefcase-variant'
    },

    selfCare: {
      key: 'selfCare',
      value: 'Self Care',
      icon: 'head-heart'
    }
  }

  toggleStatus() {
    this.status = this.status === Task.statuses.done.key 
      ? Task.statuses.pending.key 
      : Task.statuses.done.key
  }

  getStatus() {
    let statuses = Task.statuses
    
    // if task has subtasks
    if(this.subtasks && this.subtasks.length) {
      let notAllSubtasksDone = this.subtasks.find(subtask => subtask.status !== statuses.done.key)
      this.status = notAllSubtasksDone 
        ? statuses.pending.key
        : statuses.done.key

      return notAllSubtasksDone 
        ? statuses.pending
        : statuses.done
    }

    let statusKey = Object.keys(statuses).find(key => this.status === statuses[key].key)
    return statuses[statusKey]
  }

  assignSubtask(subtask) {
    this.subtasks.push(subtask)
  }

  removeSubtask(id) {
    this.subtasks = this.subtasks.filter(st => st.id !== id)
  }

}