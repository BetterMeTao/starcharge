<template>
  <div>
    <div class="header-bg">
      <div class="flex-end">
        <div class="share"><img src="../../../assets/img/fenxiang.png" alt="分享"></div>
        <div class="gift" :class="{'animated':animate ,'bounce':animate}"><img src="../../../assets/img/liping.png" alt="我的奖品"></div>
      </div>
    </div>
    <div class="time-line" :class="{'fixedLine':this.fixed,'box-shadow': this.fixed }" :style="{top:-this.pos+'px'}" v-show="!this.fixed">
      <div class="flex-center">
        <div class="line" style="width: 15%;">
          <span class="text" >08.15-08.19</span>
          <img src="../../../assets/img/hongbao.png" alt="红包活动" v-if="pageIndex == 0" class="animate-pos " :class="{'animated':animate ,'tada':animate}">
          <span v-else class="over">已结束</span>
        </div>
        <div class="line" style="width: 35%;">
          <span class="text" >08.20-08.27</span>
          <img src="../../../assets/img/starIcon.png" alt="点亮星灯" v-if="pageIndex == 1" :class="{'animated':animate ,'rubberBand':animate}" class="animate-pos">
          <span v-if="pageIndex > 1" class="over">已结束</span>
        </div>
        <div class="line" style="width: 35%;">
          <span class="text text-828">08.28 <img src="../../../assets/img/fire.png" alt="火爆" class="animated pulse infinite animate-fire"></span>
          <img src="../../../assets/img/car.png" alt="抽奖" class="car-icon " v-if="pageIndex == 2" :class="{'animated':animate ,'lightSpeedIn':animate}" >
        </div>
        <div class="line" style="width: 15%;"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      fixed: {
        type: Boolean,
        default: false
      },
      pos: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        animate: true,
        pageIndex: 0
      }
    },
    watch: {
      // fixed (newVal, oldVal) {
      //   if (newVal) {
      //
      //   }
      //   console.log(newVal, oldVal)
      // }
    },
    mounted () {
      this.$root.eventBus.$on('scrollEnd', (res) => {
        this.pageIndex = res;
      });
      //   this.timerG = setInterval(() => {
      //   this.animate = !this.animate;
      // }, 2000)
    },
    beforeDestroy () {
      this.$root.eventBus.$off('scrollEnd')
      // clearInterval(this.timerG)
      // console.log(this.timerG)
    }
  };
</script>

<style scoped rel="stylesheet/stylus" lang="stylus">
  @import '../../../assets/css/mixin.styl';
.fixedLine
  position absolute!important
  left 0
  right 0
  top: 0
  z-index 999
.header-bg
  height rpx(388)
  background-color #543ad0
  background-image url("../../../assets/img/headerBg.png")
  background-size cover
  text-align right
  padding rpx(20)
  .share,.gift
    display inline-block
    padding 0 rpx(8)
    img
      width rpx(48)
      display block

</style>
