<template>
  <div class="coupon_cord">
    <div @click="toMyCard">
      <img :src="couponCordImg" alt="优惠券" />
    </div>
  </div>
</template>

<script>
import { getDetail } from "@/apiOptions/home_api.js";
export default {
  name: "couponCord",
  components: {},
  data() {
    return {
      couponCordImg: require("@/assets/img/coupon.png")
    };
  },
  computed: {},
  watch: {},
  methods: {
    toMyCard() {
      this.checkLogin();
    },
    checkLogin() {
      getDetail("/tospurWeb/pclogin/checkLogin", {
        token: this.$tool.getToken()
      })
        .then(res => {
          console.log(res);
          if (res) {
            this.$router.push({
              path: "/mycard"
            });
          }
        })
        .catch(err => {
          console.log("未登录或登录过期", err);
          console.log(err.code);
          if (err.code == 1) {
            this.$router.push({
              path: "/login",
              query: {
                topath: "mycard"
              }
            });
          }
        });
    }
  }
};
</script>

<style lang='scss' scoped>
.pc .coupon_cord {
  left: 50%;
  transform: translateX(5rem);
}
.coupon_cord {
  position: fixed;
  bottom: 60px;
  right: 13px;
  img {
    width: 64px;
    height: 64px;
  }
}
</style>
