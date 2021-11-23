import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

//Différentes routes qui mènent aux différentes pages selon  
//le nom, les composants vue. Création d'un chemin URL 
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Groupomania'
    }
  },
  {
    path: '/inscription',
    name: 'Signup',
    component: () => import('../views/Signup.vue'),
    meta: {
      title: 'Groupomania'
    }
  },
  {
    path: '/connexion',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: 'Groupomania'
    }
  },
  {
    path: '/articles',
    name: 'AllPosts',
    component: () => import('../views/DispPosts.vue'),
    meta: {
      title: 'Groupomania'
    }
  },
  {
    path: '/ecrire-un-nouvel-article',
    name: 'NewPost',
    component: () => import('../views/NewPost.vue'),
    meta: {
      title: 'Groupomania'
    }
  },
  {
    path: '/articles/:id',
    name: 'OnePost',
    component: () => import('../views/DispOnePost.vue'),
    meta: {
      title: 'Groupomania'
    }
  },
  {
    path: '/mon_profil',
    name: 'UserProfile',
    component: () => import('../views/Profile.vue'),
    meta: {
      title: 'Groupomania'
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.afterEach((to) => {
  document.title = to.meta.title;
});

export default router;
