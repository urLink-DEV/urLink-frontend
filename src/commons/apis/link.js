import { axios, api } from '../http'
import queryData from '../queryData'
import { getQueryParams, getDashQueryParams } from '../quryParam'

const linkAPI = {
  get : ({ category, path, title }) => {
    try {
      const queryParams = getQueryParams({ category, path, title })
      const linkRead = queryData["linkRead"]
      return axios.get(api.LINK + queryParams, linkRead)
    } catch (error) {
      console.warn(error)
    }
  },
  
  write : ({ category, path }) => {
    try {
      if(!Array.isArray(path)) throw new Error("path는 Array type이 필수 입니다.")
      let queryParams = getQueryParams({ category })
      const linkWrite = Object.assign(queryData["linkWrite"])
      linkWrite.path = path
      return axios.post(api.LINK + queryParams, linkWrite)
    } catch (error) {
      console.warn(error)
    }
  },
  
  update : ({ id, title, description, isFavorited }) => {
    try {
      let dashQueryParams = getDashQueryParams([id])
      if(!dashQueryParams) throw new Error(`link : ${id} Id는 필수 입니다.`)
      const linkUpdate = Object.assign(queryData["linkUpdate"])
      linkUpdate.title = title
      linkUpdate.description = description
      linkUpdate.is_favorited = isFavorited
      return axios.patch(api.LINK + dashQueryParams, linkUpdate)
    } catch (error) {
      console.warn(error)
    }
  },

  remove : ({ id }) => {
    try {
      let dashQueryParams = getDashQueryParams([id])
      if(!dashQueryParams) throw new Error(`link : ${id} Id는 필수 입니다.`)
      const linkDelete = Object.assign(queryData["linkDelete"])
      return axios.delete(api.LINK + dashQueryParams, linkDelete)
    } catch (error) {
      console.warn(error)
    }
  }
}

export default linkAPI