const linkAPI = {
  write : ({ category, path }) => {
    try {
      let queryParams = category ? `?category=${category}` : ""
      if(!Array.isArray(path)) throw new Error("path는 Array type이 필수 입니다.")
      const linkWrite = Object.assign(queryData["linkWrite"])
      linkWrite.path = path
      return axios.post(api.WRITE_LINK + queryParams, linkWrite)
    } catch (error) {
      console.warn(error)
    }
  }
}