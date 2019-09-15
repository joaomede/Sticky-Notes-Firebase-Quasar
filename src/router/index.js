import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import firebase from "firebase";

Vue.use(VueRouter)

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,
    mode: 'history',
    base: process.env.VUE_ROUTER_BASE
  })
  Router.beforeEach((to, from, next) => {
    const auth = to.matched.some(record => record.meta.requerAuth);
  
    if (auth) {
      firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
          next({
            path: '/home'
          })
        } else {
          next()
        }
      });
    } else {
      next()
    }
  });


  return Router
}
