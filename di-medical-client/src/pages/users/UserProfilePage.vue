<template>
  <div class="column">
    <header class="full-width bg-primary relative-position">
      <div class="flex flex-center user-info absolute">
        <div class="user-image flex flex-center">
          <q-img :src="user?.picture" style="width: 95%; height: 95%; border-radius: 50%;"></q-img>
        </div>
        <div class="user-name q-ml-md q-mt-sm">
          <p>{{user?.firstName}} </p>
          <small>{{user?.job}}</small>
        </div>
      </div>
      <div class="absolute vcard-link">
        <q-btn label="Vcard" icon="link" outline color="accent" no-caps></q-btn>
      </div>
    </header>
    <main class="column items-center q-mt-xl">
      <div class="user-summary">
        <div class="itineraries"></div>
      </div>
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
  }
}

  header {
    height: 200px;
  }
  
  .vcard-link {
    right: 20px;
    top: 10px;
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

    &-summary {
      width: 100%;
      background-color: red;
      height: 100px;
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
