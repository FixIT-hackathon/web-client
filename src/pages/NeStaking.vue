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
    <template v-if="isLoaded">
      <div v-if="list.length" class="ne-staking__tx-list">
        <div
          v-for="item in list"
          :key="item.id"
          class="ne-staking__list-row"
        >
          <p>
            {{ item.sender }}
          </p>
          <p>
            {{ item.receiver }}
          </p>
          <p>
            {{ item.amount }}
          </p>
          <p>
            {{ item.fee }}
          </p>
          <button @click="transfer(item)">
            Transfer
          </button>
        </div>
      </div>
      <template v-else>
        List is empty
      </template>
    </template>
    <template v-else>Loading list</template>
  </div>
</template>

<script>
import MetamaskMixin from '@/mixins/metamask.mixin'
import config from '@/config'
import { OfferRecord } from '@/entities/offer.record'
import { api } from '@/api'
export default {
  name: 'ne-staking',

  mixins: [ MetamaskMixin ],

  data: () => ({
    isLoaded: false,
    receiverAddr: '',
    amount: '',
    feeAmount: '',
    isPlatformFee: false,
    nonce: '',
    list: [],
  }),

  async created () {
    api.useBaseUrl(config.baseUrl)

    try {
      await this.getList()
    } catch (e) {

    }
    this.isLoaded = true
  },

  methods: {
    async craftData () {
      this.nonce = await this.getNonce()

      const endpoint = '/craft'
      const opts = await this.getCraftRequest()
      const data = await api.post(endpoint, opts)
      const {signature} = await this.getSignature(data)
      const config = this._getOpts(data)
      const postEndpoint = '/push'
      const postParams = {
        data: config,
        signature_string: signature,
        sender: this.userAddress,
        amount: opts.amount,
        receiver: opts.receiver,
        fee: opts.fee,
        erc20: opts.erc20,
      }
      await api.post(postEndpoint, postParams)
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

    async getList () {
      const endpoint = '/list'

      const response = await api.get(endpoint)

      this.list = response.map(i => new OfferRecord(i))
    },

    async approve () {
      await this.approveERC20(config.relayerAddr)
    },

    async transfer (offer) {
      const transferParams = {
        receiver: offer.receiver,
        contractAddr: offer.erc20,
        amount: offer.amount,
        fee: offer.fee,
        nonce: offer.nonce,
        r: offer.r,
        s: offer.r,
        v: offer.r,
      }
      await this.transferBySignature(transferParams)
      this.list = this.list.filter(i => i.id !== offer.id)
    },
  },
}
</script>

<style lang="scss" scoped>
.ne-staking__perfect-form {
  margin-top: 2rem;
}
.ne-staking__approve {
  margin-top: 2rem;
}

.ne-staking__list-row {
  display: flex;
  justify-content: space-between;
}

.ne-staking__perfect-form {
  margin-bottom: 2rem;
}
</style>
