<template>
  <v-row class="text-center">
    <v-col cols="12">
      <h1>Category</h1>
      <h3>{{currentCategory.value}}</h3>
    </v-col>
    <v-row>
      <v-col cols=12>
        <TaskCard v-for="task in categoryTasks" :key="task.id" :data="task"/>
      </v-col>
    </v-row>
  </v-row>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'
  import TaskCard from '../components/shared/TaskCard'
  import { Task } from '../models/Task'
export default {
  name: 'Home',

  components: {
    TaskCard
  },

  computed: {
    ...mapState({
      tasks: state => state.tasks
    }),
    ...mapGetters([
      'getTasksByCategory'
    ]),
    categoryTasks() {
      const category = this.$route.params['categoryKey']
      let tasks = this.getTasksByCategory(category)
      return tasks
    },
    currentCategory() {
      const categoryKey = this.$route.params['categoryKey']
      return Task.categories[categoryKey]
    }
  }
};
</script>
