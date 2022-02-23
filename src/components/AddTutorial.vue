<template>
  <div class="submit-form">
    <form v-if="!submitted">
      <div class="mb-3">
        <label class="form-label">Title</label>
        <ckeditor
          :editor="editor"
          v-model="tutorial.title"
          :config="editorConfig"
          @ready="onReady">
        </ckeditor>
      </div>
      <div class="mb-3">
        <ckeditor
          :editor="editor"
          v-model="tutorial.description"
          :config="editorConfig"
          @ready="onReady">
        </ckeditor>
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
import DocEditor from '@ckeditor/ckeditor5-build-decoupled-document';
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
      editor: DocEditor,
      editorConfig: {
      },
    };
  },
  methods: {
    onReady(editor) {
      editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement(),
      );
    },
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
