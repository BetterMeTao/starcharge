<template>
    <div class="sc-empty-wrap">
      <span>-- {{content}} --</span>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'empty',
  data () {
    return {
      showMes: ''
    }
  },
  props: {
    content: {
      type: String,
      default: '空空如野！'
    }
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import '../../assets/css/mixin.styl';
  .sc-empty-wrap
    position absolute
    width 100%
    height 100%
    top 0
    left 0
    bottom 0
    display flex
    justify-content center
    align-items center
    font-size rpx(32)
    color #ff9f3a
</style>
