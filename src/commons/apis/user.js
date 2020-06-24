import { axios, api } from '../http'
import queryData from '../queryData'

const userAPI = {
  get : ({}) => {
    try {
      const userRead = queryData["userRead"]
      return axios.get(api.MEMBER, userRead)
    } catch (error) {
      console.warn(error)
    }
  },

  update: ({ username, password }) => {
    try {
      const userUpdate = queryData["userUpdate"]
      userUpdate.username = username
      userUpdate.password = password
      return axios.patch(api.MEMBER, userUpdate)
    } catch (error) {
      console.warn(error)
    }
  },

  remove : ({}) => {
    try {
      const userDelete = queryData["userDelete"]
      return axios.delete(api.MEMBER, userDelete)
    } catch (error) {
      console.warn(error)
    }
  },

  nRegister: ({ email, username, password }) => {
    try {
      const nRegister = queryData["n_register"]
      nRegister.email = email
      nRegister.username = username
      nRegister.password = password
      return axios.post(api.N_MEMBER_REGISTER, nRegister)
    } catch (error) {
      console.warn(error)
    }
  },

  nLogin: ({ email, password }) => {
    try {
      const nLogin = queryData["n_login"]
      nLogin.email = email
      nLogin.password = password
      return axios.post(api.N_MEMBER_LOGIN, nLogin)
    } catch (error) {
      console.warn(error)
    }
  },

  gRegister: ({ token }) => {
    const gRegister = queryData['g_register']
    gRegister.token = token
    return axios.post(api.G_MEMBER_REGISTER, gRegister)
  },

  gLogin: ({ token }) => {
    const gLogin = queryData['g_login']
    gLogin.token = token
    return axios.post(api.G_MEMBER_LOGIN, gLogin)
  }
}
export default userAPI