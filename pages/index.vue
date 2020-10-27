<template>
  <div class="container">
    <div class="flex content-center flex-wrap bg-white h-screen w-screen">
      <div class="w-1/4 p-2 h-100" v-longpress="() => longPress(button)" v-touch:start="() => press(button)"
           v-touch:end="() => release(button)"
           v-for="button in buttons" :key="button.name">
        <img draggable="false" v-if="!button.pressed"
             class="pointer-events-none w-full mx-auto select-none"
             :src="getImgUrl(button.name, false)"/>
        <img draggable="false" v-else class="pointer-events-none w-full mx-auto select-none"
             :src="getImgUrl(button.name, true)"/>
      </div>
    </div>
    <div v-on:click="switchPlayer" class="top-0 left-0 absolute block">
      <img
        v-if="player === 1"
        src="~/assets/player1.svg"
        style="width: 8vw;"
      />
      <img
        v-else
        src="~/assets/player2.svg"
        style="width: 8vw;"
      />
    </div>
    <div v-on:click="toggleFullscreen" class="top-0 right-0 absolute block">
      <img
        v-if="!fullscreen"
        src="~/assets/fullscreen.svg"
        style="width: 8vw;"
      />
      <img
        v-else
        src="~/assets/fullscreen_exit.svg"
        style="width: 8vw;"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttons: [
        {name: "left", pressed: false, longPressing: false},
        {name: "back", pressed: false, longPressing: false},
        {name: "start", pressed: false, longPressing: false},
        {name: "right", pressed: false, longPressing: false},
      ],
      queue: [],
      fullscreen: false,
      player: 1
    };
  },

  mounted() {
    window.addEventListener("fullscreenchange", this.onFullscreen, {passive: true});
    this.executeQueue()
  },

  methods: {
    onFullscreen() {
      this.fullscreen = document.fullscreenElement != null;
    },
    toggleFullscreen() {
      if (this.fullscreen) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
    },

    switchPlayer() {
      if (this.player === 1) {
        this.player = 2
      } else {
        this.player = 1;
      }
    },

    async executeQueue() {
      const elem = this.queue[0]
      if (elem && (new Date() - elem.date) < 300) {
        await this.$axios.get(window.location.origin + "/api/press/" + elem.player + "/" + elem.button.name, { progress: false })
      }
      this.queue.shift()
      setTimeout(this.executeQueue, 10);
    },

    longPress(button) {
      navigator.vibrate(70)
      button.longPressing = true
      this.$axios.get(window.location.origin + "/api/longpress/" + this.player + "/" + button.name + "/down", { progress: false })
    },

    async press(button) {
      navigator.vibrate(10)
      button.pressed = true
      setTimeout(this.pressTimer, 40, button)
    },

    pressTimer(button) {
      if(button.name==="right" && this.buttons[0].pressed) {
        this.$axios.get(window.location.origin + "/api/doublepress/" + this.player, { progress: false })
      } else if (!(button.name==="left" && this.buttons[3].pressed)) {
        this.queue.push({button: button, player: this.player, date: new Date()})
      }
    },

    release(button) {
      button.pressed = false
      if (button.longPressing) {
        button.longPressing = false
        this.$axios.get(window.location.origin + "/api/longpress/" + this.player + "/" + button.name + "/up", { progress: false })
      }
    },

    getImgUrl(name, pressed) {
      if (pressed) {
        return require("~/assets/" + name + "_pressed.svg");
      }
      return require("~/assets/" + name + ".svg");
    },
  },
};
</script>


