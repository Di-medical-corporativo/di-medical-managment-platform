import { store } from 'quasar/wrappers'
import { createPinia } from 'pinia'
import { Router } from 'vue-router';
import { useRoleStore } from './role-store';
import { useBranchStore } from './sucursal-store';
import { useUserStore } from './user-store';

/*
 * When adding new properties to stores, you should also
 * extend the `PiniaCustomProperties` interface.
 * @see https://pinia.vuejs.org/core-concepts/plugins.html#typing-new-store-properties
 */
declare module 'pinia' {
  export interface PiniaCustomProperties {
    readonly router: Router;
  }
}

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(async (/* { ssrContext } */) => {
  const pinia = createPinia()
  const roles = useRoleStore(pinia)
  const branches = useBranchStore(pinia)
  const users = useUserStore(pinia)
  const promises = []
  promises.push(roles.getAllRoles())
  promises.push(branches.getAllBranches())
  promises.push(users.usersPaginated(1))
  await Promise.all(promises)
  // You can add Pinia plugins here
  // pinia.use(SomePiniaPlugin)
  return pinia
})
