<template>
  <div class="scrollwrap" ref="scrollV">
    <slot name="defaultScroll" v-if="leftarr && leftarr.length || noAsync"></slot>
    <slot name="scrolllist"></slot>
    <empty :content="noData" v-if="leftarr && leftarr.length === 0 && !noAsync"></empty>
    <div class="loadarea" v-show="loadvisible">
      <span>{{loadInfo}}</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Bscroll from 'better-scroll'
import empty from '../other/empty'
export default {
  name: 'scrollview',
  data () {
    return {
      loadInfo: this.loadmes,
      loadvisible: !1,
      noData: '暂无数据!'
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    loadMore: {
      type: Boolean,
      default: !1
    },
    click: {
      type: Boolean,
      default: !0
    },
    pullup: {
      type: Boolean,
      default: !0
    },
    noAsync: {
      type: Boolean,
      default: !0
    },
    leftarr: {
      type: Array,
      default: () => []
    },
    rightarr: {
      type: Array,
      default: () => []
    },
    bounce: {
      type: Boolean,
      default: !0
    },
    loadmes: {
      type: String,
      default: '---- 上拉加载更多 ----'
    },
    loadingmes: {
      type: String,
      default: '---- 加载数据中 ----'
    },
    loadfinish: {
      type: String,
      default: '---- 加载完成！----'
    },
    loadend: {
      type: String,
      default: '---- 没有更多内容 ----'
    },
    loadstatus: {
      type: Number,
      default: 0
    }
  },
  methods: {
    _initComponent () {
      this.scroll = new Bscroll(this.$refs.scrollV, {
        click: this.click,
        bounce: this.bounce,
        probeType: this.probeType,
        autoBlur: true
      })
      if (this.pullup) {
        this.scroll.on('touchEnd', () => {
          this.scroll.y <= this.scroll.maxScrollY - 50 ? this.$emit('scrollEndHandle') : (this.loadvisible = !1)
        })
        this.loadMore &&
          this.scroll.on('scroll', (pos) => {
            pos.y < this.scroll.maxScrollY - 50 && (this.loadvisible = !0)
          })
      }
    },
    hideLayer () {
      setTimeout(() => {
        this.loadvisible = !1
      }, 500)
    },
    refresh () {
      this.scroll.refresh()
    }
  },
  watch: {
    loadstatus () {
      /* eslint-disable no-unused-expressions */
      this.loadstatus === 0 && (this.loadInfo = this.loadmes)
      this.loadstatus === 1 && (this.loadInfo = this.loadfinish, this.hideLayer())
      this.loadstatus === -1 && (this.loadInfo = this.loadingmes)
      this.loadstatus === 2 && (this.loadInfo = this.loadend, this.hideLayer())
    }
  },
  components: {
    empty
  }
}
</script>
<style rel="stylesheet/stylus" lang="stylus">
  @import "../../assets/css/mixin.styl";
  .scrollwrap
    position absolute
    width 100%
    top 0
    left 0
    bottom 0
    overflow hidden
    .loadarea
      position absolute
      bottom 0
      left 0
      width 100%
      height px2rem(60)
      line-height px2rem(60)
      color #fff
      font-size px2rem(26)
      border-radius px2rem(10)
      background-color rgba(0,0,0, 0.4)
      text-align center
</style>
