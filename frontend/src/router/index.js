import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "signup" */ '../views/Signup.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import(/* webpackChunkName: "article" */ '../views/Article.vue')
  },
  {
    path: '/article/:id',
    name: 'Commentaire',
    component: () => import(/* webpackChunkName: "commentaire" */ '../views/Commentaire.vue')
  },
  {
    path: '/user/:id',
    name: 'User',
    component: () => import(/* webpackChunkName: "user" */ '../views/User.vue')
  },
  {
    path: '/postCommentaire/:id',
    name: 'PostCommentaire',
    component: () => import(/* webpackChunkName: "postCommentaire" */ '../views/PostCommentaire.vue')
  },
  {
    path: '/postArticle',
    name: 'PostArticle',
    component: () => import(/* webpackChunkName: "postArticle" */ '../views/PostArticle.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
