export const RoutesPath = {
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
  }
}

export const registrerUserLabel = 'Registrar usuario'
export const userModuleLabel = 'Usuarios'
export const userListLabel = 'Listado de usuarios'

export const usersModule = {
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
