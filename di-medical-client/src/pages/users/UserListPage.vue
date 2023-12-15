<template>
  <div class="flex flex-center column">
    <div></div>
    <div class="user-list flex flex-center">
      <q-card class="user-card q-mt-xl" v-for="i in 10" :key="i">
        <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
          <div class="absolute-bottom">
            <div class="text-h6">Our Changing Planet</div>
            <div class="text-subtitle2">by John Doe</div>
          </div>
        </q-img>

        <q-card-actions>
          <q-btn flat>Action 1</q-btn>
          <q-btn flat>Action 2</q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <div class="q-pa-lg flex flex-center">
      <q-pagination v-model="current" :max="5" input />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const current = ref(1)
</script>

<style lang="scss">
.user {
  &-card {
    width: 300px;
  }

  &-list {
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  @media screen and (min-width: $breakpoint-md-min) {
    &-list {
      width: 90%;
      gap: 20px;
      justify-content: initial;
      align-items: initial;
      flex-direction: initial;
      flex-wrap: wrap;
    }
  }

}
</style>
