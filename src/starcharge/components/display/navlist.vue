<template>
  <div class="sc-navlist">
    <div v-for="(child, index) in checkGp" :key="`checkGp${index}`" class="nav-child" v-show="child.visible" @click.prevent.stop="toggleChecked(index)">
      <div class="nav-name">
        <i v-if="child.icon" :class="child.icon"></i>
        <strong v-if="child.title">{{child.title}}</strong>
        <span v-if="child.content">{{child.content}}</span>
      </div>
      <div :class="`radio ${setActived(index)}`">
        <span :class='isDisabled(index)'><i></i></span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'nav-list',
    data () {
      return {
        limitIndex: 0
      }
    },
    props: {
      checkIndex: {
        type: Number,
        default: 0
      },
      disabledIndex: {
        type: Number,
        default: -1
      },
      checkGp: {
        type: Array,
        default: () => []
      },
      checkType: {
        type: String,
        default: 'item'
      }
    },
    mounted () {
      this.limitIndex = this.checkIndex;
    },
    methods: {
      setActived (index) {
        return index === this.checkIndex ? ' active' : '';
      },
      toggleChecked (index) {
        if (this.disabledIndex > 0 && index === this.disabledIndex) {
          return;
        }
        index >= this.limitIndex &&
        this.$emit('toggleChecked', index);
      },
      isDisabled (index) {
        let flag = this.limitIndex > index ? 'disabled' : '';
        this.disabledIndex > 0 && this.disabledIndex === index && (flag = 'disabled');
        return flag;
      }
    }

  }
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import '../../assets/css/mixin.styl';
  .sc-navlist
    .nav-child
      display flex
      font-size rpx(28)
      height rpx(120)
      justify-content space-between
      align-items center
      border-bottom rpx(1) solid #edecec
      padding 0 rpx(30)
      .nav-name
        display flex
        height rpx(120)
        line-height rpx(120)
        align-items center
        & i
          display inline-block
          width rpx(40)
          height rpx(40)
          margin-right rpx(20)
          &.alipay
            background url("../../assets/img/pay_01.png") no-repeat
            background-size 100% 100%
          &.wechat
            background url("../../assets/img/pay_02.png") no-repeat
            background-size 100% 100%
        & span
          margin-left rpx(40)
          color #ccc
      .radio
        & span
          display flex
          width 18px
          height 18px
          border 2px solid #ccc
          border-radius 50%
          justify-content center
          align-items center
          margin-right rpx(22)
          &.disabled
            border-color #f2f2f2
          & i
            display none
            width 14px
            height 14px
            background-color #ccc
            border-radius 50%
        &.active
          border-color #f97624
          & span
            border-color #f97624
            & i
              display block
              background-color #f97624

</style>
