<template>
  <div class="staking">
    <h1 class="staking__title">
      Staking
    </h1>
    <div class="staking__nav-bar">
      <router-link :to="vueRoutes.nftExplorer">
        Stakable NFTs
      </router-link>
      <router-link :to="vueRoutes.stakedNftExplorer">
        Staked NFTs
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { vueRoutes } from '@/router/routes'
export default {
  name: 'staking',

  data: () => ({
    vueRoutes,
  }),
}
</script>

<style>

</style>
