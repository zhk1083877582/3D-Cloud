import Vue from 'vue'
// import Vant from 'vant';
import 'vant/lib/index.css';
import '../public/icon/iconfont.css';
import './plugins/components'
import 'lib-flexible/flexible'
import store from './store'
import {POInstall} from './options/pageOption'
import './plugins/axios'
import App from './App.vue'
import router from './options/router'
import tool from './plugins/tool'
import VueJson from "vue-jsonp"
import {
  Button,
  Popup,
  Cell,
  IndexBar,
  IndexAnchor
} from 'vant'
Vue.use(Button).use(Popup).use(Cell).use(IndexBar).use(IndexAnchor)
// Vue.use(Vant);
//字段对照
import switchFormatter from './options/formatter'

Vue.prototype.$formatter = switchFormatter;

//Vue.mixin(pageOption);

router.beforeEach((to, from, next) => {
  //页面加载动画
  // WB.$watch("router", () => {
  //   next();
  // });
  next()
});


//装载工具
Vue.prototype.$tool = tool;
//Vue.prototype.$wb = WB;

Vue.use(VueJson)
//装载页面配置
Vue.use(POInstall);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

//window.WB = WB;
