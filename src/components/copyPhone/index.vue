<template>
  <div class="copyPhone">
    <div class="tanbg">
      <div class="phoneCopy">
        <div class="cuo" @click="close">×</div>
        <div class="phoneTit">当前浏览器不支持，请复制号码拨打</div>
        <div class="phone">{{tel400}}</div>
        <div class="copyText" @click="copyValue">点击复制号码</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast } from 'vant';
Vue.use(Toast);
export default {
  name: "copyPhone",
  props: ["tel400"],
  components: {},

  data() {
    return {
      closeUp:true
    };
  },
  computed: {},
  watch: {},
  methods: {
    copyValue() {
      let url = this.tel400;
      let oInput = document.createElement("input");
      oInput.value = url;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;
      console.log(oInput.value);
      document.execCommand("Copy"); // 执行浏览器复制命令
      this.close();
      Toast('复制成功去拨打电话');
      oInput.remove();
    },
    close(){
      this.closeUp = false;
      this.$emit('close', this.closeUp);
    }
  }
};
</script>

<style lang='scss' scoped>
.tanbg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.phoneCopy {
  background: #fff;
  width: 80%;
  padding: 20px 20px 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
.cuo {
  font-size: 25px;
  color: #999;
  position: absolute;
  top: 5px;
  right: 10px;
}
.phoneTit {
  font-size: 14px;
  color: #999;
  line-height: 1.5;
  text-align: center;
  padding-top: 20px;
}
.phone {
  font-size: 16px;
  color: #666;
  line-height: 1.2;
  text-align: center;
  margin-top: 20px;
}

.copyText {
  width: 100px;
  font-size: 14px;
  color: #fff;
  background: #ff5c00;
  border-radius: 5px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  margin: 20px auto;
}
</style>
