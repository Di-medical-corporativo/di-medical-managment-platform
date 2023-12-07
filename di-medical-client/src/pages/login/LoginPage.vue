<template>
  <q-page class="flex column flex-center">
    <p class="q-mb-xl text-h5">Ingresa tus credenciales</p>
    <q-form class="row column" style="width: 400px; height: 20vh">
      <q-input label="Correo"/>
      <q-input label="Contrasena" class="q-mt-xl"/>
      <q-btn label="Submit" type="submit" color="secondary" class="q-mt-xl"/>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const password = ref('')
const email = ref('')

</script>

<style lang="scss">

</style>
