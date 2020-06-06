/* eslint-disable no-undef */
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { Cookies } from 'quasar'

Vue.use(VueRouter)

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,
    mode: 'history',
    base: process.env.VUE_ROUTER_BASE
  })
  Router.beforeEach((to, from, next) => {
    const auth = to.matched.some(record => record.meta.requerAuth)

    const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies // otherwise we're on client

    const user = cookies.get('user')

    if (auth) {
      if (user != null) {
        if (user.uid != null) {
          next()
        } else {
          next({
            path: '/login'
          })
        }
      } else {
        next({
          path: '/login'
        })
      }
    } else {
      next()
    }
  })

  return Router
}
