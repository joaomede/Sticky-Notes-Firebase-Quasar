<template>
  <q-dialog v-model="dialogComponent">
    <q-card>
      <q-card-section>
        <div class="text-h6">
          {{ title }}
        </div>
      </q-card-section>
      <q-input
        v-model="stickNotes.content"
        filled
        square
        hint="Content Here!"
      />
      <q-card-actions align="center">
        <q-btn
          flat
          label="Back"
          color="primary"
          @click="dialogComponent = true"
        />
        <q-btn
          label="Add"
          color="green"
          @click="createNewStickyNote(stickNotes)"
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
    }
  },
  data () {
    return {
      title: 'Create a new sticky note',
      stickNotes: {
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
        this.stickNotes = Object.assign({}, this.stickNotes, this.emptyStickNotes())
      }
    }
  },
  methods: {
    eventClose () {
      this.$emit('eventClose')
    },
    emptyStickNotes () {
      return {
        idStickyNotes: '',
        content: '',
        createdAt: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
