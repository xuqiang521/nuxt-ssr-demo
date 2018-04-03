import Axios from 'axios'


// Axios.prototype cannot be modified
const axiosExtra = {
  setHeader (name, value, scopes = 'common') {
    for (let scope of Array.isArray(scopes) ? scopes : [ scopes ]) {
      if (!value) {
        delete this.defaults.headers[scope][name];
        return
      }
      this.defaults.headers[scope][name] = value
    }
  },
  setToken (token, type, scopes = 'common') {
    const value = !token ? null : (type ? type + ' ' : '') + token
    this.setHeader('Authorization', value, scopes)
  },
  onRequest(fn) {
    this.interceptors.request.use(config => fn(config) || config)
  },
  onResponse(fn) {
    this.interceptors.response.use(response => fn(response) || response)
  },
  onRequestError(fn) {
    this.interceptors.request.use(undefined, error => fn(error) || Promise.reject(error))
  },
  onResponseError(fn) {
    this.interceptors.response.use(undefined, error => fn(error) || Promise.reject(error))
  },
  onError(fn) {
    this.onRequestError(fn)
    this.onResponseError(fn)
  }
}

// Request helpers ($get, $post, ...)
for (let method of ['request', 'delete', 'get', 'head', 'options', 'post', 'put', 'patch']) {
  axiosExtra['$' + method] = function () { return this[method].apply(this, arguments).then(res => res && res.data) }
}

const extendAxiosInstance = axios => {
  for (let key in axiosExtra) {
    axios[key] = axiosExtra[key].bind(axios)
  }
}






const setupProgress = (axios, ctx) => {
  if (process.server) {
    return
  }

  // A noop loading inteterface for when $nuxt is not yet ready
  const noopLoading = {
    finish: () => { },
    start: () => { },
    fail: () => { },
    set: () => { }
  }

  const $loading = () => (window.$nuxt && window.$nuxt.$loading && window.$nuxt.$loading.set) ? window.$nuxt.$loading : noopLoading

  let currentRequests = 0

  axios.onRequest(config => {
    if (config && config.progress === false) {
      return
    }

    currentRequests++
  })

  axios.onResponse(response => {
    if (response && response.config && response.config.progress === false) {
      return
    }

    currentRequests--
    if (currentRequests <= 0) {
      currentRequests = 0
      $loading().finish()
    }
  })

  axios.onError(error => {
    if (error && error.config && error.config.progress === false) {
      return
    }

    currentRequests--
    $loading().fail()
    $loading().finish()
  })

  const onProgress = e => {
    const progress = ((e.loaded * 100) / (e.total * currentRequests))
    $loading().set(Math.min(100, progress))
  }

  axios.defaults.onUploadProgress = onProgress
  axios.defaults.onDownloadProgress = onProgress
}

export default (ctx, inject) => {
  const axiosOptions = {
    // baseURL
    baseURL : process.browser
      ? '/'
      : (process.env._AXIOS_BASE_URL_ || 'http://localhost:3000/'),

    // Create fresh objects for all default header scopes
    // Axios creates only one which is shared across SSR requests!
    // https://github.com/mzabriskie/axios/blob/master/lib/defaults.js
    headers: {
      common : {
        'Accept': 'application/json, text/plain, */*'
      },
      delete: {},
      get: {},
      head: {},
      post: {},
      put: {},
      patch: {}
    }
  }

  
  // Proxy SSR request headers headers
  axiosOptions.headers.common = (ctx.req && ctx.req.headers) ? Object.assign({}, ctx.req.headers) : {}
  delete axiosOptions.headers.common['accept']
  delete axiosOptions.headers.common['host']
  

  // Create new axios instance
  const axios = Axios.create(axiosOptions)

  // Extend axios proto
  extendAxiosInstance(axios)

  // Setup interceptors
  
  
  setupProgress(axios, ctx) 
  

  // Inject axios to the context as $axios
  ctx.$axios = axios
  inject('axios', axios)
}
