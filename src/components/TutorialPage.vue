<template>
  <div class="container">
    <div v-html="tutorial.title"></div>
    <div v-html="tutorial.description"></div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import useTutorialStore from '../stores/tutorialsStore';

export default {
  name: 'TutorialPage',
  setup() {
    const tutorialStore = useTutorialStore();
    const route = useRoute();

    const tutorial = ref(tutorialStore.getTutorialById(route.params.id));
    return { tutorialStore, tutorial, route };
  },
  mounted() {
  },
};
</script>

<style scoped>

</style>
