import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UmfrageView from '../views/UmfrageView.vue'
import EndpageView from '../views/EndpageView.vue'
import SettingsView from '../views/SettingsView.vue'
import MapView from '../views/MapView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/',
      name: 'umfrage',
      component: UmfrageView
    },
    {
      path: '/',
      name: 'endpage',
      component: EndpageView
    },
    {
      path: '/',
      name: 'settings',
      component: SettingsView
    },
    {
      path: '/',
      name: 'map',
      component: MapView
    }
  ]
})

export default router
