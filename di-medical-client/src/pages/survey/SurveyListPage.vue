<template>
  <div class="column flex flex-center">
    <div class="survey-list flex flex-center" v-if="!surveyStore.getLoading">
      <q-card 
        class="survey-card q-mt-xl" 
        v-for="survey in surveyStore.getSurveys"
        :key="survey.surveyId"
        >
        <q-chip :icon="!survey.active ? 'done' : 'person_search'" :color="survey.active ? 'secondary' : 'grey'" text-color="white">
          {{ !survey.active ? 'Concluido' : 'En curso' }}
        </q-chip>
        <q-card-section>
          <div class="text-h6">{{survey.name}}</div>
          <div class="text-caption text-grey">
          </div>
        </q-card-section>
        <q-card-section>
          <p>{{survey.questions.length}} respuestas</p>
          <p>Inicia: {{formattedDate(survey.startDate)}}</p>
          <p v-if="!survey.active">Termino: Sin terminar encuesta</p>
        </q-card-section>
        <q-card-actions>
          <q-btn flat  no-caps :to="{ name: 'survey-detail', params: { id: survey.surveyId } }">Resultados</q-btn>
          <q-btn flat  no-caps :to="{ name: 'itinerary-detail', params: { id: survey.surveyId } }" :disable="!survey.active">Enlace de encuesta</q-btn>
        </q-card-actions>
      </q-card>
    </div>

    <div class="q-pa-lg flex flex-center">
      <q-pagination v-model="current" :max="surveyStore.getTotalPages" input />
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
import { useItineraryStore } from 'src/stores/itinerary-store'
import { useSurveyStore } from 'src/stores/survey-store';
import { ref, watch } from 'vue'
const seamless = ref(false)
const ok = ref(false)
const message = ref('')

const current = ref(1)
const surveyStore = useSurveyStore()

watch(current, async (value) => {
  const surveys = await surveyStore.surveysPaginated(value)
  if (surveys.isLeft()) {
    ok.value = false
    message.value = surveys.error
    seamless.value = true
  }
})

const formattedDate = (date: Date) => {
  const dateToParse = new Date(date)
  const weekdays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

  const dayOfWeek = weekdays[dateToParse.getDay()]
  const day = dateToParse.getDate()
  const month = months[dateToParse.getMonth()]
  const year = dateToParse.getFullYear()

  return `${dayOfWeek}, ${day} ${month} ${year}`
}

</script>

<style lang="scss" scoped>



.survey {
  &-list {
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  &-card {
    max-width: 320px;
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
