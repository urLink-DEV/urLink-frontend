export function getBookmarks() {
  chrome.bookmarks.getTree((data) => console.log(data))
}

const onBookmarkFolderAdded = (newFolder, fn) => {
  fn(newFolder.id)
}

export function createBookmark(data) {
  const { id, title, url } = data
  chrome.bookmarks.create({
    parentId: id,
    title,
    url,
  })
}

export function createBookmarkFolder(data, fn) {
  const { id, title } = data
  const idCheck = chrome.runtime?.id
  if (idCheck) {
    chrome.bookmarks.create(
      {
        parentId: id,
        title: title,
      },
      (newFolder) => onBookmarkFolderAdded(newFolder, fn)
    )
  }
}
