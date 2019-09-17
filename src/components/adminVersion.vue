<template>
  <div>
    <div class="text-h2 text-center" style="margin-bottom: 8px">Version:</div>
    <q-card class="text-center">
      <q-card-section>
        <div class="text-h6">New version here!</div>
        <q-input filled square v-model="version.version" hint="Version" />
      </q-card-section>

      <q-card-section>
        <q-btn label="Save" color="green" @click="changeVersion()" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      version: {
        version: null
      }
    };
  },
  watch: {
    versionCloud: "loadingVersionCloud"
  },
  methods: {
    changeVersion() {
      this.$db
        .collection("version")
        .doc(this.version.idVersion)
        .update(this.version)
        .then(() => {
          this.$notify("Version Updated sucessfully", "green");
        })
        .catch(() => {
          this.$notify("Erro tryng update version", "red");
        });
    },
    loadingVersionCloud() {
      if (this.versionCloud.version != null) {
        this.version = this.versionCloud;
      }
    }
  },
  created() {
    if (this.versionCloud.version != null) {
      this.version = this.versionCloud;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>