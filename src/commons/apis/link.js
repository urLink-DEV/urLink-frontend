import { axios, api } from '../http'
import queryData from '../queryData'
import { getQueryParams, getDashQueryParams } from '../quryParam'

const linkAPI = {
  get : (linkInfo) => {
    try {
      const { category, path, title } = linkInfo
      const queryParams = getQueryParams({ category, path, title })
      const linkReadKeys = Object.keys(queryData["linkRead"])
      const linkRead = {}
      Object.entries(linkInfo).forEach(([key, value]) => {
        if (linkReadKeys.includes(key)) linkRead[key] = value
      })
      return axios.get(api.LINK + queryParams, linkRead)
    } catch (error) {
      return {error}
    }
  },
  
  write : (linkInfo) => {
    try {
      const { category, path } = linkInfo
      if(!Array.isArray(path)) throw new Error("path는 Array type이 필수 입니다.")
      let queryParams = getQueryParams({ category })
      const linkWriteKeys = Object.keys(queryData["linkWrite"])
      const linkWrite = {}
      Object.entries(linkInfo).forEach(([key, value]) => {
        if (linkWriteKeys.includes(key)) linkWrite[key] = value
      })
      return axios.post(api.LINK + queryParams, linkWrite)
    } catch (error) {
      return {error}
    }
  },
  
  update : (linkInfo) => {
    try {
      const { id } = linkInfo
      let dashQueryParams = getDashQueryParams([id])
      if(!dashQueryParams) throw new Error(`link : ${id} Id는 필수 입니다.`)
      const linkUpdateKeys = Object.keys(queryData["linkUpdate"])
      const linkUpdate = {}
      Object.entries(linkInfo).forEach(([key, value]) => {
        if (linkUpdateKeys.includes(key)) linkUpdate[key] = value
      })
      return axios.patch(api.LINK + dashQueryParams, linkUpdate)
    } catch (error) {
      return {error}
    }
  },

  remove : (linkInfo) => {
    try {
      const { id } = linkInfo
      let dashQueryParams = getDashQueryParams([id])
      if(!dashQueryParams) throw new Error(`link : ${id} Id는 필수 입니다.`)
      const linkDeleteKeys = Object.keys(queryData["linkDelete"])
      const linkDelete = {}
      Object.entries(linkInfo).forEach(([key, value]) => {
        if (linkDeleteKeys.includes(key)) linkDelete[key] = value
      })
      return axios.delete(api.LINK + dashQueryParams, linkDelete)
    } catch (error) {
      return {error}
    }
  }
}

export default linkAPI