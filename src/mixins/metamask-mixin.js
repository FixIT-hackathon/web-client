import Web3 from 'web3'

export default {
  data: () => ({
    isMetamaskConnected: false,
    isMetamaskEnabled: false,
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

      ethereum.on('accountsChanged', async () => {
        await this.checkIfMetamaskConnected()
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
      this.isMetamaskConnected = Boolean(await this.getAccount())
    },

    async getAccount () {
      if (!this.isMetamaskEnabled) return

      const accounts = await window.web3.eth.getAccounts()

      if (!accounts.length) this.isMetamaskConnected = false

      return accounts[0]
    },

    
  },
}
