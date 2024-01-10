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
    },
    list: {
      route: 'list',
      name: 'sucursal-list'
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
    },
    list: {
      route: 'list',
      name: 'client-list'
    }
  },
  fleet: {
    route: 'fleet',
    default: {
      route: '',
      name: 'fleet'
    },
    register: {
      route: 'register',
      name: 'truck-register'
    },
    list: {
      route: 'list',
      name: 'truck-list'
    },
    itinerary: {
      route: 'itinerary',
      name: 'itinerary-register'
    },
    itineraryHistory: {
      route: 'history',
      name: 'itinerary-history'
    }
  },
  survey: {
    route: 'survey',
    default: {
      route: '',
      name: 'survey'
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
export const sucursalListLabel = 'Listado de sucursales'

export const sucursalModule: PlatformModule = {
  label: sucursalModuleLabel,
  children: [
    {
      label: registerSucursalLabel
    },
    {
      label: sucursalListLabel
    }
  ]
}

export const clientsModuleLabel = 'Clientes'
export const registerClientLabel = 'Registrar cliente'
export const clientListLabel = 'Listado de clientes'
export const clientsModule: PlatformModule = {
  label: clientsModuleLabel,
  children: [
    {
      label: registerClientLabel
    },
    {
      label: clientListLabel
    }
  ]
}

export const fleetModuleLabel = 'Flota'
export const registerItineraryModuleLabel = 'Registrar itinerario'
export const registerTruckModuleLabel = 'Registrar camioneta'
export const truckListModuleLabel = 'Listado de camionetas'
export const historyItineraryLabel = 'Historial de itinerarios'
export const fleetModule: PlatformModule = {
  label: fleetModuleLabel,
  children: [
    {
      label: registerItineraryModuleLabel
    },
    {
      label: registerTruckModuleLabel
    },
    {
      label: truckListModuleLabel
    },
    {
      label: historyItineraryLabel
    }
  ]
}

export const surveyModuleLabel = 'Encuestas'
export const surveyModule: PlatformModule = {
  label: surveyModuleLabel
}

export const modules: PlatformModule[] = [
  usersModule,
  sucursalModule,
  clientsModule,
  fleetModule,
  surveyModule
]
