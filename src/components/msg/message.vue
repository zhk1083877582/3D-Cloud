<template>
    <div class="message">
        <p class="msg_warp">
            <i><img src="@/assets/img/msg.png" alt=""></i>
            <i><img src="@/assets/img/mine.png" alt=""></i>
        </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        };
    },
    props:{
        
        
    },
    computed: {},
    watch: {},
    methods: {
        
    },
    created() {
    
    },
    mounted() {
    
    },
}
</script>

<style lang="scss" scoped>
.msg_warp{
    display: flex;
    flex-direction: column;
    position: fixed;
    bottom: 75px;
    right: 15px;
    i:first-child{
        margin-bottom: 15px;
    }
    i{
        width: 36px;
        height: 36px;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>