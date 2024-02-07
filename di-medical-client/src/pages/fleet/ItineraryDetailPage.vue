<template>
  <q-page class="flex column">
    <div class="itinerary-info bg-grey-2 row items-center justify-between">
      <div class="dates q-ml-xl column">
        <p class="text-body1">Itinerario del {{ formattedDate(itinerary?.scheduleDate!) }}</p>
        <small>{{itinerary?.isDone ? 'Itinerario finalizado' : 'Itinerario en curso' }}</small>
        <small>Puntos restantes: {{activePoints}}</small>
      </div>
      <div class="actions q-mr-xl column">
        <q-btn label="Terminar itinerario" color="primary" v-if="!itinerary?.isDone" no-caps @click="finishItinerary"></q-btn>
      </div>
    </div>
    <div class="flex detail-section q-mt-xl">
      <div class="bg-white points-list shadow-1">
        <q-card 
          class="my-card"
          flat 
          v-for="(point, index) in itinerary?.points" 
          :key="point.pointId"
          :class="point.pointId == currentPoint?.pointId ? 'bg-grey-2' : ''" 
          @click="setCurrentIndex(index)"
          >
          <q-item>
            <q-item-section avatar>
              <q-img
                :src="point.assignedDriver.picture"></q-img>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{point.client.name}}</q-item-label>
              <q-item-label caption>
                {{ point.truck.plates }}
              </q-item-label>
            </q-item-section>
            <q-chip :icon="point.isDone ? 'done' : 'local_shipping'" :color="true ? 'secondary' : 'grey'" text-color="white"
              size="sm">{{ point?.isDone ? 'Completado' : 'En ruta' }}</q-chip>
              <q-chip icon="warning" color="red" text-color="white" size="sm" v-if="point.hasProblem">Revisar comentario</q-chip>
          </q-item>
          <q-card-actions align="right">
            <q-btn 
              label="Enlace para el operador" 
              no-caps class="q-mt-sm" 
              color="secondary" 
              outline size="sm"
              v-if="!itinerary.isDone"
              @click="copyLink(point.pointId)"
            >
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>

      <div class="detail-point">
        <div class="row justify-between">
          <div class="info-point bg-white shadow-1 column">
            <q-item clickables>
              <q-item-section avatar>
                <q-icon :name="currentPoint?.isDone ? 'done' : 'local_shipping'" :color="true ? 'secondary' : 'grey'" text-color="white"
                  size="sm">
                </q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label>Estatus</q-item-label>
                <q-item-label caption>
                  {{ currentPoint?.isDone ? 'Completado' : 'En ruta' }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="info-point bg-white shadow-1 column">
            <q-item clickables>
              <q-item-section avatar>
                <q-avatar square color="secondary" text-color="white" icon="contacts" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Cliente</q-item-label>
                <q-item-label caption>{{currentPoint?.client.name}}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="info-point bg-white shadow-1 column">
            <q-item clickables>
              <q-item-section avatar>
                <q-img
                  :src="currentPoint?.assignedDriver.picture"></q-img>
              </q-item-section>
              <q-item-section>
                <q-item-label>Conductor</q-item-label>
                <q-item-label caption>{{currentPoint?.assignedDriver.firstName + ' ' + currentPoint?.assignedDriver.lastName}}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="info-point bg-white shadow-1 column">
            <q-item clickables>
              <q-item-section avatar>
                <q-img :src="currentPoint?.truck.picture"></q-img>
              </q-item-section>
              <q-item-section>
                <q-item-label>Camioneta</q-item-label>
                <q-item-label caption>{{currentPoint?.truck.plates}}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="info-point bg-white shadow-1 column">
            <q-item clickables>
              <q-item-section avatar>
                <q-avatar square :color="currentPoint?.hasProblem ? 'red' : 'green'" text-color="white" icon="warning" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Problema en la entrega</q-item-label>
                <q-item-label caption>{{currentPoint?.hasProblem ? 'Problema en la entrega, revisar comentario' : 'Sin problema'}}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </div>
        <div class="row q-mt-lg justify-between">
          <div class="detail-point-answer bg-white shadow-1 column items-center">
            <p class="q-ml-md q-mt-md self-start text-body1">Resultados de encuesta</p>
            <div class="detail-point-answer-responses row">
              <div class="detail-point-answer-responses-response column" v-for="i in currentPoint?.response.answers" :key="i.answerId" v-if="currentPoint?.response">
                <p class="q-ml-md text-body2 text-bold">{{i.question.order + 1}}. {{i.question.text}}</p>
                <p class="q-ml-md detail-point-answer-responses-response-option text-body2" v-if="i.question.type.type == multipleOptionQuestion">{{i.option?.value}}</p>
                <p v-else class="q-ml-md">{{i.answer}}</p>
              </div>
              <p v-else>Sin respuesta</p>
            </div>
          </div>
          <div class="detail-point-invoices bg-white shadow-1 q-pl-sm">
            <q-timeline color="secondary" style="width: 90%;">
              <q-timeline-entry v-for="(invo, i) in currentPoint?.invoices" :subtitle="invo.invoiceNumber">
                <p style="line-break: anywhere">{{invo.description}}</p>
              </q-timeline-entry>
          </q-timeline>
          </div>
        </div>

        <div class="row q-mt-lg justify-between">
          <div class="comment bg-white shadow-1 column items-center">
            <p class="q-ml-md q-mt-sm text-body1 self-start">Comentario del operador</p>
            <p class="q-mt-sm text-body2 comment-text" v-if="currentPoint?.comment">{{currentPoint?.comment}}</p>
            <p v-else>Sin comentario</p>
          </div>
        </div>
      </div>
    </div>

    <q-inner-loading :showing="isLoading" 
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
import { computed, onMounted, ref } from 'vue'
import { useItineraryStore } from 'stores/itinerary-store'
import { useRoute, useRouter } from 'vue-router'
import { Itinerary } from 'src/entities/Itinerary'
import { multipleOptionQuestion } from 'src/helpers/questionTypes'
import { formattedDate } from 'src/helpers/dateFormatter'
import { useClipboard } from 'src/composables/useClipboard'
import { ItineraryFacade } from 'src/api/ItineraryFacade'

const seamless = ref(false)
const ok = ref(false)
const message = ref('')

const route = useRoute()
const router = useRouter()
const clipboard = useClipboard()
const itineraryApi = new ItineraryFacade()
const itinerary = ref<Itinerary | null>(null)
const itineraryStore = useItineraryStore()
const currentPointIndex = ref(0)
const loading = ref(true)

onMounted(async () => {
  loading.value = true
  const id = route.params.id as string
  const itineraryOrError = await itineraryStore.getItineraryById(id)
  if(itineraryOrError.isLeft()) {
    loading.value = false
    return router.push({ name: 'not-found' })
  }

  loading.value = false
  itinerary.value = itineraryOrError.value
})

const finishItinerary = () => {
  const hasActivePoints = itinerary.value?.points.find(p => !p.isDone)
  if(hasActivePoints) {
    ok.value = false
    seamless.value = true
    message.value = 'Tienes puntos sin terminar'
    return
  }
}

const copyLink = async (pointId: string) => {
  await clipboard.paste(`http://localhost:3050/#/deliver/point/${pointId}`)
  ok.value = true
  seamless.value = true
  message.value = 'Enlace copiado al portapapeles'
}

const currentPoint = computed(() => {
  return itinerary.value?.points[currentPointIndex.value]
})

const isLoading = computed(() => loading.value)

const setCurrentIndex = (index: number) => {
  currentPointIndex.value = index
}

const activePoints = computed(() =>{
  if(!itinerary.value) return 0
  return itinerary.value.points.reduce((acc, curr) => {
    if(!curr.isDone) acc++
    return acc
  }, 0)
})

</script>

<style lang="scss" scoped>

.itinerary-info {
  width: 100%;
  height: 100px;
  background-color: red;
}
.my-card {
  width: 100%;
  border-bottom: 1px solid #b8b9b9;
  border-radius: 0px;
  cursor: pointer;
}

.detail-section {
  gap: 30px;
  justify-content: center;
}

.info-point {
  width: 240px;
}

.detail-point {
  &-answer {
    width: 70%;
    height: 350px;
    overflow-y: scroll;

    &-responses {
      width: 95%;
      height: 100px;
      gap: 20px;

      &-response {
        width: 100%;
        border-bottom: 1px solid #b8b9b9;
        &-option {
          min-width: 150px;
        }
      }
    }
  }

  &-invoices {
    width: 25%;
    height: 350px;
    overflow-y: scroll;
  }
}

.points {
  &-list {
    width: 25%;
    height: 80vh;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.detail-point {
  width: 60%;
  height: 80vh;
}

.comment {
  width: 550px;
  height: 200px;

  &-text {
    word-wrap: break-word;
    width: 95%;
  }
}
</style>
