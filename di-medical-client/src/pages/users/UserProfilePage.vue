<template>
  <div class="column">
    <header class="full-width bg-primary relative-position">
      <div class="flex flex-center user-info absolute">
        <div class="user-image flex flex-center">
          <q-img :src="user?.picture" style="width: 95%; height: 95%; border-radius: 50%;"></q-img>
        </div>
        <div class="user-name q-ml-md q-mt-sm">
          <p>{{ user?.firstName }} </p>
          <small>{{ user?.job }}</small>
        </div>
      </div>
      <div class="absolute vcard-link">
        <q-btn label="Vcard" icon="link" outline color="accent" no-caps></q-btn>
      </div>
    </header>
    <main class="column items-center insights">
      <div class="user-summary column items-center q-mt-xl">
        <div class="user-summary-tasks row items-center">
          <p class="q-ml-sm text-body1">Asignaciones activas</p>
          <div class="tasks-list">
            <q-card flat bordered v-for="i in 5" :key="i" class="task-preview">
              <q-card-section horizontal>
                <q-card-section class="q-pt-xs">
                  <div class="text-overline">Overline</div>
                  <div class="text-h6 q-mt-sm q-mb-xs">Punto de entrega</div>
                  <div class="text-caption text-grey">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos, architecto nulla quaera...
                  </div>
                </q-card-section>
              </q-card-section>
        
              <q-separator />
        
              <q-card-actions>
                <q-btn flat round icon="event" label="7:30"/>
                <q-btn flat color="primary" no-caps>
                  Reserve
                </q-btn>
              </q-card-actions>
            </q-card>
          </div>
          <q-btn label="Listado de tareas" color="secondary" no-caps class="q-mt-md q-ml-sm"></q-btn>
        </div>
        <div class="user-summary-itinerary q-mt-xl">
          <p class="q-ml-sm text-body1">Itinerarios activos</p>
          <div class="itinerary-list">
            <q-card flat bordered v-for="i in 4" :key="i" class="itinerary-preview">
              <q-card-section horizontal>
                <q-card-section class="q-pt-xs">
                  <div class="text-overline">Overline</div>
                  <div class="text-h6 q-mt-sm q-mb-xs">Punto de entrega</div>
                  <div class="text-caption text-grey">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos, architecto nulla quaera...
                  </div>
                </q-card-section>
              </q-card-section>
        
              <q-separator />
        
              <q-card-actions>
                <q-btn flat round icon="event" label="7:30"/>
                <q-btn flat color="primary" no-caps>
                  Reserve
                </q-btn>
              </q-card-actions>
            </q-card>
          </div>
          <q-btn label="Listado de tareas" color="secondary" no-caps class="q-mt-md q-ml-sm"></q-btn>
        </div>
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

.insights {
  margin-top: 80px;
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

    &-tasks {
      width: 100%;
      max-height: 680px;
      overflow: hidden;
      .tasks-list {
        width: 100%;
        height: 85%;
        overflow-x: scroll;
        display: flex;
        gap: 15px;
        margin-left: 10px;
        .task-preview {
          flex: 0 0 auto;
          max-width: 350px;
        }
      }
    }

    &-itinerary {
      width: 100%;
      max-height: 680px;
      overflow: hidden;
      .itinerary-list {
        width: 100%;
        height: 85%;
        overflow-x: scroll;
        display: flex;
        gap: 15px;
        margin-left: 10px;

        .itinerary-preview {
          flex: 0 0 auto;
          max-width: 350px;
        }
      }
    }
  
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

.div1 { grid-area: 1 / 1 / 6 / 3; }
.div2 { grid-area: 1 / 3 / 3 / 5; }
.div3 { grid-area: 1 / 5 / 3 / 7; }
.div4 { grid-area: 3 / 3 / 6 / 7; }
</style>
