import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Cider from '@/components/Cider/Cider'
import Shop from '@/components/Shop/Shop'
import Shops from '@/components/Shop/Shops'
import Ciders from '@/components/Cider/Ciders'
import AddCider from '@/components/Cider/AddCider'
import AddShop from '@/components/Shop/AddShop'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/cider'
    },
    {
      path: '/cider/:id',
      name: 'Cider',
      component: Cider,
      props: true,
    },
    {
      path: '/shop/:id',
      name: 'Shop',
      component: Shop,
      props: true,
    },
    {
      path: '/cider',
      component: Ciders,
      name: 'Ciders',
    },
    {
      path: '/shop',
      component: Shops,
      name: 'Shops',
    },
    {
      path: '/addcider',
      component: AddCider,
      name: 'AddCiders',
    },
    {
      path: '/addshop',
      component: AddShop,
      name: 'AddShops',
    },
  ],
})
