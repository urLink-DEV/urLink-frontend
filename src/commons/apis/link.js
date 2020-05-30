import { axios, api } from '../http'
import queryData from '../queryData'

const linkAPI = {
  get : ({ category, path, title }) => {
    try {
      let queryParams = ""
      for (const [key, value] of Object.entries({category,path,title})) {
        if(!value) continue
        else queryParams += `&${key}=${encodeURI(value)}`
      }
      if(queryParams) queryParams = queryParams.replace("&","?")
      const linkRead = queryData["linkRead"]
      return axios.get(api.READ_LINK + queryParams, linkRead)
    } catch (error) {
      console.warn(error)
    }
  },
  
  write : ({ category, path }) => {
    try {
      let queryParams = category ? `?category=${category}` : ""
      if(!Array.isArray(path)) throw new Error("path는 Array type이 필수 입니다.")
      const linkWrite = Object.create(queryData["linkWrite"])
      linkWrite.path = path
      return axios.post(api.WRITE_LINK + queryParams, linkWrite)
    } catch (error) {
      console.warn(error)
    }
  },
  
  remove : ({ id }) => {
    try {
      let queryParams = id ? `${id}/` : ""
      const linkDelete = Object.assign(queryData["linkDelete"])
      return axios.delete(api.DELETE_LINK + queryParams, linkDelete)
    } catch (error) {
      console.warn(error)
    }
  }
}

export default linkAPI