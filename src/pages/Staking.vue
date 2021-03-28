<template>
  <div class="staking">
    <h1 class="staking__title">
      Staking
    </h1>
    <div class="staking__nav-bar">
      <router-link class="staking_nav-link" :to="vueRoutes.nftExplorer">
        Stakable NFTs
      </router-link>
      <router-link class="staking_nav-link" :to="vueRoutes.stakedNftExplorer">
        Staked NFTs
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { vueRoutes } from '@/router/routes'
import { api } from '@/api'
import config from '@/config'
export default {
  name: 'staking',

  data: () => ({
    vueRoutes,
  }),
}
</script>

<style lang="scss" scoped>
.staking_nav-link {
  &:not(:first-child) {
    margin-left: 5rem;
  }
}
</style>
