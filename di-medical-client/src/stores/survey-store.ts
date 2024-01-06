import { defineStore } from 'pinia'
import { SurveyFacade, SurveyFacadeI } from 'src/api/SurveyFacade'
import { Client } from 'src/entities/Client'
import { Either, Right } from 'src/entities/Either'
import { Survey } from 'src/entities/Survey'
import { computed, ref } from 'vue'

export const useSurveyStore = defineStore('survey', () => {
  const apiFacade: SurveyFacadeI = new SurveyFacade()
  const surveys = ref<Survey[]>()
  const pages  = ref(0)
  const currentPage = ref(1)
  const isLoading = ref(false)

  const surveysPaginated = async (page: number = 1): Promise<Either<string, boolean>> => {
    isLoading.value = true
    const surveysPaginated = await apiFacade.getAllSurveysPaginated(page)
    if(surveysPaginated.isLeft()) {
      isLoading.value = false
      surveys.value = []
      return surveysPaginated
    }
    setSurveys(surveysPaginated.value.results)
    setPages(surveysPaginated.value.pages)
    setCurrentPage(page)
    isLoading.value = false
    return Right.create(true)
  }

  const setSurveys = (client: Survey[]) => {
    surveys.value = client
  }

  const setPages = (page: number) => {
    pages.value = page
  }

  const setCurrentPage = (page: number) => {
    currentPage.value = page
  }

  const getSurveys = computed(() => surveys.value)
  const getTotalPages = computed(() => pages.value)
  const getCurretPage = computed(() => currentPage.value)
  const getLoading = computed(() => isLoading.value)

  return {
    surveys,
    surveysPaginated,
    setPages,
    setCurrentPage,
    setSurveys,
    pages,
    currentPage,
    getSurveys,
    getTotalPages,
    getCurretPage,
    getLoading
  }
});
