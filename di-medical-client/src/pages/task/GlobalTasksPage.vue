<template>
  <div class="column flex flex-center ">
    <div class="tasks q-mt-lg">
      <!-- Backlog -->
      <div class="task-column bg-grey-2 shadow-2">
        <div class="task-title bg-primary column justify-center">
          <p class="q-ml-md text-subtitle1">Backlog({{totalBacklog}})</p>
        </div>

        <div class="task-list q-mt-md">
          <q-card class="task-card" flat bordered v-for="task in getBacklog" :key="task.id">
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-h6 q-mt-sm q-mb-xs">{{task.title}}</div>
                <div class="text-caption text-grey">
                  {{ task.description  }}
                </div>
              </q-card-section>
            </q-card-section>
      
            
            <q-card-section class="row items-center justify-between">
              <div class="text-caption">{{ getFormattedDate(task.dueToDate)  }}</div>
                <q-img
                  :src="task.userAssignedPicture"
                  spinner-color="white"
                  style="max-width: 40px; height:40px; border-radius:50%;"
                />
                <q-tooltip>
                  {{ task.userAssignedName }}
                </q-tooltip>
            </q-card-section>
            <q-separator />

            <q-card-actions>
              <q-btn-dropdown color="primary" :label="task.status.name" outline no-caps>
                <q-list>
                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>Backlog</q-item-label>
                    </q-item-section>
                  </q-item>
          
                  <q-item clickable v-close-popup @click="moveTaskToState(task.id, task.status.name, Doing.create())">
                    <q-item-section>
                      <q-item-label>En curso</q-item-label>
                    </q-item-section>
                  </q-item>
          
                  <q-item clickable v-close-popup @click="moveTaskToState(task.id, task.status.name, Done.create())">
                    <q-item-section>
                      <q-item-label>Hecho</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </q-card-actions>
          </q-card>
        </div>
      </div>
      <!-- Doing -->
      <div class="task-column bg-grey-2 shadow-2">
        <div class="task-title bg-primary column justify-center">
          <p class="q-ml-md text-subtitle1">En curso({{totalDoing}})</p>
        </div>

        <div class="task-list q-mt-md">
          <q-card class="task-card" flat bordered v-for="task in getDoing" :key="task.id">
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-h6 q-mt-sm q-mb-xs">{{task.title}}</div>
                <div class="text-caption text-grey">
                  {{ task.description  }}
                </div>
              </q-card-section>
            </q-card-section>
      
            
            <q-card-section class="row items-center justify-between">
              <div class="text-caption">{{ getFormattedDate(task.dueToDate)  }}</div>
                <q-img
                  :src="task.userAssignedPicture"
                  spinner-color="white"
                  style="max-width: 40px; height:40px; border-radius:50%;"
                />
                <q-tooltip>
                  {{ task.userAssignedName }}
                </q-tooltip>
            </q-card-section>
            <q-separator />

            <q-card-actions>
              <q-btn-dropdown color="primary" :label="task.status.name" outline no-caps>
                <q-list>
                  <q-item clickable v-close-popup @click="moveTaskToState(task.id, task.status.name, Backlog.create())">
                    <q-item-section>
                      <q-item-label>Backlog</q-item-label>
                    </q-item-section>
                  </q-item>
          
                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>En curso</q-item-label>
                    </q-item-section>
                  </q-item>
          
                  <q-item clickable v-close-popup @click="moveTaskToState(task.id, task.status.name, Done.create())">
                    <q-item-section>
                      <q-item-label>Hecho</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </q-card-actions>
          </q-card>
        </div>
      </div>
      <!-- Done -->
      <div class="task-column bg-grey-2 shadow-2">
        <div class="task-title bg-primary column justify-center">
          <p class="q-ml-md text-subtitle1">Hecho({{totalDone}})</p>
        </div>

        <div class="task-list q-mt-md">
          <q-card class="task-card" flat bordered v-for="task in getDone" :key="task.id" draggable="true">
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-h6 q-mt-sm q-mb-xs">{{task.title}}</div>
                <div class="text-caption text-grey">
                  {{ task.description  }}
                </div>
              </q-card-section>
            </q-card-section>
      
            
            <q-card-section class="row items-center justify-between">
              <div class="text-caption">{{ getFormattedDate(task.dueToDate)  }}</div>
                <q-img
                  :src="task.userAssignedPicture"
                  spinner-color="white"
                  style="max-width: 40px; height:40px; border-radius:50%;"
                />
                <q-tooltip>
                  {{ task.userAssignedName }}
                </q-tooltip>
            </q-card-section>
            <q-separator />

            <q-card-actions>
              <q-btn-dropdown color="primary" :label="task.status.name" outline no-caps>
                <q-list>
                  <q-item clickable v-close-popup @click="moveTaskToState(task.id, task.status.name, Backlog.create())">
                    <q-item-section>
                      <q-item-label>Backlog</q-item-label>
                    </q-item-section>
                  </q-item>
          
                  <q-item clickable v-close-popup @click="moveTaskToState(task.id, task.status.name, Doing.create())">
                    <q-item-section>
                      <q-item-label>En curso</q-item-label>
                    </q-item-section>
                  </q-item>
          
                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>Hecho</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
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
import { useDate } from 'src/composables/useDate';
import { Task } from 'src/entities/task/Task';
import { Doing, Done, Backlog, TaskStatus } from 'src/entities/task/TaskStatus';
import { computed, ref } from 'vue';

const seamless = ref(false)
const ok = ref(false)
const message = ref('')
const { getFormattedDate } = useDate()

const tasksApi = new TaskFacade()

const backlog = ref<Task[]>([])
const doing = ref<Task[]>([])
const done = ref<Task[]>([])

const getBacklog = computed(() => backlog.value.map(task => task.toPrimitives()))
const totalBacklog = computed(() => backlog.value.length || 0)
const getDoing = computed(() => doing.value.map(task => task.toPrimitives()))
const totalDoing = computed(() => doing.value.length || 0)
const getDone = computed(() => done.value.map(task => task.toPrimitives()))
const totalDone = computed(() => done.value.length || 0)

const moveTaskToState = (taskId: string, taskType: string, nextState: TaskStatus) => {
  let taskToUpdate
  // First get the task and delete it from current status array
  switch (taskType) {
    case "Backlog":
      taskToUpdate = backlog.value.find(task => task.toPrimitives().id === taskId)
      backlog.value = backlog.value.filter(task => task.toPrimitives().id !== taskId)
      break;
    case "En curso":
      taskToUpdate = doing.value.find(task => task.toPrimitives().id === taskId)
      doing.value = doing.value.filter(task => task.toPrimitives().id !== taskId)
      break;
    case "Hecho":
      taskToUpdate = done.value.find(task => task.toPrimitives().id === taskId)
      done.value = done.value.filter(task => task.toPrimitives().id !== taskId)
      break;
    default:
      break;
  }

  // Depending on the nextState, move it
  taskToUpdate = taskToUpdate?.changeStatus(nextState)
  
  if(nextState.isBacklog()) {
    backlog.value.push(taskToUpdate!)
  }

  if(nextState.isDoing()) {
    doing.value.push(taskToUpdate!)
  }

  if(nextState.isDone()) {
    done.value.push(taskToUpdate!)
  }

}

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
  done.value = tasks.value.filter(task => task.toPrimitives().status.name == 'Hecho')

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
