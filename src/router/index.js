import Vue from 'vue'
import firebase from 'firebase'
import VueRouter from 'vue-router'
import Principal from '../views/Principal.vue'
import Principal_Admin from '../views/Principal_Admin.vue'
import Landing from '../views/Landing.vue'
import Rol from '../views/Rol.vue'
import Avisos from '../views/Avisos.vue'

import Usuarios from '../views/Usuarios.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Principal',
    component: Principal
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/adminlogin',
    name: 'PrincipalAdmin',
    component: Principal_Admin
  },{
    path: '/landing',
    name: 'Landing',
    component: Landing
  },
  
  {
    path: '/rol',
    name: 'Rol',
    component: Rol
  },
  {
    path: '/Avisos',
    name: 'Avisos',
    component: Avisos
  },
  {
    path: '/Usuarios',
    name: 'Usuarios',
    component: Usuarios
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach( (to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) next('login');
  else if (currentUser && to.name === 'Login') next('home')
  else next();
})

export default router




