import { createRouter, createWebHistory } from 'vue-router'
import HomeMain from '@/views/HomeMain.vue'
import PBDControl from '@/components/PBDControl.vue'
import CircleDiagram from '@/components/CircleDiagram.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeMain
    },   
    {
      path: '/progress-bar-control',
      name: 'ProgressBarControl',
      component: PBDControl
    },
    {
      path: '/circle-diagram',
      name: 'CircleDiagram',
      component: CircleDiagram
    }
  ],
})

export default router
