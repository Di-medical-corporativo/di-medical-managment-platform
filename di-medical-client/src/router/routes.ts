import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('layouts/login/LoginLayout.vue'),
    children: [{ path: '', component: () => import('pages/login/LoginPage.vue') }]
  },
  {
    path: '/backoffice',
    component: () => import('layouts/backoffice/BackofficeLayout.vue'),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
