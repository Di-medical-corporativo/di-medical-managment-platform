<template>
  <q-page class="column items-center q-mt-xl">
    <p class="q-mb-xl text-h5">Asignar tarea</p>
    <q-form class="sucursal-form" @submit.prevent="registerTask">
      <q-select label="Usuario" :options="userStore.getUsers" v-model="userAssigned" emit-value
        :option-value="opt => opt" :option-label="opt => opt.firstName + ' ' + opt.lastName">
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section avatar>
              <q-img :src="scope.opt.picture"></q-img>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ scope.opt.firstName + ' ' + scope.opt.lastName }}</q-item-label>
              <q-item-label caption>{{ scope.opt.job }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
        <template v-slot:after-options>
          <q-item-section class="flex flex-center">
            <q-pagination v-model="userCurrentPagination" :max="userStore.getTotalPages" input />
          </q-item-section>
        </template>
      </q-select>
      <q-input label="Titulo de la tarea" v-model="title" class="q-mt-xl"/>
      <q-input label="Descripcion de la tarea" class="q-mt-xl" v-model="description" />
      <div class="q-mt-xl column items-center">
        <q-date v-model="date" range :options="date => date >= getCurrentDate()"></q-date>
      </div>
      <q-btn label="Asignar" type="submit" color="secondary" no-caps class="q-mt-xl" />
    </q-form>
    <q-dialog v-model="seamless" seamless position="top">
      <q-banner inline-actions class="text-white" :class="ok ? 'bg-green' : 'bg-red'">
        {{ message }}
        <template v-slot:action>
          <q-btn flat color="white" label="Cerrar" v-close-popup />
        </template>
      </q-banner>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { TaskFacade } from 'src/api/TaskFacade';
import { useDate } from 'src/composables/useDate';
import { Task } from 'src/entities/task/Task';
import { TaskDescription } from 'src/entities/task/TaskDescription';
import { TaskId } from 'src/entities/task/TaskId';
import { TaskStartDate } from 'src/entities/task/TaskStartDate';
import { Backlog } from 'src/entities/task/TaskStatus';
import { TaskTitle } from 'src/entities/task/TaskTitle';
import { TaskUserAssignedId } from 'src/entities/task/TaskUserAssigned';
import { TaskUserAssignedName } from 'src/entities/task/TaskUserAssignedName';
import { TaskUserAssignedPicture } from 'src/entities/task/TaskUserAssignedPicture';
import { UUID } from 'src/helpers/uuid';
import { useUserStore } from 'src/stores/user-store';
import { ref } from 'vue'

const title = ref('')
const description = ref('')
const userAssigned = ref()
const date = ref()
const seamless = ref(false)
const message = ref('')
const ok = ref(false)

const userStore = useUserStore()
const userCurrentPagination = ref(1)

const { getCurrentDate } = useDate()
const apiFacade = new TaskFacade()

const cleanForm = () => {
  title.value = ''
  description.value = ''
  userAssigned.value = null
  date.value = {}
}

const registerTask = async () => {
  if (title.value.length === 0 || description.value.length === 0 || !userAssigned.value || (date.value.from === '' && date.value.to === '')) {
    message.value = 'Debes de proporcionar todos los campos'
    seamless.value = true
    ok.value = false
    return
  }

  let endDate, startDate;
  if(!date.value.from || !date.value.to) {
    endDate = startDate = new Date(date.value)
  } else {
    startDate = new Date(date.value.from)
    endDate = new Date(date.value.to)
  }

  const task = Task.create(
    new TaskId(UUID.generate()),
    new TaskTitle(title.value),
    new TaskDescription(description.value),
    new TaskUserAssignedId(userAssigned.value._userId),
    new TaskUserAssignedName(`${userAssigned.value._firstName} ${userAssigned.value._lastName}`),
    new TaskUserAssignedPicture(userAssigned.value._picture),
    Backlog.create(),
    new TaskStartDate(new Date(startDate)),
    new TaskStartDate(new Date(endDate))
  )
  const result = await apiFacade.registerTask(task)

  if(result.isLeft()){
    message.value = 'Ocurrio un error al crear la tarea, intenta de nuevo'
    seamless.value = true
    ok.value = false
    return
  }

  message.value = 'Se creo exitosamente la tarea'
  seamless.value = true
  ok.value = true
  cleanForm()
}

</script>

<style lang="scss" scoped>
.sucursal-form {
  width: 90%;
}

@media screen and (min-width: $breakpoint-md-min) {
  .sucursal-form {
    width: 450px;
  }
}
</style>
