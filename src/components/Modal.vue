<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px">

      <v-card>
        <v-card-title>
          <span class="text-h5">Add Task</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
           
              <v-col cols="12">
                <v-text-field label="Title*" v-model="title" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Description*" v-model="description" required></v-text-field>
              </v-col>

              <v-col v-if="!taskId" cols="12" sm="6">
                <v-autocomplete
                  :items="categories"
                  label="Categories*"
                  multiple
                  v-model="selectedCategories"
                  required></v-autocomplete>
              </v-col>
            
            </v-row>
            <v-row justify="center">
              <h3 for="">Due Date</h3>
              <v-date-picker full-width v-model="dueDate"></v-date-picker>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false; this.taskId = ''">
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="save">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapMutations } from 'vuex'
import { Task } from '../models/Task'
import { app } from '../main.js'

  export default {
    name: 'Modal',

    computed: {
      categories() {
        return Object.keys(Task.categories).map(categoryKey => {
          return {
            text: Task.categories[categoryKey].value,
            value: Task.categories[categoryKey].key
          }
        })
      }
    },

    methods: {
      ...mapMutations([
        'saveTask'
      ]),
      save() {
        let task = new Task({
          title: this.title,
          description: this.description,
          categories: this.selectedCategories,
          dueDate: new Date(this.dueDate).getTime()
        })
        this.saveTask({
          taskId: this.taskId,
          task
        })
        this.dialog = false
        this.taskId = ''
      }
    },

    props: {
      modalToggle: Boolean
    },

    watch: {
      modalToggle() {
        this.dialog = true
      }
    },

    data: () => ({
      dialog: false,
      title: '',
      description: '',
      dueDate: '',
      selectedCategories: [],
      taskId: ''
    }), 

    mounted() {
      app.$on('adding-subtask', e => {
        this.taskId = e.taskId
        this.dialog = true
      })
    }
  }

</script>
