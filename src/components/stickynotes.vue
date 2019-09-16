<template>
  <div class="centralDiv">
    <q-btn round color="orange darken-2" @click.stop="$router.go(-1)" class="fixed fabLeft">
      <q-icon name="fas fa-arrow-left" />
    </q-btn>

    <q-btn round color="orange darken-2" @click.stop="" class="fixed fabCenter">
      <q-icon name="add" />
    </q-btn>

    <q-card class="my-card">
      <q-card-section v-for="item in listStickyNotes" :key="item.idStickyNotes">
        <q-btn :label="item.content" outline color="purple" @click="(this.stickNotes = item), (this.dialogView = true)" />
      </q-card-section>
    </q-card>

    <q-dialog v-model="dialogView">
      <q-card>
        <q-card-section>
          <div class="text-h6">Content:</div>
        </q-card-section>

        <q-card-section>
          {{ this.stickNotes.content }}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Delete" color="primary" @click="dialogDeleteStickyNote = true" />
          <q-btn flat label="Edit" color="primary" @click="dialogView = false" />
          <q-btn flat label="OK" color="primary" @click="dialogView = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialogDeleteStickyNote">
      <q-card>
        <q-card-section>
          <div class="text-h6">Do you really want to delete the Sticky Note?</div>
        </q-card-section>

        <q-card-section> "{{ this.stickNotes.content }}" </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Ok" color="primary" @click="deleteStickyNote()" />
          <q-btn flat label="Cancel" color="primary" @click="dialogDeleteStickyNote = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listStickyNotes: [],

      stickNotes: {
        idStickyNotes: "",
        content: "",
        createdAt: ""
      },
      dialogView: false,
      dialogDeleteStickyNote: false
    };
  },
  watch: {
    user: "init"
  },
  methods: {
    init() {
      if (this.user.uid != null) {
        this.loadingAllStickyNotes();
      }
    },
    loadingAllStickyNotes() {
      this.databaseSticky.orderBy("createdAt", "asc").onSnapshot(querySnapshot => {
          this.listStickyNotes = [];
          querySnapshot.forEach(doc => {
            this.listStickyNotes.push(doc.data());
          });
        });
    },
    createNewStickyNote() {
      this.databaseSticky
        .add(this.stickNotes)
        .then(ref => {
          const update = {
            createdAt: this.$timestamp,
            idStickyNotes: ref.id
          };
          ref.update(update);
          this.$notify("Note successfully created", "green");
        })
        .catch(() => {
          this.$notify("Failed to record new note", "red");
        });
    },
    deleteStickyNote() {
      this.databaseSticky
        .doc(this.stickNotes.idStickyNotes)
        .delete()
        .then(() => {
          this.$notify("Sticky note successfully deleted", "green");
        })
        .catch(() => {
          this.$notify("Error trying to clear sticky note", "red");
        });
      this.dialogView = false;
      this.dialogDeleteStickyNote = false;
    },
    editStickyNote() {
      this.databaseSticky
        .doc(this.stickNotes.idStickyNotes)
        .update(this.stickNotes)
        .then(() => {
          this.$notify("Successfully updated sticky notes", "green");
        })
        .catch(() => {
          this.$notify("Error trying to update Sticky notes", "green");
        });
    }
  },
  created() {
    this.init();
  }
};
</script>