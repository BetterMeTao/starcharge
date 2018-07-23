<template>
  <div class="pad40" >
    <div class="header-bg">
      <div class="flex-between">
        <div class="back" @click="$router.go(-1)"><img src="../../../assets/img/prev.png" alt=""></div>
        <div class="flex-center">
          <div class="share"><img src="../../../assets/img/fenxiang.png" alt="分享"></div>
          <div class="gift" :class="{'animated':animate ,'bounce':animate}" @click="gotoCoupon"><img src="../../../assets/img/liping.png" alt="我的奖品"></div>
        </div>
      </div>
    </div>
    <div class="time-line" :class="{'box-shadow': this.fixed }" :style="{top:-this.pos+'px'}" v-show="!this.fixed">
      <div class="flex-center">
        <!--<div class="line" style="width: 15%;">
          <span class="text" >08.15-08.19</span>
          <img src="../../../assets/img/hongbao.png" alt="红包活动" v-if="pageIndex == 0" class="animate-pos " :class="{'animated':animate ,'tada':animate}">
          <span v-else class="over">已结束</span>
        </div>-->
        <div class="line" style="width: 33.3%;">
          <span class="text" @click="changePage(0)">{{ starTime }}</span>
          <img src="../../../assets/img/starIcon.png" alt="点亮星灯" v-if="pageIndex===0&&!starOver" :class="{'animated':animate ,'rubberBand':animate}" class="animate-pos">
          <span v-if="starOver" class="over">已结束</span>
        </div>
        <div class="line" style="width: 33.3%;">
          <span class="text text-828" @click="changePage(1)">{{ lotteryTime }}<img src="../../../assets/img/fire.png" alt="火爆" class="animated pulse infinite animate-fire"></span>
          <img src="../../../assets/img/car.png" alt="抽奖" class="car-icon " v-if="pageIndex===1&&!lotteryOver" :class="{'animated':animate ,'lightSpeedIn':animate}" >
          <span v-if="lotteryOver" class="over">已结束</span>
        </div>
        <div class="line" style="width: 33.3%;"></div>
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
        pageIndex: 0,
        lotteryTime: '',
        starTime: '',
        starOver: false,
        lotteryOver: false
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
      this.showTime();
      // this.$root.userInfo.activityTime.lotteryActivityTime
      //   this.timerG = setInterval(() => {
      //   this.animate = !this.animate;
      // }, 2000)
    },
    methods: {
      showTextTime (timeStr) {
       let formatTimeStr = timeStr.replace(/-/g, '.');
       let formatExp = /\d{1,2}\.*\d{1,2}\B./g;
       return formatTimeStr.match(formatExp)[1]
        // formatExp.match(formatTimeStr)
        // formatTimeStr.split()
      },
      timeToS (dateTime) {
        return new Date(dateTime).getTime() / 1000;
      },
      showTime () {
        const lotteryTime = '2018-08-28 08:28:00--2018-08-28 22:38:59';
        const starTime = '2018-08-20 00:00:00--2018-08-27 23:59:59';
        const currentTime = '2018-08-28 17:07:00';
        // let timeExp=/^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/;
        let lotteryStartTime = lotteryTime.split('--')[0];
        let lotteryEndTime = lotteryTime.split('--')[1];
        let starStartTime = starTime.split('--')[0];
        let starEndTime = starTime.split('--')[1];
        if (this.showTextTime(lotteryStartTime) === this.showTextTime(lotteryEndTime)) {
          this.lotteryTime = this.showTextTime(lotteryStartTime)
        } else {
          this.lotteryTime = this.showTextTime(lotteryStartTime) + '-' + this.showTextTime(lotteryEndTime);
        }
        this.starTime = this.showTextTime(starStartTime) + '-' + this.showTextTime(starEndTime);
        this.starOver = this.timeToS(currentTime) > this.timeToS(starEndTime);
        this.lotteryOver = this.timeToS(currentTime) > this.timeToS(lotteryEndTime);
        // console.log('lotteryStartTime', lotteryStartTime, lotteryEndTime)
      },
      changePage (index) {
        this.$root.eventBus.$emit('changePage', index);
        // console.log(this.$refs)
      },
      gotoCoupon () {
        this.$router.push({
          name: 'coupons'
        })
      }
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
  .share,.gift,.back
    display inline-block
    padding 0 rpx(8)
    img
      height rpx(48)
      display block

</style>
