import { defineStore } from "pinia";
import { ApiFacade } from "src/api/ApiFacade";
import { Role } from "src/entities/Role";
import { computed, ref } from "vue";

export const useRoleStore = defineStore('roles', () => {
  const apiFacade = new ApiFacade()
  const roles = ref<Role[]>([])

  const getAllRoles = async () => {
    const allRoles = await apiFacade.getRoles()
    if(allRoles.isLeft()) {
      return allRoles.error
    }
    roles.value = allRoles.value
  }

  const getRoles = computed(() => roles.value)

  return {
    getAllRoles,
    getRoles
  }
})
