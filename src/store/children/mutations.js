import * as types from './mutation-types'
const mutations = {
  [types.CREATE_REQUEST] (state) {
    state.status = 'loading'
  },

  [types.CREATE_SUCCESS] (state) {
    state.status = 'success'
  },

  [types.CREATE_ERROR] (state) {
    state.status = 'error'
  },
  [types.DELETE_REQUEST] (state) {
    state.status = 'loading'
  },

  [types.DELETE_SUCCESS] (state) {
    state.status = 'success'
  },

  [types.DELETE_ERROR] (state) {
    state.status = 'error'
  },
  [types.LIST_REQUEST] (state) {
    state.status = 'loading'
  },

  [types.LIST_SUCCESS] (state, payload) {
    state.children = payload
    state.status = ''
  },

  [types.LIST_ERROR] (state) {
    state.status = 'error'
  }
}

export default mutations
