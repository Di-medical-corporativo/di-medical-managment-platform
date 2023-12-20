import { RouteRecordRaw } from 'vue-router';
import { RoutesPath } from './routesNames';

const routes: RouteRecordRaw[] = [
  {
    path: RoutesPath.login.route,
    component: () => import('layouts/login/LoginLayout.vue'),
    children: [{ path: '', component: () => import('pages/login/LoginPage.vue'), name: RoutesPath.login.name }]
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
      },
      {
        path: RoutesPath.sucursal.route,
        component: () => import('layouts/backoffice/SucursalLayout.vue'),
        children: [
          {
            path: RoutesPath.sucursal.default.route,
            name: RoutesPath.sucursal.default.name,
            component: () => import('pages/sucursal/DefaultSucursalPage.vue')
          },
          {
            path: RoutesPath.sucursal.registrer.route,
            name: RoutesPath.sucursal.registrer.name,
            component: () => import('pages/sucursal/SucursalRegistrerPage.vue')
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
