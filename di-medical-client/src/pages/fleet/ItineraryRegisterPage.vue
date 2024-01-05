<template>
  <q-page class="column items-center q-mt-md q-mb-md">
    <div class="row justify-between itinerary-header">
      <div>
        <q-btn icon="event" round color="primary" no-caps>
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date>
              <div class="row items-center justify-end q-gutter-sm">
                <q-btn label="Cancel" color="primary" flat v-close-popup />
                <q-btn label="OK" color="primary" flat v-close-popup />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-btn>
        <q-select 
            label="Sucursal" 
            :options="branchStore.getBranches" 
            v-model="branchAssigned" 
            emit-value 
            class="q-mt-sm"
            :option-value="opt => opt" 
            :option-label="opt => opt.name"
            style="width: 250px;"
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label>{{scope.opt.name}}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
      </div>
      <div>
        <q-btn color="primary" label="Crear itineario" class="itinerary-create " no-caps @click="createItinerary"/>
      </div>
    </div>

    <div class="q-mt-xl itinerary-points">
      <q-card class="my-card ">
        <q-card-section class="column">
          <q-select 
            label="Operador" 
            :options="userStore.getUsers" 
            v-model="point.userAssigned" 
            emit-value 
            :option-value="opt => opt" 
            :option-label="opt => opt.firstName + ' ' + opt.lastName"
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section avatar>
                  <q-img :src="scope.opt.picture"></q-img>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{scope.opt.firstName + ' ' + scope.opt.lastName}}</q-item-label>
                  <q-item-label caption>{{scope.opt.job}}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:after-options>
              <q-item-section class="flex flex-center">
                <q-pagination v-model="userCurrentPagination" :max="userStore.getTotalPages" input />
              </q-item-section>
            </template>   
          </q-select>
          <q-select label="Cliente" 
            :options="clientStore.getClients" 
            v-model="point.clientAssigned"
            emit-value 
            :option-value="opt => opt" 
            :option-label="opt => opt.name"
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label>{{ scope.opt.name}}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:after-options>
              <q-item-section class="flex flex-center">
                <q-pagination v-model="clientCurrentPagination" :max="clientStore.getTotalPages" input />
              </q-item-section>
            </template>            
          </q-select>
          <q-select label="Camioneta" 
            :options="truckStore.getTrucks" 
            v-model="point.truckAssigned"
            emit-value 
            :option-value="opt => opt" 
            :option-label="opt => opt.model + ' | ' + opt.plates"
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section avatar>
                  <q-img :src="scope.opt.picture"></q-img>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ scope.opt.brand + ' ' + scope.opt.model}}</q-item-label>
                  <q-item-label caption>{{scope.opt.plates}}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:after-options>
              <q-item-section class="flex flex-center">
                <q-pagination v-model="truckCurrentPagination" :max="truckStore.getTotalPages" input />
              </q-item-section>
            </template>            
          </q-select>
          <q-select label="Encuesta" />

        </q-card-section>
        <q-separator />

        <q-card-section class="invoice-list">

          <div class="column">
            <div class="row q-mt-md">
              <q-input class="invoice-number" label="Factura" v-model="invoice.invoiceNumber" />
              <q-input class="invoice-description q-ml-md" label="Comentario" v-model="invoice.invoiceComment" />

              <div class="col items-center flex flex-center">
                <q-btn size="sm" color="primary" label="Agregar" no-caps @click="addInvoice"></q-btn>
              </div>
            </div>

            <p class="q-mt-md">Listado de facturas</p>

            <div class="row q-mt-sm justify-between" v-for="i in invoices">
              <div class="q-ml-xl">
                {{i.invoiceNumber }}
                <q-popup-edit v-model="i.invoiceNumber" auto-save>
                  <div class="text-italic text-primary">
                    Editar
                  </div>
                  <q-input v-model="updateInvoiceNumberValue" dense autofocus @keyup.enter="updateInvoiceNumber(i.id)" />
                </q-popup-edit>
              </div>
              <div class="q-ml-xl">
                {{i.invoiceComment }}
                <q-popup-edit v-model="i.invoiceComment" auto-save>
                  <div class="text-italic text-primary">
                    Editar
                  </div>
                  <q-input v-model="updateInvoiceCommentValue" dense autofocus @keyup.enter="updateInvoiceComment(i.id)" />
                </q-popup-edit>
              </div>
              <div class="col items-center flex flex-center">
                <q-btn size="sm" color="secondary" label="Eliminar" no-caps @click="deleteInvoice(i.id)"></q-btn>
              </div>
            </div>
          </div>

        </q-card-section>

        <q-separator />

        <q-card-actions class="flex flex-center q-mt-sm">
          <q-btn color="primary" class="" no-caps label="Agregar punto de entrega" @click="addPoint()"></q-btn>
        </q-card-actions>
      </q-card>
      <!-- ------------------------------------------------------------------------------------------ -->
        <q-card class="my-card" v-for="p in points" style="width: 320px;">
          <q-card-section class="column">
            <q-item v-ripple>
              <q-item-section avatar>
                <q-img :src="p.assignedDriver.picture"></q-img>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{p.assignedDriver.firstName}}</q-item-label>
                <q-item-label caption>{{p.assignedDriver.job}}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-ripple>
              <q-item-section avatar>
                <q-img :src="p.truck.picture"></q-img>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{p.truck.model + ' | ' + p.truck.brand}} </q-item-label>
                <q-item-label caption>{{p.truck.plates}}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-ripple>
              <q-item-section avatar>
                <q-avatar square color="red" text-color="white" icon="directions" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{p.client.name}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-separator />
  
          <q-card-section class="invoice-list" style="height: 350px;">
            <q-timeline color="secondary">
              <q-timeline-entry v-for="(invo, i) in p.invoices" :subtitle="invo.invoiceNumber">
                <div>{{invo.description}}</div>
              </q-timeline-entry>
            </q-timeline>
          </q-card-section>
        </q-card>
    </div>

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
import { Truck } from 'src/entities/Truck';
import { computed, ref, watch } from 'vue'
import { UUID } from 'src/helpers/uuid'
import { User } from 'src/entities/User';
import { useUserStore } from 'src/stores/user-store';
import { useTruckStore } from 'src/stores/truck-store';
import { Point } from 'src/entities/Point';
import { Invoice } from 'src/entities/Invoice';
import { useClientStore } from 'src/stores/client-store';
import { Client } from 'src/entities/Client';
import { useBranchStore } from 'src/stores/sucursal-store';
import { Itinerary } from 'src/entities/Itinerary';

const itinerary = new Itinerary(undefined, new Date(), new Date())
const seamless = ref(false)
const ok = ref(false)
const message = ref('')
const userStore = useUserStore()
const truckStore = useTruckStore()
const clientStore = useClientStore()
const branchStore = useBranchStore()

const truckCurrentPagination = ref(1)
const userCurrentPagination = ref(1)
const clientCurrentPagination = ref(1)

const branchAssigned = ref(null)
const invoice = ref({
  invoiceNumber: '',
  invoiceComment: 'Sin comentario',
})

const invoices = ref<{ invoiceNumber: string, invoiceComment: string, id: string }[]>([])
const updateInvoiceNumberValue = ref('')
const updateInvoiceCommentValue = ref('')


const points = ref<Point[]>([])

const point = ref<{ invoice: any[], clientAssigned: Client | null ,userAssigned: User | null, truckAssigned: Truck | null, surveyAssinged: any }>({
  invoice: [],
  userAssigned: null,
  clientAssigned: null,
  truckAssigned: null,
  surveyAssinged: null
})

const addInvoice = () => {
  if (invoice.value.invoiceNumber.trim().length === 0) return
  invoices.value.push({ 
    invoiceNumber: invoice.value.invoiceNumber, 
    invoiceComment: invoice.value.invoiceComment, 
    id: UUID.generate() 
  })
  invoice.value.invoiceComment = 'Sin comentario'
  invoice.value.invoiceNumber = ''
}

const deleteInvoice = (id: string) => {
  const indexToDelete = invoices.value.findIndex((invoice) => invoice.id == id)
  invoices.value.splice(indexToDelete, 1)
}

const updateInvoiceComment = (id: string) => {
  const invoiceToUpdate = invoices.value.filter(invoice => invoice.id === id)
  if(updateInvoiceCommentValue.value.length == 0) return
  invoiceToUpdate[0].invoiceComment = updateInvoiceCommentValue.value
  updateInvoiceCommentValue.value = 'Sin comentario'
}

const updateInvoiceNumber = (id: string) => {
  const invoiceToUpdate = invoices.value.filter(invoice => invoice.id === id)
  if(updateInvoiceNumberValue.value.length == 0) return
  invoiceToUpdate[0].invoiceNumber = updateInvoiceNumberValue.value
  updateInvoiceNumberValue.value = ''
}

const addPoint = () => {
  if(invoices.value.length == 0) return
  const pointToCreate = new Point(undefined)
  pointToCreate.invoices = invoices.value.map((inv) => new Invoice(undefined, inv.invoiceNumber, inv.invoiceComment))
  pointToCreate.truck =  new Truck(
    point.value.truckAssigned?.truckId,
    point.value.truckAssigned?.plates!, 
    point.value.truckAssigned?.model!,
    point.value.truckAssigned?.brand!,
    point.value.truckAssigned?.picture!,
    point.value.truckAssigned?.isActive!
  )
  pointToCreate.assignedDriver = new User(
    point.value.userAssigned?.userId,
    point.value.userAssigned?.firstName!,
    point.value.userAssigned?.lastName!,
    point.value.userAssigned?.birthDate!,
    point.value.userAssigned?.nss!,
    point.value.userAssigned?.job!,
    point.value.userAssigned?.picture!,
    point.value.userAssigned?.phone!,
    point.value.userAssigned?.email!,
    point.value.userAssigned?.isActive!,
    point.value.userAssigned?.createdAt!,
    point.value.userAssigned?.updatedAt!
  )
  pointToCreate.client = new Client(
    point.value.clientAssigned?.clientId!,
    point.value.clientAssigned?.name!,
    point.value.clientAssigned?.address!,
    point.value.clientAssigned?.isActive!
  )

  points.value.push(pointToCreate)
  userCurrentPagination.value = 1
  clientCurrentPagination.value = 1
  truckCurrentPagination.value = 1
  itinerary.addPoint(pointToCreate)
}

const createItinerary = () => {
  if(points.value.length == 0) return
  
  console.log(itinerary);
  
}

watch(truckCurrentPagination, async (value) => {
  const trucks = await truckStore.trucksPaginated(value)
  if (trucks.isLeft()) {
    ok.value = false
    message.value = trucks.error
    seamless.value = true
  }
})

watch(userCurrentPagination, async (value) => {
  const users = await userStore.usersPaginated(value)
  if (users.isLeft()) {
    ok.value = false
    message.value = users.error
    seamless.value = true
  }
})

watch(clientCurrentPagination, async (value) => {
  const clients = await clientStore.clientsPaginated(value)
  if (clients.isLeft()) {            
    ok.value = false
    message.value = clients.error
    seamless.value = true
  }
})
</script>

<style lang="scss" scoped>
.itinerary-header {
  width: 95%;
}

.itinerary-create {
  width: 250px;
}

.itinerary-points {
  width: 95%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.itinerary-option {
  width: 250px;
}

.invoice-number {
  width: 100px;
}

.invoice-list {
  overflow-y: scroll;
  height: 200px;
  display: flex;
  flex-direction: column;
}


@media screen and (min-width: $breakpoint-md-min) {
  .truck-form {
    width: 450px;
  }
}
</style>
