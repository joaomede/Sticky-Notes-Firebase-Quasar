<template>
  <div>
    <div class="text-h2 text-center" style="margin-bottom: 8px">Settings</div>
    <q-card class="text-center">
      <q-card-section>
        <div class="text-h6">Background Color</div>

        <q-input filled v-model="backgroundColor" :style="{ backgroundColor: backgroundColor }" class="my-input">
          <template v-slot:append>
            <q-icon name="colorize" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-color v-model="backgroundColor" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <div class="text-h6">Text Color</div>

        <q-input filled v-model="textColor" :style="{ backgroundColor: textColor }" class="my-input">
          <template v-slot:append>
            <q-icon name="colorize" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-color v-model="textColor" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-card-section>
      <q-card-section>
        <q-btn label="Save" color="green" @click="saveChanges()" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textColor: null,
      backgroundColor: null
    };
  },
  watch: {
    backgroundColor: "changeColorComputed",
    textColor: "changeColorComputed"
  },
  methods: {
    init(){
      this.textColor = this.settingsColor.textColor;
      this.backgroundColor = this.settingsColor.backgroundColor;
    },
    changeColorComputed() {
      this.settingsColor.backgroundColor = this.backgroundColor;
      this.settingsColor.textColor = this.textColor;
    },
    saveChanges() {
      this.$db
        .collection("app")
        .doc(this.user.uid)
        .update(this.settingsColor)
        .then(() => {
          this.$notify("Settings have been saved successfully.", "green");
        })
        .catch(() => {
          this.$notify("Error trying to save settings.", "red");
        });
    }
  },
  mounted () {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
</style>