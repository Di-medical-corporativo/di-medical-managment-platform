<template>
  <div class="flex flex-center column">
    <div class="user-list flex flex-center">
      <q-card 
        class="user-card q-mt-xl" 
        v-for="user in userStore.getUsers" 
        :key="user.userId">
        <q-img :src="user.picture">
          <div class="absolute-bottom">
            <div class="text-h6">{{ user.firstName + ' ' + user.lastName}}</div>
            <div class="text-subtitle2">{{ user.job }}</div>
          </div>
        </q-img>

        <q-card-actions>
          <q-btn flat no-caps>Actualizar</q-btn>
          <q-btn flat no-caps>Eliminar</q-btn>
          <q-btn flat no-caps>Estadísticas</q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <div class="q-pa-lg flex flex-center">
      <q-pagination v-model="current" :max="userStore.getTotalPages" input />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores/user-store'
import { ref } from 'vue'

const userStore = useUserStore()
const current = ref(1)

</script>

<style lang="scss">
.user {
  &-card {
    width: 300px;
  }

  &-list {
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  @media screen and (min-width: $breakpoint-md-min) {
    &-list {
      width: 90%;
      gap: 20px;
      justify-content: initial;
      align-items: initial;
      flex-direction: initial;
      flex-wrap: wrap;
    }
  }

}
</style>
