<template>
  <q-dialog v-model="dialogComponent">
    <q-card class="text-center">
      <q-card-section>
        <div class="text-h6">
          {{ title }}
        </div>
      </q-card-section>

      <q-card-section> "{{ notes.content }}" </q-card-section>

      <q-card-actions align="center">
        <q-btn
          flat
          label="Cancel"
          color="primary"
          @click="dialogComponent = false"
        />
        <q-btn
          flat
          label="Ok"
          color="primary"
          @click="deleteStickyNote(notes)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean
    },
    stickNotes: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      title: 'Do you really want to delete the Sticky Note?'
    }
  },
  computed: {
    dialogComponent: {
      get: function () {
        return this.dialog
      },
      set: function (newValue) {
        this.eventClose()
      }
    },
    notes () {
      return this.stickNotes
    }
  },
  methods: {
    eventClose () {
      this.$emit('eventClose')
    },
    eventDelete () {
      this.$emit('eventDelete')
    }

  }
}
</script>

<style lang="scss" scoped>

</style>
