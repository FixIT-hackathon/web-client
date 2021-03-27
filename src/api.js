import axios from 'axios'

export class Api {
  constructor () {
    this._axios = axios.create()
  }

  async get (endpoint) {
    const config = {
      method: 'GET',
      url: endpoint,
    }

    const response = await this._axios(config)

    return response.data
  }

}

export const api = new Api()
