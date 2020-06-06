export default {
  computed: {
    user () {
      if (this.$store.getters.getUser != null) {
        return this.$store.getters.getUser
      } else {
        return { uid: null, email: null, name: null }
      }
    },
    databaseSticky () {
      if (this.user.uid != null) {
        return this.$db
          .collection('app')
          .doc(this.user.uid)
          .collection('stickyNotes')
      } else {
        return null
      }
    },
    settingsColor () {
      if (this.$store.getters.getSettingsColor != null) {
        return this.$store.getters.getSettingsColor
      } else {
        return null
      }
    }
  }
}
