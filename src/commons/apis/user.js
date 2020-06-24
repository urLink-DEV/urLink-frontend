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
  }
}
export default userAPI