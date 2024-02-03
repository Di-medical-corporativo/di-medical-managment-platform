<template>
  <q-page class="flex column">
    <div class="itinerary-info">
      {{ itinerary?.scheduleDate }}
    </div>
    <div class="flex detail-section q-mt-xl">
      <div class="bg-white points-list shadow-1">
        <q-card 
          class="my-card" 
          flat 
          v-for="(point, index) in itinerary?.points" 
          :key="point.pointId"
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
          <q-item>
            {{ point.invoices.length }} facturas por entregar
          </q-item>
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
          <div class="detail-point-map bg-white shadow-1">
            <div ref="mapDiv" class="map"></div>
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
            <p class="q-mt-sm text-body2 comment-text">{{currentPoint?.comment}}</p>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useItineraryStore } from 'stores/itinerary-store'
import { useRoute, useRouter } from 'vue-router'
import { Itinerary } from 'src/entities/Itinerary'

const route = useRoute()
const router = useRouter()
const itinerary = ref<Itinerary | null>(null)
const itineraryStore = useItineraryStore()
const currentPointIndex = ref(0)

onMounted(async () => {
  const id = route.params.id as string
  const itineraryOrError = await itineraryStore.getItineraryById(id)

  if(itineraryOrError.isLeft()) {
    return router.push({ name: 'not-found' })
  }
  itinerary.value = itineraryOrError.value
})

const currentPoint = computed(() => {
  return itinerary.value?.points[currentPointIndex.value]
})

const setCurrentIndex = (index: number) => {
  currentPointIndex.value = index
}

</script>

<style lang="scss" scoped>
.map {
  height: 100%;
}

.my-card {
  width: 95%;
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
  &-map {
    width: 70%;
    height: 350px;
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
    gap: 20px;
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
