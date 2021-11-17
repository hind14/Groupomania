import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

//Différentes routes qui mènent aux différentes pages selon  
//le nom, les composants vue. Création d'un chemin URL 
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
    path: '/articles',
    name: 'AllPosts',
    component: () => import('../views/DispPosts.vue')
  },
  {
    path: '/ecrire-un-nouvel-article',
    name: 'NewPost',
    component: () => import('../views/NewPost.vue')
  },
  {
    path: '/articles/:id',
    name: 'OnePost',
    component: () => import('../views/DispOnePost.vue')
  },
  {
    path: '/mon_profil',
    name: 'UserProfile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/',
    name: 'Report',
    component: () => import('../views/Report.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;
