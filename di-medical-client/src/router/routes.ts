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
          },
          {
            path: RoutesPath.sucursal.list.route,
            name: RoutesPath.sucursal.list.name,
            component: () => import('pages/sucursal/SucursalListPage.vue')
          }
        ]
      },
      {
        path: RoutesPath.clients.route,
        component: () => import('layouts/backoffice/ClientsLayout.vue'),
        children: [
          {
            path: RoutesPath.clients.default.route,
            name: RoutesPath.clients.default.name,
            component: () => import('pages/clientss/DefaultClientesPage.vue')
          },
          {
            path: RoutesPath.clients.register.route,
            name: RoutesPath.clients.register.name,
            component: () => import('pages/clientss/ClientRegisterPage.vue')
          },
          {
            path: RoutesPath.clients.list.route,
            name: RoutesPath.clients.list.name,
            component: () => import('pages/clientss/ClientListPage.vue')
          }
        ]
      },
      {
        path: RoutesPath.fleet.route,
        component: () => import('layouts/backoffice/FleetLayout.vue'),
        children: [
          {
            path: RoutesPath.fleet.default.route,
            name: RoutesPath.fleet.default.name,
            component: () => import('pages/fleet/DefaultFleetPage.vue')
          },
          {
            path: RoutesPath.fleet.register.route,
            name: RoutesPath.fleet.register.name,
            component: () => import('pages/fleet/TruckRegisterPage.vue')
          },
          {
            path: RoutesPath.fleet.list.route,
            name: RoutesPath.fleet.list.name,
            component: () => import('pages/fleet/TruckListPage.vue')
          },
          {
            path: RoutesPath.fleet.itinerary.route,
            name: RoutesPath.fleet.itinerary.name,
            component: () => import('pages/fleet/ItineraryRegisterPage.vue')
          },
          {
            path: RoutesPath.fleet.itineraryHistory.route,
            name: RoutesPath.fleet.itineraryHistory.name,
            component: () => import('pages/fleet/ItineraryHistoryPage.vue')
          },
          {
            path: RoutesPath.fleet.itineraryDetail.route,
            name: RoutesPath.fleet.itineraryDetail.name,
            component: () => import('pages/fleet/ItineraryDetailPage.vue')
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
