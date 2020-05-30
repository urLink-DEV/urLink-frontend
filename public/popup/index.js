window.addEventListener('DOMContentLoaded', () => {
  auth.tokenCheck()
    .then(res => {
      if(res) categoryLoad();
      else document.getElementById("categoryList").innerHTML= `로그인이 필요합니다.`;
    })
    .catch(e => console.log(e))
});

function categoryLoad(){
  const get = categoryAPI.get({});
  if(get) {
    get.then(res => {
      const categoryListElement = document.getElementById("categoryList");
      let categoryElement = "";
      res.data.map(element => categoryElement += categoryTemplate(element));
      categoryListElement.innerHTML = categoryElement;
      res.data.map(element => categoryEventSetting(element));
      tabSaveEventSetting();
    })
    .catch(e => console.log(e))
  }
}

function linkWrite(category, path) {
  const write = linkAPI.write({ category, path });
  const tabSaveElement = document.getElementById("tabSave");
  const categoryCardElement = document.getElementById(`category${category}`);
  const categoryAlertElement = document.getElementById("categoryAlert");

  if (write) {
    write.then((response) => {
      if(Array.isArray(response.data.success) && response.data.success.length) {
        categoryCardElement.classList.add("upload-finish");
        categoryAlertElement.style.display = "flex";
        categoryAlertElement.innerHTML = popupTemplate({message:"링크가 이동 되었습니다."});
        tabSaveElement.classList.remove("active");
        categoryLoad();
        categoryAlertElement.style.display = "none";
        categoryAlertElement.innerHTML = "";
      }
      else console.warn("다시 시도해 주세요."); // !! popup
    }).catch((error) => console.warn("response" in error ? error.response.data.message : error))
  }
}

function categoryEventSetting(element){
  const categoryCardElement = document.getElementById(`category${element.id}`);
  categoryCardElement.removeEventListener("click", categoryEventListener);
  categoryCardElement.addEventListener("click", categoryEventListener.bind(this, element), false);
}

function categoryEventListener(element, e) {
  const tabSaveElement = document.getElementById("tabSave");
  const categoryListElement = document.getElementsByClassName("category-card");
  Array.prototype.map.call(categoryListElement, (category) => category.classList.remove("check"));
  e.currentTarget.classList.add("check");
  if (tabSaveElement && !tabSaveElement.classList.contains("active")) tabSaveElement.classList.add("active");
  tabSaveElement.dataset.categoryId = element.id;
}

function tabSaveEventSetting() {
  const tabSaveElement = document.getElementById("tabSave");
  tabSaveElement.removeEventListener("click", tabSaveEventListener);
  tabSaveElement.addEventListener("click", tabSaveEventListener);
}

function tabSaveEventListener(e) {
  e.preventDefault();
  const category = e.currentTarget.dataset.categoryId;
  chrome.tabs.query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT }, tabs => linkWrite(category, [tabs[0].url]));
}

function categoryTemplate(element) {
  return (`
    <a class="category-card" data-categoryId=${element.id} id="category${element.id}">
      <div class="category-card-text">${element.name}</div>
      <div class="tab-text">${element.url_count ? element.url_count+" 링크" : "링크 없음"}</div>
    </a>
  `);
}

function popupTemplate(element) {
  return (`
      <div class="category-alert">
        <img src="img/white.svg" class="category-alert-img">
        <div class="category-alert-text">
          ${element.message}
        </div>
      </div>
    `);
}