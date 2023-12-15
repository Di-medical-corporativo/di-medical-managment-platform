<template>
  <q-layout view="lhh lpR lFr">

    <q-header bordered class="bg-grey-2 text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" color="primary" size="lg" />

        <q-toolbar-title class="flex text-primary">
        </q-toolbar-title>

        <q-btn round icon="email" size="sm" color="primary">
          <q-badge color="red" floating>4</q-badge>
        </q-btn>

        <div class="q-pa-md">
          <q-btn-dropdown color="primary" icon="person">
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">Settings</div>
                <q-toggle label="Use Mobile Data" />
                <q-toggle label="Bluetooth" />
              </div>

              <q-separator vertical inset class="q-mx-lg" />

              <div class="column items-center">
                <q-avatar size="72px">
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>

                <q-btn color="primary" label="Logout" push size="sm" v-close-popup />
              </div>
            </div>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" class="bg-grey-1">

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
import { usersModule, registrerUserLabel, RoutesPath, userModuleLabel, userListLabel } from '../../router/routesNames'

const leftDrawerOpen = ref(false)
const selectedPage = ref(null)
const router = useRouter()

const props = [
  {
    label: 'Perfil',
    children: [
      usersModule
    ]
  }
]

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const routing = () => {
  console.log(selectedPage.value)
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
    
    router.push({ name: route })
  }
)

</script>
