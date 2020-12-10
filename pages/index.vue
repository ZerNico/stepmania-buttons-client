<template>
  <div>
  <!--<NicoButtons :buttons=this.buttons :press=this.press :release=this.release :getImgUrl=this.getImgUrl></NicoButtons>-->
  <ITGButtons :buttons=this.buttons :press=this.press :release=this.release :getImgUrl=this.getImgUrl></ITGButtons>
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
import NicoButtons from '@/components/NicoButtons'
import ITGButtons from "@/components/ITGButtons";

export default {
  components: {
    NicoButtons,
    ITGButtons
  },
  data() {
    return {
      buttons: [
        { name: "left", pressed: false },
        { name: "back", pressed: false },
        { name: "start", pressed: false },
        { name: "right", pressed: false },
      ],
      fullscreen: false,
      player: 1,
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

    press(button) {
      window.navigator.vibrate(10)
      button.pressed = true
      this.$socket.sendObj({type: 'press', button: button.name, player: this.player})
    },

    release(button) {
      button.pressed = false
      this.$socket.sendObj({type: 'release', button: button.name, player: this.player})
    },

    getImgUrl(name, pressed, component) {
      if (pressed) {
        return require("~/assets/" + component + "/" + name + "_pressed.svg");
      }
      return require("~/assets/" + component + "/" + name + ".svg");
    },
  },
};
</script>


