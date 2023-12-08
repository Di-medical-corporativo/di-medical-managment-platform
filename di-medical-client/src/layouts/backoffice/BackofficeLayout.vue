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
      <div class="q-pa-md q-gutter-sm">
        <q-tree :nodes="simple" dense node-key="label"/>
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

const simple = [
  {
    label: 'Satisfied customers (with avatar)',
    avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
    children: [
      {
        label: 'Good food (with icon)',
        icon: 'restaurant_menu',
        children: [
          { label: 'Quality ingredients' },
          { label: 'Good recipe' }
        ]
      },
      {
        label: 'Good service (disabled node with icon)',
        icon: 'room_service',
        disabled: true,
        children: [
          { label: 'Prompt attention' },
          { label: 'Professional waiter' }
        ]
      },
      {
        label: 'Pleasant surroundings (with icon)',
        icon: 'photo',
        children: [
          {
            label: 'Happy atmosphere (with image)',
            img: 'https://cdn.quasar.dev/img/logo_calendar_128px.png'
          },
          { label: 'Good table presentation' },
          { label: 'Pleasing decor' }
        ]
      }
    ]
  }
]
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
