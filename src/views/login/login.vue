<template>
    <div class="login_warp">
        <!-- <m-head title="登录"></m-head> -->
        <div class="log_main">
            <p class="log_top_text">手机号快捷登录</p>
            <div class="log_form">
                <van-form validate-trigger=onChange @submit='onSubmit'>
                    <van-field
                        v-model="phoneNum"
                        name="phoneNum"
                        placeholder="请输入手机号"
                        :rules="[{ validator:validatorPhoneNum }]"
                        maxlength="11"
                        type="digit"
                    >
                        <template #button>
                            <van-button native-type='button' :disabled='CodeBtndisabled' size="small" type="primary" @click="runTimer()"><span :style="{'color':CodeColor}" >{{CodeText}}</span></van-button>
                        </template>
                    </van-field>
                    <van-field
                        class="log_YZM"
                        v-model="VerificationCode"
                        name="VerificationCode"
                        placeholder="请输入短信验证码"
                        :rules="[{ validator :validatorCode }]"
                        type="number"
                    />
                    <div>
                        <van-button :color="submitBg" :disabled='submitBtn' round block type="info" native-type="submit" >
                            <span :style="{'color':submitColor}">登录</span>
                        </van-button>
                    </div>
                </van-form>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import { mapState, mapMutations, mapActions} from 'vuex'
import { getDetail } from "@/apiOptions/home_api.js";
import { Dialog, Button,Form, Field, Toast } from 'vant';
Vue.use(Button).use(Form).use(Field);
export default {
    components: {
        // MHead
    },
    data() {
        return {
            phoneNum:'',
            VerificationCode:'',
            CodeBtndisabled:true,
            submitBtn:true,
            CodeText:'获取验证码',
            CodeColor:'#C6C9D5',//#07c160
            submitColor:'#C6C9D5',
            submitBg:'#F2F3F7',
            time:60
        };
    },
    computed: {},
    watch: {},
    methods: {
        onSubmit(values) {
            console.log('submit', values);
            this.submitBtn = true
            let params={
                phone:values.phoneNum,
                loginType:1,
                code:values.VerificationCode,
            }
            getDetail('/api/tospurWeb/login/appLogin/login',params).then((res)=>{
                
                this.$tool.setStorage({'M-token':res['X-Token']});
                this.$tool.setStorage({'phoneNum':params.phone})
                this.$store.dispatch('saveUserInfo',{Token:res['X-Token']});
                let token = this.$tool.getToken()

                let topath = this.$route.query.topath
                if(topath.indexOf('http') != -1){
                    let topathTmp = topath.indexOf('activityPage') != -1 ? `${topath.split('#')[0]}&Mtoken= ${this.$tool.getStorage('M-token')}`: topath
                    window.location.replace(`${topathTmp}`) 
                    this.submitBtn = false
                }else{
                    this.$router.replace({
                        path:`/${this.$route.query.topath}`
                    })
                    this.submitBtn = false
                }
            }).catch(error=>{
                this.submitBtn = false
                Toast(`${error.msg}`)
            })
        },
        validatorPhoneNum(){
            if(this.phoneNum){
                let reg = /^1[3456789]\d{9}$/
                if(!reg.test(this.phoneNum)){
                    // Toast('请填写正确的手机号')
                    this.CodeBtndisabled = true
                    this.CodeColor = '#C6C9D5'
                    this.submitBtn = true
                    this.submitBg = '#F2F3F7'
                    this.submitColor = '#C6C9D5'
                }else{
                    this.CodeBtndisabled = false
                    this.CodeColor = '#00A4FF'
                    if(this.VerificationCode){
                        this.submitBtn = false
                        this.submitColor = '#ffffff'
                        this.submitBg = '#00A4FF'
                    }
                }
            }
        },
        validatorCode(){
            console.log(1)
            if(this.VerificationCode){
                if(this.phoneNum){
                    let reg = /^1[3456789]\d{9}$/
                    if(reg.test(this.phoneNum)){
                        this.submitBtn = false
                        this.submitColor = '#ffffff'
                        this.submitBg = '#00A4FF'
                    }
                }
            }else{
                // Toast('请填写验证码')
                this.submitBtn = false
                this.submitColor = '#C6C9D5'
                this.submitBg = '#F2F3F7'
            }
        },
        runTimer(){
            console.log(123)
            this.getphoneCode()
            this.timer()
        },
        timer() {
            if (this.time > 0) {
                this.time--;
                this.CodeText = `已发送(${this.time}s)`;
                this.timeoutId = setTimeout(this.timer, 1000);
                this.CodeBtndisabled = true;
            } else {
                clearInterval(this.timeoutId);
                this.CodeText = "重新发送";
                this.CodeBtndisabled = false;
                this.time = 60
            }
        },
        getphoneCode(){
            let params={
                phone:this.phoneNum
            }
            getDetail('/api/tospurWeb/login/appLogin/sendMessage',params).then((res)=>{
                console.log(res)
            }).catch(error=>{
                Toast(`${error.msg}`)
            })
        }
    },
    created()   {
        
    },
    mounted() {

    }
};
</script>
<style lang='scss' scoped>
.login_warp {
    .log_main{
        padding: 0 40px;
        .log_top_text{
            font-size: 20px;
            line-height: 20px;
            color: #222222;
            font-weight: 700;
            padding-top: 19px;
        }

        .log_form{
            margin-top: 45px;
            color: #C8CAD6;
            .van-field{
                padding: 10px 0;
            }
            .van-cell:not(:last-child)::after{
                left: 0;
            }
            .van-button--primary{
                background-color:#ffffff;
                color: #C8CAD6;
                border: 0;
            }
            .log_YZM{
                margin-top: 10px;
                margin-bottom: 30px;
            }
            .van-field__control{
                background-color: #ffffff !important;
            }
            .van-button::before{
                background-color: #ffffff;
            }
        }
    }
}
</style>
