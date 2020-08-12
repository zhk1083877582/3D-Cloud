import TagCloudComponent from './tagCloud.vue'

const instance = {
  install: function (Vue) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
    }
    Vue.component(TagCloudComponent.name, TagCloudComponent)
  }
}

export default instance
