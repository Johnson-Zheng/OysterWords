import Vue from 'vue'
import Router from 'vue-router'
import index from "../pages/index";
import login from "../pages/login.vue";
import self_information from "../pages/self_information";

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      redirect:'/login',
    },
    {
      path: '/index',
      name: '生蚝单词',
      component: index,
      meta:{
        title: '生蚝单词'
      }
    },
    {
      path: '/login',
      name: '生蚝单词-登陆',
      component: login,
      meta:{
        title: '生蚝单词-登陆'
      },
    },
    {
      path: '/self_information',
      name: '生蚝单词-个人信息',
      component: self_information,
      meta: {
        title: '个人信息'
      }
    },
  ]
})
