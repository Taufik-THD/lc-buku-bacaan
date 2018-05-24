import Vue from 'vue'
import Router from 'vue-router'
import Menu from './views/Menu.vue'
import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Menu
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
