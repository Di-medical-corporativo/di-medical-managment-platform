<template>
  <div class="q-ma-md">
    <q-stepper v-model="step" ref="stepper" animated>
      <q-step :name="1" title="Información del usuario" icon="badge" :done="step > 1">
        <p class="q-mb-xl text-h5">Datos del usuario</p>
        <div class="user-forms justify-evenly">
          <q-form class="sucursal-form">
            <q-input color="primary" label="Nombre" v-model="user.firstName" :rules="[val => !!val || 'Field is required']">
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
            <q-input color="primary" label="Apellido" class="q-mt-xl" v-model="user.lastName" :rules="[val => !!val || 'Field is required']">
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
            <q-input color="primary" label="Puesto de trabajo" class="q-mt-xl" v-model="user.job" :rules="[val => !!val || 'Field is required']">
              <template v-slot:prepend>
                <q-icon name="work" />
              </template>
            </q-input>
            <q-input color="primary" label="NSS" class="q-mt-xl" v-model="user.nss" :rules="[val => !!val || 'Field is required']">
              <template v-slot:prepend>
                <q-icon name="badge" />
              </template>
            </q-input>
            <q-input 
              color="primary" label="Numbero de teléfono" class="q-mt-xl" mask="(+##) ##########" unmasked-value
              hint="Ejemplo: (+52) 5525179478" v-model="user.phone" :rules="[val => !!val || 'Field is required']">
              <template v-slot:prepend>
                <q-icon name="phone" />
              </template>
            </q-input>
            <q-input color="primary" type="date" label="Fecha de nacimiento" class="q-mt-xl" v-model="user.date">
              <template v-slot:prepend>
                <q-icon name="calendar_today" />
              </template>
            </q-input>
            <q-file class="q-mt-xl" label="Foto" v-model="user.photo">
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </q-form>
        </div>
      </q-step>

      <q-step :name="2" title="Modulos" icon="badge" :done="step > 2">
        <p class="q-mb-xl text-h5">Roles del usuario</p>
        <q-option-group v-model="selectionRoles" type="checkbox" :options="optionRole" class="row">
          <template v-slot:label="opt">
            <q-card class="my-card q-mt-md">
              <q-card-section>
                {{ opt.label }}
              </q-card-section>
              <q-separator inset />
              <q-card-section>
                <small>{{ opt.value.description }}</small>
              </q-card-section>
            </q-card>
          </template>
        </q-option-group>
      </q-step>

      <q-step :name="3" title="Sucursal" icon="view_module" :done="step > 3">
        <p class="q-mb-xl text-h5">Sucursal del usuario</p>
        <q-option-group v-model="selectionBranch" :options="optionBranch" class="row">
          <template v-slot:label="opt">
            <q-card class="my-card q-mt-md">
              <q-card-section>
                {{ opt.label }}
              </q-card-section>
            </q-card>
          </template>
        </q-option-group>
      </q-step>

      <q-step :name="4" title="Credenciales" icon="badge" :done="step > 4">
        <p class="q-mb-xl text-h5">Credenciales del usuario</p>
        <div class="user-forms justify-evenly">
          <q-form class="sucursal-form">
            <q-input color="primary" label="Correo" v-model="user.email">
              <template v-slot:prepend>
                <q-icon name="mail" />
              </template>
            </q-input>
            <q-input color="primary" label="Contraseña" class="q-mt-xl" v-model="user.password" :rules="[val => val.length > 8 || 'Debe ser de al menos 8 caracteres']">
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>
            <q-input color="primary" label="Confirmar contraseña" class="q-mt-xl" v-model="user.passwordConfirm" :rules="[val => val === user.password || 'Debe ser la misma contraseña']">
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>
          </q-form>
        </div>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn v-if="step < 4" @click="next()" color="primary" label="Siguiente" />
          <q-btn v-if="step === 4" @click="registerUser()" color="primary" label="Registrar usuario"></q-btn>
          <q-btn v-if="step > 1" flat color="secondary" @click="previous()" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </template>
    </q-stepper>

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
import { QStepper } from 'quasar'
import { ref } from 'vue'
import { useRoleStore } from 'src/stores/role-store'
import { useBranchStore } from 'src/stores/sucursal-store'
import { User } from 'src/entities/User'
import { ApiFacade } from 'src/api/ApiFacade'

const roleStore = useRoleStore()
const branchStore = useBranchStore()

const apiFacade = new ApiFacade()
const seamless = ref(false)
const ok = ref(false)
const message = ref('')
const step = ref(1)
const stepper = ref<QStepper>()
const selectionRoles = ref([])
const selectionBranch = ref(null)
const optionRole = ref()
const optionBranch = ref()
const user = ref({
  firstName: null,
  lastName: null,
  job: null,
  nss: null,
  phone: null,
  date: null,
  photo: null,
  email: null,
  password: null,
  passwordConfirm: null
})

const fillOptions = () => {
  optionRole.value = roleStore.getRoles.map((role) => ({ value: role, label: role.name, color: 'secondary' }))
  optionBranch.value = branchStore.getBranches.map((branch) => ({ value: branch, label: branch.name, color: 'secondary' }))  
}

const cleanForm = () => {
  user.value.date = null
  user.value.email = null
  user.value.firstName = null
  user.value.job = null
  user.value.nss = null
  user.value.phone = null
  user.value.password = null
  user.value.passwordConfirm = null
  user.value.lastName = null
  user.value.photo = null
  selectionBranch.value = null
  selectionRoles.value = []
}

const next = () => {
  stepper.value?.next()
}

const previous = () => {
  stepper.value?.previous()
}

const registerUser = async () => {
  if (
    user.value.date === null ||
    user.value.email === null ||
    user.value.firstName === null ||
    user.value.job === null ||
    user.value.nss === null ||
    user.value.phone === null ||
    user.value.password === null ||
    user.value.passwordConfirm === null ||
    user.value.lastName === null ||
    user.value.photo === null ||
    selectionBranch.value === null ||
    selectionRoles.value.length === 0
  ) {
    message.value = 'Debes proporcionar todos los datos'
    ok.value = false
    seamless.value = true
    cleanForm()
    return
  }

  const userToCreate = new User(
    undefined,
    user.value.firstName,
    user.value.lastName,
    new Date(user.value.date),
    user.value.nss,
    user.value.job,
    user.value.photo,
    user.value.phone,
    user.value.email,
    true,
    new Date(),
    new Date()
  )
  userToCreate.roles = selectionRoles.value
  userToCreate.sucursal = selectionBranch.value
  userToCreate.password = user.value.password
  console.log(userToCreate.birthDate);
  
  const userCreated = await apiFacade.registerUser(userToCreate)

  if(userCreated.isLeft()) {
    message.value = 'Ocurrio un error al crear el usuario, intentelo de nuevo'
    ok.value = false
    seamless.value = true
    cleanForm()
    step.value = 1
    return
  }
  
  message.value = 'Se ha registrado el usuario'
  ok.value = true
  seamless.value = true
  cleanForm()
  step.value = 1
}

fillOptions()

</script>

<style lang="scss" scoped>
.user-forms {
  width: 100%;
  display: flex;
  flex-direction: column;
}


@media screen and (min-width: $breakpoint-lg-min) {
  .sucursal-form {
    width: 650px;
    margin-top: 0px;
  }

  .user-step {
    display: flex;
    align-items: center;
  }

  .user-forms {
    flex-direction: row;
  }

}
</style>
