import Web3 from 'web3'
import config from '@/config'

import { erc721ABI } from '@/const/erc721ABI'
import { erc20ABI } from '@/const/erc20ABI'
import { stakingABI } from '@/const/stakingABI'

export default {
  data: () => ({
    isMetamaskConnected: false,
    isMetamaskEnabled: false,
    userAddress: '',
    allowedAmount: '',
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
        await this.getApprovedAmount()
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
          await this.getApprovedAmount()
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
        const tokenId = await this.getTokenIdByIndex(contract, i)
        tokenIds.push(tokenId)
      }
      return (tokenIds)


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

      const result = tokenIds.map(async id => {
        const tokenURI = await this.getTokenURI(contract, id)
        return {
          id,
          tokenURI,
        }
      })
      return result
    },

    async approveERC20 () {
      if (!this.isMetamaskEnabled) {
        await this.connectMetamask()
        return
      }

      const amount = web3.utils.toWei('999999999999', 'ether')

      const contract =
        new window.web3.eth.Contract(erc20ABI, config.ERC20ContractAddr)

      return contract.methods
        .approve(config.ERC721ContractAddr, amount)
        .send({ from: this.userAddress })
    },

    async getApprovedAmount () {
      const contract =
        new window.web3.eth.Contract(erc20ABI, config.ERC20ContractAddr)

      this.allowedAmount = await contract.methods
        .allowance(this.userAddress, config.ERC721ContractAddr)
        .call()
    },

    async stake (amount, id) {
      if (!this.isMetamaskEnabled) {
        await this.connectMetamask()
        return
      }

      const contract =
        new window.web3.eth.Contract(stakingABI, config.stakingAddr)

      await contract.methods
        .stake(web3.utils.toWei(amount, 'ether'), config.ERC721ContractAddr, id)
        .send({from: this.userAddress})
    },

    stakeAmount (tokenId) {
      const contract =
        new window.web3.eth.Contract(stakingABI, config.stakingAddr)

      return contract.methods
        .stakeAmountOf(config.ERC721ContractAddr, tokenId)
        .call()
    },
  },

}
