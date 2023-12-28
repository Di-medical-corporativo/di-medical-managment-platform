import { defineStore } from "pinia";
import { ApiFacade } from "src/api/ApiFacade";
import { ApiFacadeI } from "src/api/ApiFacadeInterface";
import { Either, Left, Right } from "src/entities/Either";
import { User } from "src/entities/User";
import { computed, ref } from "vue";

export const useUserStore = defineStore('users', () => {
  const apiFacade: ApiFacadeI = new ApiFacade()
  const users = ref<User[]>()
  const pages  = ref(0)
  const currentPage = ref(1)
  const isLoading = ref(false)

  const usersPaginated = async (page: number = 1): Promise<Either<string, boolean>> => {
    isLoading.value = true
    const usersPaginated = await apiFacade.getAllUsersPaginated(page)
    if(usersPaginated.isLeft()) {
      isLoading.value = false
      users.value = []
      return usersPaginated
    }
    setUsers(usersPaginated.value.results)
    setPages(usersPaginated.value.pages)
    isLoading.value = false
    return Right.create(true)
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
  const getCurretPage = computed(() => currentPage.value)
  const getLoading = computed(() => isLoading.value)

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
    setCurrentPage,
    getLoading
  }
})
