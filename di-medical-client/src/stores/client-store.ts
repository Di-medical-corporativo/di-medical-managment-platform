import { defineStore } from 'pinia'
import { ApiFacade } from 'src/api/ApiFacade';
import { ApiFacadeI } from 'src/api/ApiFacadeInterface';
import { Client } from 'src/entities/Client';
import { Either, Right } from 'src/entities/Either';
import { computed, ref } from 'vue';

export const useClientStore = defineStore('counter', () => {
  const apiFacade: ApiFacadeI = new ApiFacade()
  const clients = ref<Client[]>()
  const pages  = ref(0)
  const currentPage = ref(1)
  const isLoading = ref(false)

  const clientsPaginated = async (page: number = 1): Promise<Either<string, boolean>> => {
    isLoading.value = true
    const clientsPaginated = await apiFacade.getAllClientsPaginated(page)
    if(clientsPaginated.isLeft()) {
      isLoading.value = false
      clients.value = []
      return clientsPaginated
    }
    setClients(clientsPaginated.value.results)
    setPages(clientsPaginated.value.pages)
    isLoading.value = false
    return Right.create(true)
  }

  const setClients = (client: Client[]) => {
    clients.value = client
  }

  const setPages = (page: number) => {
    pages.value = page
  }

  const setCurrentPage = (page: number) => {
    currentPage.value = page
  }

  const getClients = computed(() => clients.value)
  const getTotalPages = computed(() => pages.value)
  const getCurretPage = computed(() => currentPage.value)
  const getLoading = computed(() => isLoading.value)

  return {
    clients,
    clientsPaginated,
    setPages,
    setCurrentPage,
    setClients,
    pages,
    currentPage,
    getClients,
    getTotalPages,
    getCurretPage,
    getLoading
  }
});
