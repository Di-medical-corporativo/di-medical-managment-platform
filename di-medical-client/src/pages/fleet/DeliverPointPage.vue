<template>
  <q-page>
    <div class="deliver column items-center bg-grey-2p" v-if="!getPointToDeliver?.isDone">
      <header class="bg-primary header flex flex-center">
        <q-img src="../../assets/images/logos/corporativo-logo.png" style="width: 130px;"></q-img>
      </header>
      <div class="deliver-info q-mt-xl column items-start">
        <p class="text-h4 self-center">Entregando pedido</p>
        <p class="text-body1 q-ml-sm">Cliente: {{getClient?.name}}</p>
        <p class="text-body1 q-ml-sm">Ubicación: {{getClient?.address}}</p>
      </div>
      <div class="deliver-actions column q-mt-xl items-center">

        <q-input
          filled
          type="textarea"
          class="comment"
          v-model="comment"
          label="Agrega comengario o incidencia de la entrega"
        />
        <q-btn label="Entrega concluida con exito" color="secondary" class="action q-mt-xl" @click="deliver(false)"></q-btn>
        <q-btn label="Problema al concluir entrega" color="secondary" class="q-mt-xl action" outline @click="deliver(true)"></q-btn>

      </div>
    </div>
    <div v-else class="bg-primary already-answer column items-center">
      <q-img src="../../assets/images/logos/corporativo-logo.png" style="width: 170px;"></q-img>
      <p class="text-h5">Ya se ha entregado este punto</p>
      <q-btn label="Responder encuesta" color="secondary" class="q-mt-md" :to="{ 
        name: 'survey-client-answer', 
        query: { pointId: getPointToDeliver.pointId }, 
        params: { id: getPointToDeliver.survey.surveyId } 
      }">
      </q-btn>
    </div>

    <q-inner-loading :showing="getLoading" 
    color="primary"
    label="Por favor espera..."
    label-class="text-black"
    label-style="font-size: 1.1em" />

  <q-dialog v-model="seamless" seamless position="top">
    <q-banner inline-actions class="text-white" :class="ok ? 'bg-green' : 'bg-red'">
      {{ message }}
      <template v-slot:action>
        <q-btn flat color="white" label="Cerrar" v-close-popup />
      </template>
    </q-banner>
  </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ItineraryFacade } from 'src/api/ItineraryFacade'
import { computed, ref } from 'vue'
import { Point } from 'src/entities/Point'
import { useRoute, useRouter } from 'vue-router'

const itineraryApi = new ItineraryFacade()
const route = useRoute()
const router = useRouter()
const loading = ref(true)

const seamless = ref(false)
const ok = ref(false)
const message = ref('')

const point = ref<Point>()
const comment = ref('')

const getPoint = async () => {
  loading.value = true
  const pointId = route.params.id as string
  const pointOrError = await itineraryApi.getPointById(pointId)
  if(pointOrError.isLeft()) {
    loading.value = false
    ok.value = false
    message.value = pointOrError.error
    seamless.value = true
    router.push({ name: 'not-found' })
    return
  }
  loading.value = false
  point.value = pointOrError.value
}

const deliver = async (problem: boolean) => {
  if(comment.value.length > 0) {
    point.value!.comment = comment.value
  }

  point.value!.problem = problem
  point.value!.done = true
  loading.value = true
  const pointUpdated = await itineraryApi.deliverPoint(point.value!)
  if(pointUpdated.isLeft()) {
    loading.value = false
    ok.value = false
    message.value = pointUpdated.error
    seamless.value = true
    return
  }
  loading.value = false
}

const getLoading = computed(() => loading.value)
const getPointToDeliver = computed(() => point.value)
const getClient = computed(() => point.value?.client)

getPoint()
</script>

<style lang="scss" scoped>

.already-answer {
  width: 100vw;
  height: 100vh;
}
.deliver {
  width: 100vw;
  height: 100vh;

  &-actions {
    width: 100%;
  }

  &-info {
    width: 100%;

    @media screen and (min-width: $breakpoint-md-min) {
      width: 700px;
    }
  }
}

.header {
  width: 100%;
  height: 110px;
}

.comment {
  width: 95%;
  height: 150px;
  padding: 5px;

  @media screen and (min-width: $breakpoint-md-min) {
    width: 750px;
  }
}

.action { 
  width: 95%;

  @media screen and (min-width: $breakpoint-md-min) {
    width: 300px;
  }
}
</style>
