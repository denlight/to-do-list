<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark>

      <v-btn
        @click="showModal"
        text>
        <span class="mr-2">Add Task</span>
        <v-icon>mdi-book-plus-outline</v-icon>
      </v-btn>
    </v-app-bar>
    <v-container>
      <router-view></router-view>
    </v-container>
    <Modal v-if="mounted" :modal-toggle="dialog"/>
  </v-app>
</template>

<script>

import Modal from './components/Modal'
export default {
  name: 'Home',

  components: {
    Modal
  },

  methods: {
    showModal() {
      this.dialog = !this.dialog
    }
  },

  data: () => ({
    dialog: false,
    mounted: false
  }),

  mounted() {
    this.mounted = true
  }
};
</script>

<style scoped>
  .container {
    padding-top: 100px;
  }
</style>
