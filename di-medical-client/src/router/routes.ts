import { RouteRecordRaw } from 'vue-router';
import { RoutesPath } from './routesNames';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('layouts/login/LoginLayout.vue'),
    children: [{ path: '', component: () => import('pages/login/LoginPage.vue') }]
  },
  {
    path: RoutesPath.backoffice.route,
    component: () => import('layouts/backoffice/BackofficeLayout.vue'),
    children: [
      {
        path: RoutesPath.backoffice.profile.route,
        name: RoutesPath.backoffice.profile.name,
        component: () => import('pages/users/UserProfilePage.vue'),
      },
      {
        path: RoutesPath.users.route,
        component: () => import('layouts/backoffice/UsersLayout.vue'),
        children: [
          {
            path: RoutesPath.users.default.route,
            name: RoutesPath.users.default.name,
            component: () => import('pages/users/DefaultUserPage.vue')
          }
          ,
          {
            path: RoutesPath.users.registrer.route,
            name: RoutesPath.users.registrer.name,
            component: () => import('pages/users/UserRegistrerPage.vue')
          },
          {
            path: RoutesPath.users.list.route,
            name: RoutesPath.users.list.name,
            component: () => import('pages/users/UserListPage.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
