<template>
  <q-page class="column items-center q-mt-xl">
    <p class="q-mb-xl text-h5">Crear nueva sucursal</p>
    <q-form class="sucursal-form" @submit.prevent="registerSucursal">
      <q-input label="Nombre de la sucursal" v-model="name"/>
      <q-input label="Direccion de la sucursal" class="q-mt-xl" v-model="address"/>
      <q-input label="Telefono de la sucursal" class="q-mt-xl" type="number" v-model="phone"/>
      <q-btn-toggle
        v-model="identity"
        spread
        no-caps
        toggle-color="primary"
        color="white"
        text-color="black"
        class="q-mt-xl"
        :options="[
          {label: 'Sur', value: 'Di medical del sur'},
          {label: 'Corporativo', value: 'Di-medical corporativo'}
        ]"
      />
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
import { ApiFacade } from 'src/api/ApiFacade'
import { Sucursal } from 'src/entities/Sucursal'

import { ref } from 'vue'
const identity = ref('sur')
const name = ref('')
const address = ref('')
const phone = ref('')
const seamless = ref(false)
const message = ref('')
const ok = ref(false)

const apiFacade = new ApiFacade()

const cleanForm = () => {
  name.value = ''
  address.value = ''
  phone.value = ''
}

const registerSucursal = async () => {
  if(name.value.length === 0 || address.value.length === 0 || phone.value.length === 0){
    message.value = 'Debes de proporcionar todos los campos'
    seamless.value = true
    ok.value = false
    return 
  }

  const sucursalDomain = new Sucursal(
    undefined,
    name.value,
    address.value,
    phone.value,
    identity.value
  )

  const sucursal = await apiFacade.registerSucursal(sucursalDomain)
  if(sucursal.isLeft()) {
    message.value = 'Ocurrio un error al crear la sucursal'
    seamless.value = true
    ok.value = false
    return
  }

  message.value = 'Se creo exitosamente la sucursal'
  seamless.value = true
  ok.value = true
  cleanForm()
}

</script>

<style lang="scss" scoped>

.sucursal-form{
  width: 90%;
}

@media screen and (min-width: $breakpoint-md-min) {
  .sucursal-form {
    width: 450px;
  }
}
</style>
