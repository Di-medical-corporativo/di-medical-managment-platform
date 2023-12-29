<template>
  <q-page class="flex column flex-center">
    <p class="q-mb-xl text-h5">Ingresa tus credenciales</p>
    <q-form style="width: 400px; height: 20vh" @submit.prevent="login">
      <q-input label="Correo" v-model="email"/>
      <q-input label="Contrasena" class="q-mt-xl" v-model="password"/>
      <q-btn label="Iniciar sesion" type="submit" color="secondary" class="q-mt-xl"/>
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
import { useAuth } from 'src/composables/useAuth'
import { Credentials } from 'src/entities/Credentials';
import { useRouter } from 'vue-router';
import { RoutesPath } from 'src/router/routesNames';

const password = ref('')
const email = ref('')
const seamless = ref(false)
const message = ref('')
const ok = ref(false)
const router = useRouter()

const auth = useAuth()

const login = async () => {

  if(email.value.length == 0 || password.value.length == 0) {
    seamless.value = true
    message.value = 'Debes proporcionar tus credenciales'
    ok.value = false
    return
  }

  const credentials = new Credentials(email.value, password.value)
  const user = await auth.loginUser(credentials)
  if(user.isLeft()) {
    seamless.value = true
    message.value = user.error
    ok.value = false
    return
  }

  ok.value = true
  message.value = 'Sesión inicida con éxito'
  router.push({ name: RoutesPath.backoffice.profile.name })
}



</script>

<style lang="scss" scoped>
</style>
