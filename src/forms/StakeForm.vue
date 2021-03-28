<template>
  <form class="stake-form" @submit.prevent="submit">
    <nft-card class="stake-form__card" :nft="nft" />
    <input
      v-model="amount"
      type="text"
      class="stake-form__amount-input"
    >
    <button class="stake-form__submit-button">
      Submit
    </button>
  </form>
</template>

<script>
import NftCard from '@/common/NftCard'

import MetamaskMixin from '@/mixins/metamask.mixin'

import { NftRecord } from '@/entities/nft.record'
export default {
  name: 'stake-form',

  components: {
    NftCard,
  },

  mixins: [ MetamaskMixin ],

  props: {
    nft: {
      type: NftRecord,
      required: true,
    },
  },

  data: () => ({
    amount: '',
  }),

  methods: {
    async submit () {
      if (!this.amount) return

      try {
        await this.stake(this.amount, this.nft.id)
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.stake-form__card {
  width: 100%;
}

</style>
