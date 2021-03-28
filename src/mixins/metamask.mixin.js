import Web3 from 'web3'
import config from '@/config'

import { erc721ABI } from '@/const/erc721ABI'
import { erc20ABI } from '@/const/erc20ABI'
import { stakingABI } from '@/const/stakingABI'
import { relayerABI } from '@/const/relayerABI'

export default {
  data: () => ({
    isMetamaskConnected: false,
    isMetamaskEnabled: false,
    userAddress: '',
    allowedAmount: '',
  }),

  async created () {
    await this.connectMetamask()
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
      // TODO: check

      ethereum.on('accountsChanged', async () => {
        await this.checkIfMetamaskConnected()
        await this.getAccount()
        await this.getApprovedAmount()
      })

      await this.checkIfMetamaskConnected()

      if (this.isMetamaskConnected) {
        await this.getAccount()
        await this.getApprovedAmount()
      }
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

      if (!contract) {
        contract =
          new window.web3.eth.Contract(erc721ABI, config.ERC721ContractAddr)
      }

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

    async approveERC20 (approveAddr = config.stakingAddr) {
      if (!this.isMetamaskEnabled) {
        await this.connectMetamask()
        return
      }

      const amount = web3.utils.toWei('999999999999', 'ether')

      const contract =
        new window.web3.eth.Contract(erc20ABI, config.ERC20ContractAddr)

      return new Promise((res, rej) => {
        contract.methods
          .approve(approveAddr, amount)
          .send({ from: this.userAddress })
          .on('receipt', async () => { res() })
          .on('error', err => rej(err))
      })

    },

    async getApprovedAmount () {
      const contract =
        new window.web3.eth.Contract(erc20ABI, config.ERC20ContractAddr)

      this.allowedAmount = await contract.methods
        .allowance(this.userAddress, config.stakingAddr)
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

    getStakeAmount (tokenId) {
      const contract =
        new window.web3.eth.Contract(stakingABI, config.stakingAddr)

      return contract.methods
        .stakeAmountFor(config.ERC721ContractAddr, tokenId)
        .call()
    },

    getRewardAmount (tokenId) {
      const contract =
        new window.web3.eth.Contract(stakingABI, config.stakingAddr)

      return contract.methods
        .calculateRewardFor(config.ERC721ContractAddr, tokenId)
        .call()
    },

    claimReward (tokenId) {
      const contract =
        new window.web3.eth.Contract(stakingABI, config.stakingAddr)

      return contract.methods
        .claimReward(config.ERC721ContractAddr, tokenId)
        .send({from: this.userAddress})
    },

    async getSignature (data) {
      const opts = this._getOpts(data)

      const signer = web3.utils.toChecksumAddress(this.userAddress)
      return new Promise((res, rej) => {
        web3.currentProvider.sendAsync(
          {
            method: "eth_signTypedData_v3",
            params: [signer, JSON.stringify(opts)],
            from: signer,
          },
          function(err, result) {
            if (err) {
              rej(err);
            }
            const signature = result.result.substring(2);
            const r = "0x" + signature.substring(0, 64);
            const s = "0x" + signature.substring(64, 128);
            const v = parseInt(signature.substring(128, 130), 16);
            res({r, s, v, signature})
          },
        )},
      )
    },

    _getOpts (data) {
      return {
        types: {
          EIP712Domain: data.types['EIP712Domain'],
          [data.primaryType]: data.types[data.primaryType],
        },
        domain: {
          name: data.domain.name,
          verifyingContract: data.domain.verifyingContract,
          chainId: data.domain.chainId,
        },
        primaryType: data.primaryType,
        message: {
          receiver: data.message.receiver,
          amount: data.message.amount,
          fee: data.message.fee,
          erc20: data.message.erc20,
          nonce: data.message.nonce,
        },
      }
    },

    async getNonce (sender = this.userAddress) {
      const contract =
        new window.web3.eth.Contract(relayerABI, config.relayerAddr)

      return contract.methods.nonces(sender).call()
    },

    async transferBySignature (params) {
      const contract =
        new window.web3.eth.Contract(relayerABI, config.relayerAddr)

      const {receiver, contractAddr, amount, fee, nonce, r, s, v} = params
      /* eslint-disable */
      return new Promise((res, rej) => {
        contract.methods
          .transferFromBySig(receiver, contractAddr, amount, fee, nonce, r, s, v)
          .send({from: this.userAddress})
          .on('receipt', () => res())
          .on('error', e => rej(e))
      })
      /* eslint-enable */
    },
  },

}
