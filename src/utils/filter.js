export function isObjValueEmpty(obj) {
  return Object.entries(obj).filter(([_, value]) => !value).length === Object.entries(obj).length
}

export function isObjKeysEmpty(obj) {
  return !!Object.keys(obj).length
}
