<template>
  <div class="q-pa-md row items-start q-gutter-md centralDiv text-center">
    <q-form class="">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Login</div>
        </q-card-section>

        <q-card-section>
          <q-form class="q-gutter-md">
            <q-input filled v-model="userLocal.email" lazy-rules :rules="emailRules" type="Email" label="E-mail" required></q-input>
            <q-input filled type="Password" v-model="userLocal.password" label="Senha" lazy-rules required :rules="passwordRules" />
          </q-form>
        </q-card-section>

        <q-card-section>
          <q-btn color="primary" @click="login()">Login</q-btn>
        </q-card-section>

        <q-card-section>
          <q-btn color="primary" @click="(dialogUserRegister = true), resetForm()">Register</q-btn>
        </q-card-section>

        <q-card-section>
          <q-btn color="primary" @click="(dialogLostPassword = true), resetForm()">Lost Password</q-btn>
        </q-card-section>
      </q-card>
    </q-form>

    <q-dialog v-model="dialogUserRegister" transition-show="rotate" transition-hide="rotate">
      <q-card class="my-card text-center">
        <q-card-section>
          <div class="text-h6">Register new userLocal</div>
        </q-card-section>

        <q-card-section>
          <q-form class="q-gutter-md">
            <q-input filled v-model="userLocal.name" label="Enter your name" required></q-input>
            <q-input filled v-model="userLocal.email" lazy-rules :rules="emailRules" type="Email" label="E-mail" required></q-input>
            <q-input filled type="Password" v-model="userLocal.password" label="Senha" lazy-rules required :rules="passwordRules" />
          </q-form>
        </q-card-section>

        <q-card-section>
          <q-btn color="primary" @click="register()">Register</q-btn>
        </q-card-section>

        <q-card-section>
          <q-btn color="primary" @click.stop="dialogUserRegister = false">Back</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialogLostPassword" transition-show="rotate" transition-hide="rotate">
      <q-card class="my-card text-center">
        <q-card-section>
          <div class="text-h6">Recover your access</div>
        </q-card-section>

        <q-card-section>
          <q-form class="q-gutter-md">
            <q-input filled v-model="userLocal.email" lazy-rules :rules="emailRules" type="Email" label="Recovery Email" required></q-input>
          </q-form>
        </q-card-section>

        <q-card-section>
          <q-btn color="primary" @click="forgotPassword()">Recover Password</q-btn>
        </q-card-section>

        <q-card-section>
          <q-btn color="primary" @click.stop="dialogLostPassword = false">Back</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      valid: false,
      dialogLostPassword: false,
      dialogUserRegister: false,
      userLocal: {
        name: null,
        email: null,
        password: null
      },
      emailRules: [v => !!v || "Email is required", v => /.+@.+/.test(v) || "Email must be valid"],
      passwordRules: [v => !!v || "Password is required", v => v.length >= 6 || "Must be longer than 6 digits"]
    };
  },
  watch: {
    user: "init"
  },
  methods: {
    login() {
      this.$firebase
        .auth()
        .signInWithEmailAndPassword(this.userLocal.email, this.userLocal.password)
        .then(resp => {
          this.$q.cookies.set("user", resp.user);
          this.$router.replace("stickynotes");
          this.$db
            .collection("users")
            .doc(resp.user.uid)
            .get()
            .then(doc => {
              this.$store.dispatch("setUser", doc.data());
              this.$notify(`Welcome Back ${doc.data().name}`, "green");
            });
        })
        .catch(() => {
          this.$notify("Authentication issues, check email and password", "red");
        });
    },
    forgotPassword() {
      this.$firebase
        .auth()
        .sendPasswordResetEmail(this.userLocal.email)
        .then(() => {
          this.$notify("Recovery email sent successfully", "green");
        })
        .catch(() => {
          this.$notify("Error trying to retrieve email", "red");
        });
      this.dialogLostPassword = false;
    },
    register() {
      this.$firebase
        .auth()
        .createUserWithEmailAndPassword(this.userLocal.email, this.userLocal.password)
        .then(resp => {
          this.$notify("Registration successfully Complete", "green");
          const newUser = {
            uid: resp.user.uid,
            name: this.userLocal.name,
            email: this.userLocal.email
          };
          this.$db
            .collection("users")
            .doc(resp.user.uid)
            .set(newUser)
            .then(() => {
              this.$notify(`Welcome ${this.userLocal.name}`, "green");
              this.$router.replace("home");
            })
            .catch(err => {
              this.$notify("Error trying to register name, contact administrator", "red");
            });
        })
        .catch(() => {
          this.$notify("Error trying to register", "red");
        });
      this.dialogUserRegister = false;
    },
    resetForm() {
      this.userLocal = {
        name: null,
        email: null,
        password: null
      };
    },
    checkLogin() {
      if (this.user != null) {
        this.$router.replace("stickynotes");
      }
    }
  },
  created() {
    this.checkLogin();
  }
};
</script>
