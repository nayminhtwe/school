import { api } from 'src/boot/axios'
import * as types from './mutation-types'

const actions = {
  async enroll ({ commit, rootGetters }, formData) {
    commit(types.ENROLL_REQUEST)
    api.defaults.headers.Authorization = `Bearer ${rootGetters['auth/getUserToken']}`
    await api
      .post('student_enroll', formData)
      .then(response => {
        console.log(response)
        commit(types.ENROLL_SUCCESS)
      })
      .catch(err => {
        commit(types.ENROLL_ERROR, err.response.data)
      })
  },
  async list ({ commit, rootGetters }, formData) {
    for (const pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1])
    }
    commit(types.LIST_REQUEST)
    api.defaults.headers.Authorization = `Bearer ${rootGetters['auth/getUserToken']}`
    await api.post(
      'class_list', formData)
      .then((response) => {
        console.log(response)
        commit(types.LIST_SUCCESS, response.data.data)
      })
  }
}

export default actions
