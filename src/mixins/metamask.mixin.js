import Web3 from 'web3'
import config from '@/config'

import { erc721ABI } from '@/const/erc721ABI'

export default {
  data: () => ({
    isMetamaskConnected: false,
    isMetamaskEnabled: false,
    userAddress: '',
  }),

  async created () {
    await this.enableMetamask()
  },

  methods: {
    async enableMetamask () {
      const { ethereum } = window
      if (!ethereum) {
        console.error('Install metamask to be able to use this app')
        return
      }

      window.web3 = new Web3(ethereum)
      this.isMetamaskEnabled = true
      await this.getAccount()

      ethereum.on('accountsChanged', async () => {
        await this.checkIfMetamaskConnected()
        await this.getAccount()
      })

      await this.checkIfMetamaskConnected()
    },

    async connectMetamask () {
      await this.enableMetamask()
      if (this.isMetamaskConnected) return

      if (this.isMetamaskEnabled) {
        const { ethereum } = window
        const opts = {
          method: 'eth_requestAccounts',
        }

        this.isMetamaskProcessing = true
        try {
          await ethereum.request(opts)
          await this.getAccount()
        } catch (e) {
          console.error(e)
        }
        this.isMetamaskProcessing = false
      } else {
        console.error('Metamask isn\'t installed')
      }
    },

    async checkIfMetamaskConnected () {
      if (!window.ethereum) return
      this.isMetamaskConnected = Boolean(this.userAddress)
    },

    async getAccount () {
      if (!this.isMetamaskEnabled) return

      const accounts = await window.web3.eth.getAccounts()

      if (!accounts.length) this.isMetamaskConnected = false

      this.userAddress = accounts[0]
    },

    async getTokenIds (contract) {
      const tokenIds = []

      const tokenAmount = await this.getTokensAmount(contract)
      for (let i = 0; i < tokenAmount; i++) {
        tokenIds.push(this.getTokenIdByIndex(contract, i))
      }
      return Promise.all(tokenIds)


    },

    async getTokensAmount (contract) {
      return contract.methods.balanceOf(this.userAddress).call()
    },

    async getTokenIdByIndex (contract, index) {
      return contract.methods
        .tokenOfOwnerByIndex(this.userAddress, index).call()
    },

    async getTokenURI (contract, tokenId) {
      return contract.methods.tokenURI(tokenId).call()
    },

    async getTokenURIs () {
      if (!this.isMetamaskEnabled) {
        await this.connectMetamask()
        return
      }

      const contract =
          new window.web3.eth.Contract(erc721ABI, config.ERC721ContractAddr)

      const tokenIds = await this.getTokenIds(contract)

      return Promise.all(tokenIds.map(id => this.getTokenURI(contract, id)))
    },
  },
}
