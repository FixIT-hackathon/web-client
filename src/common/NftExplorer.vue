<template>
  <div class="nft-explorer">
    {{ 'haha' }}
    <button class="test" @click="getNftURIs">getIds</button>
  </div>
</template>

<script>
import MetamaskMixin from '@/mixins/metamask.mixin'
export default {
  name: 'nft-explorer',

  mixins: [ MetamaskMixin ],

  data: () => ({
    nftURIs: [],
  }),

  // async mounted () {
  //   this.nftIds = await this.getTokenIds()
  // },

  methods: {
    async getNftURIs () {
      this.nftURIs = await this.getTokenURIs()
    },
  },
}
</script>

<style>

</style>
