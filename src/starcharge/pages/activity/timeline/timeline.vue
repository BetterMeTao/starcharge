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
  import Header from '../components/header.vue'
  export default {
    name: 'timeline',
    components: {
      Header
    }
  }
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import "../../../assets/css/index.styl";
  .content
    height 100%
</style>
