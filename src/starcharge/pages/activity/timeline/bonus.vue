<template>
    <div style="background: #543ad0">
      <Scroll>
        <Header></Header>
        <div class="activity-content">
          <div class="hongbao-box">
            <div class="half-circle">
              <h3>百万红包雨狂欢来袭</h3>
            </div>
            <div class="hongbao-center">
              <div class="yellow-bg">
                <p>活动期间，星星充电APP内不定期释放红包站点，每笔充电订单立返红包。</p>
                <img src="../../../assets/img/more.png" alt="红包站点">
              </div>
              <div class="rules">
                <p>a、活动仅限使用星星充电APP在红包站点充电；</p>
                <p>b、活动仅限使用个人支付（个人账户余额支付、实时支付）方式充电的订单，企业支付订单不参与活动；</p>
                <p>c、在红包站点完成充电后，即可获得该笔订单支付金额的50%作为服务费抵用券红包。</p>
              </div>
            </div>
          </div>
          <img src="../../../assets/img/moneybg.png" alt="" class="money-bg">
          <img src="../../../assets/img/hongbaofooter.png" alt="" class="hongbao-footer">
          <Footer></Footer>
        </div>
      </Scroll>
    </div>
</template>

<script type="text/ecmascript-6">
  import Header from '../components/header'
  import Footer from '../components/footer'
  import Scroll from '../../../components/scrollNew/scroll'
  export default {
    name: 'bonus',
    components: {
      Header,
      Footer,
      Scroll
    }
  };
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import '../../../assets/css/mixin.styl';
.activity-content
  /*height "calc(100% - %s)" % rpx(608)*/
  /*background-image url("../../../assets/img/moneybg.png")*/
  background-size 100%
  background-color #543ad0
  color #ffffff
  padding rpx(16) rpx(52) 0
  position relative
  box-sizing border-box
  .hongbao-box
    background: #f93662;
    /*height: 100%;*/
    border-radius: 20px;
    overflow: hidden
  .money-bg
    position: absolute;
    top: rpx(164);
    left: 0;
    right: 0;
    width: 100%;
  .hongbao-footer
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
  .half-circle
    background-color: #dc2a3b;
    border-radius: 0 0 58% 58%;
    padding-top: rpx(80);
    position: relative;
    top: rpx(-68);
    background-image url("../../../assets/img/bolang.png")
    background-size: 80%;
    background-repeat: no-repeat;
    background-position: 70% 72%;
  .hongbao-center
    position: relative;
    top: rpx(-84);
    padding 0 rpx(48) rpx(74)
    /*background-image url("../../../assets/img/moneybg.png")*/
  h3
    font-size $fontsize-large-xxxx
    padding-top rpx(52)
    padding-bottom rpx(100)
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
