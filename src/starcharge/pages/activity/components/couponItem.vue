<template>
  <div class="coupon-item">
    <div class="top flex-center">
      <img src="../../../assets/img/shouqi.png" alt="首汽共享汽车" class="logo">
      <div class="text">
        <h3>gofun优惠券 <span class="status blue-bg">使用中</span></h3>
        <p><span style="font-weight: bold">· </span>券码：32089765643521679987761111111116</p>
        <p><span style="font-weight: bold">· </span>gofun APP使用</p>
      </div>
      <div class="faceVal">
        <h3 class="price green font-48"><span>￥</span>100</h3>
        <!--<p class="red raffle">抽奖奖品</p>-->
        <p class=" raffle">总额 500元</p>
      </div>
    </div>
    <div class="bottom">
      <p class="">有效期 2017.04.08-2018.04.08</p>
    </div>
  </div>
</template>

<script>
  export default {

  };
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import '../../../assets/css/mixin.styl';
.coupon-item
  color: #999999
  background-image url("../../../assets/img/bgcard.png")
  background-size 100% 100%
  padding-bottom: rpx(12);
  background-origin: content-box;
  background-repeat: no-repeat;
  /*background #fff;
  box-shadow 0 3px 14px rgba(0, 0, 0, 0.1);*/
 /* border-radius 5px*/
  .top
    padding rpx(26) rpx(32)
    position relative
    /*&:after
      content ''
      position absolute
      bottom 0
      right 0
      height rpx(36)
      width rpx(36)
      border-radius 100%
      background #f7f7f7*/
    .text
      line-height 1.5
      font-size $fontsize-small
      flex: 1;
      padding: 0 rpx(20);
      box-sizing: border-box;
      overflow: hidden;
      white-space: nowrap;
      word-wrap: break-word;
      .status
        font-size $fontsize-small
        color: #ffffff
        display inline-block
        padding rpx(4) rpx(16)
        border-radius 20px
      h3
        font-size $fontsize-large-34
        font-weight bold
        color: #333333
        padding 0 0 rpx(14)
    .logo
      width rpx(114)
    .faceVal
      width rpx(126)
      text-align center
      line-height 1.5
      .price
        font-weight bold
        span
          font-size $fontsize-xm
      .raffle
        font-size $fontsize-small

  .bottom
    padding 0 rpx(32)
    font-size $fontsize-small
    p
      padding: rpx(26) 0 rpx(30);
</style>
