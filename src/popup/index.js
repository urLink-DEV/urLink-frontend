import '@assets/css/default.css'
import '@assets/css/popup.css'
import loginImg from '@assets/images/group-25.svg'
import emptyImg from '@assets/images/group-26.svg'
import starImg from '@assets/images/group-27.svg'
import checkImg from '@assets/images/white.svg'
import { requestCategoriesRead } from '@modules/category/api'
import { requestLinkCreate } from '@modules/link/api'
import { getTabsQuery } from '@utils/chromeApis/tab'
import { getAccessToken } from '@utils/http/auth'

window.addEventListener('DOMContentLoaded', () => {
  if (getAccessToken()) {
    APILoad.categoryListAppend()
    EventSetting.linkSaveEventSetting()
  } else {
    document.getElementById('categoryList').innerHTML = Template.loginRequired()
  }
})

const APILoad = {
  async categoryListAppend() {
    const categoryListElement = document.getElementById('categoryList')
    try {
      const { data } = await requestCategoriesRead()
      if (data?.length) {
        categoryListElement.innerHTML = data.map((item) => Template.categoryItem(item)).join('')
        data.map((item) => EventSetting.categoryEventSetting(item))
      } else {
        categoryListElement.innerHTML = Template.categoryEmpty()
      }
    } catch (error) {
      console.error(error)
    }
  },

  async linkWrite(categoryId, path) {
    const categoryCardElement = document.getElementById(`category${categoryId}`)
    try {
      const { data } = await requestLinkCreate({ categoryId, path })
      if (data?.length) {
        categoryCardElement.classList.add('upload-finish')
        popupMessage({ message: '링크가 이동 되었습니다.' })
      }
    } catch (error) {
      categoryCardElement.classList.remove('check')
      if (error.response?.status === 500) popupMessage({ message: '유효하지 않은 링크 입니다.' })
      else if (error?.response?.data?.message) {
        popupMessage({ message: error.response.data.message })
      }
    }
  },
}

const EventListener = {
  categoryEventListener(data, e) {
    const currentCategoryElement = e.currentTarget
    const linkSaveElement = document.getElementById('linkSave')
    const categoryListElement = document.getElementsByClassName('category-card')
    Array.prototype.map.call(categoryListElement, (category) => category.classList.remove('check'))
    currentCategoryElement.classList.add('check')
    if (!linkSaveElement.classList.contains('active')) linkSaveElement.classList.add('active')
    linkSaveElement.dataset.categoryId = data.id
  },

  async linkSaveEventListener(e) {
    try {
      e.preventDefault()
      const linkSaveElement = document.getElementById('linkSave')
      if (linkSaveElement.classList.contains('active')) {
        const categoryId = linkSaveElement.dataset.categoryId
        const tabs = await getTabsQuery()
        await APILoad.linkWrite(categoryId, [tabs[0].url])
        linkSaveElement.classList.toggle('active')
        await APILoad.categoryListAppend()
      }
    } catch (error) {
      popupMessage({ message: error.message })
    }
  },
}

const EventSetting = {
  categoryEventSetting(data) {
    const categoryCardElement = document.getElementById(`category${data.id}`)
    categoryCardElement.removeEventListener('click', EventListener.categoryEventListener)
    categoryCardElement.addEventListener('click', EventListener.categoryEventListener.bind(null, data), false)
  },

  linkSaveEventSetting() {
    const linkSaveElement = document.getElementById('linkSave')
    linkSaveElement.removeEventListener('click', EventListener.linkSaveEventListener)
    linkSaveElement.addEventListener('click', EventListener.linkSaveEventListener, false)
  },
}

const Template = {
  categoryItem(data) {
    return `
      <div 
        class="category-card" 
        data-categoryId=${data.id} 
        id="category${data.id}" 
        title="${data.name}" 
        alt="${data.name}"
      >
        <div class="category-card-text">${data.name}</div>
        <div class="tab-text">${data.url_count ? data.url_count + ' 링크' : '링크 없음'}</div>
        ${data.is_favorited ? `<img src="${starImg}">` : ''}
      </div>
    `
  },

  categoryEmpty() {
    return `
      <div class="category-empty-contanier">
        <img class="category-empty" src="${emptyImg}">
      </div>
    `
  },

  loginRequired() {
    return `
      <div class="login-required-container">
        <img src="${loginImg}" >
      </div>
    `
  },

  popup(data) {
    return `
      <div class="category-popup">
        <img src="${checkImg}" class="category-popup-img">
        <div class="category-popup-text">
          ${data.message}
        </div>
      </div>
    `
  },
}

function popupMessage(data) {
  const categoryPopupElement = document.getElementById('categoryPopup')
  categoryPopupElement.style.display = 'flex'
  categoryPopupElement.innerHTML = Template.popup({ message: data.message })
  setTimeout(() => {
    categoryPopupElement.style.display = 'none'
    categoryPopupElement.innerHTML = ''
  }, 1000)
}
