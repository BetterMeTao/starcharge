<template>
  <div class="couponPage">
    <!--<div class="header-content"><img src="../../../assets/img/prev.png" alt="" ><span>我的828</span></div>-->
    <div class="page-content">
      <Scroll>
        <CouponItem></CouponItem>
        <CouponItem></CouponItem> <CouponItem></CouponItem>
        <CouponItem></CouponItem> <CouponItem></CouponItem>
        <CouponItem></CouponItem> <CouponItem></CouponItem>
        <CouponItem></CouponItem> <CouponItem></CouponItem>
        <CouponItem></CouponItem> <CouponItem></CouponItem>
        <CouponItem></CouponItem>
      </Scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import CouponItem from '../components/couponItem'
  import Scroll from '../../../components/scrollNew/scroll'
  export default {
    name: 'coupons',
    components: {
      CouponItem,
      Scroll
    }
  };
</script>

<style scoped rel="stylesheet/stylus" lang="stylus">
  @import '../../../assets/css/mixin.styl';
.couponPage
  background #f7f7f7
  padding rpx(20) rpx(30)
  box-sizing border-box
  height 100%
  .header-content
    height rpx(132)
    line-height rpx(132)
    background #fc9533
    text-align center
    color: #ffffff
    font-size $fontsize-large-x
    position relative
    img
      width rpx(22)
      height rpx(40)
      position absolute
      left rpx(30)
      top 50%
      transform translateY(-50%)
  .page-content
    height 100%
</style>
