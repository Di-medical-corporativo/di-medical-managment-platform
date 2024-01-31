<template>
  <div class="column items-center summary">
    <div class="survey-details bg-primary">

    </div>
    <div class="survey-summary q-mt-xl row items-center">
      <div class="survey-summary-question open bg-white row items-center shadow-1" v-for="i in 10" :key="i">
        <div class="text q-mt-md">
          <p class="order text-body2">1</p>
          <div class="column question">
            <p class="text-body2 text-bold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam harum, minima pariatur at fuga error voluptates sapiente alias! Sint nihil dolor soluta neque sapiente minus repellendus vitae, consequuntur nobis unde?</p>
            <small class="text-grey">23 de 48</small>
          </div>
        </div>
        <div class="options column items-center q-mt-md q-mb-md">
          <div class="option" v-for="i in 3" :key="i">
            <p class="no-margin">Text</p>
            <q-linear-progress size="20px" :value="0.4" color="primary">
              <div class="absolute-full flex flex-center">
                <q-badge color="white" text-color="accent" :label="0.4" />
              </div>
            </q-linear-progress>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>

  .summary {
    height: 100%;
    height: 100vh;
  }
  .survey {
    &-details { 
      width: 100%;
      height: 150px;
    }

    &-summary {
      width: 100%;
      height: 100px;
      gap: 45px;
      @media screen and (min-width: $breakpoint-md-min) {
        width: 750px;
        top: 20px;
      }

      &-question {
        width: 100%;
      }
    }
  }

  .text {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
  }

  .question {
    width: 90%;
  }

  .options {
    width: 100%;
    gap: 20px;
    .option {
      width: 95%;
    }
  }
</style>
