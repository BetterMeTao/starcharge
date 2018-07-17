<template>
    <div>
        <div class="activity-content">
          <h3>百万红包雨狂欢来袭</h3>
          <div class="yellow-bg">
            <p>活动期间，星星充电APP内不定期释放红包站点，每笔充电订单立返红包。</p>
            <img src="../../../assets/img/more.png" alt="红包站点">
          </div>
          <div class="rules">
            <p>a、活动仅限使用星星充电APP在红包站点充电；</p>
            <p>b、活动仅限使用个人支付（个人账户余额支付、实时支付）方式充电的订单，企业支付订单不参与活动；</p>
            <p>c、在红包站点完成充电后，即可获得该笔订单支付金额的50%作为服务费抵用券红包。</p>
          </div>
          <Footer></Footer>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import Header from '../components/header'
  import Footer from '../components/footer'
  export default {
    name: 'bonus',
    components: {
      Header,
      Footer
    }
  };
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import '../../../assets/css/mixin.styl';
.activity-content
  /*height "calc(100% - %s)" % rpx(528)*/
  height 100%
  background-image url("../../../assets/img/hongbaobg.png")
  background-size 100% 100%
  background-color #543ad0
  color #ffffff
  padding 0 rpx(124)
  position relative
  h3
    font-size $fontsize-large-xxxx
    padding-top rpx(72)
    padding-bottom rpx(52)
  .rules
    padding-top rpx(50)
    p
      font-size $fontsize-medium
      text-shadow rgba(141, 20, 47, 0.5) 2px 4px 4px
      word-wrap break-word;
      white-space normal;
      line-height 1.6;
      text-align left
  .yellow-bg
    background-color #fff100
    height rpx(80)
    width rpx(496)
    border-radius 36px
    box-shadow 3px 16px 29px -8px rgba(141,20,47,0.5)
    margin auto
    position relative
    p
      font-size $fontsize-small
      color #920783
      padding rpx(10) rpx(42);
      word-wrap break-word;
      white-space normal;
      line-height 1.3;
    img
      height rpx(40)
      width rpx(24)
      position absolute
      top rpx(20)
      right rpx(18)
      z-index 99
</style>
