import { defineStore } from "pinia";
import { ApiFacade } from "src/api/ApiFacade";
import { ApiFacadeI } from "src/api/ApiFacadeInterface";
import { User } from "src/entities/User";
import { computed, ref } from "vue";

export const useUserStore = defineStore('users', () => {
  const apiFacade: ApiFacadeI = new ApiFacade()
  const users = ref<User[]>()
  const pages  = ref(0)
  const currentPage = ref(1)

  const usersPaginated = async (page: number = 1) => {
    const users = await apiFacade.getAllUsersPaginated(page)
    if(users.isLeft()) {
      return users.error
    }
    setUsers(users.value.results)
    setPages(users.value.pages)
  }

  const setUsers = (user: User[]) => {
    users.value = user
  }

  const setPages = (page: number) => {
    pages.value = page
  }

  const setCurrentPage = (page: number) => {
    currentPage.value = page
  }

  const getUsers = computed(() => users.value)
  const getTotalPages = computed(() => pages.value)
  const getCurretPage = computed(() => pages.value)

  return {
    usersPaginated,
    getUsers,
    getTotalPages,
    getCurretPage,
    users,
    pages,
    currentPage,
    setUsers,
    setPages,
    setCurrentPage
  }
})
