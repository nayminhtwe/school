import * as types from './mutation-types'

const actions = {
  async register ({ commit }, formData) {
    commit(types.AUTH_REQUEST)
    await this.$api
      .post('/register', formData)
      .then(response => {
        localStorage.setItem('access_token', response.data.access_token)
        commit(types.AUTH_SUCCESS, response.data)
      })
      .catch(err => {
        commit(types.AUTH_ERROR, err.response.data)
        localStorage.removeItem('access_token') // if the request fails, remove any possible user token if possible
      })
  },
  async profile ({ commit, getters }) {
    commit(types.PROFILE_REQUEST)
    this.$api.defaults.headers.Authorization = `Bearer ${getters.getUserToken}`
    await this.$api.get(
      'profile'
    ).then((response) => {
      commit(types.PROFILE_SUCCESS, response.data.data)
    })
  },
  async login ({ commit }, formData) {
    commit(types.AUTH_REQUEST)
    await this.$api
      .post('login', formData)
      .then(response => {
        if (response.data.error_code === 0) {
          localStorage.setItem('access_token', response.data.access_token)
          commit(types.AUTH_SUCCESS, response.data)
        }
      })
      .catch(err => {
        commit(types.AUTH_ERROR, err.response.data)
        localStorage.removeItem('access_token') // if the request fails, remove any possible user token if possible
      })
  },
  logout ({ commit }) {
    localStorage.removeItem('access_token')
    commit(types.LOGOUT)
  }
}

export default actions
