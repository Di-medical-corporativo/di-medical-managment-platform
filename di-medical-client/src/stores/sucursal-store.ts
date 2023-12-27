import { defineStore } from "pinia"
import { ApiFacade } from "src/api/ApiFacade"
import { Sucursal } from "src/entities/Sucursal"
import { computed, ref } from "vue"

export const useBranchStore = defineStore('sucursal', () => {
  const apiFacade = new ApiFacade()
  const branches = ref<Sucursal[]>([])
  
  const getAllBranches = async () => {
    const branchesList = await apiFacade.getBranches()
    if(branchesList.isLeft()) {
      return branchesList.error
    }
    branches.value = branchesList.value
    
  }
  
  const getBranches = computed(() => branches.value)
  return {
    branches,
    getAllBranches,
    getBranches
  }

})
