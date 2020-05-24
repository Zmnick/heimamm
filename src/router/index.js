//导入vue
import Vue from 'vue'
//导入路由vue-router
import VueRouter from 'vue-router'

//应用
Vue.use(VueRouter)

//导入login和layout组件
import Login from '@/views/login'
import Layout from '@/views/layout'


//实例化一个路由
const router = new VueRouter({
    //配置
    routes: [
        //设置规则：路由重定向
        { path: "/", redirect: "/login" },
        //挂载相应组件
        { path: "/login", component: Login },
        { path: "/layout", component: Layout }
    ]
})

//导出路由
export default router