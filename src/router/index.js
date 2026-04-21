import { createRouter, createWebHistory } from 'vue-router'
import BackendLayout from '@/components/BackendLayout.vue'
import AuthLayout from '@/components/AuthLayout.vue'
import FrontendLayout from '@/components/FrontendLayout.vue'
//路由配置
const backendRouter = [
  {
    path: '/back',
    //重定向的路径
    redirect:'/back/dashboard',
    component:BackendLayout,
    children:[
      {
        path:"dashboard",
        component:()=>import("@/views/dashboard.vue"),
        meta:{
          title:'数据分析',
          icon:'PieChart'
        }
      },
      {
        path:'knowledge',
        component:()=>import("@/views/knowledge.vue"),
        meta:{
          title:'知识文章',
          icon:'ChatLineSquare'
        }
      },
      {
        path:'consultations',
        component:()=>import("@/views/consultations.vue"),
        meta:{
          title:'咨询管理',
          icon:'Message'
        }
      },
      {
        path:'emotional',
        component:()=>import("@/views/emotional.vue"),
        meta:{
          title:'情感分析',
          icon:'User'
        }
      }
    ]
  },
  {
    path:'/auth',
    component:AuthLayout,
    children:[
      {
        path:'login',
        component:()=>import("@/views/login.vue"),
        meta:{
          title:'登录',
        }
      },
      {
        path:'register',
        component:()=>import("@/views/register.vue"),
        meta:{
          title:'注册',
        }
      },
    ]
  }
]

const frontendRoutes=[
  {
    path:'/',
    component:FrontendLayout,
    children:[
      {
        path:'/',
        component:()=>import("@/views/home.vue"),
        meta:{
          title:'首页',
        }
      },
      {
        path:'/consultation',
        component:()=>import("@/views/consultation.vue"),
        meta:{
          title:'AI咨询',
        }
      },
      {
        path:'/emotion-diary',
        component:()=>import("@/views/emotionDiary.vue"),
        meta:{
          title:'情绪日志',
        }
      },
      {
        path:'/frontendKnowledge',
        component:()=>import("@/views/frontendKnowledge.vue"),
        meta:{
          title:'知识文章',
        }
      }
    ]

  }
]
  const router =createRouter({
    history: createWebHistory(),
    routes: [...backendRouter,...frontendRoutes]
  })

  // 路由前置守卫，检查是否有token
  router.beforeEach((to,from,next)=>{
    // 检查是否有token
    const token = localStorage.getItem('token')
    if(token){
      let userInfo = null
      try {
        const userInfoStr = localStorage.getItem('userInfo')
        if(userInfoStr && userInfoStr !== 'undefined' && userInfoStr !== 'null'){
          userInfo = JSON.parse(userInfoStr)
        }
      } catch (error) {
        console.error('解析用户信息失败:', error)
        // 清理无效的用户信息
        localStorage.removeItem('userInfo')
      }
      //当前是否登录
      if(token && userInfo){
        //如果是后台用户
        if(userInfo.userType == 2){
          if(to.path.startsWith('/back')){
            next()
          }else{
            next('/back/dashboard')
          }
        }
        //如果不是后台用户
        else if(userInfo.userType == 1){
          //用户端的客户只能访问前台路由

          if(to.path.startsWith('/back')||to.path.startsWith('/auth')){
            next('/')
          }else{
            next()
          }
        }else{
          // 用户类型无效，跳转到登录页
          localStorage.removeItem('token')
          localStorage.removeItem('userInfo')
          next('/auth/login')
        }
      }else{
        // 没有用户信息，清理token并跳转到登录页
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        if(to.path.startsWith('/back')){
          next('/auth/login')
        }else{
          next()
        }
      }
    }else{
      if(to.path.startsWith('/back')){
        next('/auth/login')
      }else{
        next()
      }
    }
  })
  export default router
