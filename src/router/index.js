import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import searchTitles from '@/components/searchTitles.vue'
import searchNames from '@/components/searchNames.vue'
import curdNames from '@/components/curdNames.vue'
import curdTitles from '@/components/curdTitles.vue'
import curdPrincipals from '@/components/curdPrincipals.vue'
import advancedSearchNames from '@/components/advancedSearchNames'
import advancedSearchTiltes from '@/components/advancedSearchTiltes'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/searchTitles',
      name: 'searchTitles',
      component: searchTitles
    },
    {
      path: '/searchNames',
      name: 'searchNames',
      component: searchNames
    },
    {
      path: '/advancedsearchtitles',
      component: advancedSearchTiltes
    },
    {
      path: '/advancedsearchnames',
      component: advancedSearchNames
    },
    {
      path: '/curdNames',
      component: curdNames
    },
    {
      path: '/curdtitles',
      component: curdTitles
    },
    {
      path: '/curdprincipals',
      component: curdPrincipals
    }
  ]
})
