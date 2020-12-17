<template>
  <div class="container">
    <div class="flex content-center items-center flex-wrap h-screen w-screen">
      <div class="w-1/3 p-2 h-100" v-touch:start="() => press(buttons[0])"
           v-touch:end="() => release(buttons[0])">
        <img draggable="false"
             class="pointer-events-none w-full mx-auto select-none"
             :src="getImgUrl(buttons[0].name, buttons[0].pressed, 'ITGButtons')"/>
      </div>
      <div class="w-1/3 p-2 h-100">
        <div v-touch:start="() => press(buttons[2])" v-touch:end="() => release(buttons[2])">
          <img draggable="false"
               class="pointer-events-none w-full mx-auto select-none"
               :src="getImgUrl(buttons[2].name, buttons[2].pressed, 'ITGButtons')"/>
        </div>
        <div v-touch:start="() => press(buttons[1])" v-touch:end="() => release(buttons[1])">
          <img draggable="false"
               class="pointer-events-none w-full mx-auto select-none"
               :src="getImgUrl(buttons[1].name, buttons[1].pressed, 'ITGButtons')"/>
        </div>
      </div>
      <div class="w-1/3 p-2 h-100" v-touch:start="() => press(buttons[3])"
           v-touch:end="() => release(buttons[3])">
        <img draggable="false"
             class="pointer-events-none w-full mx-auto select-none"
             :src="getImgUrl(buttons[3].name, buttons[3].pressed, 'ITGButtons')"/>
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
