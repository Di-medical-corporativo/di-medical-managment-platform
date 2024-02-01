<template>
  <q-layout view="lhh lpR lFr">

    <q-header bordered class="bg-white text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" color="primary" size="lg" />

        <q-toolbar-title class="flex text-primary">
        </q-toolbar-title>

        <div class="q-pa-md">
          <q-btn flat color="primary" icon="person" label="Cerrar sesion" no-caps @click="closeSesion"></q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left">

      <div class="bg-primary flex flex-center" style="height: 68px;">
        <q-img src="../../assets/images/logos/dimedical-logo.png" style="max-width: 45px"></q-img>
      </div>

      <div class="q-pa-md q-gutter-sm q-mt-sm">
        <q-tree 
          :nodes="props" 
          default-expand-all 
          v-model:selected="selectedPage" 
          node-key="label"
        />
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { 
  registrerUserLabel, 
  RoutesPath, 
  userModuleLabel, 
  userListLabel, 
  sucursalModuleLabel, 
  registerSucursalLabel, 
  clientsModuleLabel, 
  registerClientLabel, 
  sucursalListLabel, 
  clientListLabel, 
  fleetModuleLabel,
  registerTruckModuleLabel,
  truckListModuleLabel,
  registerItineraryModuleLabel,
  historyItineraryLabel,
  surveyModuleLabel,
  registerSurveyModuleLabel,
surveyListModuleLabel
} from '../../router/routesNames'
import { useAuth } from 'src/composables/useAuth'
import { QTreeNode } from 'quasar';

const leftDrawerOpen = ref(false)
const selectedPage = ref(null)
const router = useRouter()
const auth = useAuth()
const modules = auth.getUserResources() as QTreeNode[]

const props = [
  {
    label: 'Perfil',
    children: modules
  }
]

const closeSesion = () => {
  auth.logOut()
  router.push({ name: RoutesPath.login.name })
}

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

watch(
  () => selectedPage.value,
  (value) => {
    let route 
    if(value === 'Perfil') {
      route = RoutesPath.backoffice.profile.name
    }

    if(value === userModuleLabel) {
      route = RoutesPath.users.default.name
    }
    
    if(value === registrerUserLabel) {
      route = RoutesPath.users.registrer.name
    }
    
    if(value == userListLabel) {
      route = RoutesPath.users.list.name
    }
    
    if(value == sucursalModuleLabel) {
      route = RoutesPath.sucursal.default.name
    }

    if(value == registerSucursalLabel) {
      route = RoutesPath.sucursal.registrer.name
    }

    if(value == sucursalListLabel) {
      route = RoutesPath.sucursal.list.name
    }

    if(value == clientsModuleLabel) {
      route = RoutesPath.clients.default.name
    }

    if(value == registerClientLabel) {
      route = RoutesPath.clients.register.name
    }

    if(value == clientListLabel) {
      route = RoutesPath.clients.list.name
    }

    if(value == fleetModuleLabel) {
      route = RoutesPath.fleet.default.name
    }

    if(value == registerTruckModuleLabel) {
      route = RoutesPath.fleet.register.name
    }

    if(value == truckListModuleLabel) {
      route = RoutesPath.fleet.list.name
    }

    if(value == registerItineraryModuleLabel) {
      route = RoutesPath.fleet.itinerary.name
    }

    if(value == historyItineraryLabel) {
      route = RoutesPath.fleet.itineraryHistory.name
    }

    if(value == surveyModuleLabel) {
      route = RoutesPath.survey.default.name 
    }
    
    if(value == registerSurveyModuleLabel) {
      route = RoutesPath.survey.register.name
    }

    if(value == surveyListModuleLabel) {
      route = RoutesPath.survey.list.name
    }
    
    router.push({ name: route })
  }
)

</script>

<style lang="scss" scoped>
.bg-content {
  background-color: #FAFCFD;
}
</style>
