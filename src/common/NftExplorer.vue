<template>
  <div class="nft-explorer">
    <div v-if="isLoaded">
      <div v-if="nonStakedNfts.length" class="nft-explorer__list">
        <nft-card
          v-for="(nft, idx) in nonStakedNfts"
          class="nft-explorer__list-item"
          :key="idx"
          :nft="nft"
          @click="selectNft(nft)"
        />
      </div>
      <div v-else class="nft-explorer__no-data">
        You have no stakable tokens
      </div>
    </div>
    <div v-else class="nft-explorer__loader">
      Loading
    </div>
    <popup :is-shown.sync="isStakeFormShown">
      <stake-form
        slot="content"
        :nft="selectedNft"
      />
    </popup>
  </div>
</template>

<script>
import NftCard from '@/common/NftCard'
import Popup from '@/common/Popup'
import StakeForm from '@/forms/StakeForm'

import MetamaskMixin from '@/mixins/metamask.mixin'

import { NftRecord } from '@/entities/nft.record'
import { api } from '@/api'

export default {
  name: 'nft-explorer',

  components: {
    NftCard,
    Popup,
    StakeForm,
  },

  mixins: [ MetamaskMixin ],

  data: () => ({
    isLoaded: false,
    isStakeFormShown: false,
    nftURIs: [],
    nfts: [],
    selectedNft: {},
    stakedNftIds: [],
  }),

  // async created () {
  //   if (this.userAddress) {
  //     await this.getNftURIs()
  //   }
  // },

  computed: {
    nonStakedNfts () {
      return this.nfts.filter(i => !this.stakedNftIds.includes(i.id))
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
        await Promise.all([this.getNftURIs(), this.getStakedNftIds()])
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

    async getStakedNftIds () {
      const tokenIds = await this.getTokenIds()
      this.stakedNftIds = await this.asyncFilter(tokenIds, async i => {
        let amount
        try {
          amount = await this.getStakeAmount(i)
        } catch (e) {
          console.error(e)
          return false
        }
        return +amount
      })
    },

    selectNft (nft) {
      this.selectedNft = nft
      this.isStakeFormShown = true
    },

    async asyncFilter (arr, cb) {
      const results = await Promise.all(arr.map(cb))

      return arr.filter((_, index) => results[index])
    },
  },

}
</script>

<style lang="scss" scoped>
.nft-explorer__list {
  display: flex;
}

.nft-explorer__list-item {
  &:not(:first-child) {
    margin-left: 2rem;
  }
}
</style>
