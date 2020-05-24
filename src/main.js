import Vue from 'vue'
import App from './App.vue'
// import axios from 'axios'

Vue.config.productionTip = false

//导入less全局样式,通过实验可以在main中引入
// import '@/styles/base.less';

// 导入element.js
import '@/plugins/element.js'

// 导入封装好的axios
import '@/utils/request.js'

//导入路由(后面的index.js可以不用谢，系统默认是index)
import router from '@/router'

new Vue({
  render: h => h(App),
  //挂载路由
  router
}).$mount('#app')