<template>
  <v-card :class="{done: isDone, 'has-subtasks': hasSubtasks}" class="task-card">
    <v-row>
      <v-col cols=12>
        <v-row>
          <v-col cols=12 class="action-icons">
            <v-icon :class="{'i-success': isDone}" @click="changeStatus">mdi-check-circle{{ !isDone ? '-outline' : ''}}</v-icon>
            <v-icon class="i-error" @click="remove">mdi-book-remove-{{isSubtask ? 'multiple-' : ''}}outline</v-icon>
          </v-col>
        </v-row>
        <h4 class="title">{{data.title}}</h4>
        <h5 class="subtitle">{{data.description}}</h5>
        <h4>{{new Date (data.dueDate).toLocaleString()}}</h4>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-if="hasCategories" cols=12 class="categories">
        <v-icon @click="addSubtask">mdi-book-plus-multiple</v-icon>
        <div class="category-icons">
          <v-icon v-for="category in data.categories" :key="category" @click="goToCategory(category)">mdi-{{categories[category].icon}}</v-icon>
        </div>
        </v-col>
    </v-row>
    <v-row v-if="hasSubtasks" class="subtasks">
      <v-col cols=12>
        <div class="subtasks-container" v-if="hasSubtasks">
          <TaskCard v-for="subtask in data.subtasks" :key="subtask.id" :data="subtask" :parent-id="data.id" is-subtask/>
        </div>
      </v-col>
    </v-row>

  </v-card>
</template>

<script>
import { mapMutations } from 'vuex'
import { Task } from '../../models/Task.js'
import { app } from '../../main'

export default {
  name: 'TaskCard',

  props: {
    data: Object,
    isSubtask: Boolean,
    parentId: String
  },

  methods: {
    ...mapMutations([
      'removeTask'
    ]),
    changeStatus() {
      if(this.hasSubtasks) return
      this.data.toggleStatus()
    },
    remove() {
      this.removeTask({
        parentId: this.parentId,
        taskId: this.data.id
      })
    },
    goToCategory(categoryKey) {
      this.$router.push({name: 'category', params: {categoryKey}})
    },
    addSubtask() {
      app.$emit('adding-subtask', {
        taskId: this.data.id
      })
    }
  },

  computed: {
    isDone() {
      return this.data.getStatus().key === Task.statuses.done.key
    },
    hasSubtasks() {
      return this.data.subtasks && this.data.subtasks.length
    },
    hasCategories() {
      return this.data.categories && this.data.categories.length
    },
    categories () {
      return Task.categories
    }
  }
}
</script>

<style scoped>
  .flex {
    display: flex;
  }
  .v-card {
    margin: 10px 10px 20px 10px !important;
    padding: 15px;
    background: #F8F8F8;
  }
  .v-sheet .v-card {
    margin: 10px;
    padding: 15px;
    background: #F8F8F8;
    display: block;
    width: auto;
  }
  .v-icon.i-success {
    color: rgb(84, 201, 84);
  }
  .v-icon.i-error {
    color: lightcoral;
  }
  .v-icon.i-info {
    color: lightblue;
  }
  .v-card.done {
    background: white;
  }
  .action-icons {
    display: flex;
    justify-content: space-between;
  }
  .categories {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .category-icons .v-icon {
    color: cadetblue;
  }
  .categories span {
    margin-right: 5px
  }
  .subtasks-container {
    padding-top: 10px;
    border-top: 1px solid #eee;
    display: flex;
    flex-direction: column;
  }
  .subtasks {
    margin: 0 !important;
  }
  .subtask {
    margin: 0 !important;
    padding: 0;
  }
  .v-icon {
    cursor: pointer;
  }
</style>
