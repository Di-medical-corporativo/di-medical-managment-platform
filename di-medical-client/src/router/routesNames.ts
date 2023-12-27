export const RoutesPath = {
  login: {
    route: '/login',
    name: 'login'
  },
  backoffice: {
    route: '/backoffice',
    profile: {
      route: '',
      name: 'profile'
    }
  },
  users: {
    route: 'users',
    default: {
      route: '',
      name: 'users'
    },
    registrer: {
      route: 'register',
      name: 'user-register'
    },
    list: {
      route: 'list',
      name: 'user-list'
    }
  },
  sucursal: {
    route: 'sucursal',
    default: {
      route: '',
      name: 'sucursal'
    },
    registrer: {
      route: 'register',
      name: 'sucursal-register'
    }
  },
  clients: {
    route: 'clients',
    default: {
      route: '',
      name: 'clients'
    },
    register: {
      route: 'register',
      name: 'client-register'
    }
  }
}

interface PlatformModule {
  label: string
  children?: PlatformModule[]
}


export const userModuleLabel = 'Usuarios'
export const registrerUserLabel = 'Registrar usuario'
export const userListLabel = 'Listado de usuarios'

export const usersModule: PlatformModule = {
  label: userModuleLabel,
  children: [
    {
      label: registrerUserLabel
    },
    {
      label: userListLabel
    }
  ]
}

export const sucursalModuleLabel = 'Sucursales'
export const registerSucursalLabel = 'Registrar sucursal'

export const sucursalModule: PlatformModule = {
  label: sucursalModuleLabel,
  children: [
    {
      label: registerSucursalLabel
    }
  ]
}

export const clientsModuleLabel = 'Clientes'
export const registerClientLabel = 'Registrar cliente'
export const clientsModule: PlatformModule = {
  label: clientsModuleLabel,
  children: [
    {
      label: registerClientLabel
    }
  ]
}

export const modules: PlatformModule[] = [
  usersModule,
  sucursalModule,
  clientsModule
]
