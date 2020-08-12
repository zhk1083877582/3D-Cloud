<template>
    <div class="foot">
        <div class="rule-mode" v-if="isShowStatement">
            <div class="rule-affirm">
                <img src="http://iph.href.lu/100x100" class="affirm-icon"/>
                <span>免责申明</span>
            </div>
            <div class="affirm-txt">楼盘信息来源于政府公示网站、开发商、第三方公众平台，最终以政府部门登记备案为准，请谨慎核查。</div>
        </div>
        <ul class="home-tags">
            <li v-for="(item,index) in list" :key="index" :class="{active:num==item.index}" @click="getNum(item.index)">
                {{item.txt}}
            </li>
        </ul>
        <div class="list_content clearfloat"> 
            <div v-show="num == 'newHouse'">
                <div class="content_items" v-for="(item,index) in listContent.newHouse" :key="index" @click='toHouseListNewHouse(item)'>
                    {{`${deleteAreaText(item.title)}新房`}}
                </div>
            </div>
            <div v-show="num == 'areaResult'" >
                <div class="content_items" v-for="(item,index) in listContent.areaResult" :key="index" @click='toHouseList(item)'>
                    {{item.title}}
                </div>
            </div>
            <div v-show="num == 'mainPushResult'">
                <div class="content_items" v-for="(item,index) in listContent.mainPushResult" :key="index" @click='toHouseDetail(item)'>
                    {{item.title}}
                </div>
            </div>
            <div v-show="num == 'recentUpdateResult'">
                <div class="content_items" v-for="(item,index) in listContent.recentUpdateResult" :key="index" @click='toHouseDetail(item)'>
                    {{item.title}}
                </div>
            </div>
        </div>
        <!-- <ul class="home-tags-type" v-for='(itemCon,index) in listContent' :key="index" v-show="index == num">
            <li>{{itemCon.text}}</li>
        </ul> -->
        <div class="record-mode"> 
            <p>同策房产咨询股份有限公司</p>
            <p><span> 电话：400 851 0888</span><span class="mr_5">地址：上海市松江区柳港镇兴乐路51号</span></p>
            <p><a href="http://www.beian.miit.gov.cn/"><span>沪ICP备11022085号9</span></a><a  href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010702006007"><span class="mr_5">沪公网安备 31010702006007号</span></a></p> 
            <!-- <p><span>沪ICP备11022085号9</span><span class="mr_5">沪公网安备 31010702006007号</span></p> -->
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { getDetail } from '@/apiOptions/home_api.js';
export default {
    data() {
        return {
            num:'newHouse',
            list:[],
            listContent:{
                newHouse:[],
                areaResult:[],
                mainPushResult:[],
                recentUpdateResult:[]
            }
        };
    },
    props:{
        isShowStatement:{
            type:Boolean,
            default:true
        },
        
    },
    computed: {
        //获取vuex中的cityCode
        // ...mapState({
        //     cityCode:state=>state.city.code
        // }),
        ...mapGetters(['cityCode'])
    },
    watch: {
        cityCode(newValue,oldValue){
            if(newValue.code  === oldValue.code)return;
            this.getPageFooter(newValue.code)
        }
    },
    methods: {
        getNum(index) {
            this.num = index;
        },
        deleteAreaText(txt){
            if(txt.indexOf('澳门') != -1 || txt.indexOf('香港') != -1){
                return txt.substring(0,2)
            }else{
                let index = txt.indexOf('市')
                return txt.substring(0,index)
            }
        },
        getPageFooter(code){
            this.list = [{index:'newHouse',txt:"新房"}, {index:'areaResult',txt:`${this.deleteAreaText(this.cityCode.title)}新房`},{index:'mainPushResult',txt:`${this.deleteAreaText(this.cityCode.title)}楼盘推荐`},{index:'recentUpdateResult',txt:`${this.deleteAreaText(this.cityCode.title)}新开楼盘`}]
            let params={
                cityCode:code
            }
            console.log('底部组件的新房数据',params)
            getDetail('/api/building/pc/building/pageFooter',params).then(res=>{
                this.listContent = {...this.listContent,...res}
            }).catch(err=>{

            })
        },
        //获取所有城市
        getonlineCity(){
            let self = this
            getDetail("/api/building/capp/building/onlineCity",{}).then(res=>{
                console.log("请求上线城市列表",res)
                
                Object.getOwnPropertyNames(res).forEach(function(key){
                    self.listContent.newHouse.push(...res[key])
                })
            }).catch(err=>{
                console.log("请求上线城市列表结果报错",err)
            })
        },
        //跳转到列表页 把区域的code存到vuex里
        toHouseList(obj){
            this.$store.dispatch('saveArea',obj)
        },
        toHouseListNewHouse(obj){
            if(obj.title.indexOf("大连")>-1){
                 let url = location.host.indexOf("test")>-1?"https://daliantest.tospur.com/#/":'https://mdalian.tongcehaofang.com/#/'
                 if(this.$route.path != "/houseList" || location.host.indexOf("dalian")<0)window.location.href = url+'houseList';
            }else if(location.host.indexOf("dalian")>-1){
                let url = location.host.indexOf("test")>-1?"https://mtest.tospur.com/#/":'https://m.tongcehaofang.com/#/'
                if(this.$route.path != "/houseList" || obj.title.indexOf("大连")<0)window.location.href = url+'houseList?code='+obj.code+"&title="+obj.title;
            }else{
                 this.$store.dispatch('saveCity',{code:obj.code,pinyinInitial:obj.pinyinInitial,title:obj.title})
                this.$tool.setStorage({storageCity: JSON.stringify(obj)})
                this.$tool.setSession({ischangeCity:true});
                this.$route.path != "/houseList" && this.$router.push({path:'houseList'});
            }
        },
        toHouseDetail(obj){
            let agreement = window.location.protocol
            let domain = window.location.host;
            window.location.href = `${agreement}//${domain}/dynamicPages/mstation/${obj.code}.html`
        },
    },
    created() {
        this.getPageFooter(this.cityCode.code);
        this.getonlineCity()
    },
    mounted() {
    
    },
}
</script>

<style lang="scss" scoped>
    .foot {
        max-width: 750PX;/*no*/
    margin: 0 auto;
        background-color: #ffffff;
        margin: 0 5px;
        border-radius: 4px;
        overflow: hidden;
        .rule-mode {
            background-color: #F8F8F8;
            padding: 13px 15px 15px;
            .rule-affirm {
                .affirm-icon {
                    display: inline-block;
                    width: 13px;
                    height: 15px;
                    vertical-align: middle;
                }
                span {
                    display: inline-block;
                    vertical-align: middle;
                    font-size: #999;
                    color: #999;
                    margin-left: 5px;
                }
            }
            .affirm-txt {
                margin-top: 10px;
                margin-left: 18px;
                font-size: 10px;
                color: #999;
                line-height: 1.5;
            }
            
        }
        .home-tags {
            display: flex;
            padding: 10px 0px;
            padding-bottom: 0;
            overflow: hidden;
            justify-content: space-between;
            margin: 0 10px;
            overflow-x: scroll;
            &::-webkit-scrollbar {display:none}
            li {
                border-radius:18px;
                font-size: 12px;
                color: #999999;
                border:1px solid rgba(230,230,230,1);
                margin-right: 5px;
                padding: 6px 11px;
                white-space: nowrap;
            }
            li:last-child {
                margin-right: 0;
            }
            li.active{
                border:1px solid #666666;
                color: #333;
                font-weight: 700;
            }
        }
        .list_content{
            padding: 0px 15px;
            padding-left: 5px;
            .content_items{
                float: left;
                padding-top: 20px;
                margin: 0 8px;
            }
        }
        .home-tags-type {
            padding: 0px 15px 10px 15px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            color: #666;
            font-size: 12px;
            position: relative;
            li {
                line-height: 32px;
                margin-right: 20px;
            }
            li:nth-child(5n) {
                margin-right: 0;
            }
        }
        .home-tags-type:after {
            content: "";
            position: absolute;
            bottom: 0;
            left:5px;
            right: 5px;
            height:1px;
            background:rgba(239,239,239,1);
        }
        .record-mode {
            padding: 15px 10px;
            color: #999;
            font-size: 11px;
            line-height: 1.5;
            .mr_5{
                margin-left: 8px;
            }
            span{
                color: #999;
            }
        }
    }
</style>