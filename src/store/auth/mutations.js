import * as types from './mutation-types'
const mutations = {
  [types.AUTH_REQUEST] (state) {
    state.status = 'loading'
  },

  [types.AUTH_SUCCESS] (state, payload) {
    state.status = 'success'
    state.token = payload.access_token
    state.current = payload.user
    state.message = payload.message
  },

  [types.AUTH_ERROR] (state, payload) {
    state.status = 'error'
    state.message = payload.message
    state.errors = payload.errors
  },
  [types.PROFILE_REQUEST] (state) {
    state.status = 'loading'
  },

  [types.PROFILE_SUCCESS] (state, payload) {
    state.status = 'success'
    state.current = payload.user
  },

  [types.PROFILE_ERROR] (state) {
    state.status = 'error'
  },
  [types.LOGOUT] (state) {
    state.token = ''
    state.status = 'logout'
  }
}

export default mutations
