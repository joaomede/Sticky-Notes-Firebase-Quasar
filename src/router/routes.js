const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Login')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../pages/About')
  },
  {
    path: '/changepassword',
    name: 'Changepassword',
    component: () => import('../pages/Changepassword'),
    meta: { requerAuth: true }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../pages/Settings'),
    meta: { requerAuth: true }
  },
  {
    path: '/stickynotes',
    name: 'Stickynotes',
    component: () => import('../pages/Stickynotes'),
    meta: { requerAuth: true }
  }
]

if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    redirect: '/login'
  })
}

export default routes
