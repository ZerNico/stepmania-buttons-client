<template>
  <div class="container">
    <div class="flex content-center flex-wrap bg-white h-screen w-screen">
      <div class="w-1/4 p-2 h-100" v-longpress="() => send(button.name)" v-touch:start="() => press(button.name, true)"
           v-touch:end="() => press(button.name, false)"
           v-on:mouseup="press(button.name, false)" v-on:mouseleave="press(button.name, false)"
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
        {name: "left", pressed: false},
        {name: "back", pressed: false},
        {name: "start", pressed: false},
        {name: "right", pressed: false},
      ],
      fullscreen: false,
      player: 1
    };
  },

  mounted() {
    window.addEventListener("fullscreenchange", this.onFullscreen, {passive: true});
  },

  methods: {
    onFullscreen() {
      this.fullscreen = document.fullscreenElement != null;
    },
    toggleFullscreen() {
      navigator.vibrate(1000)
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

    press(name, pressed) {
      navigator.vibrate([500])
      this.buttons.forEach(button => {
        if (button.name === name) {
          button.pressed = pressed;
        }
      });
      if (pressed) {
        this.send(name)
      }
    },

    send(name) {
      this.$axios.get(window.document.location.origin + "/api/" + this.player + "/" + name, { progress: false })
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


