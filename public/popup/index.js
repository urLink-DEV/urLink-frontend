window.addEventListener('DOMContentLoaded', () => {
  auth.tokenCheck()
    .then(res => {
      if(res) categoryLoad();
      else document.getElementById("categoryList").innerHTML= Template.loginRequiredPopup();
      tabSaveEventSetting();
    })
    .catch(e => console.warn(e))
});

function categoryLoad(){
  const categoryListElement = document.getElementById("categoryList");
  const get = categoryAPI.get({});

  if(get) {
    get.then(res => {
      let categoryElement = "";
      if(Array.isArray(res.data) && res.data.length) {
        res.data.map(element => categoryElement += Template.category(element));
        categoryListElement.innerHTML = categoryElement;
        res.data.map(element => categoryEventSetting(element));
      }
      else categoryListElement.innerHTML = Template.categoryEmptyPopup();
    })
    .catch(e => console.log(e))
  }
}

function linkWrite(category, path) {
  const categoryCardElement = document.getElementById(`category${category}`);
  const write = linkAPI.write({ category, path });
  if (write) {
    write.then((response) => {
      if(Array.isArray(response.data.success) && response.data.success.length) {
        categoryCardElement.classList.add("upload-finish");
        popupMessage({message: "링크가 이동 되었습니다."});
      }
    })
    .then(res => categoryLoad())
    .catch(error => {
      categoryCardElement.classList.remove("check");
      if(error.response.status === 500) popupMessage({message: "유효하지 않은 링크 입니다."});
      else if(error && error.response.data.message) popupMessage({message: error.response.data.message});
    })
  }
}

function categoryEventSetting(element){
  const categoryCardElement = document.getElementById(`category${element.id}`);
  categoryCardElement.removeEventListener("click", EventListener.categoryEventListener);
  categoryCardElement.addEventListener("click", EventListener.categoryEventListener.bind(this, element), false);
}

function tabSaveEventSetting() {
  const tabSaveElement = document.getElementById("tabSave");
  tabSaveElement.removeEventListener("click", EventListener.tabSaveEventListener);
  tabSaveElement.addEventListener("click", EventListener.tabSaveEventListener);
}

function popupMessage(element){
  const categoryPopupElement = document.getElementById("categoryPopup");
  categoryPopupElement.style.display = "flex";
  categoryPopupElement.innerHTML = Template.popup({message:element.message});
  setTimeout(()=>{
    categoryPopupElement.style.display = "none";
    categoryPopupElement.innerHTML = "";
  },1000);
}

const EventListener = {
  categoryEventListener: function (element, e) {
    const tabSaveElement = document.getElementById("tabSave");
    const categoryListElement = document.getElementsByClassName("category-card");
    Array.prototype.map.call(categoryListElement, (category) => category.classList.remove("check"));
    e.currentTarget.classList.add("check");
    if (tabSaveElement && !tabSaveElement.classList.contains("active")) tabSaveElement.classList.add("active");
    tabSaveElement.dataset.categoryId = element.id;
  },

  tabSaveEventListener: function (e) {
    e.preventDefault();
    if(e.target.classList.contains("active")){
      const category = e.currentTarget.dataset.categoryId;
      chrome.tabs.query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT }, tabs => linkWrite(category, [tabs[0].url]));
      e.target.classList.remove("active");
    }
  }
}

const Template = {
  category: (element) => {
    return (`
      <a class="category-card" data-categoryId=${element.id} id="category${element.id}">
        <div class="category-card-text">${element.name}</div>
        <div class="tab-text">${element.url_count ? element.url_count + " 링크" : "링크 없음"}</div>
        ${element.is_favorited ? '<img src="img/group-27.svg">' : ""}
      </a>
    `);
  },

  categoryEmptyPopup: (element) => {
    return (`
      <div class="category-empty-contanier">
        <img class="category-empty" src="img/group-26.svg">
      </div>
    `);
  },

  loginRequiredPopup: (element) => {
    return (`
      <div class="login-required-container">
        <img src="img/group-25.svg">
      </div>
    `);
  },

  popup: (element) => {
    return (`
      <div class="category-popup">
        <img src="img/white.svg" class="category-popup-img">
        <div class="category-popup-text">
          ${element.message}
        </div>
      </div>
    `);
  }
}