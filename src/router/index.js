import Vue from 'vue'
import firebase from 'firebase'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


import Principal from '../views/Principal.vue'
import Principal_Admin from '../views/Principal_Admin.vue'
import Landing_User from '../views/Landing_User.vue'
import Landing_Admin from '../views/Landing_Admin.vue'


//import Login from '../views/Login.vue'
//import Error from '../views/Error.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/aaa',
    name: 'About',
    component: Home
  },
  {
    path: '/home',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/',
    name: 'Principal',
    component: Principal
  },
  {
    path: '/adminLogin',
    name: 'PrincipalAdmin',
    component: Principal_Admin
  },
  {
    path: '/landing',
    name: 'LandingUser',
    component: Landing_User
  },
  {
    path: '/landingA',
    name: 'LandingAdmin',
    component: Landing_Admin
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




