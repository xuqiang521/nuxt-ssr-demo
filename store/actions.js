import request from '~/service'

const url = '/api'
const jjUrl = '/japi'

export const home = async params => {
  return await request.get(`${url}/mixin/resources/1983151012`, params)
}

export const banner = async params => {
  return await request.get(`${jjUrl}/v1/get_banner`, params)
}
