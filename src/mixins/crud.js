export default {
  methods: {
    async createNewStickyNote (stickNotes) {
      try {
        this.eventClose()
        const ref = await this.databaseSticky.add(stickNotes)
        const update = {
          createdAt: this.$timestamp,
          idStickyNotes: ref.id
        }
        ref.update(update)
        this.$notify('Note successfully created', 'green')
        this.eventClose()
      } catch (error) {
        this.$notify('Failed to record new note', 'red')
        this.eventClose()
      }
    },
    async editStickyNote (stickNotes) {
      try {
        this.eventSave()
        await this.databaseSticky
          .doc(stickNotes.idStickyNotes)
          .update(stickNotes)
        this.$notify('Successfully updated sticky notes', 'green')
      } catch (error) {
        this.$notify('Error trying to update Sticky notes', 'green')
        this.eventSave()
      }
    },
    async deleteStickyNote (stickNotes) {
      try {
        this.eventDelete()
        await this.databaseSticky
          .doc(stickNotes.idStickyNotes)
          .delete()
        this.$notify('Sticky note successfully deleted', 'green')
      } catch (error) {
        this.eventDelete()
        this.$notify('Error trying to clear sticky note', 'red')
      }
    }
  }
}
