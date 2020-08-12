import Vue from 'vue'
import Router from 'vue-router'
import {pOption} from './pageOption'
Vue.use(Router);
const ROUTER = new Router({
  routes: pOption,
  scrollBehavior: (to, from, savedPosition) => {
    let scrollTo = 0;
    if (to.hash) {
      scrollTo = to.hash
    } else if (savedPosition) {
      scrollTo = savedPosition.y
    }
  // console.log(savedPosition,scrollTo);
    return new Promise((resolve, reject) => {
      if(to.name===from.name){ //  /my-0-0-0  -> /my-1-1-1 的情况
        resolve(savedPosition||{});
      }else if(scrollTo){
        setTimeout(() => {
          //resolve(goTo(scrollTo));
        }, 600);
      }else{
        setTimeout(() => {
          resolve({ x: 0, y: 0 })
        }, 400)
      }

    })
  },
});


export default ROUTER;