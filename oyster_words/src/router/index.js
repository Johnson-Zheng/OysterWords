import Vue from 'vue'
import Router from 'vue-router'
import index from "../pages/index";
import login from "../pages/login.vue";
import room from "../pages/room";
import battle from "../pages/battle";

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
      }
    },
    {
      path: '/room',
      name:'生蚝单词-房间界面',
      component: room,
      meta: {
        title: '生蚝单词-房间界面'
      }
    },
    {
      path: '/battle',
      name:'生蚝单词-对战界面',
      component: battle,
      meta: {
        title: '生蚝单词-对战界面'
      }
    },
  ]
})
