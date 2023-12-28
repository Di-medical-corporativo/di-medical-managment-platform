<template>
  <div class="flex flex-center column">
    <div class="sucursal-list flex flex-center">
      <q-card 
        class="user-card q-mt-xl" 
        v-for="branch in sucursalStore.getBranches"
        :class="branchColor(branch.dimedicalBrand)"
        :key="branch.id"
        >
        <q-card-section>
          <div class="text-h6">{{branch.name}}</div>
          <small>{{branch.address}}</small>
        </q-card-section>
  
        <q-card-actions>
          <q-btn flat no-caps>Actualizar</q-btn>
          <q-btn flat no-caps>Eliminar</q-btn>
          <q-btn flat no-caps>Estadísticas</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBranchStore } from 'src/stores/sucursal-store'
import { computed } from 'vue';

const sucursalStore = useBranchStore()

const branchColor = computed(() => (color: string) => color.includes('sur') ? 'bg-sur' : 'bg-primary')
</script>

<style lang="scss">

.bg-sur {
  background-color: #218d9b;
}

.sucursal {
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
