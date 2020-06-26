import { axios, api } from '../http'
import queryData from '../queryData'
import { getDashQueryParams } from '../quryParam'

const categoryAPI = {
  get : ({ id }) => {
    try {
      let dashQueryParams = getDashQueryParams([id])
      const categoryRead = queryData["categoryRead"]
      return axios.get(api.CATEGORY + dashQueryParams, categoryRead)
    } catch (error) {
      console.warn(error)
    }
  },
  
  write : ({ name, isFavorited }) => {
    try {
      const categoryWrite = Object.create(queryData["categoryWrite"])
      categoryWrite.name = name
      categoryWrite.is_favorited = isFavorited
      return axios.post(api.CATEGORY, categoryWrite)
    } catch (error) {
      console.warn(error)
    }
  },
  
  update : ({ id, name, order, isFavorited }) => {
    try {
      let dashQueryParams = getDashQueryParams([id])
      const categoryUpdate = Object.assign(queryData["categoryUpdate"])
      if(!dashQueryParams) throw new Error(`category : ${id} Id는 필수 입니다.`)
      categoryUpdate.name = name
      categoryUpdate.order = order
      categoryUpdate.is_favorited = isFavorited
      return axios.patch(api.CATEGORY + dashQueryParams, categoryUpdate)
    } catch (error) {
      console.warn(error)
    }
  },
  
  remove : ({ id }) => {
    try {
      let dashQueryParams = getDashQueryParams([id])
      const categoryDelete = Object.assign(queryData["categoryDelete"])
      if(!dashQueryParams) throw new Error(`category : ${id} Id는 필수 입니다.`)
      return axios.delete(api.CATEGORY + dashQueryParams, categoryDelete)
    } catch (error) {
      console.warn(error)
    }
  }
}
export default categoryAPI