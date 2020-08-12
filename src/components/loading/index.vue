<template>
    <div class="loading" :class="{'isLoading':isLoading == true}">
        <div class="center">
            <div class="cf4a">
                <img class="iamge1" src="@/assets/img/01.png" />
                <img class="iamge2" src="@/assets/img/02.png" />
                <img class="iamge3" src="@/assets/img/03.png" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'loading',
    props:['isLoading'],
    data(){
        return {
        }
    },
    created(){
        console.log("this.isLoading4")
        console.log(this.isLoading)
    }
}
</script>



<style lang='scss' scoped>
.loading{
    .center {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .iamge2,
    .iamge3,
    .iamge4 {
        opacity: 0;
        position: absolute;
        top: 0px;
        left: 0px;
        height: 100%;
        width: 100%;
    }
    
    @keyframes cf4FadeInOut {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
    }
    
    .cf4a {
        position: relative;
        margin: 0 auto;
        overflow: hidden;
        width: 40px;
        height: 40px;
        margin-top: 10px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    
    .iamge1 {
        animation-name: cf4FadeInOut;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
        animation-duration: .45s;
        animation-direction: alternate;
    }
    
    .iamge2 {
        animation-name: cf4FadeInOut;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
        animation-delay:.45s;
        animation-duration: .65s;
        animation-direction: alternate;
    }
    
    .iamge3 {
        animation-name: cf4FadeInOut;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
        animation-delay:.65s;
        animation-duration: .85s;
        animation-direction: alternate;
    }
}
.isLoading{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 999999;
}
</style>
