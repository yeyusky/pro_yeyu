import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/login'
import Register from '@/components/Register/register'
import Home from '@/components/Layout/home'
import Menu from '@/views/systemMage/menuSetting'
import Role from '@/views/systemMage/roleSetting'
import Dept from '@/views/systemMage/deptSetting'
import Index from '@/views/Index/index'
import UserCenter from '@/views/userCenter/userCenter'
import WebformDesign from '@/views/processMage/webformDesign'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/main',
      name: 'Main',
      component: Home,
      children: [
        {
          path: '/main/index',
          component: Index
        },
        {
          path: '/main/menu',
          component: Menu
        },
        {
          path: '/main/role',
          component: Role
        },
        {
          path: '/main/dept',
          component: Dept
        },
        {
          path: '/main/userCenter',
          component: UserCenter
        },
        {
          path: '/main/webformDesign',
          component: WebformDesign
        }
      ]
    }
  ]
})
