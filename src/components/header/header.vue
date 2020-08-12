<template>
    <van-sticky>
        <div class="header">
            <i class="goback iconfont iconbtn_return" @click="goBack"></i>
            <p class="header_text">{{title}}</p>
        </div>
    </van-sticky>    
</template>

<script>
import Vue from 'vue';
import { Sticky } from 'vant';
Vue.use(Sticky);
export default {
    data() {
        return {
            
        };
    },
    props:{
        title:{
            type:String,
            default:''
        }
        
    },
    computed: {},
    watch: {},
    methods: {
        goBack(){
        //    if(this.$route.query.backfrom)window.location.href = this.$route.query.backfrom;
        //    else this.$router.go(-1)
        this.$router.go(-1)
        },
    },
    created() {
    
    },
    mounted() {
    
    },
}
</script>

<style lang="scss" scoped>
    .header {
        background-color: #ffffff;
        padding: 7px 10px;
        line-height: 30px;
        position: relative;
        text-align: center;
        max-width:750PX;/*no*/ 
        margin:0 auto;
        .goback{
            position: absolute;
            left: 10px;
            width: 30px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            display: inline-block;
        }
        .header_text{
            color: #333333;
            font-size: 18px;
            font-weight: 700;
        }
    }
</style>