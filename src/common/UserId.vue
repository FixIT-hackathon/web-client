<template>
  <div class="user-id">
    <p
      v-if="userAddress"
      class="user-id__title"
    >
      {{ userAddress }}
    </p>
    <button
      v-else
      class="user-id__connect-button"
      :disabled="isDisabled"
      @click="connectWallet"
    >
      Connect
    </button>
  </div>
</template>

<script>
import MetamaskMixin from '@/mixins/metamask.mixin'

export default {
  name: 'user-id',

  mixins: [ MetamaskMixin ],

  data: () => ({
    isDisabled: false,
  }),

  async created () {
  },

  methods: {
    async connectWallet () {
      this.isDisabled = true

      try {
        await this.connectMetamask()
        this.accId = await this.getAccount()
      } catch (e) {
        console.error(e)
      }

      this.isDisabled = false
    },
  },
}
</script>

<style>

</style>
