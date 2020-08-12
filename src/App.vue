<template>
  <div id="app">
    1111111
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
    <tag-cloud :data="hotTag" @clickTag="clickTagItem"></tag-cloud>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      hotTag: [{"id":"05023f8da31c4b4187cc6899e2a3aec2","name":"镇远县"},{"id":"0ef028e5278f4f5ca31f99f1bd22b1cc","name":"剑河县"},{"id":"1a32ef04d3c548eaa6777abb46da32f2","name":"台江县"},{"id":"2c26488325bd493687d16315fe0e5fdd","name":"岑巩县"},{"id":"3a786111828a4b9f89ae9da25753eedd","name":"黎平"},{"id":"4ed593eed91b4244969995237f5c96c5","name":"丹寨县"},{"id":"615d2c178f1a47cb8d473823e74f5386","name":"凯里市"},{"id":"76f652df03db43349272a9aff492b065","name":"榕江县"},{"id":"8ff29d0d35e548feb945063b34ed9c9b","name":"黄平县"},{"id":"a8ac2170008746fdadc05ea461bc5e37","name":"雷山县"}]
    }
  },
  methods: {
    clickTagItem (tag) {
      // TODO
      console.log(tag)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
