<template>
  <div class="housePhotoStyle">
    <!-- <head-top title='楼盘相册'></head-top> -->
    <van-tabs :offset-top="isShowHead?40:0" v-model="ActiveP" scrollspy sticky :ellipsis="false" color="#00A4FF" title-active-color="#00A4FF" :border="false" line-width="17px" line-height="2px" title-inactive-color="#999999">
      <van-tab v-for="(item, index) in annexsList" :title="`${item.label} (${item.childList.length})`" :key="index">
        <div class="housePhotoItem">
          <h3>{{item.label}}{{`  (${item.childList.length})`}}</h3>
          <ul>
            <li v-for="(itemTmp,index) in item.childList" :key="index">
              <div v-if="(itemTmp.annexType==109||itemTmp.annexType==110)" @click="toVideoPlayOrVR(itemTmp,index)">
                <van-image width="100%" height="79px" radius="4px" fit="fill" :src="itemTmp.smallAnnexPath" />
                <van-image class="positioning" :src="require('@/assets/img/detail_VR.png')" v-show="itemTmp.annexType==110"/>
                <van-image class="positioning" :src="require('@/assets/img/index_video.png')" v-show="itemTmp.annexType==109"/>
              </div>
              <div v-else @click="toShowImage(item,index)">
                <van-image width="100%" height="79px" radius="4px" fit="fill" :src="itemTmp.annexPath+'?x-oss-process=image/resize,m_lfit,' + 'h_' + 105 + ',w_' + 79" />
              </div>
            </li>
          </ul>
        </div>
      </van-tab>
    </van-tabs>
    <div class="previewTitle" v-show="previewTitle">
      <van-tabs v-model="vanActive" line-height="0" line-width="0" background="transparent" :border="false" :ellipsis="false" @click="tabClick">
        <template v-for="(item, index) in houseBan.reduce((all,next)=>all.some((item)=>item['type']==next['type'])?all:[...all, next],[])">
          <van-tab :title="handleswitch(item.type)" :name="item.type" :key="index"></van-tab>
        </template>
      </van-tabs>
    </div>
    <van-image-preview v-model="show" :images="imagePaths" :closeable="true" :loop="false" @close="PreviewClose" @change="PreviewChange" :startPosition="startPosition">
      <template v-slot:index>{{ imgIndex }} / {{imgTotal}}</template>
    </van-image-preview>
  </div>
</template>
<script>
import Vue from 'vue';
// import headTop from '@/components/header/header'
import { mapState } from 'vuex'
import { Tab, Tabs, Image, ImagePreview } from 'vant';
Vue.use(Tab).use(Tabs).use(Image).use(ImagePreview);
import { urlParse } from '../../common/js/util.js';
import {getDetail} from '@/apiOptions/home_api.js';
export default {
  components: {
    // headTop,
  },
  data() {
      return {
        ActiveP:0,
        annexsList: [],
        detailObj:{},
        videoVRlist:[],

        imgIndex: 1,
        imgTotal: 1,
        show:false,
        currentObj:{},//当前点击
        previewTitle: false,
        vanActive: '',
        houseBan: [],
        houseIamgePaths:[],
        imagePaths: [],
        startPosition: 0,
        offsetTop:44,
        buildingId:''
      };
  },
  computed: {
    ...mapState({
      isShowHead:state=>state.isShowHead
    })
  },
  watch: {},
  methods: {
    init(){
      this.getBaseInfo()
      
    },
    getBaseInfo(){
      let param = {
        // buildingId: 1048,
        buildingId: this.buildingId
      }
      getDetail('/api/building/capp/building/buildingBaseInfo',param).then(res=>{
        // console.log('楼盘详情',res)
        this.buildingTag = res.buildingTag.split(',')
        this.salesStatusArr = res.salesStatus.split(',').slice(0, 2)
        this.propertyTypeArr = res.propertyType.split(',').slice(0, 2)
        this.detailObj = res
        this.annexsList = this.getAnnexsList(res.annexs)
        this.gethouseBan()
        // console.log(this.annexsList)
      }).catch(err=>{
        console.log(err)
      })
    },
    
    getAnnexsList(list) {
      let self = this
      let newList = [];
      console.log(list)
      Object.getOwnPropertyNames(list).forEach(function(key){
        // console.log(JSON.stringify(list)+ '---'+JSON.stringify(list[key]))
        // console.log(JSON.stringify(list)+ '---'+JSON.stringify(key)+'======='+JSON.stringify(list[key]))
        if(!key) return false
        if(key==109||key==110){
          self.videoVRlist.push(...list[key])
        }else{
          let obj={
            label : self.handleswitch(key),
            childList:list[key]
          }
          if(obj.label){
            newList.push(obj)
          }
        }
      })
      if(self.videoVRlist.length!=0){
        let obj = {
          label:'视频VR',
          childList:self.videoVRlist
        }
        newList.unshift(obj) 
      }
      // console.log(newList)
      return newList;
    },
    
    handleswitch(key){
      let label = ''
      switch (key) {
        case '101':
          label = '效果图'
          break
        case '102':
          label = '样板间'
          break
        case '103':
          label = '环境规划图'
          break
        case '104':
          label = '配套实景图'
          break
        case '105':
          label = '楼盘实景图'
          break
        case '106':
          label = '楼栋分布图'
          break
        case '107':
          label = '户型'
          break
        case '108':
          label = '预售证'
          break
      }
      return label
    },
    //视频播放
    toVideoPlayOrVR(obj,index){
      console.log(obj,index)
      if(obj.annexType == '110'){
        window.location.href = obj.annexPath
      }else if(obj.annexType == '109'){
        this.$router.push({
          path:'/videoPlayer',
          query:{
            buildingId : this.buildingId,
            index
          }
        })
      }
    },
    //图片展示
    toShowImage(obj,currentIndex){
      this.currentObj = obj
      // console.log(obj,currentIndex)
      this.show = true
      this.previewTitle = true
      let reg = /[?&][^?&]+=[^?&]+/g;
      let currentPath = `${this.currentObj.childList[currentIndex].annexPath}`
      this.imgIndex = currentIndex+1
      this.imgTotal = this.currentObj.childList.length
      this.vanActive = this.currentObj.childList[currentIndex].annexType
      console.log(this.houseIamgePaths.map(item => item).indexOf(currentPath))
      this.startPosition = this.houseIamgePaths.map(item => item).indexOf(currentPath)
    },
    //格式化数据
    gethouseBan(){
      if(this.annexsList.length > 0){
        this.annexsList.forEach((item,index)=>{
          // console.log(item.childList.length)
          item.childList.forEach((itemTmp,idx)=>{
            if(!(itemTmp.annexType==109||itemTmp.annexType==110)){
              this.houseBan.push({type: itemTmp.annexType, path: itemTmp.annexPath + '?imgIndex=' + (idx+1) + '&imgTotal='+ item.childList.length + '&imgType=' + itemTmp.annexType, imgTotal: item.childList.length})
              this.houseIamgePaths.push(itemTmp.annexPath)  
            }
            
          })
        })
      }
      for (let i = 0; i < this.houseBan.length; i++){
        this.houseBan[i].numIndex = i
        this.imagePaths.push(this.houseBan[i].path)
      }
    },
    PreviewClose() {
      this.show = false
      this.previewTitle = false
    },
    PreviewChange(index) {
      let reg = /[?&][^?&]+=[^?&]+/g;
      let obj = {}
      this.imagePaths[index].match(reg).forEach((item) => {
        let tempArr = item.substring(1).split('=');
        let key = decodeURIComponent(tempArr[0]);
        let val = decodeURIComponent(tempArr[1]);
        obj[key] = val;
      });
      this.imgIndex = obj.imgIndex
      this.imgTotal = obj.imgTotal
      this.vanActive = obj.imgType
      this.startPosition = index
    },
    // 点击tab事件
    tabClick(name,title) {
      console.log(name,title)
      this.vanActive = name
      this.startPosition = this.imagePaths.findIndex(function(value,index,array){
        let reg = /[?&][^?&]+=[^?&]+/g;
        let obj = {}
        value.match(reg).forEach((item) => {
          let tempArr = item.substring(1).split('=');
          let key = decodeURIComponent(tempArr[0]);
          let val = decodeURIComponent(tempArr[1]);
          obj[key] = val;
        });
        return  obj.imgType == name;
      })
    },
  },
  created() {
    // 获取对应参数
    document.querySelector('body').className = 'photoImage'
    this.buildingId = this.$route.params.buildingId
    console.log(this.$route.params.buildingId,11111111111111)
    this.init()
  },
  mounted() {

  }
}
</script>
<style lang="scss">
.photoImage {
  .van-image-preview__close-icon--top-right{
    left: 16px;
    right: auto;
    &:before{
      content: '';
      width: 18px;
      height: 18px;
      background: url("../../assets/img/down_Details@2x.png") no-repeat left top;
      background-size: 100% 100%;
    }
  }
}
.van-image-preview__index{
    top:20px
  }
</style>
<style lang='scss' scoped>
.housePhotoStyle{
  /deep/ .van-image-preview__overlay{
    background-color:rgba(0,0,0,1)
  }
  ::v-deep .van-sticky{
    background-color: #fff;
  }
  ::v-deep .van-tabs__wrap{
    padding: 0 5px;
  }
  ::v-deep .van-tab__text{
    font-size: 15px;
  }
  ::v-deep .van-tabs__wrap--scrollable .van-tab{
    flex-basis: auto !important;
    padding: 0 12px;
  }
  ::v-deep .van-tab{
    padding: 0 12px;
    flex: none !important;
  }
  .housePhotoItem{
    padding: 10px 17px 0;
    h3{
      color: #1B1833;
      font-size: 15px;
      margin-top: 16px;
      margin-bottom: 13px;
    }
    ul{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      // justify-content: space-between;
      li{
        width: 105px;
        height: 79px;
        position: relative;
        margin-bottom: 10px;
        margin-right: 10px;
        &:nth-child(3n+3){
          margin-right:0
        }
        .positioning{
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 10;
          width: 31px;
          height: 31px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background-color: rgba(0,0,0,0.2);;
        }
      }
    }
  }
}
.previewTitle{
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 22px;
  z-index: 3000;
  ::v-deep .van-tab__text{
    color: #333333;
    font-size: 12px;
  }
  ::v-deep .van-tabs__wrap--scrollable .van-tab{
    flex-basis: auto !important;
    padding: 0 15px;
  }
  ::v-deep .van-tabs__wrap{
    height: 28px;
  }
  ::v-deep .van-tab{
    padding: 0 15px;
    flex: none !important;
    background-color: #fff;
    margin-right: 10px;
    height: 28px;
    line-height: 28px;
    border-radius: 13px;
    min-width: 60px;
    &:first-child{
      margin-left: 10px;
    }
    &.van-tab--active{
      background-color: #00A4FF;
      .van-tab__text{
        color: #FFFFFF;
      }
    }
  }
  
}
</style>
