<template>
  <q-page class="column items-center q-mt-xl">
    <p class="q-mb-xl text-h5">Registrar camioneta</p>
    <q-form class="truck-form">
      <q-input label="Placas de la camioneta"/>
      <q-input label="Modelo de la camioneta" class="q-mt-xl"/>
      <q-input label="Marca de la camioneta" class="q-mt-xl" type="number"/>
      <q-file class="q-mt-xl" label="Foto"></q-file>
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
import { ref } from 'vue'
const seamless = ref(false)
const message = ref('')
const ok = ref(false)


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
