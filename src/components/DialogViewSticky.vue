<template>
  <q-dialog v-model="dialogComponent">
    <q-card>
      <q-card-section>
        <div class="text-h6">
          Content:
        </div>
      </q-card-section>

      <q-card-section>
        {{ notes.content }}
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          flat
          label="Delete"
          color="primary"
          @click="eventDelete()"
        />
        <q-btn
          flat
          label="Edit"
          color="primary"
          @click="eventEdit()"
        />
        <q-btn
          flat
          label="OK"
          color="primary"
          @click="dialogComponent = false"
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
      notes: {}
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
    eventEdit () {
      this.$emit('eventEdit')
    },
    eventDelete () {
      this.$emit('eventDelete')
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
