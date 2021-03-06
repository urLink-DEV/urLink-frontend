export function isObjValueEmpty(obj) {
  return Object.entries(obj).filter(([_, value]) => !value).length === Object.entries(obj).length
}

export function isObjkeysEmpty(obj) {
  return !!Object.keys(obj).length
}