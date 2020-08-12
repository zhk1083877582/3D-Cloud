//当前是路由配置
import {api} from './apiOption.js'

// const getStepsEffect = function (to, from) {
//   let steps = this.userInfo.steps, isOld, verify;
//   if (!steps) return false;
//   verify = this.$pOption[to.name].verify || {};
//   if (!verify.wizard) return false;
//   isOld = this.isBeforeStep(from.name, {name: to.name});
//   return isOld ? "left" : 'right';
// };
const OPTION = [
  {
    path: '/',
    redirect: '/Home'
  },
  {
    title: "首页",
    path: '/Home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */'@/views/Home/home.vue'),
  },
  {
    title: "登录",
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "Home" */'@/views/login/login.vue'),
  },
  {
    title: "楼盘相册",
    path: '/housePhoto/:buildingId',
    name: 'housePhoto',
    component: () => import(/* webpackChunkName: "Home" */'@/views/housePhoto/housePhoto.vue'),
  },
  {
    title: "视频播放",
    path: '/videoPlayer',
    name: 'videoPlayer',
    component: () => import(/* webpackChunkName: "Home" */'@/views/housePhoto/newVideoPlayer.vue'),
  },
  {
    title: "404",
    path: '*',
    name: 'error',
    component: () => import(/* webpackChunkName: "House" */'@/views/errorTo404/index.vue'),
  },
]


const pageOption = function () {
  this.cache = OPTION;
};
pageOption.prototype.add = function (option) {
  this.cache.concat(option);
};
pageOption.prototype.getOption = function () {
  var option = {}, name;
  for (let i = 0; i < this.cache.length; i++) {
    if ((name = this.cache[i].name)) {
      option[name] = this.cache[i];
    }
  }
  return option;
};
const PO = new pageOption();


export const POInstall = {
  install(vue) {
    vue.prototype.$pOption = PO.getOption();
    vue.prototype.$api = api;
  },
};
export const pOption = PO.cache;
