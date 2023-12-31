import { UserFacade, UserFacadeI } from 'src/api/UserFacade'
import { Credentials } from 'src/entities/Credentials'
import { Either, Left } from 'src/entities/Either'
import { User } from 'src/entities/User'
import { modules } from 'src/router/routesNames'
import { useAuthStore } from 'src/stores/auth-store'

export function useAuth() {
  const apiFacade: UserFacadeI = new UserFacade()
  const authStore = useAuthStore()

  const loginUser = async (credentials: Credentials): Promise<Either<string, User>> => {
    const userAuth = await apiFacade.login(credentials)
    if(userAuth.isLeft()) {
      return Left.create(userAuth.error)
    }
    authStore.setUser(userAuth.value)
    return userAuth
  }

  const logOut = () => {
    authStore.setUser(null)
  }

  const getUserResources = () => {
    const user = authStore.getUser
    if(!user) return

    const resources = user.resources
    const userModules = resources.map((resource) => modules.find((r) => r.label == resource.name))
    return userModules
  }

  const isAuth = () => {
    if(authStore.getToken == null) {
      return false
    }
    return true
  }

  return {
    loginUser,
    isAuth,
    logOut,
    getUserResources
  }
}
