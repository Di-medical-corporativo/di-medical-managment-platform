import { defineStore } from 'pinia'
import { ApiFacade } from 'src/api/ApiFacade'
import { Truck } from 'src/entities/Truck'
import { ref } from 'vue'

export const useTruckStore = defineStore('truck', () => {
  const apiFacade = new ApiFacade()
  const trucks = ref<Truck[]>()

  const createTruck = async () => {
    const truck = await apiFacade
  }
})
