import request from '~/service'

const url = 'http://mixer.video.iqiyi.com'

export const home = async params => {
  return await request.get(`${url}/mixin/resources/1983151012`, params)
}