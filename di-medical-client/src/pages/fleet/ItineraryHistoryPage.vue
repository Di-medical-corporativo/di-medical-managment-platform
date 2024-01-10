<template>
  <div class="column flex flex-center">
    <div class="client-list flex flex-center" v-if="!itineraryStore.getLoading">
      <q-card 
        class="user-card q-mt-xl" 
        v-for="itinerary in itineraryStore.getItineraryHistory"
        :key="itinerary.itineraryId"
        >
        <q-card-section>
          <div class="text-h6">Itinerario del {{itineraryDate(itinerary.scheduleDate!)}}</div>
        </q-card-section>
  
        <q-card-actions>
          <q-btn flat no-caps>Actualizar</q-btn>
          <q-btn flat no-caps>Eliminar</q-btn>
          <q-btn flat no-caps>Estadísticas</q-btn>
        </q-card-actions>
      </q-card>
    </div>

    <div class="q-pa-lg flex flex-center">
      <q-pagination v-model="current" :max="itineraryStore.getTotalPages" input />
    </div>

    <q-dialog v-model="seamless" seamless position="top">
      <q-banner inline-actions class="text-white" :class="ok ? 'bg-green' : 'bg-red'">
        {{ message }}
        <template v-slot:action>
          <q-btn flat color="white" label="Cerrar" v-close-popup />
        </template>
      </q-banner>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { useItineraryStore } from 'src/stores/itinerary-store';
import { computed, ref, watch } from 'vue'
const seamless = ref(false)
const ok = ref(false)
const message = ref('')

const current = ref(1)
const itineraryStore = useItineraryStore()

watch(current, async (value) => {
  const itineraries = await itineraryStore.itineraryHistoryPaginated(value)
  if (itineraries.isLeft()) {
    ok.value = false
    message.value = itineraries.error
    seamless.value = true
  }
})

const itineraryDate = (date: Date) => computed(() => {
  const dateToParse = new Date(date)
  const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  const diaSemana = diasSemana[dateToParse.getDay()];
  const dia = dateToParse.getDate();
  const mes = meses[dateToParse.getMonth()];
  const ano = dateToParse.getFullYear();

  return `${diaSemana}, ${dia} de ${mes} de ${ano}`;
})

</script>

<style lang="scss">
.client {
  &-list {
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  @media screen and (min-width: $breakpoint-md-min) {
    &-list {
      width: 90%;
      gap: 30px;
      justify-content: initial;
      align-items: initial;
      flex-direction: initial;
      flex-wrap: wrap;
    }
  }

}
</style>
