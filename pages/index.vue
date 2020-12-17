<template>
  <div :style="'background-color: ' + backgroundColor + ';'">
    <div v-if="settings" class="bg-white z-10 absolute flex content-center items-center flex-wrap h-screen w-screen">
      <div class="w-1/4 p-2" v-on:click="toggle('player')">
        <img draggable="false"
             class="pointer-events-none w-full mx-auto select-none"
             :src="require('~/assets/num' + player + '.svg')"/>
        <h1 class="text-center font-bold" style="font-size: 2.2vw;">Player</h1>
      </div>
      <div class="w-1/4 p-2" v-on:click="toggle('darkmode')">
        <img draggable="false"
             class="pointer-events-none w-full mx-auto select-none"
             :src="require('~/assets/darkmode_' + darkMode + '.svg')"/>
        <h1 class="text-center font-bold" style="font-size: 2.2vw;">Dark Mode</h1>
      </div>
      <div class="w-1/4 p-2" v-on:click="toggle('vibrate')">
        <img draggable="false"
             class="pointer-events-none w-full mx-auto select-none"
             :src="require('~/assets/vibrate_' + vibrate + '.svg')"/>
        <h1 class="text-center font-bold" style="font-size: 2.2vw;">Vibrate</h1>
      </div>
      <div class="w-1/4 p-2" v-on:click="toggle('style')">
        <img draggable="false"
             class="pointer-events-none w-full mx-auto select-none"
             :src="require('~/assets/num' + style + '.svg')"/>
        <h1 class="text-center font-bold" style="font-size: 2.2vw;">Style</h1>
      </div>
    </div>
    <NicoButtons v-if="style === 1" :buttons=this.buttons :press=this.press :release=this.release
                 :getImgUrl=this.getImgUrl></NicoButtons>
    <ITGButtons v-if="style === 2" :buttons=this.buttons :press=this.press :release=this.release
                :getImgUrl=this.getImgUrl></ITGButtons>
    <div v-on:click="settings = !settings" class="top-0 left-0 z-10 absolute block">
      <img
        :src="require('~/assets/settings_' + settings + '.svg')"
        style="width: 8vw;"
      />
    </div>
    <div v-on:click="toggleFullscreen" class="top-0 right-0 absolute block">
      <img
        :src="require('~/assets/fullscreen_' + fullscreen + '.svg')"
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
        {name: "left", pressed: false},
        {name: "back", pressed: false},
        {name: "start", pressed: false},
        {name: "right", pressed: false},
      ],
      fullscreen: false,
      player: 1,
      style: 1,
      vibrate: true,
      darkMode: false,
      settings: false
    };
  },

  mounted() {
    window.addEventListener("fullscreenchange", this.onFullscreen, {passive: true});
    this.style = parseInt(localStorage.style) || 1;
    this.player = parseInt(localStorage.player) || 1;
    this.darkMode = localStorage.darkMode === 'true';
    this.vibrate = localStorage.vibrate === 'true';
  },
  computed: {
    backgroundColor() {
      if (this.darkMode)
        return "#212121"
      return "#FFFFFF"
    }
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

    toggle(setting) {
      if (setting === 'player') {
        if (this.player === 1)
          this.player = 2
        else
          this.player = 1;
        localStorage.player = this.player
      } else if (setting === 'vibrate') {
        this.vibrate = !this.vibrate
        localStorage.vibrate = this.vibrate
      } else if (setting === 'style') {
        if (this.style === 2)
          this.style = 1
        else
          this.style++
        localStorage.style = this.style
      } else if (setting === 'darkmode') {
        this.darkMode = !this.darkMode
        localStorage.darkMode = this.darkMode
        console.log(localStorage.darkMode)
      }
    },

    press(button) {
      if (this.vibrate)
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
    }
  }
};
</script>
