<template>
  <div class="app-header">
    <user-id />
    <div class="app-header__allowance-button" @click="getApprovedAmount">
      {{ allowanceMessage }}
    </div>
  </div>
</template>

<script>
import UserId from '@/common/UserId'

import MetamaskMixin from '@/mixins/metamask.mixin'

export default {
  name: 'app-header',

  components: {
    UserId,
  },

  mixins: [ MetamaskMixin ],

  computed: {
    allowanceMessage () {
      return +this.allowedAmount ? 'Allowed' : 'Approve ERC20'
    },
  },

  methods: {
    async getApprovedAmountOrApprove () {
      try {
        await this.getApprovedAmount()
        if (+this.approvedAmount) {
          return
        }

        await this.approveERC20()
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.app-header {
  display: flex;
  justify-content: space-between;
}
</style>
