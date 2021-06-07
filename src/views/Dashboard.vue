<template>
  <v-row class="text-center">
    <v-col cols="12">
      <h1>Dashboard</h1>
    </v-col>
    <v-row>
      <!--pending-->
      <v-col cols=6>
        <h3>Pending Tasks</h3>
        <TaskCard v-for="task in pendingTasks" :key="task.id" :data="task"/>
      </v-col>
      <!--done-->
      <v-col cols=6>
        <h3>Completed Taks</h3>
        <TaskCard v-for="task in doneTasks" :key="task.id" :data="task"/>
      </v-col>
    </v-row>
  </v-row>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import { Task } from '../models/Task'
  import TaskCard from '../components/shared/TaskCard'

  export default {
    name: 'Dashboard',

    components: {
      TaskCard
    },

    computed: {
      ...mapState({
        tasks: state => state.tasks
      }),
      ...mapGetters([
        'getTasksByStatus'
      ]),
      pendingTasks() {
        const status = Task.statuses.pending.key
        let tasks = this.getTasksByStatus(status)
        return tasks
      },
      doneTasks() {
        const status = Task.statuses.done.key
        let tasks = this.getTasksByStatus(status)
        return tasks
      }
    }
  }
</script>

<style scoped>
  .v-card {
    margin: 10px;
    padding: 15px;
  }
</style>
