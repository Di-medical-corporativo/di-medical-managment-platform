<template>
  <div class="column flex flex-center ">
    <div class="tasks q-mt-lg">
      <div class="task-column bg-grey-2 shadow-2">
        <div class="task-title bg-primary column justify-center">
          <p class="q-ml-md text-subtitle1">Backlog</p>
        </div>

        <div class="task-list q-mt-md">
          <q-card class="task-card" flat bordered v-for="task in getBacklog" :key="task.id">

            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <img :src="task.userAssignedPicture">
                </q-avatar>
              </q-item-section>
      
              <q-item-section>
                <q-item-label>{{task.userAssignedName}}</q-item-label>
                <q-item-label caption>{{task.userAssignedName}}</q-item-label>
              </q-item-section>
            </q-item>

            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-h5 q-mt-sm q-mb-xs">{{task.title}}</div>
                <div class="text-caption text-grey">
                  {{ task.description  }}
                </div>
              </q-card-section>
            </q-card-section>
      
            <q-separator />
      
            <q-card-actions>
              <q-btn flat>
                {{ task.dueToDate  }}
              </q-btn>
              <q-btn flat color="primary">
                Editar
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
      <div class="task-column bg-grey-2 shadow-2">
        <div class="task-title bg-primary column justify-center">
          <p class="q-ml-md text-subtitle1">Backlog</p>
        </div>

        <div class="task-list q-mt-md">
          <q-card class="task-card" flat bordered v-for="i in 6" :key="i">
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
                <div class="text-caption text-grey">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
              </q-card-section>
            </q-card-section>
      
            <q-separator />
      
            <q-card-actions>
              <q-btn flat>
                7:30PM
              </q-btn>
              <q-btn flat color="primary">
                Editar
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
      <div class="task-column bg-grey-2 shadow-2">
        <div class="task-title bg-primary column justify-center">
          <p class="q-ml-md text-subtitle1">Backlog</p>
        </div>

        <div class="task-list q-mt-md">
          <q-card class="task-card" flat bordered v-for="i in 6" :key="i">
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
                <div class="text-caption text-grey">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
              </q-card-section>
            </q-card-section>
      
            <q-separator />
      
            <q-card-actions>
              <q-btn flat>
                7:30PM 
                Editar
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>

    <q-dialog v-model="seamless" seamless position="top">
      <q-banner inline-actions class="text-white" :class="ok ? 'bg-green' : 'bg-red'">
        {{ message }}
        <template v-slot:action>
          <q-btn flat color="white" label="Cerrar" v-close-popup />
        </template>
      </q-banner>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { TaskFacade } from 'src/api/TaskFacade';
import { Task } from 'src/entities/task/Task';
import { computed, ref } from 'vue';

const seamless = ref(false)
const ok = ref(false)
const message = ref('')

const tasksApi = new TaskFacade()

const backlog = ref<Task[]>([])
const doing = ref<Task[]>([])
const done = ref<Task[]>([])

const getBacklog = computed(() => backlog.value.map(task => task.toPrimitives()))

const getKanbanContent = async () => {
  const tasks = await tasksApi.kanban()
  if(tasks.isLeft()) {
    ok.value = false
    message.value = tasks.error
    seamless.value = true
    return
  }
  backlog.value = tasks.value.filter(task => task.toPrimitives().status.name === 'Backlog') || []
  doing.value = tasks.value.filter(task => task.toPrimitives().status.name == 'En curso') || []

}

getKanbanContent()

</script>


<style lang="scss">
  .tasks {
    width: 100%;
    height: 100%;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;

    @media screen and (max-width: $breakpoint-lg-min) {
      justify-content: start;
      margin-left: 15px;
    }

    gap: 270px;
    .task {
      
      &-column {
        flex: 0 0 auto;
        width: 390px;
        min-height: 90vh;
      } 

      &-title {
        width: 100%;
        height: 100px;
      }

      &-list {
        min-height: 90%;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 15px;
        margin-bottom: 15px;
      }

      &-card {
        width: 98%;
        margin-top: 10px;
      }
    }
  }
</style>
