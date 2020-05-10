import { axios, api } from './http';
import queryData from './queryData';

export const getCategory = async ({ id }) => {
  try {
    id = id ? id + "/" : ""
    const categoryRead = queryData["categoryRead"]
    const response = await axios.get(api.READ_CATEGORY + id, categoryRead)
    return response
  } catch (error) {
    return error.response.data.message
  }
}

export const writeCategory = async ({ name, order, isFavorited }) => {
  try {
    const categoryWrite = Object.create(queryData["categoryWrite"])
    categoryWrite.name = name
    order ? categoryWrite.order = order : delete categoryWrite.order
    isFavorited ? categoryWrite.is_favorited = isFavorited : delete categoryWrite.is_favorited
    const response = await axios.post(api.WRITE_CATEGORY, categoryWrite)
    return response
  } catch (error) {
    return error.response.data.message
  }
}

export const updateCategory = async ({ id, name, order, isFavorited }) => {
  try {
    id = id ? id + "/" : ""
    const categoryUpdate = Object.assign(queryData["categoryUpdate"])
    categoryUpdate.name = name
    order ? categoryUpdate.order = order : delete categoryUpdate.order
    isFavorited ? categoryUpdate.is_favorited = isFavorited : delete categoryUpdate.is_favorited
    const response = await axios.patch(api.UPDATE_CATEGORY + id, categoryUpdate)
    return response
  } catch (error) {
    return error.response.data.message
  }
}

export const deleteCategory = async ({ id }) => {
  try {
    id = id ? id + "/" : ""
    const categoryDelete = Object.assign(queryData["categoryDelete"])
    const response = await axios.delete(api.DELETE_CATEGORY + id, categoryDelete)
    if (response.status === 204) return true;
    else return false;
  } catch (error) {
    return error.response.data.message
  }
}