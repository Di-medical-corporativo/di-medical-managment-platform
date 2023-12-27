<template>
  <q-page class="column items-center q-mt-xl">
    <p class="q-mb-xl text-h5">Registrar cliente</p>
    <q-form class="sucursal-form" @submit.prevent="registerClient">
      <q-input label="Nombre del cliente" v-model="name"/>
      <q-input label="Direccion del cliente" class="q-mt-xl" v-model="address"/>
      <q-btn label="Registrar cliente" type="submit" color="secondary" no-caps class="q-mt-xl"/>
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
import { Client } from 'src/entities/Client';
import { ref } from 'vue'

const name = ref('')
const address = ref('')
const seamless = ref(false)
const message = ref('')
const ok = ref(false)

const apiFacade = new ApiFacade()

const cleanForm = () => {
  name.value = ''
  address.value = ''
}

const registerClient = async () => {
  if(name.value.length === 0 || address.value.length === 0){
    message.value = 'Debes de proporcionar todos los campos'
    seamless.value = true
    ok.value = false
    return 
  }

  const clientDomain = new Client(
    undefined,
    name.value,
    address.value,
    true
  )

  const client = await apiFacade.registerClient(clientDomain)
  if(client.isLeft()) {
    message.value = 'Ocurrio un error al crear el client'
    seamless.value = true
    ok.value = false
    cleanForm()
    return
  }

  message.value = 'Se creo exitosamente el cliente'
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
