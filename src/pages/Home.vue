<template>
  <div class="home">
    <app-header />
    <nft-explorer />
  </div>
</template>

<script>
import AppHeader from '@/common/AppHeader'
import NftExplorer from '@/common/NftExplorer'

export default {
  name: 'home',
  components: {
    AppHeader,
    NftExplorer,
  },
}
</script>
