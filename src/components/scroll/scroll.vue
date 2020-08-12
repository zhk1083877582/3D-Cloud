
<template>
  <div ref="wrapper">
    <div class="slotWrap">
        <slot></slot>
    </div>
  </div>
</template>

<script>
    // 导入滚动库
  import BScroll from 'better-scroll';

  const DIRECTION_H = 'horizontal';
  const DIRECTION_V = 'vertical';
  const BOUNCE = {
    top: true,
    bottom: true,
    left: true,
    right: true
  };
  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: false
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: null
      },
      pullup: {
        type: Boolean,
        default: false
      },
      pulldown: {
        type: Boolean,
        default: false
      },
      beforeScroll: {
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      },
      direction: {
        type: String,
        default: DIRECTION_V
      },
      bounce: {
        type: Object,
        default: () => {
          return BOUNCE;
        }
      },
      scrollToEndFlag: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      // 20毫秒后执行，因为浏览器刷新通常17毫秒
      setTimeout(() => {
        this._initScroll();
      }, 20);
    },
    methods: {
        // 初始化滚动条
      _initScroll() {
        if (!this.$refs.wrapper) {
          return;
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          scrollX: this.direction === DIRECTION_H,
          bounce: this.bounce,
          eventPassthrough: this.direction === DIRECTION_V ? DIRECTION_H : DIRECTION_V
        });
        // 监听滚动，派发滚动事件。
        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            this.$emit('scroll', pos);
          });
        }
        // 己经滚动到底部后，派发scrollToEnd事件，告诉调用方己滚动到底部了
        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd');
            }
          });
        }
        if (this.pulldown) {
          this.scroll.on('touchEnd', () => {
            if (this.scroll.y > 50) {
              this.$emit('pulldown');
            }
          });
        }

        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll');
          });
        }
      },
      scrollToEnd() {
        if (this.scrollToEndFlag) {
          this.scroll.scrollTo(0, this.scroll.maxScrollY)
        }
      },
      disable() {
        this.scroll && this.scroll.disable();
      },
      enable() {
        this.scroll && this.scroll.enable();
      },
      refresh() {
        this.scroll && this.scroll.refresh();
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
      },
      getY() {
        return this.scroll && this.scroll.y;
      }

    },
    watch: {
      data() {
        // 20毫秒后执行，因为浏览器刷新通常17毫秒
        setTimeout(() => {
          this.refresh();
        }, this.refreshDelay);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .slotWrap{
    padding-bottom: 10px;
  }
</style>
