<template>
<div>
  <Scroll ref="scroll" :probeType="3" :listenScroll="true" @scroll="fixTimeline">
      <Header :fixed="fixedLine" :pos="posY"></Header>
      <div class="raffle-item">
        <p class="title">疯狂828、全民免费充!</p>
        <div class="flower-box">
          <p>a、活动期间，星星充电APP用户享受<span class="important">0元充电</span>；</p>
          <p>b、活动不限支付方式、不限充电次数、不限个人或企业身份；</p>
        </div>
      </div>
      <div class="raffle-item qipao">
        <p class="title">充值狂欢，返的比充的多!</p>
        <div class="flower-box">
          <p class="info">通过星星充电APP充电满<span class="important">10度</span>即可参与充值返券活动；</p>
          <div class="btn-box">
            <p class="ruleBtn">充值规则</p>
            <p class="tip">每用户仅限一次</p>
          </div>
          <div class="flex-between">
            <div class="hongbao">
              <div class="price flex-column-between"><p>充值188元返</p><p class="num">188</p><p>抵用券</p></div>
              <div class="pay">去充值</div>
            </div>
            <div class="hongbao">
              <div class="price flex-column-between"><p>充值1188元返</p><p class="num fourNum">1288</p><p>抵用券</p></div>
              <div class="pay">去充值</div>
            </div>
            <div class="hongbao">
              <div class="price flex-column-between"><p>充值2388元返</p><p class="num fourNum">2588</p><p>抵用券</p></div>
              <div class="pay">去充值</div>
            </div>
          </div>
          <p class="text-tip">（仅当天充值有效，返还抵用券限自营电站使用）</p>
        </div>
      </div>
      <div class="raffle-item qipao-bottom">
        <p class="title">中奖百分百，汽车开回家!</p>
        <div class="flower-box no-pad" >
          <div class="padBox">
            <p class="info">活动期间，使用星星充电APP充电，8月28日当天完成一次充电即可参与抽奖。</p>
            <div class="btn-box">
              <p class="Quartz-Mdm">00:23:12</p>
              <p class="ruleBtn">抽奖规则</p>
            </div>
            <div class="scratch-prize flex-column-between">
              <p class="tip">幸运大抽奖 汽车开回家</p>
              <div class="guajiang-btn">点击刮奖</div>
            </div>
          </div>
          <div class="swiper-gift ">
            <img src="../../../assets/img/prev.png" alt="" class="prev"  @click="$refs.smSlide.prev()">
            <slide ref="smSlide" :showDot="false" :autoPlay="false" :showPrev="true" :showNext="true" :allowEmit="false">
              <div v-for="(slideItem,slideindex) in slideData" :key="slideindex" class="flex-between">
                <div class="giftBox flex-column-between" v-for="(giftItem,giftIndex) in slideItem" :key="giftIndex">
                  <p>{{ giftItem.text }}</p>
                  <img :src="giftItem.picUrl" alt="">
                </div>
              </div>
            </slide>
            <img src="../../../assets/img/qianjin.png" alt="" class="next"  @click="$refs.smSlide.next()">
          </div>
        </div>
        <Footer></Footer>
      </div>
  </Scroll>
</div>
</template>

<script type="text/ecmascript-6">
  import Header from '../components/header'
  import Footer from '../components/footer'
  import Slide from '../../../components/slide/slide.vue'
  import beiqi from '../../../assets/img/beiqi.png'
  import list from '../../../components/scroll/list'
  import Scroll from '../../../components/scrollNew/scroll'
  export default {
    name: 'raffle',
    data () {
      return {
        fixedLine: false,
        posY: 0,
        slideData: [
          [{picUrl: beiqi, text: '北汽EV300'},
          {picUrl: beiqi, text: '充电桩'},
          {picUrl: beiqi, text: 'GOFUN抵用券'}],
          [{picUrl: beiqi, text: '北汽EV300'},
            {picUrl: beiqi, text: '充电桩'},
            {picUrl: beiqi, text: 'GOFUN抵用券'}]
          ]
      }
    },
    components: {
      Header,
      Slide,
      Footer,
      list,
      Scroll
    },
    mounted () {

    },
    methods: {
      fixTimeline (pos) {
          this.fixedLine = pos.y <= -194;
          this.posY = pos.y <= -194 ? pos.y : 0
      }
      // getStyle (index) {
      //   return `background-image:url(${this.slideData[index].picUrl})`
      // }
    }
  };
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import '../../../assets/css/mixin.styl';
  .raffle-item
    /* height rpx(368)*/
    background-color #543ad0
    background-image url("../../../assets/img/henfu.png")
    background-repeat no-repeat
    background-size 100%
    padding rpx(24) rpx(30) rpx(6)
    background-position rpx(-30) rpx(30)
    color #ffffff
    font-size $fontsize-medium
    .ruleBtn
      background #fff45c;
      display inline-block;
      padding rpx(8) rpx(32);
      border-radius: 16px;
      box-shadow 2px 6px 20px -3px rgba(120,17,40,0.5);
      color #543ad0;
      font-size $fontsize-medium;
    .important
      color #fff100
      font-size $fontsize-large-xx
    .title
      padding: rpx(28) 0 rpx(56) rpx(88);
    img
      width 100%
    .flower-box
      width rpx(640)
      margin auto
      background-color #f93662
      background-image  url("../../../assets/img/flower.png")
      background-position right bottom;
      background-size rpx(100)
      background-repeat no-repeat;
      border-radius 8px
      padding rpx(24)
      line-height 1.4
      .padBox
        padding rpx(24)
      p
        white-space normal
        word-break break-all
        text-align left
      .text-tip
        font-size 12px
        padding rpx(20) 0
        text-align center
      .info
        background #fa5e81;
        border-radius rpx(8);
        padding rpx(14) rpx(30);
      .tip
        text-align center;
        font-size $fontsize-small;
        color: #fff100;
        padding: rpx(16) 0;
      .btn-box
        padding rpx(20) 0
        .Quartz-Mdm
          font-family 'QuartzMdm'
          font-size $fontsize-big
          font-weight bold
          text-align center
          padding-bottom rpx(18)
      .hongbao
        background-image url("../../../assets/img/hongbaokapian.png")
        background-size 100% 100%
        height rpx(230)
        width rpx(190);
        .price
          color: #fd3e16;
          font-size: 12px;
          height rpx(156)
          padding: rpx(20) 0;
          line-height 1
          margin-bottom rpx(20)
          p
            text-align center
          .num
            font-size $fontsize-big
          .fourNum
            font-size $fontsize-large-xxxxx
        .pay
          background: #fedc99;
          display: inline-block;
          padding: rpx(4) rpx(24);
          border-radius: 16px;
          font-size: rpx(24);
          color: #fd3e16;

      .scratch-prize
        height rpx(284)
        width rpx(490)
        background-image url("../../../assets/img/guajiang.png")
        background-size 100% 100%
        margin rpx(18) auto 0
        padding rpx(30) 0
        .tip
          color: #eb6100
          font-size $fontsize-large-x
          text-align center
          padding rpx(30) 0
      .guajiang-btn
        background-image url("../../../assets/img/guajiangjianbian.png")
        background-size 100% 100%
        height rpx(62)
        width rpx(304)
        font-size $fontsize-medium
        text-align center
        line-height rpx(62)
        margin auto
      .swiper-gift
        background-color rgba(103, 103, 103, 0.24)
        padding rpx(36) rpx(52)
        /*margin-bottom rpx(60)*/
        position relative
        .prev
          width: rpx(28);
          height: rpx(46);
          position: absolute;
          z-index: 1000;
          left: rpx(26);
          top: 50%;
          transform: translateY(-50%);
        .next
          width: rpx(28);
          height: rpx(46);
          position: absolute;
          z-index: 1000;
          right: rpx(26);
          top: 50%;
          transform: translateY(-50%);
        .giftBox
          height rpx(192)
          width rpx(146)
          background-color #b32646
          padding rpx(20) rpx(20)
          font-size 12px
          border-radius 8px
          margin 0 rpx(16)
          p
            padding-bottom rpx(18)
    .no-pad
      padding 0
  .qipao
    background-image url("../../../assets/img/henfu.png"),url("../../../assets/img/qipao.png")
    background-position rpx(-30) rpx(30),0 rpx(316)
  .qipao-bottom
    background-image url("../../../assets/img/henfu.png"),url("../../../assets/img/qipao.png")
    background-position rpx(-30) rpx(30),left bottom
    padding-bottom rpx(100)
    position relative
</style>
