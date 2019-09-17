<template>
  <div id="q-app" class="q-pa-md">
    <q-layout view="lHr lpR lFr">
      <q-header elevated>
        <q-toolbar class="bg-black text-white">
          <q-btn dense flat round icon="menu" @click="left = !left" />
          <q-toolbar-title>Personal Sticky Notes</q-toolbar-title>
          <q-btn flat round dense icon="vpn_key" class="q-mr-xs" v-if="user.uid == null" to="/login" />
          <q-btn flat round dense icon="exit_to_app" @click="logout()" v-if="user.uid != null" />
        </q-toolbar>
      </q-header>

      <q-drawer v-model="left" side="left" overlay bordered :width="250">
        <q-img class="absolute-top" src="statics/bg.jpg" style="height: 80px">
          <div class="absolute-bottom bg-transparent">
            <div class="text-weight-bold">{{ user.name }}</div>
            <div class="text-weight-bold">{{ user.email }}</div>

            <div v-if="user.uid == null">No User</div>
            <div class="text-weight-bold" v-if="user.email == null">none@email.com</div>
          </div>
        </q-img>
        <q-scroll-area
          style="height: calc(100% - 80px);
          margin-top: 80px; 
          border-right: 1px solid #ddd"
        >
          <q-list padding>
            <q-item clickable v-ripple to="stickynotes">
              <q-item-section avatar>
                <q-icon name="dashboard" />
              </q-item-section>
              <q-item-section>Home</q-item-section>
            </q-item>

            <q-item clickable v-ripple v-if="user.uid != null" to="changepassword">
              <q-item-section avatar>
                <q-icon name="vpn_key" />
              </q-item-section>
              <q-item-section>Change Password</q-item-section>
            </q-item>

            <q-item clickable v-ripple v-if="permissionAdmin" to="adminversion">
              <q-item-section avatar>
                <q-icon name="fas fa-cogs" />
              </q-item-section>
              <q-item-section>Version Software</q-item-section>
            </q-item>

            <q-item clickable v-ripple v-if="user.uid != null" to="settings">
              <q-item-section avatar>
                <q-icon name="fas fa-cogs" />
              </q-item-section>
              <q-item-section>Settings</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="about">
              <q-item-section avatar>
                <q-icon name="question_answer" />
              </q-item-section>
              <q-item-section>About</q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>

      <q-footer reveal elevated class="bg-grey-8 text-white">
        <q-toolbar>
          <q-toolbar-title style="font-size: 15px;">By João Medeiros - 2019 ({{ this.version }})</q-toolbar-title>
        </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
</template>

<script>
import mixinsCheckVersion from "./mixins/mixinsVersionCheck";
export default {
  mixins: [mixinsCheckVersion],
  name: "App",
  data() {
    return {
      left: false,
      drawer: null
    };
  },

  methods: {
    logout() {
      this.$firebase.auth().signOut();
      this.$q.cookies.remove("user");
      this.$store.dispatch("setUser");
    },
    init() {
      this.$store.dispatch("setUser");
    }
  },
  created() {
    this.init();
  }
};
</script>