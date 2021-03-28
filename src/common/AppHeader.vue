<template>
  <div class="app-header">
    <user-id class="app-header__user-id"/>

    <div class="app-header__nav-bar">
      <router-link :to="vueRoutes.staking" class="app-header__route">
        Staking
      </router-link>
      <router-link :to="vueRoutes.neStaking" class="app-header__route">
        Ne Staking
      </router-link>
    </div>

    <!-- TODO: handle this piece -->
    <div
      class="app-header__allowance-button"
      @click="getApprovedAmountOrApprove"
    >
      {{ allowanceMessage }}
    </div>
  </div>
</template>

<script>
import UserId from '@/common/UserId'

import MetamaskMixin from '@/mixins/metamask.mixin'

import { vueRoutes } from '@/router/routes'

export default {
  name: 'app-header',

  components: {
    UserId,
  },

  mixins: [ MetamaskMixin ],

  data: () => ({
    vueRoutes,
  }),

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
        await this.getApprovedAmount()
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

.app-header__nav-bar {
  display: flex;
}

.app-header__route {
  font-size: 4rem;

  &:not(:first-child) {
    margin-left: 3rem;
  }
}

.app-header__user-id {
  width: 10rem;
}

.app-header__allowance-button {
  width: 10rem;
}
</style>
