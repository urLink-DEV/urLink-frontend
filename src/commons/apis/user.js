import { axios, api } from '../http/client'
import queryData from '../http/queryData'

const userAPI = {
  get : (userInfo) => {
    try {
      const userReadKeys = Object.keys(queryData["userRead"])
      const userRead = {}
      Object.entries(userInfo).forEach(([key, value]) => {
        if (userReadKeys.includes(key)) userRead[key] = value
      })
      return axios.get(api.MEMBER, userRead)
    } catch (error) {
      return {error}
    }
  },

  update: (userInfo) => {
    try {
      const userUpdateKeys = Object.keys(queryData["userUpdate"])
      const userUpdate = {}
      Object.entries(userInfo).forEach(([key, value]) => {
        if (userUpdateKeys.includes(key)) userUpdate[key] = value
      })
      return axios.patch(api.MEMBER, userUpdate)
    } catch (error) {
      return {error}
    }
  },

  remove : (userInfo) => {
    try {
      const userDeleteKeys = Object.keys(queryData["userDelete"])
      const userDelete = {}
      Object.entries(userInfo).forEach(([key, value]) => {
        if (userDeleteKeys.includes(key)) userDelete[key] = value
      })
      return axios.delete(api.MEMBER, userDelete)
    } catch (error) {
      return {error}
    }
  },

  nRegister: (userInfo) => {
    try {
      const nRegisterKeys = Object.keys(queryData["nRegister"])
      const nRegister = {}
      Object.entries(userInfo).forEach(([key, value]) => {
        if (nRegisterKeys.includes(key)) nRegister[key] = value
      })
      return axios.post(api.N_MEMBER_REGISTER, nRegister)
    } catch (error) {
      return {error}
    }
  },

  nLogin: (userInfo) => {
    try {
      const nLoginKeys = Object.keys(queryData["nLogin"])
      const nLogin = {}
      Object.entries(userInfo).forEach(([key, value]) => {
        if (nLoginKeys.includes(key)) nLogin[key] = value
      })
      return axios.post(api.N_MEMBER_LOGIN, nLogin)
    } catch (error) {
      return {error}
    }
  },

  gRegister: (userInfo) => {
    try {
      const gRegisterKeys = Object.keys(queryData["gRegister"])
      const gRegister = {}
      Object.entries(userInfo).forEach(([key, value]) => {
        if (gRegisterKeys.includes(key)) gRegister[key] = value
      })
      return axios.post(api.G_MEMBER_REGISTER, gRegister)
    } catch (error) {
      return {error}
    }
  },

  gLogin: (userInfo) => {
    try {
      const gLoginKeys = Object.keys(queryData["gLogin"])
      const gLogin = {}
      Object.entries(userInfo).forEach(([key, value]) => {
        if (gLoginKeys.includes(key)) gLogin[key] = value
      })
      return axios.post(api.G_MEMBER_LOGIN, gLogin)
    } catch (error) {
      return {error}
    }
  }
}
export default userAPI