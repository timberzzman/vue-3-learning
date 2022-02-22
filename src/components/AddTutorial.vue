<template>
  <div class="submit-form">
    <form v-if="!submitted">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input
            type="text"
            class="form-control"
            id="title"
            required
            v-model="tutorial.title"
            name="title"
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <input
            class="form-control"
            id="description"
            required
            v-model="tutorial.description"
            name="description"
        />
      </div>
      <button type="button" @click="saveTutorial" class="btn btn-success">Submit</button>
    </form>
    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newTutorial">Add</button>
    </div>
  </div>
</template>

<script>
import TutorialDataService from '../services/TutorialDataService';

export default {
  name: 'AddTutorial',
  data() {
    return {
      tutorial: {
        title: '',
        description: '',
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    saveTutorial() {
      const data = {
        title: this.tutorial.title,
        description: this.tutorial.description,
        published: false,
      };
      TutorialDataService.create(data)
        .then(() => {
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newTutorial() {
      this.submitted = false;
      this.tutorial = {
        title: '',
        description: '',
        published: false,
      };
    },
  },
};
</script>

<style scoped>

</style>
