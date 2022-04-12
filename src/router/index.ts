import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('/@/views/Index.vue'),
  },
  {
    path: '/admin',
    component: () => import('/@/views/Admin.vue'),
  }
  // {
  //   path: '/admin/preview',
  //   component: () => import('/@/components/preview/Preview.vue'),
  // }
];

export const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHistory(),
  routes
});
