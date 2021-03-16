function copyLink(url) {
  const copyElement = document.createElement('textarea')
  copyElement.value = url
  document.body.appendChild(copyElement)
  copyElement.select()
  document.execCommand('copy')
  document.body.removeChild(copyElement)
}

export default copyLink
