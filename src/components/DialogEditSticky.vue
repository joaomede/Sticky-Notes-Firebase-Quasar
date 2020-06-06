<template>
  <q-dialog v-model="dialogComponent">
    <q-card>
      <q-card-section>
        <div class="text-h6">
          {{ title }}
        </div>
      </q-card-section>
      <q-input
        v-model="notes.content"
        filled
        square
        hint="Edit content here!"
      />
      <q-card-actions align="center">
        <q-btn
          flat
          label="Back"
          color="primary"
          @click="dialogComponent = false"
        />
        <q-btn
          label="Save"
          color="green"
          @click="editStickyNote(notes)"
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
      title: 'Edit a sticky note',
      notes: {
        idStickyNotes: '',
        content: '',
        createdAt: ''
      }
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
    }
  },
  watch: {
    dialog () {
      if (this.dialog) {
        this.notes = Object.assign({}, this.notes, this.stickNotes)
      }
    }
  },
  methods: {
    eventClose () {
      this.$emit('eventClose')
    },
    eventSave () {
      this.$emit('eventSave')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
