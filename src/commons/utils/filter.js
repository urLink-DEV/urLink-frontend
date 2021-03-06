export function isObjValueEmpty(obj) {
  return Object.entries(obj).filter(([_, value]) => !value).length === Object.entries(obj).length
}

export function isObjkeysEmpty(obj) {
  return !!Object.keys(obj).length
}

export function limitedStringReplace(data, limit, replaceString="...") {
  return data.substring(0, limit) + replaceString
}
