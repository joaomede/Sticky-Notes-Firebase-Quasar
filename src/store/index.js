import Vue from "vue";
import Vuex from "vuex";
import { db } from "../boot/firebase";
import { Cookies } from "quasar";
import firebase from 'firebase'
Vue.use(Vuex);

export default function ({ ssrContext }) {
  const Store = new Vuex.Store({
    state: {
      user: null
    },
    getters: {
      getUser: state => {
        return state.user;
      }
    },
    mutations: {
      setUser(state) {
        const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies; // otherwise we're on client
        const user = cookies.get("user");

        if (user != null) {
          db.collection("users")
            .where("uid", "==", user.uid)
            .onSnapshot(querySnapshot => {
              querySnapshot.forEach(doc => {
                state.user = {
                  uid: user.uid,
                  email: user.email,
                  name: doc.data().name,
                };
              });
            });
        } else {
          state.user = {
            uid: null,
            email: null,
            name: null,
          };
        }
      }
    },
    actions: {
      setUser({ commit }) {
        commit("setUser");
      },
    }
  });
  return Store;
}
