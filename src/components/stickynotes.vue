<template>
  <div class="centralDiv">
    <q-btn round color="orange darken-2" @click.stop="$router.go(-1)" class="fixed fabLeft">
      <q-icon name="fas fa-arrow-left" />
    </q-btn>

    <q-btn round color="orange darken-2" @click.stop="(dialogCreateNewSticky = true), resetForm()" class="fixed fabCenter">
      <q-icon name="add" />
    </q-btn>
    <div class="text-h4">
      Your Sticky Notes!
    </div>
    <q-card class="my-card text-center text-white">
      <q-card class="my-card q-gutter-xs row " :style="{'justify-content': 'center'}">
        <div v-for="item in listStickyNotes" :key="item.idStickyNotes" @click="showSticky(item)">
          <q-card-actions class="text-center col-xs-auto" :style="{ border: 'solid', 'justify-content': 'center', backgroundColor: settingsColor.backgroundColor, 'max-width': '150px', 'height': 'auto' }">
            <div class="text-h6 text-center" :style="{ color: settingsColor.textColor }">{{ item.content }}</div>
          </q-card-actions>
        </div>
      </q-card>
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
          <q-btn flat label="Edit" color="primary" @click="dialogEditSticky = true" />
          <q-btn flat label="OK" color="primary" @click="dialogView = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialogCreateNewSticky">
      <q-card>
        <q-card-section>
          <div class="text-h6">Create a new sticky note</div>
        </q-card-section>
        <q-input filled square v-model="stickNotes.content" hint="Content Here!" />
        <q-card-actions align="right">
          <q-btn flat label="Back" color="primary" @click="dialogCreateNewSticky = false" />
          <q-btn label="Add" color="green" @click="createNewStickyNote()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialogEditSticky">
      <q-card>
        <q-card-section>
          <div class="text-h6">Edit a sticky note</div>
        </q-card-section>
        <q-input filled square v-model="stickNotes.content" hint="Edit content here!" />
        <q-card-actions align="right">
          <q-btn flat label="Back" color="primary" @click="dialogEditSticky = false" />
          <q-btn label="Save" color="green" @click="editStickyNote()" />
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
      dialogDeleteStickyNote: false,
      dialogCreateNewSticky: false,
      dialogEditSticky: false
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
    showSticky(item) {
      this.stickNotes = item;
      this.dialogView = true;
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
      this.dialogCreateNewSticky = false;
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
      this.dialogEditSticky = false;
      this.dialogView = false;
    },
    resetForm() {
      this.stickNotes = {
        idStickyNotes: "",
        content: "",
        createdAt: ""
      };
    }
  },
  created() {
    this.init();
  }
};
</script>