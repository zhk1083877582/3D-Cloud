<template>
  <div>
    <div class="consultation_foot">
      <div class="consultation_icon" @click="changeCollection">
        <i class="iconfont iconfavorite_line" v-show="!isCollection"></i>
        <i class="iconfont iconfavorite_surface" v-show="isCollection"></i>
      </div>
      <van-button class="Collection_floot" @click="consultBtn" type="default" color="#00A4FF">
        <span>咨询售楼部</span>
        <span class="text_num">保护你的真实号码</span>
      </van-button>
      <van-button
        class="Collection_me"
        type="default"
        color="#FF714B"
        @click="showdialog = true"
      >我要咨询</van-button>
    </div>
    <van-popup v-model="showdialog" class="M_popup" :close-on-click-overlay="false">
      <div class="popup_main">
        <div class="title">我要咨询</div>
        <van-field
          class="popup_input"
          name="name"
          v-model="name"
          placeholder="请输入姓名"
          input-align="center"
        />
        <van-field
          class="popup_input"
          name="telNum"
          v-model="telNum"
          type="tel"
          placeholder="请输入手机号码"
          input-align="center"
        />
      </div>
      <div class="popup_btn">
        <van-button class="left_btn" type="default" @click="handleCancel">取消</van-button>
        <van-button class="right_btn" type="default" @click="handleConfirm">确定</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Vue from "vue";
import { Dialog, Button, Form, Field, Toast, Popup } from "vant";
Vue.use(Button)
  .use(Dialog)
  .use(Form)
  .use(Field)
  .use(Popup);
export default {
  data() {
    return {
      showdialog: false,
      name: "",
      telNum: ""
    };
  },
  props: ["isCollection"],
  computed: {},
  watch: {
    isCollection: {
      handler(val) {
        this.isCollection = val;
      }
    }
  },
  methods: {
    consultBtn() {
      this.$emit("consultBtn");
    },
    changeCollection() {
      this.$emit("changeCollection", !this.isCollection);
      // this.isCollection = !this.isCollection
    },
    asyncValidator() {},
    handleCancel() {
      this.name = "";
      this.telNum = "";
      this.showdialog = false;
      return;
    },
    handleConfirm() {
      let reg = /^1[3456789]\d{9}$/;
      if (this.name == "") {
        Toast("请输入名字");
        return;
      }
      if (this.telNum == "") {
        Toast("请输入手机号");
        return;
      } else {
        if (!reg.test(this.telNum)) {
          Toast("请填写正确的手机号");
          return;
        }
      }
      let params = {
        data: {
          name: this.name,
          telNum: this.telNum
        }
      };
      this.$emit("consultConfirm", params);
      this.name = "";
      this.telNum = "";
      this.showdialog = false;
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
.consultation_foot {
  background: #fff;

  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.06);
  padding: 5px 15px;
  display: flex;
  justify-content: space-between;
  max-width: 750PX; 
  margin: 0 auto;
  .consultation_icon {
    width: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    .iconfont {
      font-size: 25px;
    }
    .iconfavorite_surface {
      color: #ff714b;
    }
  }
  .Collection_floot {
    .van-button__text {
      display: flex;
      flex-direction: column;
      line-height: 1;
      .text_num {
        margin-top: 1px;
        font-size: 9px;
      }
    }
  }
  .van-button {
    width: 140px;
    height: 38px;
    font-size: 14px;
    font-weight: 700;
    line-height: 38px;
    margin-left: 10px;
  }
}
.M_popup {
  width: 320px;
  border-radius: 12px;
  overflow-y: hidden;
  .popup_main {
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    /deep/.van-cell::after {
      border-bottom: 0px;
    }
    .title {
      font-size: 17px;
      color: #000;
      line-height: 24px;
      text-align: center;
      padding: 25px 0;
      font-weight: 700;
    }
    .van-cell {
      padding: 0;
    }
    .popup_input {
      width: 239px;
      border: 1px solid #dcdcdc;
      border-radius: 44px;
      height: 44px;
      line-height: 44px;
      margin: 0 40px;
      margin-bottom: 10px;
      .van-field__control {
        height: 28px;
        line-height: 28px;
      }
    }
  }
  .popup_btn {
    display: flex;
    justify-content: space-between;
    .van-button {
      height: 55px;
      flex: 1;
      border: 0;
      font-weight: 700;
      font-size: 17px;
    }
    .left_btn {
      border-right: 1px solid rgba(0, 0, 0, 0.1);
    }
    .right_btn {
      color: #00a4ff;
    }
  }
}
</style>