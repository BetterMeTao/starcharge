<template>
    <div class="loading-view" v-show="loadvisible">
      <div class="loading-wrap">
        <div class="loading-effect">
          <div class="loadblock">
            <div class="child"></div>
            <div class="child"></div>
            <div class="child"></div>
            <div class="child"></div>
          </div>
        </div>
        <div class="loading-mes">
          {{loadmes}}
        </div>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
import Axios from 'axios'
export default {
  name: 'loading',
  data () {
    return {
      loadvisible: !1,
      loadmes: '',
      method: '',
      mes_loading: '加载数据中',
      mes_waiting: '请求提交中',
      mes_timeout_get: '加载失败,请重新加载数据',
      mes_timeout_post: '提交失败，请重试'
    }
  },
  created () {
    this.initial()
  },
  methods: {
    initial () {
      // axios拦截器设置loading
      Axios.interceptors.request.use(request => {
        this.method = request.method === 'get';
        this.loadmes = this.method ? this.mes_loading : this.mes_waiting;
        this.loadvisible = !0;
        return request;
      });

      Axios.interceptors.response.use(response => {
        this.errorTimer && clearTimeout(this.errorTimer);
        setTimeout(() => {
          this.loadvisible = !1;
          this.loadmes = '';
        }, 600);
        return response;
      }, error => {
        this.errorHanding(error)
      })
    },
    errorHanding (e) {
      this.loadmes = this.method ? this.mes_timeout_get : this.mes_timeout_post;
      this.errorTimer = setTimeout(() => {
        this.loadvisible = !1;
        this.loadmes = ''
      }, 2000);
      return Promise.reject(e)
    }
  }
}
</script>
<style rel="stylesheet/stylus" lang="stylus">
  @import '../../assets/css/mixin.styl';
  .loading-view
    position absolute
    width 100%
    height 100%
    top 0
    left 0
    z-index 9999
    background-color rgba(0,0,0,0.2)
    display flex
    justify-content center
    align-items center
    .loading-wrap
      text-align center
      .loading-effect
        width rpx(200)
        height rpx(200)
        position relative
        margin 0 auto
        .loadblock
          position absolute
          display flex
          flex-wrap wrap
          width rpx(100)
          height rpx(100)
          left rpx(50)
          top rpx(50)
          transform: rotate(45deg);
          animation: squareWrapTrans 1.5s infinite;
          .child
            width rpx(50)
            height rpx(50)
            background-color #5e7382
          .child:first-child
            background-color #ff9d16
            animation squareChildTrans1 1.5s infinite;
          .child:nth-child(2)
            background-color #fb5c31
            animation squareChildTrans2 1.5s infinite;
          .child:nth-child(3)
            background-color #c2e1fe
            animation squareChildTrans3 1.5s infinite;
          .child:nth-child(4)
            background-color #00a0e9
            animation squareChildTrans4 1.5s infinite;
      .loading-mes
        font-size rpx(28)
        color #fff

  @keyframes squareWrapTrans {
    100% {transform: rotate(-45deg)}
  }
  @keyframes squareChildTrans1 {
    25% {transform:translate(0, -20px) rotate(-180deg)}
    100% {transform:translate(0,0) rotate(-180deg)}
  }
  @keyframes squareChildTrans2 {
    25% {transform:translate(20px,0) rotate(-180deg)}
    100% {transform:translate(0,0) rotate(-180deg)}
  }
  @keyframes squareChildTrans3 {
    25% {transform:translate(-20px,0) rotate(-180deg)}
    100% {transform:translate(0,0) rotate(-180deg)}
  }
  @keyframes squareChildTrans4 {
    25% {transform:translate(0,20px) rotate(-180deg)}
    100% {transform:translate(0,0) rotate(-180deg)}
  }

</style>
