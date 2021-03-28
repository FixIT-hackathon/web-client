<template>
  <div class="ne-staking">
    <button class="ne-staking__approve" @click="approve">Approve ERC20</button>
    <div class="ne-staking__perfect-form">
      Receiver address
      <input type="text" v-model="receiverAddr">
      Amount
      <input type="text" v-model="amount">
      Custom fee
      <input
        type="text"
        v-model="feeAmount"
        :disabled="isPlatformFee">
      Use platform fee
      <input type="checkbox" v-model="isPlatformFee">
      <button class="ne-staking__test" @click="craftData">TEST</button>
    </div>
    <div v-if="list.length" class="ne-staking__tx-list">
      <div class="ne-staking__list-row"/>
    </div>
  </div>
</template>

<script>
import MetamaskMixin from '@/mixins/metamask.mixin'
import config from '@/config'
import { api } from '@/api'
export default {
  name: 'ne-staking',

  mixins: [ MetamaskMixin ],

  data: () => ({
    receiverAddr: '',
    amount: '',
    feeAmount: '',
    isPlatformFee: false,
    nonce: '',
    list: [],
  }),

  async created () {
    api.useBaseUrl(config.baseUrl)
  },

  methods: {
    async craftData () {
      this.nonce = await this.getNonce()

      const endpoint = '/craft'
      const opts = await this.getCraftRequest()
      const data = await api.post(endpoint, opts)
      const {r, s, v} = await this.getSignature(data)
      const transferParams = {
        receiver: opts.receiver,
        contractAddr: opts.erc20,
        amount: opts.amount,
        fee: opts.fee,
        nonce: opts.nonce,
        r,
        s,
        v}
      await this.transferBySignature(transferParams)
    },

    async getCraftRequest () {
      const sender = this.userAddress
      const nonce = await this.getNonce()
      const chainId = await web3.eth.net.getId()

      return {
        sender,
        receiver: this.receiverAddr,
        erc20: config.neStakingERC20,
        nonce,
        chain_id: String(chainId),
        amount: this.amount,
        fee: '100',
      }
    },

    async approve () {
      await this.approveERC20(config.relayerAddr)
    },
  },
}
</script>

<style>

</style>
