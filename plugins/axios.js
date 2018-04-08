import qs from 'qs'
import postConfig from '../service/config.js'

export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    config.timeout = 5000
    // if the requestMethod is POST, You should change you data transfer Type
    if (config.method === 'post') {
      config = Object.assign({}, config, postConfig)
      config.data = qs.stringify(config.data)
    }
    console.log('Making request to ' + config.url)
    return config
  })

  $axios.onResponse((res) => {
    // if (res.status !== 200) {
    //   Message({
    //     showClose: true,
    //     type: 'warning',
    //     message: res.data.msg
    //   })
    //   return Promise.reject(res)
    // }
    return res.data
  }, (error) => {
    // if (error.response.status === 403) {
    //   Message({
    //     showClose: true,
    //     type: 'warning',
    //     message: '用户无权限访问数据，请联系管理员进行授权'
    //   })
    // } else {
    //   Message({
    //     showClose: true,
    //     type: 'warning',
    //     message: error.message
    //   })
    // }
    return Promise.reject(error)
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    console.log(code)
    if (code === 400) {
      redirect('/400')
    }
  })
}
