<template>
  <div class="flex flex-center column">
    <div class="client-list flex flex-center" v-if="!clientStore.getLoading">
      <q-card 
        class="user-card q-mt-xl" 
        v-for="client in clientStore.getClients"
        :key="client.clientId"
        >
        <q-card-section>
          <div class="text-h6">{{client.name}}</div>
          <small>{{client.address}}</small>
        </q-card-section>
  
        <q-card-actions>
          <q-btn flat no-caps>Actualizar</q-btn>
          <q-btn flat no-caps>Eliminar</q-btn>
          <q-btn flat no-caps>Estadísticas</q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <div class="q-pa-lg flex flex-center">
      <q-pagination v-model="current" :max="clientStore.getTotalPages" input />
    </div>

    <q-inner-loading
        :showing="clientStore.getLoading"
        color="primary"
        label="Por favor espera..."
        label-class="text-black"
        label-style="font-size: 1.1em"
      />

    <q-dialog v-model="seamless" seamless position="top">
      <q-banner inline-actions class="text-white" :class="ok ? 'bg-green' : 'bg-red'">
        {{ message }}
        <template v-slot:action>
          <q-btn flat color="white" label="Cerrar" v-close-popup />
        </template>
      </q-banner>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { useClientStore } from 'src/stores/client-store'
import { ref, watch } from 'vue'

const seamless = ref(false)
const ok = ref(false)
const message = ref('')

const clientStore = useClientStore()
const current = ref(1)


watch(current, async (value) => {
  const clients = await clientStore.clientsPaginated(value)
  if(clients.isLeft()) {
    ok.value = false
    message.value = clients.error
    seamless.value = true
  }
})

</script>

<style lang="scss">
.client {
  &-list {
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  @media screen and (min-width: $breakpoint-md-min) {
    &-list {
      width: 90%;
      gap: 30px;
      justify-content: initial;
      align-items: initial;
      flex-direction: initial;
      flex-wrap: wrap;
    }
  }

}
</style>
