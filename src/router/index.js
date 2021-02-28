import Vue from 'vue'
import VueRouter from 'vue-router'
import Principal from '../views/Principal.vue'
import Landing from '../views/Landing.vue'
import Rol from '../views/Rol.vue'
import Avisos from '../views/Avisos.vue'
import Usuarios from '../views/Usuarios.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Principal',
    component: Principal
  },
  {
    path: '/',
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

export default router




