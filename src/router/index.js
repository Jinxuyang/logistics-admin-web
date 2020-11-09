import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import Car from '@/views/car/Car'
import Order from '@/views/order/Order'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: Car,
    children: [
      { path: '/car', name: 'Car', component: Car },
      { path: '/order', name: 'Order', component: Order }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
