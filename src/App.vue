<template>
  <div id="app">
    <top-header v-show="isshowTopHeader&&!wxFlag" :title="pOption.title"/>
    <router-view />
  </div>
</template>

<script>
import { mapAction,mapState,mapGetters } from 'vuex';
import TopHeader from '@/components/header/header.vue';
export default {
  name: 'App',
  components:{
    TopHeader,
  },
  data(){
    return{
      pOption:{},
      wxFlag:true,
      isshowTopHeader:false,
    }
  },
  computed: {
        //获取vuex中的cityCode
        ...mapState({
            isLoading:state=>state.isLoading,
            isShowDownload:state=>state.isShowDownload
        }),
        // ...mapGetters([ShowDownload])
    },
  created() {
        if(this.$tool.getStorage('M-token')){
          this.$store.dispatch('saveUserInfo',{Token:this.$tool.getStorage('M-token')});
        }
        this.$router.beforeResolve((to, from, next) => {
          this.setPageOption(to);
            next()
        })
        this.isWeixin()
        // this.checkChannel();
  },
  mounted() {

  },
  methods:{
    setPageOption(to) { //设置头部名
        this.pOption = this.$pOption[to.name];
        if (typeof this.pOption.title === "function") {
          this.Title = document.title = this.pOption.title.call(this, to);
        } else {
          if (this.pOption.children) {
            this.pOption = this.pOption.children[to.params.children];
          }
          this.Title = document.title = this.pOption.title || "同策好房";
        }
        //判断是否展示头部组件
        if( this.pOption.name !=='Home' && this.pOption.name !== 'videoPlayer'&& this.pOption.name !== 'error'){
          this.isshowTopHeader = true
        }else{
          this.isshowTopHeader = false
        }
      },
      isWeixin() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          this.wxFlag = true;
          this.$store.dispatch('saveIsShowHead',false)
        } else {
          this.$store.dispatch('saveIsShowHead',true)
          this.wxFlag = false;
        }
      },
      // checkChannel(){
      //    var ua = navigator.userAgent,
      //    isWindowsPhone = /(?:Windows Phone)/.test(ua),
      //    isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
      //    isAndroid = /(?:Android)/.test(ua),
      //    isFireFox = /(?:Firefox)/.test(ua),
      //    isChrome = /(?:Chrome|CriOS)/.test(ua),
      //    isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
      //    isPhone = /(?:iPhone)/.test(ua) && !isTablet,
      //    isPc = !isPhone && !isAndroid && !isSymbian;
      //    let os =  {
      //        isTablet: isTablet,
      //        isPhone: isPhone,
      //        isAndroid: isAndroid,
      //        isPc: isPc
      //    };	
      //   if (os.isTablet || os.isPc) {
      //     document.querySelector("html").style.width="750px";
      //     document.querySelector("html").style.margin="auto";
      //     document.querySelector("body").classList.add("pc")
      //     // let iWidth = document.documentElement.clientWidth;
	    //     // document.getElementsByTagName('html')[0].style.fontSize = 100 * iWidth / 750 + 'px'; 
      //   } 
      // }
  }
}
</script>

<style>
 @import './common/css/reset.css';
#app{height: 100%;}
.modelBess1{
  width: 100%;
  height: 100%;
  background-color: rgba(55,55,55,.7);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
}
.icon-close{
  position: absolute;
  right: 20px;
  top: 28px;
}
.icon-close img{
  width: 14px;
  height: 14px;
}
.unloadInstall{
  width: 70px;
  height: 100px;
  position: absolute;
  right: 20px;
  top: 13px;
  transform: rotate(7deg );
}
.unloadMess{
  color: white;
  position: absolute;
  right: 28px;
  top: 114px;
  font-family: cursive;
  font-size: 20px;
}
</style>
