<template>
    <div class="sc-nav">
      <div v-for="(child, index) in checkGp" :key="`checkGp${index}`" class="nav-child" v-show="child !== '电子发票'">
        <div :class="`item-wrap ${checkType}` + setActived(index)" @click.prevent.stop="toggleChecked(index)">
          <span v-if="`${checkType} === radio`"><i></i></span>{{child}}
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: 'check-nav',
      data () {
        return {
        }
      },
      props: {
        checkIndex: {
          type: Number,
          default: 0
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
      computed: {
      },
      methods: {
        setActived (index) {
          return index === this.checkIndex ? ' active' : '';
        },
        toggleChecked (index) {
          this.$emit('toggleChecked', index);
        }
      }

    }
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import '../../assets/css/mixin.styl';
    .sc-nav
      display flex
      .nav-child
        display inherit
        flex 1
        font-size rpx(28)
        padding rpx(20) rpx(30)
        .item-wrap
          display inherit
          width 100%
          justify-content center
          align-items center
          line-height rpx(80)
          cursor pointer
          box-sizing border-box
          &.button
            color #a3a3a3
            border 1px solid #a3a3a3
          &.active
            border 1px solid #f97624
            color #f97624
          &.radio
            & span
              display flex
              width 18px
              height 18px
              border 2px solid #ccc
              box-sizing border-box
              border-radius 50%
              justify-content center
              align-items center
              margin-right rpx(22)
              & i
                display none
                width 10px
                height 10px
                background-color #ccc
                border-radius 50%
            &.active
              border rpx(1) solid #fff
              & span
                border-color #f97624
                & i
                  display block
                  background-color #f97624
</style>
