import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    children: [
      {
        path: 'playlist',
        name: 'playlist',
        component: () => import('../views/PlaylistView.vue')
      },
      {
        path: 'author/:idauthor',
        name: 'author',
        component: () => import(/* webpackChunkName: "about" */ '../components/Player/Artiste.vue'),
        //component: () => import(/* webpackChunkName: "about" */ '../views/AuthorView.vue'),
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
