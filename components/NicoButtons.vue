<template>
  <div class="container">
    <div class="flex content-center flex-wrap bg-white h-screen w-screen">
      <div class="w-1/4 p-2 h-100" v-touch:start="() => press(button)"
           v-touch:end="() => release(button)"
           v-for="button in buttons" :key="button.name">
        <img draggable="false" v-if="!button.pressed"
             class="pointer-events-none w-full mx-auto select-none"
             :src="getImgUrl(button.name, false, 'NicoButtons')"/>
        <img draggable="false" v-else class="pointer-events-none w-full mx-auto select-none"
             :src="getImgUrl(button.name, true, 'NicoButtons')"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    buttons: {
      type: Array
    },
    press: {
      type: Function
    },
    release: {
      type: Function
    },
    getImgUrl: {
      type: Function
    }
  }
}
</script>
