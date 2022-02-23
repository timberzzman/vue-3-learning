<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Tutorials List</h4>
      <ul class="list-group">
        <li
            class="list-group-item"
            :class="{ active: index === currentIndex }"
            v-for="(tutorial, index) in tutorialsStore.tutorials"
            :key="index"
            @click="setActiveTutorial(tutorial, index)"
        >
          {{ tutorial.title }}
        </li>
      </ul>
      <button class="m-3 btn btn-sm btn-danger" @click="removeAllTutorials">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentTutorial">
        <tutorial-details
            :tutorial="currentTutorial"
            @refreshList="refreshList"
        />
      </div>
      <div v-else>
        <br />
        <p>Please click on a Tutorial...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { onValue } from 'firebase/database';
import TutorialDataService from '../services/TutorialDataService';
import TutorialDetails from './Tutorial.vue';
import useTutorialsStore from '../stores/tutorialsStore';

export default {
  name: 'tutorialsList',
  components: { TutorialDetails },
  data() {
    return {
      tutorials: [],
      currentTutorial: null,
      unsubscribeTutorial: null,
      currentIndex: -1,
    };
  },
  setup() {
    const tutorialsStore = useTutorialsStore();

    onMounted(async () => {
      await tutorialsStore.initTutorialsListener();
    });

    return {
      tutorialsStore,
    };
  },
  methods: {
    onDataChange(items) {
      const tutorials = [];
      items.forEach((item) => {
        const { key } = item;
        const data = item.val();
        tutorials.push({
          key,
          title: data.title,
          description: data.description,
          published: data.published,
        });
      });
      this.tutorials = tutorials;
    },
    refreshList() {
      this.currentTutorial = null;
      this.currentIndex = -1;
    },
    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial;
      this.currentIndex = index;
    },
    removeAllTutorials() {
      TutorialDataService.deleteAll()
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.unsubscribeTutorial = onValue(TutorialDataService.getAll(), this.onDataChange);
  },
  beforeDestroy() {
    this.unsubscribeTutorial();
  },
};
</script>

<style scoped>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
