import { defineStore } from 'pinia';
import TutorialDataService from '../services/TutorialDataService';

export default defineStore({
  id: 'tutorials',
  state: () => ({
    tutorials: [],
    subscriber: null,
  }),
  getters: {
    getTutorials: (state) => state.tutorials,
    // eslint-disable-next-line max-len
    getTutorialById: (state) => (tutorialId) => state.tutorials.find((tutorial) => tutorial.key === tutorialId),
  },
  actions: {
    async initTutorialsListener() {
      this.tutorials = [];
      await TutorialDataService.tutorialsListener(async (data) => {
        this.tutorials = data || null;
      });
    },
    addTutorial(tutorial) {
      console.log(tutorial);
    },
  },
});
