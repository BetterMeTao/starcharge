<template>
    <div>
      <p class="footer">本次活动最终解释权归星星充电所有，如有疑问请咨询客服。</p>
    </div>
</template>

<script>
    export default {
        name: 'footer'
    };
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import '../../../assets/css/mixin.styl';
  .footer
    padding rpx(30) 0
    font-size 12px
    color: #ffffff
    position absolute
    bottom rpx(20)
    left:0
    right 0
</style>
