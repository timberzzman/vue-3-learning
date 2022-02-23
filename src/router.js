import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  {
    path: '/',
    alias: '/tutorials',
    name: 'tutorials',
    component: () => import('./components/TutorialsList.vue'),
  },
  {
    path: '/add',
    name: 'add',
    component: () => import('./components/AddTutorial.vue'),
  },
  {
    path: '/tutorial/:id',
    name: 'tutorial',
    component: () => import('./components/TutorialPage.vue'),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
