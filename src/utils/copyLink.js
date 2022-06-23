async function copyLink(url) {
  try {
    await navigator.clipboard.writeText(url)
    return true
  } catch (e) {
    return false
  }
}

export default copyLink
