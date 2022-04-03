import * as types from './mutation-types'
const mutations = {
  [types.ENROLL_REQUEST] (state) {
    state.status = 'loading'
  },

  [types.ENROLL_SUCCESS] (state) {
    state.status = 'success'
  },

  [types.ENROLL_ERROR] (state) {
    state.status = 'error'
  },
  [types.LIST_REQUEST] (state) {
    state.status = 'loading'
  },

  [types.LIST_SUCCESS] (state, payload) {
    state.classes = payload
    state.status = ''
  },

  [types.LIST_ERROR] (state) {
    state.status = 'error'
  }
}

export default mutations
