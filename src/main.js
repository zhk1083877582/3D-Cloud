import Vue from 'vue'
import App from './App.vue'
import tagCloud from 'v-tag-cloud'
Vue.use(tagCloud)
new Vue({
  el: '#app',
  render: h => h(App)
})
