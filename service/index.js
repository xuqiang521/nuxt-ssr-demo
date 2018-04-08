const api = '/api'
const japi = '/japi'
const rapi = '/rapi'
const tapi = '/tapi'

export const getBannerData = (app, params) => {
  return app.$axios.get(`${api}/v1/get_banner`, {params})
}

export const getCategoriesData = (app, params) => {
  return app.$axios.get(`${japi}/v1/categories`, {params})
}

export const getRecommendData = (app, params) => {
  return app.$axios.get(`${rapi}/v1/get_recommended_entry`, {params})
}

export const getEntriesData = (app, params) => {
  return app.$axios.get(`${tapi}/v1/get_entry_by_rank`, {params})
}
