import '@assets/css/default.css'
import '@assets/css/popup.css'
import loginImg from '@assets/images/group-25.svg'
import emptyImg from '@assets/images/group-26.svg'
import starImg from '@assets/images/group-27.svg'
import plusImg from '@assets/images/plus.png'
import checkImg from '@assets/images/white.svg'
import { requestCategoryCreate, requestCategoriesRead } from '@modules/category/api'
import { requestLinkCreate } from '@modules/link/api'
import { getTabsQuery } from '@utils/chromeApis/tab'
import { getAccessToken } from '@utils/http/auth'

window.addEventListener('DOMContentLoaded', () => {
  if (getAccessToken()) {
    const categoryListElement = document.getElementById('categoryList')
    const categoryCreateButtonElement = Template.categoryCreateButton()
    const categoryCreateInputWrapperElement = Template.categoryCreateInputWrapper()
    const categoryItemListWrapperElement = Template.categoryListWrapper()
    categoryListElement.innerHTML =
      categoryCreateButtonElement + categoryCreateInputWrapperElement + categoryItemListWrapperElement

    APILoad.categoryListAppend()
    EventSetting.linkSaveEventSetting()
  } else {
    document.getElementById('categoryList').innerHTML = Template.loginRequired()
  }
})

const APILoad = {
  async categoryListAppend() {
    const categoryItemListWrapperElement = document.getElementById('categoryItemListWrapper')
    try {
      const { data } = await requestCategoriesRead()
      if (data?.length) {
        categoryItemListWrapperElement.innerHTML = data.map((item) => Template.categoryItem(item)).join('')
        data.map((item) => EventSetting.categoryEventSetting(item))
      } else {
        categoryItemListWrapperElement.innerHTML = Template.categoryEmpty()
      }
      EventSetting.categoryCreateButtonEventSetting()
    } catch (error) {
      console.error(error)
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

  categoryCreateButtonEventListener(e) {
    e.preventDefault()
    const currentCategoryCreateButtonElement = e.currentTarget
    const categoryCreateInputWrapperElement = document.getElementById('categoryCreateInputWrapper')
    currentCategoryCreateButtonElement.classList.add('hide')
    categoryCreateInputWrapperElement.classList.remove('hide')
    EventSetting.categoryCreateOkEventSetting()
    EventSetting.categoryCreateCancelEventSetting()
    EventSetting.categoryCreateEnterEventSetting()
  },

  categoryCreateCancelEventListener(e) {
    e.preventDefault()
    const categoryCreateButtonElement = document.getElementById('categoryCreateButton')
    const categoryCreateInputWrapperElement = document.getElementById('categoryCreateInputWrapper')
    categoryCreateButtonElement.classList.remove('hide')
    categoryCreateInputWrapperElement.classList.add('hide')
    const enterCategoryNameInputElement = document.getElementById('enterCategoryNameInput')
    enterCategoryNameInputElement.value = ''
  },

  async categoryCreateOkEventListener(e) {
    try {
      e.preventDefault()
      const categoryCreateButtonElement = document.getElementById('categoryCreateButton')
      const categoryCreateInputWrapperElement = document.getElementById('categoryCreateInputWrapper')
      const enterCategoryNameInputElement = document.getElementById('enterCategoryNameInput')
      const categoryName = enterCategoryNameInputElement.value
      const {
        data: { name },
      } = await requestCategoryCreate({ name: categoryName, is_favorited: false })
      await requestCategoriesRead()
      if (name) {
        categoryCreateButtonElement.classList.remove('hide')
        categoryCreateInputWrapperElement.classList.add('hide')
        await APILoad.categoryListAppend()
        popupMessage({ message: '카테고리가 생성 되었습니다.' })
        enterCategoryNameInputElement.value = ''
      }
    } catch (error) {
      popupMessage({ message: error.message })
    }
  },

  async categoryCreateEnterEventListener(e) {
    try {
      e.preventDefault()
      e.stopPropagation()
      if (e.key === 'Enter') {
        const categoryCreateButtonElement = document.getElementById('categoryCreateButton')
        const categoryCreateInputWrapperElement = document.getElementById('categoryCreateInputWrapper')
        const enterCategoryNameInputElement = document.getElementById('enterCategoryNameInput')
        const categoryName = enterCategoryNameInputElement.value
        const {
          data: { name },
        } = await requestCategoryCreate({ name: categoryName, is_favorited: false })
        await requestCategoriesRead()
        if (name) {
          categoryCreateButtonElement.classList.remove('hide')
          categoryCreateInputWrapperElement.classList.add('hide')
          await APILoad.categoryListAppend()
          popupMessage({ message: '카테고리가 생성 되었습니다.' })
          enterCategoryNameInputElement.value = ''
        }
      }
    } catch (error) {
      popupMessage({ message: error.message })
    }
  },

  async linkSaveEventListener(e) {
    const linkSaveElement = document.getElementById('linkSave')
    const categoryId = linkSaveElement.dataset.categoryId
    const categoryCardElement = document.getElementById(`category${categoryId}`)
    try {
      e.preventDefault()
      if (linkSaveElement.classList.contains('active')) {
        const tabs = await getTabsQuery()
        const { data } = await requestLinkCreate({ categoryId, path: [tabs[0].url] })
        if (data?.length) {
          categoryCardElement.classList.add('upload-finish')
          popupMessage({ message: '링크가 이동 되었습니다.' })
        }
        linkSaveElement.classList.toggle('active')
        await APILoad.categoryListAppend()
      }
    } catch (error) {
      categoryCardElement.classList.remove('check')
      if (error.response?.status === 500) {
        popupMessage({ message: '유효하지 않은 링크 입니다.' })
      } else {
        popupMessage({ message: error.message })
      }
    }
  },
}

const EventSetting = {
  categoryEventSetting(data) {
    const categoryCardElement = document.getElementById(`category${data.id}`)
    categoryCardElement.removeEventListener('click', EventListener.categoryEventListener)
    categoryCardElement.addEventListener('click', EventListener.categoryEventListener.bind(null, data), false)
  },

  categoryCreateButtonEventSetting() {
    const categoryCreateButtonElement = document.getElementById('categoryCreateButton')
    categoryCreateButtonElement.removeEventListener('click', EventListener.categoryCreateButtonEventListener)
    categoryCreateButtonElement.addEventListener('click', EventListener.categoryCreateButtonEventListener, false)
  },

  categoryCreateCancelEventSetting() {
    const categoryCreateCancelButtonElement = document.getElementById('categoryCreateCancelBtn')
    categoryCreateCancelButtonElement.removeEventListener('click', EventListener.categoryCreateCancelEventListener)
    categoryCreateCancelButtonElement.addEventListener('click', EventListener.categoryCreateCancelEventListener, false)
  },

  categoryCreateOkEventSetting() {
    const categoryCreateOkButtonElement = document.getElementById('categoryCreateOkBtn')
    categoryCreateOkButtonElement.removeEventListener('click', EventListener.categoryCreateOkEventListener)
    categoryCreateOkButtonElement.addEventListener('click', EventListener.categoryCreateOkEventListener, false)
  },

  categoryCreateEnterEventSetting() {
    const categoryCreateInputElement = document.getElementById('enterCategoryNameInput')
    categoryCreateInputElement.removeEventListener('keyup', EventListener.categoryCreateEnterEventListener)
    categoryCreateInputElement.addEventListener('keyup', EventListener.categoryCreateEnterEventListener, false)
  },

  linkSaveEventSetting() {
    const linkSaveElement = document.getElementById('linkSave')
    linkSaveElement.removeEventListener('click', EventListener.linkSaveEventListener)
    linkSaveElement.addEventListener('click', EventListener.linkSaveEventListener, false)
  },
}

const Template = {
  categoryCreateButton() {
    return `
    <button type="button" id="categoryCreateButton" class="category-create-btn">
      <img class="category-plus" src="${plusImg}">
    </button>
    `
  },

  categoryCreateInputWrapper() {
    return `
      <div id="categoryCreateInputWrapper" class="category-create-input-wrapper hide">
        <input id="enterCategoryNameInput" class="enter-category-name-input" type="text" value="" maxlength='18' placeholder="New Category" />
        <div class="category-btn-group">
          <button id="categoryCreateOkBtn" class="create-ok-btn" type="button">확인</button>
          <button id="categoryCreateCancelBtn" class="create-cancel-btn" type="button">취소</button>
        </div>
      </div>
    `
  },

  categoryListWrapper() {
    return `<div id="categoryItemListWrapper"></div>`
  },

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
