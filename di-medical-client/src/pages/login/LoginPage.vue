<template>
  <q-page class="flex column flex-center">
    <p class="q-mb-xl text-h5">Ingresa tus credenciales</p>
    <q-form class="row column" style="width: 400px; height: 20vh" @submit.prevent="login">
      <q-input label="Correo" v-model="email"/>
      <q-input label="Contrasena" class="q-mt-xl" v-model="password"/>
      <q-btn label="Iniciar sesion" type="submit" color="secondary" class="q-mt-xl"/>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const password = ref('')
const email = ref('')

const login = () => {
  if(!(password.value.length > 0) || !(email.value.length > 0)) return
  console.log('LOGIN', password, email);
  
}

</script>

<style lang="scss">

</style>
