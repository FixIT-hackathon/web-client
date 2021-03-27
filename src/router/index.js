import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/Home.vue'
import Staking from '@/pages/Staking'
import NftExplorer from '@/common/NftExplorer'
import StakedNftExplorer from '@/common/StakedNftExplorer'
import NeStaking from '@/pages/NeStaking'

import { vueRoutes } from '@/router/routes'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: vueRoutes.home.name,
    component: Home,
    redirect: vueRoutes.staking,
    children: [
      {
        path: '/',
        name: vueRoutes.staking.name,
        component: Staking,
        redirect: vueRoutes.nftExplorer,
        children: [
          {
            path: '/nft-explorer',
            name: vueRoutes.nftExplorer.name,
            component: NftExplorer,
          },
          {
            path: '/staked-nft-explorer',
            name: vueRoutes.stakedNftExplorer.name,
            component: StakedNftExplorer,
          },
        ],
      },
      {
        path: '/ne-staking',
        name: vueRoutes.neStaking.name,
        component: NeStaking,
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
