<template>
  <div class="screen">
    <van-dropdown-menu>
      <van-dropdown-item title="区域" title-class="screenTit screenTit_1" ref="item"  @open="areaOpen">
        <!-- 区域 -->
        <div class="areaClass">
          <div class="areaTit">
            <span
              v-for="item in areaTit"
              :key="item.id"
              @click="tab(item)"
              :class="{current:qieNum===item.id}"
            >{{item.text}}</span>
          </div>
          <div class="areaCon">
            <div class="countys" v-if="qieNum===0">
              <van-tree-select
                :items="countys"
                :active-id.sync="countysId"
                :main-active-index.sync="countysIndex"
                @click-nav="onNavCountysClick"
                @click-item="onItemCountysClick"
              />
            </div>
            <div class="metro" v-if="qieNum===1">
              <van-tree-select
                :items="metros"
                :active-id.sync="metrosId"
                :main-active-index.sync="metrosIndex"
                @click-nav="onNavMetrosClick"
              />
            </div>
            <div class="nearby" v-if="qieNum===2">
              <van-tree-select
                :items="nearbys"
                :active-id.sync="nearbysId"
                :main-active-index.sync="nearbysIndex"
                @click-nav="onNavNearbyClick"
              />
            </div>
          </div>
        </div>
        <div class="screenBtn">
          <div class="screenBtnReset" @click="areaReset">
            <i class="iconfont">&#xe628;</i>
            <span>重置</span>
          </div>
          <div class="confirmBtn" @click="onAreaConfirm('area','item')">确认</div>
        </div>
        <div>
            
        </div>
      </van-dropdown-item>

      <van-dropdown-item title="价格" title-class="screenTit screenTit_2" ref="priceRef" @open="areaOpen">
        <div class="areaClass">
          <div class="areaTit">
            <span
              v-for="tabItem in priceTit"
              :key="tabItem.id"
              @click="tab2(tabItem)"
              :class="{current:qieNum2===tabItem.id}"
            >{{tabItem.text}}</span>
          </div>
          <div class="areaCon areaCon2">
            <div class="priceNum">
              <div v-if="qieNum2===0" class="priceNum">
                <span
                  ref="priceVlue"
                  v-for="item in averagePrice"
                  :key="item.id"
                  @click="danChoose(item,$event,'unit')"
                  :class="item.selected ? 'riceSelected' : ''"
                >{{carry(item)}}</span>
              </div>
              <div v-if="qieNum2===1" class="priceNum">
                <span
                  v-for="item in totalPrice"
                  :key="item.id"
                  @click="danChoose(item,$event,'total')"
                  :class="item.selected ? 'riceSelected' : ''"
                >{{carry1(item)}}</span>
              </div>
            </div>
            <div class="priceText">
              <input v-model="priceShu1" :placeholder="priceText1" @keyup="inputChange" />
              <span>至</span>
              <input v-model="priceShu2" :placeholder="priceText2" @keyup="inputChange" />
            </div>
          </div>
        </div>
        <div class="screenBtn">
          <div class="screenBtnReset" @click="priceReset">
            <i class="iconfont">&#xe628;</i>
            <span>重置</span>
          </div>
          <div class="confirmBtn" @click="onAreaConfirm('price','priceRef')">确认</div>
        </div>
      </van-dropdown-item>
      <van-dropdown-item title="户型" title-class="screenTit screenTit_3" ref="houseRef" @open="areaOpen">
        <div class="house">
          <div class="houseTit">{{houseLayout.tit}}</div>
          <div class="room">
            <span
              v-for="item in houseLayout"
              :key="item.id"
              @click="houseChoose(item,$event)"
              :class="item.selected ? 'riceSelected' : ''"
            >{{item.text}}</span>
          </div>
        </div>
        <div class="screenBtn">
          <div class="screenBtnReset" @click="houseReset">
            <i class="iconfont">&#xe628;</i>
            <span>重置</span>
          </div>
          <div class="confirmBtn" @click="onAreaConfirm('huxing','houseRef')">确认</div>
        </div>
      </van-dropdown-item>
      <van-dropdown-item title="更多" title-class="screenTit screenTit_4" ref="moreRef" @open="areaOpen">
        <div class="house2">
          <div class="houseBox" ref="houseBox">
            <div class="house" v-if="this.buildingAreaLen">
              <div class="houseTit">面积（㎡）</div>
              <div class="room">
                <span
                  v-for="(item,index) in buildingArea"
                  :key="index"
                  @click="buildingAreaClick(item,$event)"
                  :class="item.selected ? 'riceSelected' : ''"
                >{{carry2(item)}}</span>
              </div>
            </div>

            <div class="house">
              <div class="houseTit">物业类型</div>
              <div class="room">
                <span
                  v-for="item in propertyType"
                  :key="item.key"
                  @click="propertyTypeClick(item)"
                  :class="item.selected ? 'riceSelected' : ''"
                >{{item.value}}</span>
              </div>
            </div>

            <div class="house">
              <div class="houseTit">销售状态</div>
              <div class="room">
                <span
                  v-for="item in salesStatus"
                  :key="item.key"
                  @click="salesStatusClick(item)"
                  :class="item.selected ? 'riceSelected' : ''"
                >{{item.value[0]}}</span>
              </div>
            </div>

            <div class="house" v-if="this.loopLineLen">
              <div class="houseTit">环线选择</div>
              <div class="room">
                <span
                  v-for="item in loopLine"
                  :key="item.code"
                  @click="loopLineClick(item)"
                  :class="item.selected ? 'riceSelected' : ''"
                >{{item.title}}</span>
              </div>
            </div>

            <div class="house">
              <div class="houseTit">装修</div>
              <div class="room">
                <span
                  v-for="item in decorationStatus"
                  :key="item.key"
                  @click="decorationStatusClick(item)"
                  :class="item.selected ? 'riceSelected' : ''"
                >{{item.value}}</span>
              </div>
            </div>
            <div class="house" v-if="this.buildingTagsLen">
              <div class="houseTit">更多特色</div>
              <div class="room">
                <span
                  v-for="item in buildingTags"
                  :key="item.code"
                  @click="buildingTagsClick(item)"
                  :class="item.selected ? 'riceSelected' : ''"
                >{{item.title}}</span>
              </div>
            </div>
          </div>

          <div class="screenBtn screenBtn2">
            <div class="screenBtnReset" @click="moreReset">
              <i class="iconfont">&#xe628;</i>
              <span>重置</span>
            </div>
            <div class="confirmBtn" @click="onAreaConfirm('more','moreRef')">确认</div>
          </div>
        </div>
      </van-dropdown-item>
      <van-dropdown-item title="排序" title-class="screenTit screenTit2 screenTit_5" ref="sortRef" @open="areaOpen">
        <div class="sortBox">
          <span
            v-for="item in screenSort"
            :key="item.id"
            @click="screenSortClick(item)"
            :class="item.selected ? 'sortSelected' : ''"
          >{{item.text}}</span>
        </div>
      </van-dropdown-item>
      <div class="selectedSpanList">
         <span  class="selectedSpanList_span" v-for="(item,index) in selectedSpanList" :key="index" @click="clearSelectedList(item)">{{item.value}} <em class="iconfont iconbtn_close selectedSpanList_icon"></em></span>
       </div>
    </van-dropdown-menu>

  </div>
</template>

<script>
import Vue from "vue";
import { DropdownMenu, DropdownItem, TreeSelect, Field, Toast } from "vant";
Vue.use(DropdownMenu)
  .use(DropdownItem)
  .use(TreeSelect)
  .use(Field)
  .use(Toast);

import { getDetail } from "@/apiOptions/home_api.js";
import { mapState,mapGetters} from "vuex";
export default {
  data() {
    return {
      areaTit: [
        { text: "区域", id: 0 },
        { text: "地铁", id: 1 },
        { text: "附近", id: 2 }
      ],
      currentTabItem:{ text: "区域", id: 0 },
      qieNum: 0,
      selectedSpanList:[],

      //区域
      countys: [],
      countysId: [],
      countysIndex: 0,
      countysVal: 0,

      //地铁
      metros: [],
      metrosId: [],
      metrosIndex: 0,

      //附近
      nearbys: [
        { text: "不限", id: 0 },
        { text: "1km", id: 1 },
        { text: "2km", id: 2 },
        { text: "3km", id: 3 }
      ],
      nearbysId: [],
      nearbysIndex: 0,

      //选中的
      chooseSelected: [],
      //选中的 
      selectAll:{},
      selectAllValue:{},
      //价格
      averagePrice: [], //单价
      totalPrice: [], //总价
      priceShu1: "", //输入价格start
      priceShu2: "", //输入价格end
      priceText1: "最低单价",
      priceText2: "最高单价",

      priceTit: [
        { text: "单价", id: 0 },
        { text: "总价", id: 1 }
      ],
      qieNum2: 0,
      // 选中的价位
      chooseSelectedPrice: [],
      priceArr: [],
      inputNumber: {},

      //户型
      chooseSelectedHouse: [], //最后选中的户型
      houseLayout: [
        { text: "不限", selected: true, id: 0 },
        { text: "1室", selected: false, id: 1 },
        { text: "2室", selected: false, id: 2 },
        { text: "3室", selected: false, id: 3 },
        { text: "4室", selected: false, id: 4 },
        { text: "5室", selected: false, id: 5 },
        { text: "5室以上", selected: false, id: 6 }
      ],

      //更多
      buildingAreaLen:0,
      buildingArea: [], //面积
      chooseSelectedBuildingAreae: [], //选中面积

      buildingTagsLen:0,
      buildingTags: [], //更多特色
      chooseSelectedBuildingTags: [], //选中特色

      propertyType: [], //物业类型
      chooseSelectedPropertyType: [], //选中的物业类型

      salesStatus: [], //销售状态
      chooseSelectedSalesStatus: [], //选中的销售状态


      loopLineLen:0,
      loopLine: [], //环线
      chooseSelectedLoopLine: [], //选中环线

      decorationStatus: [], //装修
      chooseSelectedDecorationStatus: [], //选中的装修

      moreResultData: [],

      //排序
      chooseSelectedSort: [],
      screenSort: [
        { text: "默认排序", id: 0, selected: true, sidx: null, sord: null },
        {
          text: "单价由低到高",
          id: 1,
          selected: false,
          sidx: "reference_average_price",
          sord: "asc"
        },
        {
          text: "单价由高到低",
          id: 2,
          selected: false,
          sidx: "reference_average_price",
          sord: "desc"
        },
        {
          text: "开盘时间顺序",
          id: 3,
          selected: false,
          sidx: "open_time",
          sord: "asc"
        },
        {
          text: "开盘时间倒序",
          id: 4,
          selected: false,
          sidx: "open_time",
          sord: "desc"
        }
      ]
    };
  },
  // filters: {
  // },
  mounted() {
    console.log()
    if(this.areaCode && this.areaCode.code && this.$route.name == "houseList")this.changeCodeFromUrl(this.areaCode,true);
  },
  created() {
    this.$formatter.cache.propertyType2.forEach(val => {
      this.$set(val, "selected", false);
    });
    this.propertyType = this.$formatter.cache.propertyType2;

    this.$formatter.cache.salesStatus.forEach(val => {
      this.$set(val, "selected", false);
    });
    this.salesStatus = this.$formatter.cache.salesStatus;

    this.$formatter.cache.decorationStatus2.forEach(val => {
      this.$set(val, "selected", false);
    });
    this.decorationStatus = this.$formatter.cache.decorationStatus2;
    this.getData();
    
  },
  watch:{
     areaCode(newValue,oldValue){
       console.log("数据",newValue)
       if(newValue.code  === oldValue.code)return;
        this.changeCodeFromUrl(newValue)
     },
     cityCode(newValue){
       this.getData();
     }
  },  
  computed: {
    //获取vuex中的cityCode
    ...mapState({
      cityCode: state => state.cityCode,
      areaCode:state => state.cityCode
    }),
    ...mapGetters(['areaCode','cityCode'])
  },
  methods: {
    getData(code){
      let cityCode = code?code : JSON.parse(this.$tool.getStorage("storageCity")).code || "310100000";
      this.changeCitycode();
      getDetail("/api/building/capp/SearchParam", {city: cityCode})
      .then(res => {
        console.log('res')
        this.countys = this.changeData(res.countys); //区域
        this.metros = this.changeData(res.metros); //地铁
        res.averagePrice.forEach(val => {
          this.$set(val, "selected", false);
          this.$set(val, "type", 1);
        });
        res.averagePrice.unshift({
          start: "不限",
          selected: true,
          end: "不限"
        });
        this.averagePrice = res.averagePrice; //价格

        res.totalPrice.forEach(val => {
          this.$set(val, "selected", false);
          this.$set(val, "type", 2);
        });
        res.totalPrice.unshift({
          start: "不限",
          selected: true,
          end: "不限"
        });
        this.totalPrice = res.totalPrice; //总价

        // console.log("res.buildingArea")
        // console.log(res.buildingArea.length)
        this.buildingAreaLen = res.buildingArea.length

        res.buildingArea.forEach(val => {
          this.$set(val, "selected", false);
        });
        this.buildingArea = res.buildingArea; //面积


        this.buildingTagsLen = res.buildingTags.length;
        res.buildingTags.forEach(val => {
          this.$set(val, "selected", false);
        });
        this.buildingTags = res.buildingTags; //特色

        this.loopLineLen = res.loopLine.length;

        res.loopLine.forEach(val => {
          this.$set(val, "selected", false);
        });
        this.loopLine = res.loopLine; //环线
      })
      .catch(err => {
        console.log("请求结果报错", err);
      });
    },
    clearSelectedList(item){
       let index = 0;
       this.selectedSpanList.map((res,i)=>{
           if(res == item)index = i;
       })
      let sd = this.selectedSpanList.splice(index,1);
      this.selectedSpanList = JSON.parse(JSON.stringify(this.selectedSpanList));
       this.againSelectedList(sd)
    },
    changeCodeFromUrl(data,flag){
       this.selectAll = {};
       this.selectAllValue = {};
       let code = data.code;
       this.selectAll.areas = code?[code]:'';
       this.selectAllValue.areas = code?[data]:'';
       this.lightShow(this.selectAll);
       this.titleHeight();
       this.$emit("screenChoose", this.selectAll);
       document.body.scrollTop=document.documentElement.scrollTop=0;
       if(!data.code)return;
       this.$store.dispatch('saveArea',Object.assign({},data,{flag:true}))
       !flag && this.$router.push({path:"houseList"})
     },
     changeCitycode(){
       this.selectAll = {};
       this.selectAllValue = {};
       this.lightShow(this.selectAll);
       this.titleHeight();
       document.body.scrollTop=document.documentElement.scrollTop=0;
     },
    carry(value) {
      let priceText = "";
      if (value.start == "不限") {
        priceText = "不限";
      } else if (value.end > 80000) {
        priceText = this.division(value.start) + "万以上";
      }else if (value.start==0) {
        priceText = this.division(value.end) + "万以下";
      }  else {
        priceText =
          this.division(value.start) + "-" + this.division(value.end) + "万";
      }
      return priceText;
    },

    carry1(value) {
      let priceText = "";
      if (value.start == "不限") {
        priceText = "不限";
      } else if (value.end > 1000) {
        priceText = value.start + "万以上";
      } else if (value.start ==0) {
        priceText = value.end + "万以下";
      } else {
        priceText = value.start + "-" + value.end + "万";
      }
      return priceText;
    },

    division(value) {
      return parseFloat((value / 10000).toFixed(1));
    },
    tab(item,flag) {
      if(this.currentTabItem && this.currentTabItem.id === item.id)return;
      //只要切换  选择的清空
      !flag && this.clearChoose()
      this.currentTabItem = item;
      this.qieNum = item.id;
      item.selected = true;
       !flag && (this.chooseSelected = []);
    },
    clearChoose() {
      this.countysIndex = this.metrosIndex = this.nearbysIndex = 0;
      this.countysId = ["001"];
      this.countysId = ["001"];
      this.nearbysId = ["001"];
      this.current_area_B = [];
      this.current_area_S = [];
      this.current_metro = [];
      this.current_nearby = [];
    },
    //数据请求
    areaOpen() {
      this.$emit('changeTab',true);
      console.log(this.selectAll.streets,this.selectAll.areas,this.selectAll)
      if(Object.keys(this.selectAll).length>0){
         //区域回显
           //城市  
         if(this.selectAll.streets && this.selectAll.streets.length>0){
          this.currentTabItem = this.areaTit[0];
          this.qieNum = this.areaTit[0].id;
           this.areaTit.map((item,index)=>index==0?item.selected = true:item.selected = false)
          this.countys.map((item,index)=>{if(item.id == this.selectAll.current_area_B[0].code)this.countysIndex = index});
          this.countysId = this.selectAll.streets.slice(0);
         }else if(this.selectAll.areas && this.selectAll.areas.length>0){
             this.qieNum = this.areaTit[0].id;
             this.areaTit.map((item,index)=>index==0?item.selected = true:item.selected = false)
             this.countys.map((item,index)=>{if(item.id == this.selectAll.areas[0])this.countysIndex = index});
         }else if((!this.selectAll.streets || this.selectAll.streets.length<1) &&  (!this.selectAll.areas || this.selectAll.areas.length<1)){
           this.countysId = [];
           this.countysIndex = 0;
         }
         
          if(this.selectAll.distance && this.selectAll.metroIds.length>0){ //地铁
               this.qieNum = this.areaTit[1].id;
               this.metros.map((item,index)=>{if(item.id == this.selectAll.metroIds[0])this.metrosIndex=index})
          }else if(this.selectAll.distance){//附近
               this.qieNum = this.areaTit[2].id;
              this.nearbys.map((item,index)=>{if(item.text.indexOf(this.selectAll.distance)>-1)this.nearbysIndex=index})
          } 
          else{
            this.qieNum = this.areaTit[0].id;
             this.metrosIndex = 0;
          }
          //价格
          if(this.selectAll.totalPriceScopes && this.selectAll.totalPriceScopes.length>0){
             this.qieNum2 = this.priceTit[1].id;
              this.totalPrice.forEach(item=>{
               let sd = this.selectAll.totalPriceScopes.filter(res=>res.averagePriceEnd == item.end && res.averagePriceStart == item.start)
               sd.length>0?item.selected = true:item.selected = false;
             })
             let l = this.selectAllValue.totalPriceScopes.filter(item=>item.flag);
               if(l.length>0){
                  this.priceShu1 = l[0].start;
                  this.priceShu2 = l[0].end;

               }
          }else  if(this.selectAll.averagePriceScopes && this.selectAll.averagePriceScopes.length>0){
             this.qieNum2 = this.priceTit[0].id;
             this.averagePrice.forEach(item=>{
               let sd = this.selectAll.averagePriceScopes.filter(res=>res.averagePriceEnd == item.end && res.averagePriceStart == item.start)
               sd.length>0?item.selected = true:item.selected = false;
             })
             let l = this.selectAllValue.averagePriceScopes.filter(item=>item.flag);
               if(l.length>0){
                  this.priceShu1 = l[0].start/10000;
                  this.priceShu2 = l[0].end/10000;
               }
          }else{
               this.qieNum2 = this.priceTit[0].id;
               this.totalPrice.map((item,index)=>index == 0?item.selected = true:item.selected = false)
               this.averagePrice.map((item,index)=>index == 0?item.selected = true:item.selected = false)
          }
          //户型
          if(this.selectAll.bedrooms && this.selectAll.bedrooms.length>0){
               this.houseLayout.map(item=>{
                 let s = this.selectAll.bedrooms.filter(r=>item.id == r);
                 s.length>0?item.selected = true:item.selected = false;
               });
          }else{
             this.houseLayout.map((item,index)=>index == 0?item.selected = true:item.selected = false);
          }
         //更多
         if(this.selectAll.areaScopes && this.selectAll.areaScopes.length>0){
            this.buildingArea.forEach(item=>{
               let s = this.selectAll.areaScopes.filter(r=>r.areaStart == item.start);
                s.length>0?item.selected = true:item.selected = false;
            })

         }
         if(this.selectAll.propertyTypes && this.selectAll.propertyTypes.length>0){
            this.propertyType.forEach(item=>{
               let s = this.selectAll.propertyTypes.filter(r=>r == item.key);
                s.length>0?item.selected = true:item.selected = false;
            })
         }else{
             this.propertyType.forEach(item=>item.selected = false)
         }
         if(this.selectAll.salesStatus && this.selectAll.salesStatus.length>0){
             this.salesStatus.forEach(item=>{
               let s = this.selectAll.salesStatus.filter(r=>r == item.key);
                s.length>0?item.selected = true:item.selected = false;
            })
         }else{
             this.salesStatus.forEach(item=>item.selected = false)
         }
         if(this.selectAll.loopLine && this.selectAll.loopLine.length>0){
             this.loopLine.forEach(item=>{
               let s = this.selectAll.loopLine.filter(r=>r == item.code);
                s.length>0?item.selected = true:item.selected = false;
            })
         }else{
            this.loopLine.forEach(item=>item.selected = false)
         }
         if(this.selectAll.decorationStatus && this.selectAll.decorationStatus.length>0){
             this.decorationStatus.forEach(item=>{
               let s = this.selectAll.decorationStatus.filter(r=>r == item.key);
                s.length>0?item.selected = true:item.selected = false;
            })
         }else{
             this.decorationStatus.forEach(item=>item.selected = false)
         }
         if(this.selectAll.buildingTags && this.selectAll.buildingTags.length>0){
             this.buildingTags.forEach(item=>{
               let s = this.selectAll.buildingTags.filter(r=>r == item.code);
                s.length>0?item.selected = true:item.selected = false;
            })
         }else{
           this.buildingTags.forEach(item=>item.selected = false)
         }

      }else{
         this.countysId = [];
         this.countysIndex = 0;
         this.metrosIndex= 0;
         this.nearbysIndex = 0;
         this.priceReset();
         this.houseReset();
         this.moreReset()
      }
    },
    //数据转换
    changeData(data) {
      let resData = [];
      data.map(item => {
        let rel = {
          text: item.title,
          id: item.code
        };
        if (item.childAreacode && item.childAreacode.length > 0) {
          rel.children = this.changeData(item.childAreacode);
        }
        resData.push(rel);
      });
      resData.unshift({ text: "不限", id: "001" });
      return resData;
    },

    onNavCountysClick(val,flag) {
      //如果大区域是不限
      console.log(val)
      if(flag)return;
      this.current_area_B = [];
      this.countysId = ["001"];
      this.current_area_S = []
      if(val === 0)return;
      this.current_area_B.push({
            value: this.countys[val].text,
            code: this.countys[val].id
      })
    },
    onItemCountysClick(val) {
       this.current_area_S = [];
       if (val.id === "001") {
        this.countysId = ["001"];
        return;
      }
      //不限  跟  下面的多选  不能同时被选中
      let f;
     if((f=this.countysId.indexOf("001"))>-1)this.countysId.splice(f, 1); 
     let list = this.countys[this.countysIndex].children || [];
     this.countysId.forEach(item=>{
       let l = list.filter(res=>res.id === item);
        this.current_area_S.push({
            value:  l[0].text,
            code:  l[0].id
       })
     })
    },
    onNavMetrosClick(val) {
      this.current_metro = [];
      if (val === 0)return;
      this.current_metro.push({
         value: this.metros[val].text,
         code: this.metros[val].id
      })
    },
    onNavNearbyClick(val) {
      this.current_nearby = [];
      if (val === 0)return;
      this.current_nearby.push({
            value: this.nearbys[val].text,
            code: this.nearbys[val].id
      })
    },
    areaReset() {
      this.countysId = [];
      this.countysIndex = "";
      this.metrosIndex = "";
      this.nearbysIndex = "";
       this.current_area_S = this.current_area_B = [];
       this.current_metro = [];
       this.current_nearby = [];
    },
    //确认按钮，抛出选中的数据
    onAreaConfirm(flag,item) {
      let message={};
      if(flag === "area"){//区域点确定
        message = this.areaConfirm()
      }else if(flag === "price"){//价格
        message = this.priceAllConfirm();

      }else if(flag === "huxing"){
          message = this.huxingConfirm();
      }else if(flag === "more"){
          message = this.moreChoose();
      }else if(flag === "sort"){
          message = this.sortChoose();
      }
      this.$refs[item].toggle();
      this.lightShow(this.selectAll);
      this.titleHeight();
      this.$emit("screenChoose", this.selectAll);
    },
    areaConfirm() {
       if(this.currentTabItem.id == 0){//区域
           let  S = this.current_area_S,B = this.current_area_B,object = {}, Br=[];
           //区域  地铁  附近  只能显示一个
           this.selectAllValue.metroIds = '';
           this.selectAll.metroIds = '';
           this.selectAllValue.distance= "";
           this.selectAll.distance = "";

          if(S.length<1){
            object.B = B
            B.map(item=>Br.push(item.code));
             this.selectAll.areas = Br;
              this.selectAllValue.areas = B;
             this.selectAllValue.streets = this.selectAll.streets= [];
          }
          else{
            object.B = B;
            object.S = S;
             S.map(item=>Br.push(item.code));
             this.selectAll.streets= Br;
             this.selectAll.current_area_B= B;
             this.selectAllValue.streets= S;
             this.selectAllValue.areas = this.selectAll.areas = [];
          }
       }else if(this.currentTabItem.id == 1){
          this.selectAllValue.distance =this.selectAll.distance = "";
          this.selectAllValue.areas = this.selectAll.areas= "";
          this.selectAll.streets = this.selectAllValue.streets = "";

          this.selectAllValue.metroIds = this.current_metro;
          this.selectAll.metroIds = this.current_metro[0]?[this.current_metro[0].code-0]:[];
       }else if(this.currentTabItem.id == 2){
          this.selectAllValue.metroIds =  this.selectAll.metroIds = "";
          this.selectAllValue.areas = this.selectAll.areas= "";
          this.selectAll.streets = this.selectAllValue.streets = "";
        
          this.selectAllValue.distance = this.current_nearby;
          this.selectAll.distance = this.current_nearby[0]?this.current_nearby[0].code-0:'';
       }
    },
    priceAllConfirm(){
      let ob = "",array=[];
      if( this.priceShu1 || this.priceShu2){
        ob = {};
        ob.flag = "interval";
        ob.start = this.priceShu1;
        ob.end = this.priceShu2;
        ob.value = this.priceShu1
        ?(this.priceShu2?`${this.priceShu1}-${this.priceShu2}万`:`${this.priceShu1}万以上`):(this.priceShu2?`0-${this.priceShu2}万`:'')
        // :(this.priceShu2?`${this.priceShu2}万以下`:'')
        
      } 
      if(this.qieNum2 == 0){//单价
      // 单价 跟 总价  不能同时选
      this.selectAllValue.totalPriceScopes = this.selectAll.totalPriceScopes = [];

      let unit =  this.selectedPrice.unit,index;
      if(!unit)return (this.selectAll.averagePriceScopes=[]) && (this.selectAllValue.averagePriceScopes=[]);
        ob && (ob.start =  ob.start?parseInt(( ob.start-0)*10000) : 0)&& (ob.end = ob.end?parseInt((ob.end-0)*10000) : 99999999)
        if((index =  unit.findIndex(item=>item.flag === "interval"))>-1){
             ob && (unit[index]= ob);
        }else{
           ob && unit.push(ob);
        }
        this.selectAllValue.averagePriceScopes = unit;
        unit.forEach(item=>{
          array.push({
            averagePriceStart : item.start,
            averagePriceEnd : item.end
          })
        })
        this.selectAll.averagePriceScopes = array;
      }else if(this.qieNum2 == 1){//总价
      this.selectAllValue.averagePriceScopes = this.selectAll.averagePriceScopes =[];


       let total =  this.selectedPrice.total,index;
      if(!total)return (this.selectAll.totalPriceScopes=[]) && (this.selectAllValue.totalPriceScopes=[]);
       ob && (ob.start =  ob.start?ob.start: 0)
          && (ob.end = ob.end?ob.end: 99999999)
        if((index =  total.findIndex(item=>item.flag === "interval"))>-1){
             ob && (total[index]= ob);
        }else{
           ob && total.push(ob);
        }
        this.selectAllValue.totalPriceScopes = total;
        total.forEach(item=>{
          array.push({
            averagePriceStart : item.start,
            averagePriceEnd : item.end
          })
        })
         this.selectAll.totalPriceScopes = array;
      }
    
    },
    huxingConfirm(){
      if(this.chooseSelectedHouse[0] && this.chooseSelectedHouse[0].length>0){
         let arr = [];
         this.chooseSelectedHouse[0].map(item=>{arr.push(item.id)});
         this.selectAll.bedrooms = arr;
           this.selectAllValue.bedrooms = this.chooseSelectedHouse[0];
      }else{
        this.selectAll.bedrooms = [];
        this.selectAllValue.bedrooms = []
      }
    },
    moreChoose(){
       if(this.chooseSelectedBuildingAreae && this.chooseSelectedBuildingAreae.length>0){
         let arr = [];
         this.chooseSelectedBuildingAreae.map(item=>arr.push({
           "areaEnd": item.end,
           "areaStart":item.start
         }))
           this.selectAll.areaScopes = arr;
           this.selectAllValue.areaScopes = this.chooseSelectedBuildingAreae;
         }else{
             this.selectAll.areaScopes = [];
         }
        if(this.chooseSelectedPropertyType && this.chooseSelectedPropertyType.length>0){
           let arr = [];
           this.chooseSelectedPropertyType.map(item=>arr.push(item.key))
           this.selectAll.propertyTypes = arr;
           this.selectAllValue.propertyTypes = this.chooseSelectedPropertyType;
        }else{
            this.selectAll.propertyTypes = [];
        }
        if(this.chooseSelectedSalesStatus && this.chooseSelectedSalesStatus.length>0){
           let arr = [];
           this.chooseSelectedSalesStatus.map(item=>arr.push(item.key))
           this.selectAll.salesStatus = arr;
           this.selectAllValue.salesStatus = this.chooseSelectedSalesStatus;
        }else{
            this.selectAll.salesStatus = [];
        }
         if(this.chooseSelectedLoopLine && this.chooseSelectedLoopLine.length>0){
           let arr = [];
           this.chooseSelectedLoopLine.map(item=>arr.push(item.code))
           this.selectAll.loopLine = arr;
           this.selectAllValue.loopLine = this.chooseSelectedLoopLine;
        }else{
            this.selectAll.loopLine = [];
        }
         if(this.chooseSelectedDecorationStatus && this.chooseSelectedDecorationStatus.length>0){
           let arr = [];
           this.chooseSelectedDecorationStatus.map(item=>arr.push(item.key))
           this.selectAll.decorationStatus = arr;
           this.selectAllValue.decorationStatus = this.chooseSelectedDecorationStatus;
        }else{
            this.selectAll.decorationStatus = [];
        }
         if(this.chooseSelectedBuildingTags && this.chooseSelectedBuildingTags.length>0){
           let arr = [];
           this.chooseSelectedBuildingTags.map(item=>arr.push(item.code))
           this.selectAll.buildingTags = arr;
           this.selectAllValue.buildingTags = this.chooseSelectedBuildingTags;
        }else{
            this.selectAll.buildingTags = [];
        }
 
    },
    againSelectedList(sd){
       let [{parent,value,code}] = sd;
       if(!this.selectAll[parent])return;
       if(parent == "averagePriceScopes" || parent == "totalPriceScopes"){
          this.deleteValue(parent,'averagePriceStart','averagePriceEnd',value,code)
       }else if(parent == "areaScopes"){
          this.deleteValue(parent,'areaStart','areaEnd',value)
       }
       else{
           if(this.$tool.isArray(this.selectAll[parent])){
          let s = '',f1="";
          if((s = this.selectAll[parent].findIndex(item=>item == code || item == value))>-1){
            this.selectAll[parent].splice(s,1);
            f1 =  this.selectAllValue[parent].findIndex(item=>item.code == code);
            this.selectAllValue[parent].splice(f1,1);
           }
         }else{
           delete this.selectAll[parent] 
         }
       }
      
    this.lightShow(this.selectAll);
    this.titleHeight();
    this.$emit("screenChoose", this.selectAll);
    },
    deleteValue(parent,dataStart,dataEnd,value) {
        let f;
         if((f = this.selectAllValue[parent].findIndex(r=>r.value == value))>-1){
             let data =this.selectAllValue[parent], start = data[dataStart],end =  data[dataEnd],s = '';
             if((s = this.selectAll[parent].findIndex(item=>{item[dataStart] == start && item[dataEnd] == end}))){
                  this.selectAll[parent].splice(s,1);
                  this.selectAllValue[parent].splice(f,1);
             }
         }
    },
    //处理 显示问题 高亮问题
    lightShow(data){
      let array = [];
       Object.keys(data).forEach(item=>{
         if(this.ifCurrent(data[item])){
           this.selectAllValue[item] && this.selectAllValue[item].forEach(res=>{
             array.push({
               parent:item,
               value:res.value?this.$tool.isArray(res.value)?res.value[0]:res.value:res.text || res.title,
               code:res.code || res.id ||res.key
             })
           })
         }
       })
      this.selectedSpanList =  array;
    },
    titleHeight(){
      let m = this.selectAll;
      console.log("m",m)
      if(!document.querySelector(".van-dropdown-menu"))return;
      if(this.ifCurrent(m.areas) || this.ifCurrent(m.streets) || this.ifCurrent(m.metroIds) || this.ifCurrent(m.distance)){
           document.querySelector(".van-dropdown-menu").classList.add("screenTit_1");
      }else{
        document.querySelector(".van-dropdown-menu").classList.remove("screenTit_1");
      }
      if(this.ifCurrent(m.averagePriceScopes) || this.ifCurrent(m.totalPriceScopes)){
           document.querySelector(".van-dropdown-menu").classList.add("screenTit_2");
      }else{
        document.querySelector(".van-dropdown-menu").classList.remove("screenTit_2");
      }
      if(this.ifCurrent(m.bedrooms)){
           document.querySelector(".van-dropdown-menu").classList.add("screenTit_3");
      }else{
        document.querySelector(".van-dropdown-menu").classList.remove("screenTit_3");
      }
       if(this.ifCurrent(m.areaScopes) || this.ifCurrent(m.propertyTypes) || this.ifCurrent(m.salesStatus) || this.ifCurrent(m.loopLine) || this.ifCurrent(m.decorationStatus) || this.ifCurrent(m.buildingTags)){
           document.querySelector(".van-dropdown-menu").classList.add("screenTit_4");
      }else{
        document.querySelector(".van-dropdown-menu").classList.remove("screenTit_4");
      }
      if(this.ifCurrent(m.sidx)){
           document.querySelector(".van-dropdown-menu").classList.add("screenTit_5");
      }else{
        document.querySelector(".van-dropdown-menu").classList.remove("screenTit_5");
      }


    },
     ifCurrent(data){
        if(this.$tool.isArray(data)){
          return data.length>0
        }else if(data){
           return true;
        }
         return false;
     },
    //价格
    tab2(tabItem) {
      this.qieNum2 = tabItem.id;
      if (tabItem.id === 0) {
        this.priceText1 = "最低单价";
        this.priceText2 = "最高单价";
      } else {
        this.priceText1 = "最低总价";
        this.priceText2 = "最高总价";
      }
      this.priceReset();
      this.chooseSelectedPrice = [];
      if(!this.selectedPrice)this.selectedPrice={};
      this.selectedPrice.unit = [];
      this.selectedPrice.total = [];
    },

    danChoose(item, $event , flag) {
      this.selectedPrice = {};
      if (item.end === "不限") {
        this.priceReset();
        this.$set(item, "selected", true);
        return;
      }
      item.selected = !item.selected;
      item.value = $event.srcElement.innerHTML || '';     
       
      if(flag === "unit"){
        this.averagePrice[0].end === "不限" &&  this.$set( this.averagePrice[0], "selected", false);
        this.selectedPrice.unit = this.averagePrice.filter(item=>item.selected);
      }else if(flag === "total"){
        this.totalPrice[0].end === "不限" &&  this.$set( this.totalPrice[0], "selected", false);
         this.selectedPrice.total = this.totalPrice.filter(item=>item.selected)
      }
    },

    priceReset() {
      this.chooseSelectedPrice = [];
      this.averagePrice.forEach(val => {
        if (val.end == "不限") {
          this.$set(val, "selected", true);
        } else {
          this.$set(val, "selected", false);
        }
      });
      this.totalPrice.forEach(val => {
        if (val.end == "不限") {
          this.$set(val, "selected", true);
        } else {
          this.$set(val, "selected", false);
        }
      });
      this.priceShu1 = "";
      this.priceShu2 = "";
      this.selectedPrice= {};

    },
    //input输入框限制
    inputChange() {
      this.priceShu1 = this.priceShu1
        .replace(/[^\d.]/g, "")
        .replace(/\.{2,}/g, ".")
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".")
        .replace(/^(\-)*(\d+)\.(\d).*$/, "$1$2.$3");
      this.priceShu2 = this.priceShu2
        .replace(/[^\d.]/g, "")
        .replace(/\.{2,}/g, ".")
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".")
        .replace(/^(\-)*(\d+)\.(\d).*$/, "$1$2.$3");
    },

    priceConfirm() {
      if (this.priceShu1 == "") {
        this.priceShu1 = 0;
      }

      if (this.priceShu1 > this.priceShu2) {
        Toast("请输入正确的价格区间");
        return false;
      }
      if (this.priceShu2 !== "") {
        if (this.qieNum2 === 0) {
          this.chooseSelectedPrice.push({
            start: this.priceShu1,
            end: this.priceShu2,
            value: this.priceShu1 + "-" + this.priceShu2 + "万",
            type: 0
          });
        }else{
          this.chooseSelectedPrice.push({
            start: this.priceShu1,
            end: this.priceShu2,
            value: this.priceShu1 + "-" + this.priceShu2 + "万",
            type: 1
          });
        }
      }
      this.$emit(
        "screenChoosePrice",
        this.chooseSelectedPrice
      );

      this.$refs.priceRef.toggle();
      this.chooseSelectedPrice = [];
      this.inputNumber = {};
      this.priceShu1 = "";
      this.priceShu2 = "";
      this.priceReset();
    },

    //户型
    houseChoose(item,$event) {
      this.chooseSelectedHouse = [];
      if (item.id == 0) {
        this.houseReset();
        this.$set(item, "selected", true);
        return;
      } 
      this.$set( this.houseLayout[0],"selected", false);
      this.houseLayout[0]
      item.selected = !item.selected;
      this.chooseSelectedHouse.push(this.houseLayout.filter(item=>item.selected))
    },
    houseReset() {
      this.chooseSelectedHouse = [];
      this.houseLayout.forEach(val => {
        if (val.id === 0) {
          this.$set(val, "selected", true);
        } else {
          this.$set(val, "selected", false);
        }
      });
       this.chooseSelectedHouse = [];

    },
    houseConfirm() {
      this.$refs.houseRef.toggle();
      this.$emit("screenChooseHouse", this.chooseSelectedHouse);
      this.houseReset();
    },

    //更多
    carry2(value) {
      let priceText = "";
      if (value.start == 0) {
        priceText = value.end + "㎡以下";
      } else if (value.end > 150) {
        priceText = value.start + "㎡以上";
      } else {
        priceText = value.start + "-" + value.end + "㎡";
      }
      return priceText;
    },

    buildingAreaClick(item, $event) {
      item.selected = !item.selected;
      item.value = $event.srcElement.innerHTML;
      this.chooseSelectedBuildingAreae = this.buildingArea.filter(item=>item.selected);
    },
    propertyTypeClick(item) {
      item.selected = !item.selected;
      this.chooseSelectedPropertyType = this.propertyType.filter(item=>item.selected)
    },

    salesStatusClick(item) {
      item.selected = !item.selected;
      this.chooseSelectedSalesStatus = this.salesStatus.filter(item=>item.selected)
    },
    loopLineClick(item) {
       item.selected = !item.selected;
      this.chooseSelectedLoopLine = this.loopLine.filter(item=>item.selected)
    },

    decorationStatusClick(item) {
       item.selected = !item.selected;
      this.chooseSelectedDecorationStatus = this.decorationStatus.filter(item=>item.selected)
    },
    buildingTagsClick(item) {
      item.selected = !item.selected;
      this.chooseSelectedBuildingTags = this.buildingTags.filter(item=>item.selected)
    },
    moreReset() {
      this.buildingArea.forEach(val => {
        this.$set(val, "selected", false);
      });
      this.buildingTags.forEach(val => {
        this.$set(val, "selected", false);
      });
      this.propertyType.forEach(val => {
        this.$set(val, "selected", false);
      });
      this.salesStatus.forEach(val => {
        this.$set(val, "selected", false);
      });
      this.loopLine.forEach(val => {
        this.$set(val, "selected", false);
      });
      this.decorationStatus.forEach(val => {
        this.$set(val, "selected", false);
      });
      this.chooseSelectedBuildingAreae = [];
      this.chooseSelectedBuildingTags = [];
      this.chooseSelectedPropertyType = [];
      this.chooseSelectedSalesStatus = [];
      this.chooseSelectedLoopLine = [];
      this.chooseSelectedDecorationStatus = [];
    },
    moreConfirm() {
      this.$refs.moreRef.toggle();
      this.$emit(
        "screenChooseMore",
        this.chooseSelectedBuildingAreae,
        this.chooseSelectedPropertyType,
        this.chooseSelectedSalesStatus,
        this.chooseSelectedLoopLine,
        this.chooseSelectedDecorationStatus,
        this.chooseSelectedBuildingTags
      );

      this.moreReset();
    },
    //排序
    screenSortClick(item) {
      this.screenSort.forEach(val => {
        this.$set(val, "selected", false);
      });
      this.$set(item, "selected", true);
      this.selectAll.sidx = item.sidx;
      this.selectAll.sord = item.sord;
      this.$refs.sortRef.toggle();
      this.titleHeight();
      this.selectAll.listSort = "sort";
      this.$emit("screenChoose", this.selectAll);
      this.selectAll.listSort = "";
    }
  }
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}

/deep/.screen .van-dropdown-item{
  max-width:750PX;/*no*/ 
      margin:0 auto;
}

/deep/.screen .van-dropdown-item--down{
  max-width:750PX;/*no*/ 
      margin:0 auto;
}
.screen .room{
   max-width:750PX;/*no*/ 
      margin:0 auto;
}
.houseBox{

}
.pc .screen{
   width:13.9rem;
   margin: auto;
}
.pc /deep/.van-dropdown-item{
  top:50px
}
.screen {
  display: block;
  height: auto;
  max-width:750PX;/*no*/ 
      margin:0 auto;

      
  .areaClass {
    display: flex;
    flex-direction: row;
    max-width:750PX;/*no*/ 
      margin:0 auto;
    .areaTit {
      display: flex;
      flex-direction: column;
      background: #f2f2f6;
      span {
        height: 50px;
        width: 76px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #333;
      }
      .current {
        background: #fbfbfb;
      }
    }
    .areaCon {
      flex: 1;
      .metro {
        .van-tree-select__content {
          display: none;
        }
      }
      .nearby {
        .van-tree-select__content {
          display: none;
        }
      }
    }
    .areaCon2 {
      padding-bottom: 20px;
    }
  }
  .selectedSpanList{
    background-color: white;
    margin-top: 0px;
    overflow-y: auto;
    white-space: nowrap;
    &_span{
      border-radius: 4px;
      padding: 7px 9px;
      background-color: #F3F3F3;
      margin-right: 5px;
      color: #333333;
      font-size: 12px;
      display: inline-block;
      margin:  4px 5px 10px 0;
    }
    &_span:first-child{
      margin-left: 0.5rem;
    }
    &_icon{
      font-size: 12px;
      color: #ccc;
      transform: scale(0.8);
      display: inline-block;
    }
  }
  .screenBtn {
    background: #fff;
    display: flex;
    flex-direction: row;
    padding: 7px 25px 7px 0;
    border-top: 1px #f0f0f0 solid;
    max-width:750PX;/*no*/ 
      margin:0 auto;
    
    .screenBtnReset {
      display: flex;
      flex-direction: column;
      flex: 1;
      text-align: center;
      i {
        display: inline-block;
        margin-top: 4px;
      }
      span {
        font-size: 12px;
        display: inline-block;
        margin-top: 4px;
      }
    }
    .confirmBtn {
      flex: 4;
      height: 40px;
      background: #00a4ff;
      text-align: center;
      font-size: 16px;
      color: #fff;
      line-height: 40px;
      border-radius: 50px;
    }
  }
  /deep/.screenTit_1 {
     /deep/.screenTit_1{
          color: #00a4ff!important;
     }
    /deep/.screenTit_1.screenTit::after{
      color: #00a4ff!important;
    }
 }
  /deep/.screenTit_2 {
     /deep/.screenTit_2{
          color: #00a4ff!important;
     }
    /deep/.screenTit_2.screenTit::after{
      color: #00a4ff!important;
    }
 }
  /deep/.screenTit_3 {
     /deep/.screenTit_3{
          color: #00a4ff!important;
     }
    /deep/.screenTit_3.screenTit::after{
      color: #00a4ff!important;
    }
 }
  /deep/.screenTit_4 {
     /deep/.screenTit_4{
          color: #00a4ff!important;
     }
    /deep/.screenTit_4.screenTit::after{
      color: #00a4ff!important;
    }
 }
  /deep/.screenTit_5 {
     /deep/.screenTit_5{
          color: #00a4ff!important;
     }
    /deep/.screenTit_5.screenTit::after{
      color: #00a4ff!important;
    }
 }
 
  /deep/.van-icon-success::before {
    font-family: "iconfont" !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    content: "\e627";
  }
  /deep/.van-sidebar-item--select::before {
    display: none;
  }
  /deep/.van-tree-select__nav-item {
    padding: 0 12px;
    font-size: 14px;
    height: 50px;
    line-height: 50px;
  }
  /deep/.van-sidebar-item--select,
  .van-sidebar-item--select:active {
    color: #00a4ff;
    background: #ffffff;
    height: 50px;
    line-height: 50px;
    padding: 0 12px;
    font-size: 14px;
  }
  /deep/.van-tree-select__item--active {
    color: #00a4ff;
    background: #ffffff;
  }
  /deep/.van-tree-select__item {
    font-size: 14px;
    font-weight: normal;
  }

  /deep/.van-tree-select__content {
    background: #fbfbfb;
    .van-tree-select__nav {
      background: #fbfbfb;
      .van-sidebar-item {
        background: #fbfbfb;
      }
      .van-sidebar-item--select {
        background: #fff;
      }
    }
  }
  /deep/ .van-dropdown-item__content {
    max-height: 100% !important;
    // overflow: hidden;
  }
  /deep/.van-dropdown-menu__bar{
    box-shadow:none;
  }

  //价格
  .priceNum {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px 0 10px;
    width:100%;
    span {
      display: inline-block;
      width: 31%;
      height: 34px;
      line-height: 34px;
      font-size: 12px;
      text-align: center;
      background: #f8f9fa;
      margin-top: 15px;
      color: #333;
      margin-right: 2%;
    }
    .riceSelected {
      color: #00a4ff;
    }
  }
  /deep/.priceClass {
    .van-tree-select__content {
      background: #fff;
    }
  }
  .priceText {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: 0 25px;
    margin-top: 30px;
    span {
      text-align: center;
      width: 20%;
      text-align: center;
      display: inline-block;
      line-height: 25px;
    }
    input {
      border-bottom: 1px #cbcbcb solid;
      display: inline-block;
      width: 40%;
      line-height: 25px;
      text-align: center;
      border-radius: 0;
    }
  }
  .house {
    .houseTit {
      font-size: 16px;
      color: #282828;
      margin: 15px 0 0 15px;
      font-weight: bold;
    }
    .room {
      overflow: hidden;
      padding: 0 20px 30px;
      span {
        float: left;
        text-align: center;
        width: 22%;
        text-align: center;
        line-height: 34px;
        background: #f8f9fa;
        margin-top: 15px;
        color: #333;
        margin-right: 4%;
      }
      span:nth-child(4n) {
        margin-right: 0;
      }
      .riceSelected {
        color: #00a4ff;
      }
    }
  }
  .sortBox {
    display: flex;
    flex-direction: column;
    max-width: 750PX;
    margin: auto;
    span {
      display: block;
      height: 44px;
      line-height: 44px;
      font-size: 14px;
      color: #333;
      padding-left: 25px;
    }
    .sortSelected {
      color: #00a4ff;
    }
  }

  .house2 {
    min-height: 550px;
    height: 100%;
    // overflow: hidden;
    .houseBox {
      // position: absolute;
      // top:0;left:0;right:0;bottom:0;
      // height: 100%;
      // overflow-y: scroll;
      padding-bottom: 40px;
      max-width: 750PX;
       margin: auto;
    }
  }

  .screenBtn2 {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99999;
    max-width:750PX;/*no*/ 
      margin:0 auto;
  }
  .red{
    color: red;
  }
  /deep/ .screenTit {
    font-size: 14px !important;
  }
  
  /deep/.van-dropdown-menu__bar {
    .van-dropdown-menu__item {
      flex: 1;
      /deep/.screenTit::after {
        position: absolute;
        top: 0;
        right: -7px;
        margin-top: 0;
        border: 0;
        border-color: transparent transparent transparent transparent;
        -webkit-transform: rotate(0);
        transform: rotate(0);
        opacity: 0.8;
        font-family: "iconfont" !important;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        content: "\e62a";
        font-size: 10px;
        color: #d1d1d1;
        transition: ease-out all 0.5s;
      }
      /deep/.van-dropdown-menu__title--active::after {
        color: #1989fa;
        transform: rotate(180deg);
      }
    }
    .van-dropdown-menu__item:last-child {
      flex: 1.4;
      justify-content: flex-end;
      padding-right: 15px;
      /deep/.screenTit2::after {
        position: absolute;
        top: 0;
        right: -7px;
        margin-top: 0;
        border: 0;
        border-color: transparent transparent transparent transparent;
        -webkit-transform: rotate(0);
        transform: rotate(0);
        opacity: 0.7;
        font-family: "iconfont" !important;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        content: "\e62d";
        font-size: 10px;
        color: #d1d1d1;
      }
      /deep/.van-dropdown-menu__title--active::after {
        color: #1989fa;
      }
    }
  }
}
</style>