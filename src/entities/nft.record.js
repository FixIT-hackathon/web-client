import safeGet from 'lodash/get'

export class NftRecord {
  constructor(record) {
    this.id = record.id
    this.name = safeGet(record, 'name')
    this.image = safeGet(record, 'image')
  }
}
