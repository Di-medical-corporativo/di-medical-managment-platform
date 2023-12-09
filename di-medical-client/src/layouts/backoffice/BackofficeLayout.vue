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
        <q-tree :nodes="props" default-expand-all v-model:selected="selected" node-key="label" />
      </div>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const leftDrawerOpen = ref(false)
const selected = ref(null)
const props = [
  {
    label: 'Satisfied customers',
    avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
    children: [
      {
        label: 'Good food',
        icon: 'restaurant_menu',
        children: [
          { label: 'Quality ingredients' },
          { label: 'Good recipe' }
        ]
      },
      {
        label: 'Good service',
        icon: 'room_service',
        children: [
          { label: 'Prompt attention' },
          { label: 'Professional waiter' }
        ]
      },
      {
        label: 'Pleasant surroundings',
        icon: 'photo',
        children: [
          {
            label: 'Happy atmosphere'
          },
          {
            label: 'Good table presentation'
          },
          {
            label: 'Pleasing decor'
          }
        ]
      }
    ]
  }
]
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
