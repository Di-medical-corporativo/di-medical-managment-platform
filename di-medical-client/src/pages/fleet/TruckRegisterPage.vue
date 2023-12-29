<template>
  <q-page class="column items-center q-mt-xl">
    <p class="q-mb-xl text-h5">Registrar camioneta</p>
    <q-form class="truck-form" @submit.prevent="createTruck">
      <q-input label="Placas de la camioneta" v-model="truck.plates"/>
      <q-input label="Modelo de la camioneta" class="q-mt-xl" v-model="truck.model"/>
      <q-input label="Marca de la camioneta" class="q-mt-xl" v-model="truck.brand"/>
      <q-file class="q-mt-xl" label="Foto" v-model="truck.picture"></q-file>
      <q-btn label="Registrar sucursal" type="submit" color="secondary" no-caps class="q-mt-xl"/>
    </q-form>
    <q-dialog v-model="seamless" seamless position="top">
      <q-banner inline-actions class="text-white" :class="ok ? 'bg-green' : 'bg-red'">
        {{ message }}
        <template v-slot:action>
          <q-btn flat color="white" label="Cerrar" v-close-popup/>
        </template>
      </q-banner>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { TruckFacade } from 'src/api/TruckFacade';
import { Truck } from 'src/entities/Truck';
import { ref } from 'vue'
const truckFacade = new TruckFacade()

const seamless = ref(false)
const message = ref('')
const ok = ref(false)

const truck = ref({
  plates: null,
  model: null,
  brand: null,
  picture: null
})


const cleanForm = () => {
  truck.value.plates = null
  truck.value.model = null
  truck.value.brand = null
  truck.value.picture = null
}

const createTruck = async () => {
  if(
    truck.value.plates === null ||
    truck.value.model === null ||
    truck.value.brand === null ||
    truck.value.picture === null
  ) {
    message.value = 'Debes proporcionar todos los datos'
    ok.value = false
    seamless.value = true
    return
  }

  const truckToCreate = new Truck(
    undefined,
    truck.value.plates,
    truck.value.model,
    truck.value.brand,
    truck.value.picture,
    true
  )

  const truckCreated = await truckFacade.createTruck(truckToCreate)
  if(truckCreated.isLeft()) {
    message.value = truckCreated.error
    ok.value = false
    seamless.value = true
    cleanForm()
    return
  }

  message.value = 'Se ha registrado la camioneta'
  ok.value = true
  seamless.value = true
  cleanForm()
  return
}

</script>

<style lang="scss" scoped>
.truck-form{
  width: 90%;
}

@media screen and (min-width: $breakpoint-md-min) {
  .truck-form {
    width: 450px;
  }
}
</style>
