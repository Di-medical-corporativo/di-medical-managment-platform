<template>
  <div class="column">
    <header class="full-width bg-primary relative-position flex flex-center">
      <div class="flex flex-center user-info absolute">
        <div class="user-image flex flex-center">
          <q-img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" style="width: 95%; height: 95%; border-radius: 50%;"></q-img>
        </div>
        <div class="user-name q-ml-md q-mt-sm">
          <p class="q-text-sm q-text-lg">Kevin Aron Tapia Cruz Ruiz Rojas</p>
          <small class="q-text-sm q-text-lg">Ingeniero en sistemas</small>
        </div>
      </div>
    </header>
    <main>

    </main>
  </div>
</template>

<script setup lang="ts">

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
      width: 120px;
      height: 120px;
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
