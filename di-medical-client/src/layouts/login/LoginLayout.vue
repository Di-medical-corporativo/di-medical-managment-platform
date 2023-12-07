<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-primary text-white flex" style="height: 140px;">
      <q-toolbar>
        <q-toolbar-title class="text-center flex flex-center">
          <img src="../../assets/images/logos/corporativo-logo.png" style="width: 135px;">
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
