<template>
  <div class="nft-card" @click="$emit('click')">
    <img
      :src="nft.image"
      class="nft-card__logo">
    <div class="nft-card__details">
      <p class="nft-card__title">
        {{ nft.name }}
      </p>
    </div>
  </div>
</template>

<script>
import { NftRecord } from '@/entities/nft.record'

const EVENTS = {
  click: 'click',
}
export default {
  name: 'nft-card',
  props:
  {
    nft: {
      type: NftRecord,
      required: true,
    },
  },

  data: () => ({
    EVENTS,
  }),
}
</script>

<style lang="scss" scoped>
.nft-card {
  width: 30rem;
}

.nft-card__logo {
  max-width: 100%;
}


</style>
