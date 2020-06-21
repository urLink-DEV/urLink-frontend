window.addEventListener('DOMContentLoaded', () => {
  auth.tokenCheck()
    .then(res => {
      if(res) APILoad.categoryLoad();
      else document.getElementById("categoryList").innerHTML= Template.loginRequired();
      EventListener.linkSaveEventSetting();
    })
    .catch(e => console.warn(e))
});

function popupMessage(element){
  const categoryPopupElement = document.getElementById("categoryPopup");
  categoryPopupElement.style.display = "flex";
  categoryPopupElement.innerHTML = Template.popup({message:element.message});
  setTimeout(()=>{
    categoryPopupElement.style.display = "none";
    categoryPopupElement.innerHTML = "";
  },1000);
}

const APILoad = {
  categoryLoad: function(){
    const categoryListElement = document.getElementById("categoryList");
    const get = categoryAPI.get({});
    if(get) {
      get.then(res => {
        let categoryElement = "";
        if(Array.isArray(res.data) && res.data.length) {
          res.data.map(element => categoryElement += Template.category(element));
          categoryListElement.innerHTML = categoryElement;
          res.data.map(element => EventListener.categoryEventSetting(element));
        }
        else categoryListElement.innerHTML = Template.categoryEmpty();
      })
      .catch(e => console.log(e))
    }
  },

  linkWrite: function(category, path) {
    const categoryCardElement = document.getElementById(`category${category}`);
    const write = linkAPI.write({ category, path });
    if (write) {
      write.then((response) => {
        if(Array.isArray(response.data) && response.data.length) {
          categoryCardElement.classList.add("upload-finish");
          popupMessage({message: "링크가 이동 되었습니다."});
        }
      })
      .then(res => APILoad.categoryLoad())
      .catch(error => {
        categoryCardElement.classList.remove("check");
        if(error.response.status === 500) popupMessage({message: "유효하지 않은 링크 입니다."});
        else if(error && error.response.data.message) popupMessage({message: error.response.data.message});
      })
    }
  }
}

const EventListener = {
  categoryEventListener: function (element, e) {
    const currentCategoryElement = e.currentTarget;
    const linkSaveElement = document.getElementById("linkSave");
    const categoryListElement = document.getElementsByClassName("category-card");
    Array.prototype.map.call(categoryListElement, (category) => category.classList.remove("check"));
    currentCategoryElement.classList.add("check");
    if (linkSaveElement && !linkSaveElement.classList.contains("active")) linkSaveElement.classList.add("active");
    linkSaveElement.dataset.categoryId = element.id;
  },

  linkSaveEventListener: function (e) {
    e.preventDefault();
    const linkSaveElement = document.getElementById("linkSave");
    if(linkSaveElement.classList.contains("active")){
      const category = linkSaveElement.dataset.categoryId;
      chrome.tabs.query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT }, tabs => APILoad.linkWrite(category, [tabs[0].url]));
      linkSaveElement.classList.toggle("active");
    }
  },

  categoryEventSetting: function (element){
    const categoryCardElement = document.getElementById(`category${element.id}`);
    categoryCardElement.removeEventListener("click", EventListener.categoryEventListener);
    categoryCardElement.addEventListener("click", EventListener.categoryEventListener.bind(null, element), false);
  },
  
  linkSaveEventSetting: function () {
    const linkSaveElement = document.getElementById("linkSave");
    linkSaveElement.removeEventListener("click", EventListener.linkSaveEventListener);
    linkSaveElement.addEventListener("click", EventListener.linkSaveEventListener, false);
  }
}

const Template = {
  category: (element) => {
    return (`
      <a class="category-card" data-categoryId=${element.id} id="category${element.id}">
        <div class="category-card-text">${element.name}</div>
        <div class="tab-text">${element.url_count ? element.url_count + " 링크" : "링크 없음"}</div>
        ${element.is_favorited ? '<img src="images/group-27.svg">' : ""}
      </a>
    `);
  },

  categoryEmpty: (element) => {
    return (`
      <div class="category-empty-contanier">
        <img class="category-empty" src="images/group-26.svg">
      </div>
    `);
  },

  loginRequired: (element) => {
    return (`
      <div class="login-required-container">
        <img src="images/group-25.svg">
      </div>
    `);
  },

  popup: (element) => {
    return (`
      <div class="category-popup">
        <img src="images/white.svg" class="category-popup-img">
        <div class="category-popup-text">
          ${element.message}
        </div>
      </div>
    `);
  }
}