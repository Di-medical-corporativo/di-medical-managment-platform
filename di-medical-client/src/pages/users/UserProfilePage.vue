<template>
  <div class="column">
    <header class="full-width bg-primary relative-position flex flex-center">
      <div class="flex flex-center user-info absolute">
        <div class="user-image flex flex-center">
          <q-img :src="user?.picture" style="width: 95%; height: 95%; border-radius: 50%;"></q-img>
        </div>
        <div class="user-name q-ml-md q-mt-sm">
          <p>{{user?.firstName}} </p>
          <small>{{user?.job}}</small>
        </div>
      </div>
    </header>
    <main>

    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from 'src/stores/auth-store'
const authStore = useAuthStore()
const user = authStore.getUser
</script>

<style lang="scss" scoped>

@media screen and (min-width: $breakpoint-md-min) {
  header {
    display: flex;
    align-items: initial;
    justify-content: initial;
  }
}

  header {
    height: 200px;
  }

  .user {
    
    &-image {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: 1px solid #000;
    }

    @media screen and (min-width: $breakpoint-md-min) {
      &-image {
        width: 200px;
        height: 200px;
      }
    }

    &-info {
      bottom: -55px;
    }

    @media screen and (min-width: $breakpoint-md-min) {
      &-info {
        bottom: -100px;
        margin-left: 50px;

        p {
          font-size: 20px;
        }

        small {
          font-size: 15px;
          margin-top: -20px;
        }
      }
    }

    &-name {
      align-self: flex-start;
    }
  }
</style>
