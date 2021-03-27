<template>
  <div class="nft-explorer">
    {{ 'haha' }}
    <button class="test" @click="getNftURIs">getIds</button>
    <div class="nft-explorer__list">
      <nft-card
        v-for="(nft, idx) in nfts"
        :key="idx"
        :nft="nft"
        @click="selectNft(nft)"
      />
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
import MetamaskMixin from '@/mixins/metamask.mixin'
import Popup from '@/common/Popup'
import StakeForm from '@/forms/StakeForm'

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
    isStakeFormShown: false,
    nftURIs: [],
    nfts: [],
    selectedNft: {},
  }),

  async created () {
    // this.nftIds = await this.getTokenIds()
  },

  methods: {
    async getNftURIs () {
      this.nftURIs = await this.getTokenURIs()
      this.nftURIs = await Promise.all(this.nftURIs)
      this.nfts = await Promise.all(this.nftURIs.map(async i => {
        const details = await api.get(i.tokenURI)
        return { id: i.id, ...details }
      }))
      this.nfts = this.nfts.map(i => new NftRecord(i))
    },

    selectNft (nft) {
      this.selectedNft = nft
      this.isStakeFormShown = true
    },
  },

}
</script>

<style>

</style>
