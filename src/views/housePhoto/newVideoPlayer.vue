<!--  -->
<template>
    <div class="video_warp">
        <div class="custom-indicator">
                <div>
                    <i class="iconfont iconbtn_close close_btn" @click="closeBtn"></i>
                    视频{{ Number(current) + 1 }}/{{videoList.length}}
                </div>
            </div>
        <div class='video_palyer'>
            <van-swipe @change="onChange" :loop="false" :style="{'height':ClientHeight+'px'}" :initial-swipe=current>
                <van-swipe-item v-for="item in videoList" :key="item.annexPath">
                    <video-player  class="video-player-box"
                        ref="videoPlayer"
                        :options="playerOptions"
                        :playsinline="false"
                        customEventName="customstatechangedeventname"
                        :style="{'height':ClientHeight+'px'}"
                        >
                    </video-player>
                </van-swipe-item>
                <template #indicator>
                    <div class="custom-indicator2">
                    </div>
                </template>
            </van-swipe>
        </div>    
    </div>
</template>

<script>
import Vue from 'vue';
import { Swipe, SwipeItem } from 'vant';
import {getDetail} from '@/apiOptions/home_api.js';
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
Vue.use(Swipe).use(SwipeItem);
export default {
components: {
    videoPlayer
},
data() {
return {
    vedioId:this.$route.query.annexPath,
    ClientHeight:'',
    videoList:[],
    current:0,
    playerOptions: {
        // videojs options
        height: 400,
        width: document.documentElement.clientWidth,
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false,
        language: 'zh-CN',
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
            type: "video/mp4",
            src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
        }],
        poster: "https://test.shhxfyl.com/fbc4c9cd9c2349ea961f806f9971cc45/snapshots/6e0ce02bccd44415bfae6078486c395e-00004.jpg",
        controlBar: {
            timeDivider: true,
            durationDisplay: false,
            remainingTimeDisplay: true,
            fullscreenToggle: true  //全屏按钮
        }
    }
};
},
computed: {},
watch: {},
methods: {
    goBacksearch(){
        this.$router.go(-1)
    },
    
    getBaseInfo(){
        let param = {
        buildingId: this.$route.query.buildingId
        }
        getDetail('/api/building/capp/building/buildingBaseInfo',param).then(res=>{
        console.log('视频',res.annexs[109])
        this.videoList = res.annexs[109]
        this.vedioId = this.videoList[this.current].annexPath
        let smallAnnexPath = this.videoList[this.current].smallAnnexPath
        this.getVideoUrl(this.vedioId,smallAnnexPath)
        }).catch(err=>{
        console.log(err)
        })
    },
    onChange(index) {
        this.current = index;
        console.log(index)
        this.getVideoUrl(this.videoList[index].annexPath,this.videoList[index].smallAnnexPath);
    },
    //获取视频地址
    getVideoUrl(vedioId,smallAnnexPath){
        this.playerOptions.poster = smallAnnexPath
        getDetail('/api/tospurWeb/api2/v1/vod/getPlayInfo',{
                vedioId: vedioId
            }).then((res) => {
                console.log('获取视频地址',res)
                this.playerOptions.sources[0].src = res.playInfoList[1].playURL
                
        }).catch(err=>{
            console.log(err)
        })
    },
    closeBtn(){
        this.$router.go(-1)
    },
},
created() {
        this.current = this.$route.query.index?this.$route.query.index:0
        this.$nextTick(()=>{
            this.getBaseInfo()
            this.ClientHeight = String(window.innerHeight-50)
        })
},
mounted() {
},
}
</script>
<style lang='scss' scoped>
.video_warp{
    height: 100%;
    background-color: #000000;
}
.video_palyer{
    position: relative;
}
.close_btn{
    position: absolute;
    left: 20px;
    color: #fff;
    font-size: 20px;
    z-index: 1000;
}
.custom-indicator {
    position: relative;
    width: 100%;
    font-size: 12px;
    color: #fff;
    font-weight: 700;
    line-height: 18px;
    font-size: 18px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    z-index: 100000;
}
.custom-indicator2{
    display: none;
}
</style>
<style lang='scss'>

.video_warp{
    .video-js {
        height: 100% !important;
        .vjs-big-play-button{
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            line-height: 50px;
            height: 50px;
            width: 50px;
            border-radius: 50px;
        }
    }
    .vjs-fluid{
        padding: 0 !important;
    }
}

</style>
