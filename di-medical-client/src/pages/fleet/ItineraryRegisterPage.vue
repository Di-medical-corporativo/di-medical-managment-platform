<template>
  <q-page class="column items-center q-mt-md">
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
        <q-select label="Sucursal" class="itinerary-option" />
      </div>
      <div>
        <q-btn color="primary" label="Crear itineario" class="itinerary-create " no-caps />
      </div>
    </div>

    <div class="q-mt-xl itinerary-points">
      <q-card class="my-card ">
        <q-card-section class="column">
          <q-select label="Operador" />
          <q-select label="Camioneta" />
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

            <div class="row q-mt-sm" v-for="i in invoices">
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
          <q-btn color="primary" class="" no-caps label="Confirmar punto de entrega"></q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { TruckFacade } from 'src/api/TruckFacade';
import { Truck } from 'src/entities/Truck';
import { ref } from 'vue'
import { UUID } from 'src/helpers/uuid'

const invoice = ref({
  invoiceNumber: '',
  invoiceComment: '',
})

const invoices = ref<{ invoiceNumber: string, invoiceComment: string, id: string }[]>([])
const updateInvoiceNumberValue = ref('')
const updateInvoiceCommentValue = ref('')

const addInvoice = () => {
  if (invoice.value.invoiceNumber == null) return
  invoices.value.push({ 
    invoiceNumber: invoice.value.invoiceNumber, 
    invoiceComment: invoice.value.invoiceComment, 
    id: UUID.generate() 
  })
  invoice.value.invoiceComment = ''
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
  updateInvoiceCommentValue.value = ''
}

const updateInvoiceNumber = (id: string) => {
  const invoiceToUpdate = invoices.value.filter(invoice => invoice.id === id)
  if(updateInvoiceNumberValue.value.length == 0) return
  invoiceToUpdate[0].invoiceNumber = updateInvoiceNumberValue.value
  updateInvoiceNumberValue.value = ''
}

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
