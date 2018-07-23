<template>
  <div class="couponPage">
    <!--<div class="header-content"><img src="../../../assets/img/prev.png" alt="" ><span>我的828</span></div>-->
    <div class="page-content">
      <Scroll>
        <CouponItem v-for="(item,index) in couponList" :key="index" :item="item"></CouponItem>
      </Scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import CouponItem from '../components/couponItem'
  import Scroll from '../../../components/scrollNew/scroll'
  import {getCoupons} from '../../../mock/mock';
  import qs from 'qs';
  export default {
    name: 'coupons',
    data () {
      return {
        couponList: []
      }
    },
    components: {
      CouponItem,
      Scroll
    },
    mounted () {
      this.getCouponList()
    },
    methods: {
      // 获取抵用券列表
      async getCouponList () {
        const dataParam = {
          userId: '',
          voucherType: null, // 传空查询所有类型的抵用券
          isUsedOrOverdue: 0,
          activityType: 1
        };
        // 处理axios post java后台接受不到参数
        const params = qs.stringify(dataParam);
        try {
          const resData = await getCoupons(params);
          if (resData.data.code === '200') {
            this.couponList = resData.data.data;
           console.log('11111111111111')
          } else {
            console.log('222222222222')
          }
        } catch (e) {
          console.log(e);
        }
      }
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
