export default {
  data() {
    return {
      version: "v1.39.3"
    };
  },
  watch: {
    versionCloud: "checkVersion"
  },
  methods: {
    checkVersion() {
      if (this.version != this.versionCloud.version) {
        window.location.reload(true);
      }
    }
  }
};
