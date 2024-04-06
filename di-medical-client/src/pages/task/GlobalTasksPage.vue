<template>
  <div class="column flex flex-center ">
    <div class="tasks q-mt-md">
      <div class="task-column bg-grey-2 shadow-2">
        <div class="task-title bg-primary flex flex-center">
        </div>

        <div class="task-list">
          <q-card class="task-card" flat bordered v-for="i in 6" :key="i">
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-overline">Overline</div>
                <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
                <div class="text-caption text-grey">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
              </q-card-section>
      
              <q-card-section class="col-5 flex flex-center">
                <q-img
                  class="rounded-borders"
                  src="https://cdn.quasar.dev/img/parallax2.jpg"
                />
              </q-card-section>
            </q-card-section>
      
            <q-separator />
      
            <q-card-actions>
              <q-btn flat round icon="event" />
              <q-btn flat>
                7:30PM
              </q-btn>
              <q-btn flat color="primary">
                Reserve
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
      <div class="task-column bg-grey-2 shadow-2">
        <div class="task-title bg-primary flex flex-center">
        </div>

        <div class="task-list">
          <q-card class="task-card" flat bordered v-for="i in 6" :key="i">
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-overline">Overline</div>
                <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
                <div class="text-caption text-grey">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
              </q-card-section>
      
              <q-card-section class="col-5 flex flex-center">
                <q-img
                  class="rounded-borders"
                  src="https://cdn.quasar.dev/img/parallax2.jpg"
                />
              </q-card-section>
            </q-card-section>
      
            <q-separator />
      
            <q-card-actions>
              <q-btn flat round icon="event" />
              <q-btn flat>
                7:30PM
              </q-btn>
              <q-btn flat color="primary">
                Reserve
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
      <div class="task-column bg-grey-2 shadow-2">
        <div class="task-title bg-primary flex flex-center">
        </div>

        <div class="task-list">
          <q-card class="task-card" flat bordered v-for="i in 6" :key="i">
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-overline">Overline</div>
                <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
                <div class="text-caption text-grey">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
              </q-card-section>
      
              <q-card-section class="col-5 flex flex-center">
                <q-img
                  class="rounded-borders"
                  src="https://cdn.quasar.dev/img/parallax2.jpg"
                />
              </q-card-section>
            </q-card-section>
      
            <q-separator />
      
            <q-card-actions>
              <q-btn flat round icon="event" />
              <q-btn flat>
                7:30PM
              </q-btn>
              <q-btn flat color="primary">
                Reserve
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>


<style lang="scss">
  .tasks {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;

    @media screen and (max-width: $breakpoint-lg-min) {
      justify-content: start;
      margin-left: 15px;
    }

    overflow: scroll;
    gap: 240px;
    .task {
      
      &-column {
        flex: 0 0 auto;
        width: 390px;
        height: 90vh;
      } 

      &-title {
        width: 100%;
        height: 100px;
      }

      &-list {
        height: 90%;
        display: flex;
        align-items: center;
        flex-direction: column;
        overflow: scroll;
        gap: 15px;
      }

      &-card {
        width: 98%;
        margin-top: 10px;
      }
    }
  }
</style>
