<template>
    <div class="panel-wrap">
      <h3>{{title}}</h3>
      <slot name="panel-slot">
      </slot>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'modal',
  props: {
    title: {
      type: String,
      default: '标题'
    }
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import '../../assets/css/mixin.styl';
  .panel-wrap
    & h3
      padding-left rpx(30)
      line-height rpx(70)
      font-size rpx(26)
      color #666666
</style>
