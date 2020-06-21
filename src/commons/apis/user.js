import { axios, api } from '../http'
import queryData from '../queryData'
import { getDashQueryParams } from './queryParams'

const userAPI = {
  get : ({ id }) => {
    try {
      const dashQueryParams = getDashQueryParams([id])
      if(!dashQueryParams) throw new Error(`user : ${id} Id는 필수 입니다.`)
      const userRead = queryData["userRead"]
      return axios.get(api.READ_CATEGORY + dashQueryParams, userRead)
    } catch (error) {
      console.warn(error)
    }
  }
}
export default userAPI