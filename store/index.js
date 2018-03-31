import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
