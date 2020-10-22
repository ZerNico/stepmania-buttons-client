import Vue from 'vue'

import Vue2TouchEvents from 'vue2-touch-events'

Vue.use(Vue2TouchEvents)

Vue.directive('longpress', {
  bind: function (el, binding, vNode) {
    // Make sure expression provided is a function
    if (typeof binding.value !== 'function') {
      // Fetch name of component
      const compName = vNode.context.name
      // pass warning to console
      let warn = `[longpress:] provided expression '${binding.expression}' is not a function, but has to be`
      if (compName) { warn += `Found in component '${compName}' ` }

      console.warn(warn)
    }

    // Define variable
    let pressTimer = null
    let pressInterval = null

    // Define function handlers
    // Create timeout
    let start = (e) => {

      if (e.type === 'click' && e.button !== 0) {
        return;
      }

      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          if (5000 && 5000 > 0) {
            pressInterval = setInterval(() => {
              handler(false)
            }, 200)
          }
          // Run function
          handler()
        }, 700)
      }
    }

    // Cancel Timeout
    let cancel = (e) => {
      // Check if timer has a value or not
      if (pressTimer !== null) {
        clearTimeout(pressTimer)
        pressTimer = null
      }
      if (pressInterval) {
        clearInterval(pressInterval)
        pressInterval = null
      }
    }
    // Run Function
    const handler = (e) => {
      binding.value(e)
    }

    // Add Event listeners
    el.addEventListener("mousedown", start);
    el.addEventListener("touchstart", start);
    // Cancel timeouts
    el.addEventListener("click", cancel);
    el.addEventListener("mouseout", cancel);
    el.addEventListener("touchend", cancel);
    el.addEventListener("touchcancel", cancel);
  }
})
