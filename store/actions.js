import * as asyncData from '~/service/index.js'

export const banner = async (store, params) => {
  return asyncData.getBannerData(store, params)
}

export const categories = async (store, params) => {
  return asyncData.getCategoriesData(store, params)
}

export const recommend = async (store, params) => {
  return asyncData.getRecommendData(store, params)
}

export const entries = async (store, params) => {
  return asyncData.getEntriesData(store, params)
}
