<template>
  <div class="column">
    <div class="column q-ml-xl">
      <h4>Listado de asignaciones</h4>
    </div>
    <div class="column items-center">
      <q-table
        flat
        :rows="rows"
        :columns="columns"
        :pagination="initialPagination"
        hide-pagination
        style="width: 95%;"
      >
      <template v-slot:body="props">
        <q-tr :props="props" style="cursor: pointer;" @click="openModal">
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="calories" :props="props">
            <q-badge color="green">
              {{ props.row.calories }}
            </q-badge>
          </q-td>
          <q-td key="fat" :props="props">
            <q-badge color="purple">
              {{ props.row.fat }}
            </q-badge>
          </q-td>
        </q-tr>
      </template>
      </q-table>

      <div class="row justify-center q-mt-md">
        <q-pagination
          v-model="pagination"
          color="primary"
          :max="1"
          size="sm"
        />
      </div>

      <q-dialog v-model="showModal">
        <q-card style="width: 500px; height: 600px;">
          <q-bar class="bg-white">
            <q-btn dense flat icon="close" v-close-popup>
              <q-tooltip>Close</q-tooltip>
            </q-btn>
            <div>9:34</div>
  
            <q-space />
            <q-icon name="network_wifi" />
            <q-icon name="network_cell" />
            <q-icon name="battery_full" />
            
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
                Bookmark
              </q-chip>
            </div>
            <div class="row items-center">
              <p class="text-grey-7 row items-center justify-center q-pt-md">Estatus</p>
              <q-chip color="grey-3" size="sm" class="text-weight-medium">
                Bookmark
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
              Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
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
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const pagination = ref(1)
const showModal = ref(false)

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
    name: 'calories',
    label: 'Descripción',
    align: 'left'
  },
  {
    name: 'fat',
    label: 'Asignado',
    align: 'left'
  },
  {
    name: 'carbs',
    label: 'Fecha de asignación',
    align: 'left'
  },
  {
    name: 'carbs',
    label: 'Fecha de vencimiento',
    align: 'left'
  },
  {
    name: 'carbs',
    label: 'Estatus',
    align: 'left'
  }
]

const initialPagination = {
  sortBy: 'desc',
  page: 1
}

const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%'
  }
]

const openModal = () => {
  showModal.value = !showModal.values
}
 </script>
