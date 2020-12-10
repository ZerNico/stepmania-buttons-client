<template>
  <div class="container">
    <div class="flex content-center items-center flex-wrap bg-white h-screen w-screen">
      <div class="w-1/3 p-2 h-100" v-touch:start="() => press(buttons[0])"
           v-touch:end="() => release(buttons[0])">
        <img draggable="false" v-if="!buttons[0].pressed"
             class="pointer-events-none w-full mx-auto select-none"
             :src="getImgUrl(buttons[0].name, false, 'ITGButtons')"/>
        <img draggable="false" v-else class="pointer-events-none w-full mx-auto select-none"
             :src="getImgUrl(buttons[0].name, true, 'ITGButtons')"/>
      </div>
      <div class="w-1/3 p-2 h-100">
        <div v-touch:start="() => press(buttons[2])" v-touch:end="() => release(buttons[2])">
          <img draggable="false" v-if="!buttons[2].pressed"
               class="pointer-events-none w-full mx-auto select-none"
               :src="getImgUrl(buttons[2].name, false, 'ITGButtons')"/>
          <img draggable="false" v-else class="pointer-events-none w-full mx-auto select-none"
               :src="getImgUrl(buttons[2].name, true, 'ITGButtons')"/>
        </div>
        <div v-touch:start="() => press(buttons[1])" v-touch:end="() => release(buttons[1])">
          <img draggable="false" v-if="!buttons[1].pressed"
               class="pointer-events-none w-full mx-auto select-none"
               :src="getImgUrl(buttons[1].name, false, 'ITGButtons')"/>
          <img draggable="false" v-else class="pointer-events-none w-full mx-auto select-none"
               :src="getImgUrl(buttons[1].name, true, 'ITGButtons')"/>
        </div>
      </div>
      <div class="w-1/3 p-2 h-100" v-touch:start="() => press(buttons[3])"
           v-touch:end="() => release(buttons[3])">
        <img draggable="false" v-if="!buttons[3].pressed"
             class="pointer-events-none w-full mx-auto select-none"
             :src="getImgUrl(buttons[3].name, false, 'ITGButtons')"/>
        <img draggable="false" v-else class="pointer-events-none w-full mx-auto select-none"
             :src="getImgUrl(buttons[3].name, true, 'ITGButtons')"/>
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
