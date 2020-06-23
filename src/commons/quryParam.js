/**
 * @param {Object} queryParamsData 
 */
export const getQueryParams = (queryParamsData) => {
  let queryParams = ""
  for (const [key, value] of Object.entries(queryParamsData)) {
    if(!value) continue
    else queryParams += `&${key}=${encodeURI(value)}`
  }
  if(queryParams) queryParams = queryParams.replace("&","?")
  return queryParams
}

/**
 * @param {ARray} queryParamsData 
 */
export const getDashQueryParams = (queryParamsData) => {
  queryParamsData = queryParamsData || []
  let queryParams = ""
  queryParamsData.map((queryParamData) => { if (queryParamData) queryParams += queryParamData + "/" })
  return queryParams
}