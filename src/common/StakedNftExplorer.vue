<template>
  <div class="nft-explorer">
    <div v-if="isLoaded">
      <div v-if="stakedNfts.length" class="nft-explorer__list">
        <nft-card
          v-for="(nft, idx) in stakedNfts"
          :key="idx"
          :nft="nft"
          @claim="claimReward"
        />
      </div>
      <div v-else class="nft-explorer__no-data">
        You have no staked tokens
      </div>
    </div>
    <div v-else class="nft-explorer__loader">
      Loading
    </div>
  </div>
</template>

<script>
import NftCard from '@/common/NftCard'

import MetamaskMixin from '@/mixins/metamask.mixin'

import { NftRecord } from '@/entities/nft.record'
import { api } from '@/api'

export default {
  name: 'staked-nft-explorer',

  components: {
    NftCard,
  },

  mixins: [ MetamaskMixin ],

  data: () => ({
    isLoaded: false,
    isStakeFormShown: false,
    nftURIs: [],
    nfts: [],
    stakedNftIds: [],
  }),

  computed: {
    stakedNfts () {
      return this.nfts.filter(i => this.stakedNftIds.includes(i.id))
    },
  },

  watch: {
    userAddress: async function () {
      if(this.userAddress) {
        await this.init()
      }
    },
  },

  methods: {
    async init () {
      this.isLoaded = false

      try {
        await this.getNftURIs()
        await this.getStakedNftIds()
      } catch (e) {
        console.error(e)
      }

      this.isLoaded = true
    },

    async getNftURIs () {
      this.nftURIs = await this.getTokenURIs()
      this.nftURIs = await Promise.all(this.nftURIs)
      this.nfts = await Promise.all(this.nftURIs.map(async i => {
        const details = await api.get(i.tokenURI)
        return { id: i.id, ...details }
      }))
      this.nfts = this.nfts.map(i => new NftRecord(i))
    },

    // Single responsibility :o
    async getStakedNftIds () {
      const tokenIds = await this.getTokenIds()
      this.stakedNftIds = await this.asyncFilter(tokenIds, async i => {
        let amount, rewardAmount
        try {
          amount = await this.getStakeAmount(i)
          rewardAmount = await this.getRewardAmount(i)
          const nft = this.nfts.find(j => j.id = i)
            nft?.setStakedAmount(amount)
            nft?.setRewardAmount(rewardAmount)

        } catch (e) {
          console.error(e)
          return false
        }
        return +amount
      })
    },

    async asyncFilter (arr, cb) {
      const results = await Promise.all(arr.map(cb))

      return arr.filter((_, index) => results[index])
    },
  },

}
</script>

<style>

</style>
