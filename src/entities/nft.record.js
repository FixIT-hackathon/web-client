import safeGet from 'lodash/get'
import web3 from 'web3'

export class NftRecord {
  constructor(record) {
    this.id = record.id
    this.name = safeGet(record, 'name')
    this.image = safeGet(record, 'image')
    this.stakedAmount = ''
    this.rewardAmount = ''
  }

  setStakedAmount (amount) {
    this.stakedAmount = web3.utils.fromWei(amount)
  }

  setRewardAmount (amount) {
    this.rewardAmount = web3.utils.fromWei(amount)
  }
}
