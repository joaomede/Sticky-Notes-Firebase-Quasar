<template>
  <div class="centralDiv">
    <q-btn
      round
      color="orange darken-2"
      class="fixed fabLeft"
      @click.stop="$router.go(-1)"
    >
      <q-icon name="fas fa-arrow-left" />
    </q-btn>

    <q-btn
      round
      color="orange darken-2"
      class="fixed fabCenter"
      @click.stop="dialogCreateNewSticky = true"
    >
      <q-icon name="add" />
    </q-btn>

    <ListCardSticky
      @eventClick="showSticky"
    />

    <DialogCreateNewSticky
      :dialog="dialogCreateNewSticky"
      @eventClose="dialogCreateNewSticky = false"
    />

    <DialogViewSticky
      :dialog="dialogView"
      :stick-notes="stickNotes"
      @eventClose="dialogView = false"
      @eventDelete="dialogDeleteStickyNote = true"
      @eventEdit="dialogEditSticky = true"
    />

    <DialogEditSticky
      :dialog="dialogEditSticky"
      :stick-notes="stickNotes"
      @eventClose="
        dialogEditSticky = false
      "
      @eventSave="
        dialogView = false;
        dialogEditSticky = false
      "
    />

    <DialogConfirmRemove
      :dialog="dialogDeleteStickyNote"
      :stick-notes="stickNotes"
      @eventClose="dialogDeleteStickyNote = false"
      @eventDelete="
        dialogDeleteStickyNote = false
        dialogView = false
      "
    />
  </div>
</template>

<script>
import DialogCreateNewSticky from '../components/DialogCreateSticky'
import DialogViewSticky from '../components/DialogViewSticky'
import DialogEditSticky from '../components/DialogEditSticky'
import DialogConfirmRemove from '../components/DialogConfirmRemove'
import ListCardSticky from '../components/ListCardSticky'

export default {
  components: {
    DialogCreateNewSticky,
    DialogViewSticky,
    DialogEditSticky,
    DialogConfirmRemove,
    ListCardSticky
  },
  data () {
    return {
      stickNotes: {
        idStickyNotes: '',
        content: '',
        createdAt: ''
      },
      dialogView: false,
      dialogDeleteStickyNote: false,
      dialogCreateNewSticky: false,
      dialogEditSticky: false
    }
  },
  methods: {
    showSticky (item) {
      this.stickNotes = item
      this.dialogView = true
    }
  }
}
</script>
