<template>
  <div class="home">
    <app-header />
    <router-view v-if="userAddress" />
    <template v-else>
      Connect Metamask
    </template>
  </div>
</template>

<script>
import MetamaskMixin from '@/mixins/metamask.mixin'

import AppHeader from '@/common/AppHeader'

export default {
  name: 'home',
  components: {
    AppHeader,
  },

  mixins: [ MetamaskMixin ],
}
</script>
