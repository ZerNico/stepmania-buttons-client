import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'

//Vue.use(VueNativeSock, 'ws://' + window.location.host + '/ws', { format: 'json', reconnection: true })
Vue.use(VueNativeSock, 'ws://192.168.14.25:3001/ws', { format: 'json', reconnection: true })
