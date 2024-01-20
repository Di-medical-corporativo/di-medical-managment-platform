import { defineStore } from 'pinia'
import { ApiFacade } from 'src/api/ApiFacade';
import { ApiFacadeI } from 'src/api/ApiFacadeInterface';
import { ItineraryFacade, ItineraryFacadeI } from 'src/api/ItineraryFacade';
import { Client } from 'src/entities/Client';
import { Either, Right } from 'src/entities/Either';
import { Itinerary } from 'src/entities/Itinerary';
import { computed, ref } from 'vue';

export const useItineraryStore = defineStore('itinerary', () => {
  const apiFacade: ItineraryFacadeI = new ItineraryFacade()
  const itineraryHistory = ref<Itinerary[]>()
  const pages  = ref(0)
  const currentPage = ref(1)
  const isLoading = ref(false)

  const itineraryHistoryPaginated = async (page: number = 1): Promise<Either<string, boolean>> => {
    isLoading.value = true
    const history = await apiFacade.getItineraryPaginated(page)
    if(history.isLeft()) {
      isLoading.value = false
      itineraryHistory.value = []
      return history
    }
    
    setItineraryHistory(history.value.results)
    setPages(history.value.pages)
    setCurrentPage(page)
    isLoading.value = false
    return Right.create(true)
  }

  const getItineraryById = async (id: string): Promise<Either<string, Itinerary>> => {
    const itineraryOrError = await apiFacade.getItineraryById(id)

    if(itineraryOrError.isLeft()) {
      return itineraryOrError
    }

    return itineraryOrError
  }

  const setItineraryHistory = (itineraries: Itinerary[]) => {
    itineraryHistory.value = itineraries
  }

  const setPages = (page: number) => {
    pages.value = page
  }

  const setCurrentPage = (page: number) => {
    currentPage.value = page
  }

  const getItineraryHistory = computed(() => itineraryHistory.value)
  const getTotalPages = computed(() => pages.value)
  const getCurretPage = computed(() => currentPage.value)
  const getLoading = computed(() => isLoading.value)

  return {
    itineraryHistory,
    itineraryHistoryPaginated,
    setPages,
    setCurrentPage,
    setItineraryHistory,
    pages,
    currentPage,
    getItineraryHistory,
    getTotalPages,
    getCurretPage,
    getLoading,
    getItineraryById
  }
});
