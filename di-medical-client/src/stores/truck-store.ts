import { defineStore } from 'pinia'
import { TruckFacade } from 'src/api/TruckFacade'
import { Either, Right } from 'src/entities/Either'
import { Truck } from 'src/entities/Truck'
import { computed, ref } from 'vue'

export const useTruckStore = defineStore('truck', () => {
  const apiFacade = new TruckFacade()
  const trucks = ref<Truck[]>()
  const pages  = ref(0)
  const currentPage = ref(1)
  const isLoading = ref(false)

  const trucksPaginated = async (page: number = 1): Promise<Either<string, boolean>> => {
    isLoading.value = true
    const paginatedTrucks = await apiFacade.getTrucksPaginated(page)
    if(paginatedTrucks.isLeft()){
      isLoading.value = false
      trucks.value = []
      return paginatedTrucks
    }

    setTrucks(paginatedTrucks.value.results)
    setPages(paginatedTrucks.value.pages)
    setCurrentPage(page)
    isLoading.value = false
    return Right.create(true)
  }

  const setTrucks = (truck: Truck[]) => {
    trucks.value = truck
  }

  const setPages = (page: number) => {
    pages.value = page
  }

  const setCurrentPage = (page: number) => {
    currentPage.value = page
  }

  const getTrucks = computed(() => trucks.value)
  const getTotalPages = computed(() => pages.value)
  const getCurretPage = computed(() => currentPage.value)
  const getLoading = computed(() => isLoading.value)
  
  return {
    trucks,
    pages,
    currentPage,
    isLoading,
    getTotalPages,
    getCurretPage,
    getLoading,
    setCurrentPage,
    getTrucks,
    trucksPaginated,
    setPages
  }
})
