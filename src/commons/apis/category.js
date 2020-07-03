import { axios, api } from '../http'
import queryData from '../queryData'
import { getDashQueryParams } from '../quryParam'

const categoryAPI = {
  get: (categoryInfo) => {
    try {
      const { id } = categoryInfo
      let dashQueryParams = getDashQueryParams([id])
      const categoryReadKeys = Object.keys(queryData["categoryRead"])
      const categoryRead = {}
      Object.entries(categoryInfo).forEach(([key, value]) => {
        if (categoryReadKeys.includes(key)) categoryRead[key] = value
      })
      return axios.get(api.CATEGORY + dashQueryParams, categoryRead)
    } catch (error) {
      return {error}
    }
  },
  
  write: (categoryInfo) => { // !! 추후에 camelCase npm install 할 지 결정
    try {
      const categoryWriteKeys = Object.keys(queryData["categoryWrite"])
      const categoryWrite = {}
      Object.entries(categoryInfo).forEach(([key, value]) => {
        if (categoryWriteKeys.includes(key)) categoryWrite[key] = value
      })
      return axios.post(api.CATEGORY, categoryWrite)
    } catch (error) {
      return {error}
    }
  },
  
  update: (categoryInfo) => { // !! 추후에 camelCase npm install 할 지 결정
    try {
      const { id } = categoryInfo
      let dashQueryParams = getDashQueryParams([id])
      if(!dashQueryParams) throw new Error(`category : ${id} Id는 필수 입니다.`)
      const categoryUpdateKeys = Object.keys(queryData["categoryUpdate"])
      const categoryUpdate = {}
      Object.entries(categoryInfo).forEach(([key, value]) => {
        if (categoryUpdateKeys.includes(key)) categoryUpdate[key] = value
      })
      return axios.patch(api.CATEGORY + dashQueryParams, categoryUpdate)
    } catch (error) {
      return {error}
    }
  },
  
  remove: (categoryInfo) => {
    try {
      const { id } = categoryInfo
      let dashQueryParams = getDashQueryParams([id])
      if(!dashQueryParams) throw new Error(`category : ${id} Id는 필수 입니다.`)
      const categoryDeleteKeys = Object.keys(queryData["categoryDelete"])
      const categoryDelete = {}
      Object.entries(categoryInfo).forEach(([key, value]) => {
        if (categoryDeleteKeys.includes(key)) categoryDelete[key] = value
      })
      return axios.delete(api.CATEGORY + dashQueryParams, categoryDelete)
    } catch (error) {
      return {error}
    }
  }
}
export default categoryAPI