import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import Car from '@/views/car/Car'
import Order from '@/views/order/Order'
import Road from '@/views/road/Road'
import Login from '@/views/login/Login'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: Car,
    children: [
      { path: '/car', name: 'Car', component: Car },
      { path: '/order', name: 'Order', component: Order },
      { path: '/road', name: 'Road', component: Road }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
