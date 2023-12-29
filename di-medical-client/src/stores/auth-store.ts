import { defineStore } from "pinia";
import { ApiFacade } from "src/api/ApiFacade";
import { ApiFacadeI } from "src/api/ApiFacadeInterface";
import { UserFacade, UserFacadeI } from "src/api/UserFacade";
import { User } from "src/entities/User";
import { computed, ref } from "vue";

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const userAuth = ref<User | null>(null)
  const apiFacade: UserFacadeI = new UserFacade()

  function setUser(user: User | null) {
    if(user === null) {
      userAuth.value = null
      token.value = null
      localStorage.removeItem('token-user')
      return
    } 
    userAuth.value = user
    token.value = user.token
    localStorage.setItem('token-user', token.value)
  }

  async function isAuth(){
    const tokenStorage = localStorage.getItem('token-user')
    
    if(tokenStorage == null) return false
    token.value = tokenStorage

    if(token.value == null) return false

    const tokenValid = await apiFacade.checkAuth(token.value)
    if(tokenValid.isLeft()) return false

    setUser(tokenValid.value)

    return true
  }

  const getToken = computed(() => token.value)
  const getUser = computed(() => userAuth.value)
  
  return {
    token,
    getToken,
    userAuth,
    setUser,
    getUser,
    isAuth
  }
  
})
