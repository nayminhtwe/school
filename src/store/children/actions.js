import { api } from 'src/boot/axios'
import * as types from './mutation-types'

const actions = {
  async create ({ commit, rootGetters }, formData) {
    commit(types.CREATE_REQUEST)
    api.defaults.headers.Authorization = `Bearer ${rootGetters['auth/getUserToken']}`
    await api
      .post('child_create', formData)
      .then(response => {
        commit(types.CREATE_SUCCESS)
      })
      .catch(err => {
        commit(types.CREATE_ERROR, err.response.data)
      })
  },
  async delete ({ commit, rootGetters }, formData) {
    commit(types.DELETE_REQUEST)
    api.defaults.headers.Authorization = `Bearer ${rootGetters['auth/getUserToken']}`
    await api
      .post('child_delete', formData)
      .then(response => {
        if (response.data.error_code === '0') {
          commit(types.DELETE_SUCCESS, response.data)
        }
      })
      .catch(err => {
        commit(types.DELETE_ERROR, err.response.data)
      })
  },
  async list ({ commit, rootGetters }) {
    commit(types.LIST_REQUEST)
    api.defaults.headers.Authorization = `Bearer ${rootGetters['auth/getUserToken']}`
    await api.get(
      'child_list'
    ).then((response) => {
      commit(types.LIST_SUCCESS, response.data.data)
    })
  }
}

export default actions
