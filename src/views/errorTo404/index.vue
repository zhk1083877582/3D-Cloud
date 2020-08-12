<!--  -->
<template>
<div class='error_404'>
    <div></div>
    <p>未找到页面</p> 
    <router-link to="/Home">
        <button>
            返回首页
        </button>   
    </router-link> 
</div>
</template>

<script>

export default {
components: {},
data() {
return {
    count:''
};
},
computed: {},
watch: {},
methods: {
    clickJump(){
        const timejump = 3;
        if(!this.timer){
            this.count = timejump ;
            this.show = false;
            this.timer = setInterval(()=>{
            if(this.count > 0 && this.count <= timejump ){
                this.count--;
            }else{
                this.show = true;
                clearInterval(this.timer);
                this.timer = null;
                this.$router.replace({path: '/Home'});
            }
            },1000)
        }
    },

},
created() {
    // this.clickJump()
},
mounted() {

},
beforeCreate() {}, 
beforeMount() {}, 
beforeUpdate() {}, 
updated() {}, 
beforeDestroy() {}, 
destroyed() {},
activated() {}, 
}
</script>
<style lang='scss' scoped>
.error_404{
    background: url(../../assets/img/404@2x.png) no-repeat;
    background-size: 121px 163px;
    background-position: center;
    p{
        padding-top: 218px;
        text-align: center;
        font-size: 13px;
        color: #999999;
    }
    a{
        position: absolute;
        top: 320px;
        left: 50%;
        transform: translate(-50%, -50%);
        
        button{
            width: 140px;
            height: 38px;
            display: block;
            color: #FFFFFF;
            border: 0;
            border-radius: 2px;
            background-color: #00A4FF;
        }
    }
    
}
</style>