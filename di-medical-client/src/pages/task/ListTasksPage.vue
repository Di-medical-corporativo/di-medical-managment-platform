<template>
  <div class="column">
    <div class="column q-ml-xl">
      <h4>Listado de asignaciones</h4>
    </div>
    <div class="column items-center">
      <q-table
        flat
        :rows="tasks"
        :columns="columns"
        :pagination="initialPagination"
        hide-pagination
        style="width: 95%;"
      >

      <template v-slot:top>
        <q-select 
        label="Usuario" 
        :options="userStore.getUsers" 
        v-model="userAssigned" 
        emit-value
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

        <q-select v-model="status" :options="['Backlog', 'En curso', 'Hecho', 'Destiempo']" label="Estatus" class="q-ml-lg"/>


        <q-space />
        <q-btn label="Buscar" no-caps icon="search" color="primary">
        </q-btn>
    </template>

      <template v-slot:body="props">
        <q-tr :props="props" style="cursor: pointer;" @click="openModal">
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="description" :props="props">
            {{ props.row.description }}
          </q-td>
          <q-td key="userAssignedName" :props="props">
            {{ props.row.userAssignedName }}
          </q-td>
          <q-td key="dueDate" :props="props">
            {{ getFormattedDate(props.row.dueDate) }}
          </q-td>
          <q-td key="status" :props="props">
            <q-badge :color="statusColor(props.row.status.name)">
              {{ props.row.status.name }}
            </q-badge>
          </q-td>
        </q-tr>
      </template>
      </q-table>

      <div class="row justify-center q-mt-md">
        <q-pagination v-model="pagination" :max="10" input />
      </div>

      <q-dialog v-model="showModal">
        <q-card style="width: 500px; max-height:650px;">
          <q-bar class="bg-white">
            <q-btn dense flat icon="close" v-close-popup>
              <q-tooltip>Cerrar</q-tooltip>
            </q-btn>  
          </q-bar>
  
          <q-card-section>
            <div class="text-h6">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
            <q-popup-edit auto-save v-slot="scope">
              <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
            </q-popup-edit>
          </q-card-section>  

          <q-separator inset />

          <q-card-section>
            <div class="row items-center">
              <p class="text-grey-7 row items-center justify-center q-pt-md">Asignado</p>
              <q-chip color="grey-3" size="sm" class="text-weight-medium">
                Kevin Aron Tapia Cruz
              </q-chip>
            </div>
            <div class="row items-center">
              <p class="text-grey-7 row items-center justify-center q-pt-md">Estatus</p>
              <q-chip color="green-5" size="sm" class="text-weight-medium">
                En curso
              </q-chip>
            </div>
            <div class="row items-center q-mt-sm">
              <p class="text-grey-7 row items-center justify-center">Vencimiento</p>
              <!-- TODO: Add calendar to change the due date -->
              <p class="q-ml-sm text-weight-medium">24 de mayo 2003</p>
              
            </div>
          </q-card-section>

          <q-separator inset />
          
          <q-card-section class="q-mt-sm">
            <p class="text-bold">Descripción</p>
            <p class="text-body2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 

            </p>
            <q-popup-edit
              v-slot="scope"
            >
              <q-input
                type="textarea"
                v-model="scope.value"
                autofocus
                counter
                @keyup.enter.stop
              />
            </q-popup-edit>
          </q-card-section>

          <q-separator inset/>
          
          <q-card-actions>
            <q-btn dense flat icon="save" no-caps color="secondary">
              Guardar cambios
            </q-btn>
            <q-btn dense flat icon="delete" no-caps color="accent">
              Eliminar
            </q-btn>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDate } from 'src/composables/useDate';
import { useUserStore } from 'src/stores/user-store';
import { ref } from 'vue'

const userStore = useUserStore()
const userCurrentPagination = ref(1)
const userAssigned = ref()

const status = ref('Backlog')

const pagination = ref(1)
const showModal = ref(false)
const initialPagination = {
  sortBy: 'desc',
  page: 1
}


const { getFormattedDate } = useDate()

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Titulo',
    align: 'left',
    field: (row: { name: any; }) => row.name,
    format: (val: any) => `${val}`,
  },
  {
    name: 'description',
    label: 'Descripción',
    align: 'left'
  },
  {
    name: 'userAssignedName',
    label: 'Asignado',
    align: 'left'
  },
  {
    name: 'dueDate',
    label: 'Fecha de vencimiento',
    align: 'left'
  },
  {
    name: 'status',
    label: 'Estatus',
    align: 'left',
  }
]

const tasks = [
  {
    "id": "16021f7e-696b-4658-b2ba-da9d640b0130",
    "name": "Titulo modificado",
    "description": "Task really important",
    "userAssignedId": "16e7d4f2-5de8-4583-b85e-ac64d8a4eaae",
    "userAssignedName": "Kevin Aron Tapia Cruz",
    "userAssignedPicture": "https://storage.googleapis.com/di-medical-del-sur.appspot.com/uploads/test?GoogleAccessId=firebase-adminsdk-9vji9%40di-medical-del-sur.iam.gserviceaccount.com&Expires=16447017600&Signature=Nvd82X3xSb%2F5nojkg%2BW51%2FKkpAsVvFO5wsPyUjwtKeFYo%2B8sSZPaL1zNrZ%2BGlIueRA44Wq2HpRtNuQfgQl5FGL1XwZO2YpxrwNgYwrqVyRALvGvcvrsKVIBopKw6rW1gBpV0cT%2FRDjWsjhGCVkft1DArH7ry3ph2Wjb%2FZftNprzTd8hf11HmEtsioecuCXnVEmWb67dOjv0qcFx7ZgKmJg5MYdGWETuhQK%2BBKuiLblzKs1mX9Cl9XF%2Bw5H1SYlFfzeFjfTKZiuhZDnHncv8d%2BY7unh1GYQEcAc2BU6sPKjCXxBupqEyOGMjt95Y9OPyCLs8UlPFyUcy8lIh9X%2BtxDQ%3D%3D",
    "status": {
      "name": "Hecho"
    },
    "startedDate": "2024-04-19T06:00:00.000Z",
    "dueDate": "2024-05-04T16:52:08.648Z",
    "endDate": "2024-04-23T06:00:00.000Z"
    }
]


const openModal = () => {
  showModal.value = !showModal.value
}

const statusColor = (status: string) => {
  if(status === 'Backlog') {
    return 'blue-grey-5'
  }

  if(status === 'En curso') {
    return 'blue-5'
  }

  if(status === 'Destiempo') {
    return 'red-5'
  }

  if(status === 'Hecho') {
    return 'green-5'
  }
}
 </script>
