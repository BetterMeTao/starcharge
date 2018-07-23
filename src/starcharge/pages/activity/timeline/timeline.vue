<template>
    <div style="height: 100%;">
      <div class="content">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import {getUserInfo} from '../../../mock/mock';
  import functionalTool from '../../../utils/functionTools';
  import qs from 'qs';
  export default {
    name: 'timeline',
    data () {
      return {
        accountId: '',
        city: ''
      }
    },
    components: {
    },
    mounted () {
      this.getBaseUserInfo();
    },
    methods: {
      getUrlParams () {
        this.accountId = functionalTool.getUrlParam('accountId');
        this.city = functionalTool.getUrlParam('city');
      },
      async getBaseUserInfo () {
        this.getUrlParams();
        const dataParam = {
          accountId: this.accountId,
          city: this.city
        };
        // 处理axios post java后台接受不到参数
        const params = qs.stringify(dataParam);
        try {
          const resData = await getUserInfo(params);
          if (resData.data.code === '200') {
            this.$root.userInfo = resData.data.data;
            console.log('11111111111111')
          } else {
            console.log(this.$root.userInfo);
            console.log('222222222222')
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import "../../../assets/css/index.styl";
  .content
    height 100%
</style>
