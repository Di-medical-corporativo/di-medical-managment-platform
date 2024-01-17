<template>
  <q-page class="flex column">
    <div class="itinerary-info">
      Itinerario
    </div>
    <div class="flex detail-section q-mt-xl">
      <div class="bg-white points-list shadow-1">    
        <q-card class="my-card" flat v-for="i in 20" :key="i">
          <q-item>
            <q-item-section avatar>
              <q-img src="https://storage.googleapis.com/di-medical-del-sur.appspot.com/uploads/test?GoogleAccessId=firebase-adminsdk-9vji9%40di-medical-del-sur.iam.gserviceaccount.com&Expires=16447017600&Signature=Nvd82X3xSb%2F5nojkg%2BW51%2FKkpAsVvFO5wsPyUjwtKeFYo%2B8sSZPaL1zNrZ%2BGlIueRA44Wq2HpRtNuQfgQl5FGL1XwZO2YpxrwNgYwrqVyRALvGvcvrsKVIBopKw6rW1gBpV0cT%2FRDjWsjhGCVkft1DArH7ry3ph2Wjb%2FZftNprzTd8hf11HmEtsioecuCXnVEmWb67dOjv0qcFx7ZgKmJg5MYdGWETuhQK%2BBKuiLblzKs1mX9Cl9XF%2Bw5H1SYlFfzeFjfTKZiuhZDnHncv8d%2BY7unh1GYQEcAc2BU6sPKjCXxBupqEyOGMjt95Y9OPyCLs8UlPFyUcy8lIh9X%2BtxDQ%3D%3D"></q-img>
            </q-item-section>
    
            <q-item-section>
              <q-item-label>Title</q-item-label>
              <q-item-label caption>
                Subhead
              </q-item-label>
            </q-item-section>
            <q-chip :icon="true ? 'done' : 'local_shipping'" :color="true ? 'secondary' : 'grey'" text-color="white"  size="sm">En ruta</q-chip>
          </q-item>
          <q-item>
            8 facturas por entregar.
          </q-item>
        </q-card>
      </div>

      <div class="detail-point">
        <div class="row justify-between">
          <div class="info-point bg-white shadow-1 column">
            <q-item clickables>
              <q-item-section avatar>
                <q-icon :name="true ? 'done' : 'local_shipping'" :color="true ? 'secondary' : 'grey'" text-color="white"  size="sm"></q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label>Estatus</q-item-label>
                <q-item-label caption>En ruta</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="info-point bg-white shadow-1 column">
            <q-item clickables>
              <q-item-section avatar>
                <q-avatar square color="secondary" text-color="white" icon="contacts" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Cliente</q-item-label>
                <q-item-label caption>Nombre del cliente</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="info-point bg-white shadow-1 column">
            <q-item clickables>
              <q-item-section avatar>
                <q-img src="https://storage.googleapis.com/di-medical-del-sur.appspot.com/uploads/test?GoogleAccessId=firebase-adminsdk-9vji9%40di-medical-del-sur.iam.gserviceaccount.com&Expires=16447017600&Signature=Nvd82X3xSb%2F5nojkg%2BW51%2FKkpAsVvFO5wsPyUjwtKeFYo%2B8sSZPaL1zNrZ%2BGlIueRA44Wq2HpRtNuQfgQl5FGL1XwZO2YpxrwNgYwrqVyRALvGvcvrsKVIBopKw6rW1gBpV0cT%2FRDjWsjhGCVkft1DArH7ry3ph2Wjb%2FZftNprzTd8hf11HmEtsioecuCXnVEmWb67dOjv0qcFx7ZgKmJg5MYdGWETuhQK%2BBKuiLblzKs1mX9Cl9XF%2Bw5H1SYlFfzeFjfTKZiuhZDnHncv8d%2BY7unh1GYQEcAc2BU6sPKjCXxBupqEyOGMjt95Y9OPyCLs8UlPFyUcy8lIh9X%2BtxDQ%3D%3D"></q-img>
              </q-item-section>
              <q-item-section>
                <q-item-label>Conductor</q-item-label>
                <q-item-label caption>Kevin Aron Tapia Cruz</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="info-point bg-white shadow-1 column">
            <q-item clickables>
              <q-item-section avatar>
                <q-img src="https://storage.googleapis.com/di-medical-del-sur.appspot.com/uploads/test?GoogleAccessId=firebase-adminsdk-9vji9%40di-medical-del-sur.iam.gserviceaccount.com&Expires=16447017600&Signature=Nvd82X3xSb%2F5nojkg%2BW51%2FKkpAsVvFO5wsPyUjwtKeFYo%2B8sSZPaL1zNrZ%2BGlIueRA44Wq2HpRtNuQfgQl5FGL1XwZO2YpxrwNgYwrqVyRALvGvcvrsKVIBopKw6rW1gBpV0cT%2FRDjWsjhGCVkft1DArH7ry3ph2Wjb%2FZftNprzTd8hf11HmEtsioecuCXnVEmWb67dOjv0qcFx7ZgKmJg5MYdGWETuhQK%2BBKuiLblzKs1mX9Cl9XF%2Bw5H1SYlFfzeFjfTKZiuhZDnHncv8d%2BY7unh1GYQEcAc2BU6sPKjCXxBupqEyOGMjt95Y9OPyCLs8UlPFyUcy8lIh9X%2BtxDQ%3D%3D"></q-img>
              </q-item-section>
              <q-item-section>
                <q-item-label>Camioneta</q-item-label>
                <q-item-label caption>14365A</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </div>
        <div class="row q-mt-lg justify-between">
          <div class="detail-point-map bg-white shadow-1"></div>
          <div class="detail-point-invoices bg-white shadow-1"></div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>

.my-card {
  width: 95%;
  height: 200px;
  border-bottom: 1px solid #b8b9b9;
  border-radius: 0px;
  cursor: pointer;
}


.detail-section {
  gap: 30px;
  justify-content: center;
}

.info-point {
  width: 240px;
}

.detail-point {
  &-map {
    width: 70%;
    height: 450px;
  }

  &-invoices{
    width: 25%;
    height: 450px;
  }
}

.points {
  &-list {
    width: 350px;
    height: 80vh;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
}

.detail-point {
  width: 55%;
  height: 80vh;
}
</style>
