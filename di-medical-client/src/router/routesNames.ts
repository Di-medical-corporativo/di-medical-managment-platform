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
      route: 'registrer',
      name: 'user-registrer'
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
      route: 'registrer',
      name: 'sucursal-registrer'
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

export const modules: PlatformModule[] = [
  usersModule,
  sucursalModule
]
