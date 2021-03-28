import safeGet from 'lodash/get'
export class OfferRecord {
  constructor(record) {
    this.id = record.id
    this.sender = safeGet(record, 'sender')
    this.receiver = safeGet(record, 'receiver')
    this.amount = safeGet(record, 'amount')
    this.status = safeGet(record, 'status')
    this.fee = safeGet(record, 'fee')
    this.r = safeGet(record, 'r')
    this.s = safeGet(record, 's')
    this.v = safeGet(record, 'v')
  }
}
