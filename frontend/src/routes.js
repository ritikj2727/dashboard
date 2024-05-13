import React from 'react'
import Users from './views/users/Users'
import CreateUser from './views/users/CreateUser'
import Page404 from './views/pages/page404/Page404'

// import Production from '

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

//Forms
const Production = React.lazy(() => import('./views/forms/production/Production'))

export const routes = [
  { path: '*', name: '404' ,element:Page404},
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  // { path: '/users', name: 'Users', element: Users },
  // { path: '/users/createuser', name: 'Create Users', element: CreateUser},
  { path: '/forms', name: 'Forms', element: Production, exact: true },
  { path: '/forms/production', name: 'Production', element: Production },
  // { path: '/forms/select', name: 'Select', element: Select },
]

export const userRoutes = [
  { path: '/users', name: 'Users', element: Users },
  { path: '/users/createuser', name: 'Create Users', element: CreateUser },
]
