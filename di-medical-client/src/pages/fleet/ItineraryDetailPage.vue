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
            <q-chip :icon="true ? 'done' : 'local_shipping'" :color="true ? 'secondary' : 'grey'" text-color="white"
              size="sm">En ruta</q-chip>
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
                <q-icon :name="true ? 'done' : 'local_shipping'" :color="true ? 'secondary' : 'grey'" text-color="white"
                  size="sm"></q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label>Estatus</q-item-label>
                <q-item-label caption>En ruta</q-item-label>
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
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import mapboxgl, { Point } from 'mapbox-gl'
import { useItineraryStore } from 'stores/itinerary-store'
import { useRoute, useRouter } from 'vue-router'
import { Itinerary } from 'src/entities/Itinerary'

const route = useRoute()
const router = useRouter()

const mapDiv = ref<HTMLElement | null>(null)
const map = ref<mapboxgl.Map | null>(null)
const accessToken = ref('pk.eyJ1Ijoia2V2YXJvbjI4IiwiYSI6ImNscXd1OWphMzA3M2YydXFmcTkzM2ZwaDgifQ.k6SFzwdnDmbWOibTg0iiMQ')
const itinerary = ref<Itinerary | null>(null)
const itineraryStore = useItineraryStore()
const currentPointIndex = ref(0)
onMounted(async () => {
  mapboxgl.accessToken = accessToken.value
  map.value = new mapboxgl.Map({
    container: mapDiv.value!,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-99.0577865313392, 19.34055939879581],
    zoom: 15
  })

  map.value.on('load', () => {
    new mapboxgl.Marker()
      .setLngLat([-99.0577865313392, 19.34055939879581])
      .setPopup(new mapboxgl.Popup({ className: 'popup-content' }).setHTML('<h3>Marker Popup</h3><p>This is a popup on the marker.</p>'))
      .addTo(map.value!)
  })

  map.value.resize()
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
    height: 450px;
  }

  &-invoices {
    width: 25%;
    height: 450px;
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
</style>
