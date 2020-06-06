<template>
  <div class="centralDiv">
    <div class="text-h4">
      {{ title }}
    </div>
    <q-card
      class="my-card text-center text-white"
    >
      <q-card
        v-for="item in listStickyNotes"
        :key="item.idStickyNotes"
        class="my-card q-gutter-xs row "
        style="justify-content': 'center"
        @click="$emit('eventClick', item)"
      >
        <q-card-actions
          class="text-center col-xs-auto"
          :style="styleStickyNoteCard"
        >
          <div
            class="text-h6 text-center"
            :style="{ color: settingsColor.textColor }"
          >
            {{ item.content }}
          </div>
        </q-card-actions>
      </q-card>
    </q-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'Your Sticky Notes!',
      listStickyNotes: []
    }
  },
  computed: {
    styleStickyNoteCard () {
      return {
        border: 'solid',
        'justify-content': 'center',
        backgroundColor: this.settingsColor.backgroundColor,
        'max-width': '150px',
        height: 'auto'
      }
    }
  },
  watch: {
    user: 'init'
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      if (this.user.uid != null) {
        this.loadingAllStickyNotes()
      }
    },
    loadingAllStickyNotes () {
      this.databaseSticky.orderBy('createdAt', 'asc').onSnapshot(querySnapshot => {
        this.listStickyNotes = []
        querySnapshot.forEach(doc => {
          this.listStickyNotes.push(doc.data())
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
