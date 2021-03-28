import axios from 'axios'

class Api {
  constructor (baseUrl) {
    this._axios = axios.create()
    if(baseUrl) {
      this.useBaseUrl(baseUrl)
    }
  }

  async get (endpoint) {
    return this._call({
      method: 'GET',
      endpoint,
    })
  }

  post (endpoint, data) {
    return this._call({
      method: 'POST',
      endpoint,
      data,
    })
  }

  useBaseUrl (baseUrl) {
    this._baseUrl = baseUrl
  }

  async _call(opts) {
    const config = {
      baseURL: this._baseUrl,
      method: opts.method,
      url: opts.endpoint,
      data: opts.data,
    }

    const response = await this._axios(config)

    return response.data
  }
}

export const api = new Api()
