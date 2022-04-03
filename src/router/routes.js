
import store from '../store' // your vuex

const ifNotAuthenticated = (to, from, next) => {
  if (!store().getters['auth/isAuthenticated']) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store().getters['auth/isAuthenticated']) {
    next()
    return
  }
  next('/auth/login')
}

const routes = [
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: 'register', component: () => import('pages/Register.vue'), beforeEnter: ifNotAuthenticated },
      { path: 'login', component: () => import('pages/Login.vue'), beforeEnter: ifNotAuthenticated }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'child/:child_id/classes/', component: () => import('src/pages/Classes.vue'), beforeEnter: ifAuthenticated, name: 'classes' },
      { path: '/', component: () => import('src/pages/Children.vue'), beforeEnter: ifAuthenticated },
      { path: '/profile', component: () => import('src/pages/Profile.vue'), beforeEnter: ifAuthenticated }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
