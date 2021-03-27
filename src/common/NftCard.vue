<template>
  <div class="nft-card" @click="$emit('click')">
    <img
      :src="nft.image"
      class="nft-card__logo">
    <div class="nft-card__details">
      <p class="nft-card__title">
        {{ nft.name }}
      </p>
      <p v-if="+nft.stakedAmount" class="nft-card__sub-title">
        {{ `Staked ${nft.stakedAmount} ETH` }}
      </p>
      <p v-if="+nft.rewardAmount" class="nft-card__sub-title">
        {{ `Reward amount ${nft.rewardAmount} ETH` }}
      </p>
      <button
        v-if="+nft.rewardAmount"
        class="nft-card__claim-btn"
        @click="claimReward(nft.id)"
      >
        Claim
      </button>
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
