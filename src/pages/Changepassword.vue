<template>
  <div class="q-pa-md">
    <q-form>
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">
            Change Password
          </div>
        </q-card-section>

        <q-card-section>
          <q-form class="q-gutter-md">
            <q-input
              v-model="password1"
              type="password"
              :rules="passwordRules"
              label="Password"
              required
              filled
              lazy-rules
            />
            <q-input
              v-model="password2"
              type="password"
              :rules="passwordRules"
              label="Repeat the password"
              required
              filled
              lazy-rules
            />
          </q-form>
        </q-card-section>

        <q-card-section>
          <q-btn
            color="primary"
            @click.stop="dialog = true"
          >
            Change Password
          </q-btn>
        </q-card-section>
      </q-card>
    </q-form>

    <q-dialog v-model="dialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">
            Do you really want to change the password?
          </div>
        </q-card-section>

        <q-card-section>
          <q-btn
            color="primary"
            @click="changePassword"
          >
            Change Password
          </q-btn>
        </q-card-section>

        <q-card-section>
          <q-btn
            color="primary"
            @click.stop="dialog = false"
          >
            Cancel
          </q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    dialog: false,
    password1: '',
    password2: '',
    passwordRules: [v => !!v || 'Password is required', v => v.length >= 6 || 'Must be longer than 6 digits']
  }),
  methods: {
    changePassword () {
      const user = this.$firebase.auth().currentUser
      if (this.password1 === this.password2) {
        user
          .updatePassword(this.password1)
          .then(() => {
            this.$notificacao('Password updated successfully', 'green')
            this.dialog = false
          })
          .catch(() => {
            this.$notificacao('Error updating password', 'green')
          })
        this.password1 = ''
        this.password2 = ''
      } else {
        this.$notificacao('Passwords are different, they must be identical', 'red')
        this.dialog = false
      }
    }
  }
}
</script>
