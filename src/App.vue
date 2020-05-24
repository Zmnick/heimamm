<template>
  <div id="app">
    <!-- 通过router-view配置页面 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="less">
//导入全局less样式 两种方式
// @import './styles/base.less';
@import url('~@/styles/base.less');
</style>
