import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/inscription',
    name: 'Signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/connexion',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/tous-les-articles',
    name: 'AllPosts',
    component: () => import('../views/DispPosts.vue')
  },
  {
    path: '/écrire-un-nouvel-article',
    name: 'NewPost',
    component: () => import('../views/NewPost.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
