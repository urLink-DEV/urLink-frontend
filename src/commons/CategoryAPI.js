import { axios, api } from './http';
import queryData from './queryData';

const CategoryAPI = {
  get : ({ id }) => {
    try {
      id = id ? id + "/" : ""
      const categoryRead = queryData["categoryRead"]
      return axios.get(api.READ_CATEGORY + id, categoryRead)
    } catch (error) {
      console.warn(error)
    }
  },
  
  write : ({ name, order, isFavorited }) => {
    try {
      const categoryWrite = Object.create(queryData["categoryWrite"])
      categoryWrite.name = name
      order ? categoryWrite.order = order : delete categoryWrite.order
      isFavorited ? categoryWrite.is_favorited = isFavorited : categoryWrite.is_favorited = isFavorited
      return axios.post(api.WRITE_CATEGORY, categoryWrite)
    } catch (error) {
      console.warn(error)
    }
  },
  
  update : ({ id, name, order, isFavorited }) => {
    try {
      id = id ? id + "/" : ""
      const categoryUpdate = Object.assign(queryData["categoryUpdate"])
      categoryUpdate.name = name
      order ? categoryUpdate.order = order : delete categoryUpdate.order
      isFavorited ? categoryUpdate.is_favorited = isFavorited : categoryUpdate.is_favorited = isFavorited
      return axios.patch(api.UPDATE_CATEGORY + id, categoryUpdate)
    } catch (error) {
      console.warn(error)
    }
  },
  
  remove : ({ id }) => {
    try {
      id = id ? id + "/" : ""
      const categoryDelete = Object.assign(queryData["categoryDelete"])
      return axios.delete(api.DELETE_CATEGORY + id, categoryDelete)
    } catch (error) {
      console.warn(error)
    }
  }
}
export default CategoryAPI