<template>
  <div v-if="currentTutorial" class="edit-form">
    <h4>Tutorial</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input
            type="text"
            class="form-control"
            id="title"
            v-model="currentTutorial.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
            type="text"
            class="form-control"
            id="description"
            v-model="currentTutorial.description"
        />
      </div>
      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentTutorial.published ? "Published" : "Pending" }}
      </div>
    </form>
    <button
        class="badge bg-primary me-2 border-0"
        v-if="currentTutorial.published"
        @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button
        v-else
        class="badge bg-primary me-2 border-0"
        @click="updatePublished(true)"
    >
      Publish
    </button>
    <button class="badge bg-danger me-2 border-0" @click="deleteTutorial">
      Delete
    </button>
    <button type="submit" class="badge bg-success border-0" @click="updateTutorial">
      Update
    </button>
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Please click on a Tutorial...</p>
  </div>
</template>

<script>
import TutorialDataService from '../services/TutorialDataService';

export default {
  name: 'TutorialComponent',
  props: ['tutorial'],
  data() {
    return {
      currentTutorial: null,
      message: '',
    };
  },
  watch: {
    tutorial(tutorial) {
      this.currentTutorial = { ...tutorial };
      this.message = '';
    },
  },
  methods: {
    updatePublished(status) {
      TutorialDataService.update(this.currentTutorial.key, {
        published: status,
      })
        .then(() => {
          this.currentTutorial.published = status;
          this.message = 'The status was updated successfully!';
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateTutorial() {
      const data = {
        title: this.currentTutorial.title,
        description: this.currentTutorial.description,
      };
      TutorialDataService.update(this.currentTutorial.key, data)
        .then(() => {
          this.message = 'The tutorial was updated successfully!';
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteTutorial() {
      TutorialDataService.delete(this.currentTutorial.key)
        .then(() => {
          this.$emit('refreshList');
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = '';
    this.currentTutorial = { ...this.tutorial };
  },
};
</script>

<style scoped>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
