<template>
  <div class="sc-rank-list">
    <scrollList ref="rankList" :noAsync="false" :leftarr="rankData" :loadMore="false" :bounce="false">
      <div slot="defaultScroll">
        <ul>
          <li v-for="(item, index) in rankData" :key="item.carName + '-' + index">
            <div class="rank-box">
              <div v-if="index < 3" :class="`rank${index + 1}`"></div>
              <div v-else>{{index + 1}}</div>
            </div>
            <div class="rank-item">
              <div :class="`rank-thumb${item.loaded ? ' thumb-close': ''}`">
                <img src="" ref="thumbs" v-show="item.loaded">
              </div>
              <section>
                <h3>{{item.carName}}</h3>
                <div class="progress-bg">
                  <p class="progress-bar" :style="`width: ${item.carSum > 100 ? 100 : item.carSum < 0 ? 0 : item.carSum}%;`"></p>
                </div>
              </section>
            </div>
          </li>
        </ul>
      </div>
    </scrollList>
  </div>
</template>

<script type="text/ecmascript-6">
import {getChargeRank} from '../mock/mock'
import empty from '../components/other/empty'
import scrollList from '../components/scroll/list'
import functionalTool from '../utils/functionTools';
export default {
  name: 'chargeCarRank',
  data () {
    return {
      rankData: null,
      emptyText: '暂无数据'
    }
  },
  mounted () {
    this.initMock()
  },
  methods: {
    // 初始化数据
    initMock () {
      this.getChargeRank()
    },
    // 获取充电排行
    async getChargeRank () {
      const id = functionalTool.getUrlParam('id');
      const type = functionalTool.getUrlParam('type');
      try {
        let resData = await getChargeRank({
          id: id,
          type
        })
        this.rankData = resData.data.data
        for (let r of this.rankData) {
          r['carSum_clone'] = r.carSum
          r.carSum = 0
        }
        this.$nextTick(() => {
          // 定义图片预加载
          for (let [index, i] of new Map(this.$refs.thumbs.map((i, index) => [index, i]))) {
            i.src = this.rankData[index].carIconUrl
            this.transitionGrow(this.rankData, index)
            i.onload = () => {
              this.$set(this.rankData[index], 'loaded', !0)
            }
          }
          this.initialScrollList()
        })
      } catch (e) {
        console.log(e)
      }
    },
    // 定义增长动画
    transitionGrow (data, index) {
      this.grow = setTimeout(() => {
        data[index].carSum = data[index].carSum_clone
        clearTimeout(this.grow)
      }, 400, this)
    },
    // 初始化滚动组件
    initialScrollList () {
      this.$refs.rankList && this.$refs.rankList._initComponent()
    }
  },
  components: {
    empty,
    scrollList
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import '../assets/css/mixin.styl';
  .sc-rank-list
    position relative
    width 100%
    height 100%
    & ul
      font-size rpx(28)
      & li
        display flex
        align-items center
        &:last-child
          .rank-item
            border-bottom none
        .rank-box
          display flex
          width rpx(72)
          flex 0 0 rpx(72)
          height 100%
          text-align right
          justify-content flex-end
          for i in 1 2 3
            .rank{i}
              width rpx(53)
              height rpx(59)
              position relative
              left rpx(10)
              z-index 99
              background url("../assets/img/"i"th_cup.png") no-repeat
              background-size 100% 100%
        .rank-item
          display flex
          flex 1
          padding rpx(40) 0
          padding-left rpx(46)
          border-bottom rpx(1) solid #edecec
          & .rank-thumb
            width rpx(114)
            height rpx(49)
            margin-right rpx(26)
            background url("../assets/img/home_card_img_deouflt@2x.png") no-repeat center
            background-size 100% 100%
            &.thumb-close
              background none
            & img
              display block
              width 100%
              height 100%
              background transparent
          & section
            width rpx(460)
          & h3
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
            margin-bottom rpx(26)
          .progress-bg
            height rpx(10)
            background-color #e5e5e5
            border-radius rpx(10)
            .progress-bar
              transition width 400ms ease-in
              width 0
              height rpx(10)
              background-color #f88227
              border-radius rpx(10)
</style>
