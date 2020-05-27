window.addEventListener('DOMContentLoaded', () => {
  auth.tokenCheck()
    .then(res => {
      if(res) {
        categoryLoad();
      }
      else{

      }
    })
    .catch(e => console.log(e))
});

function categoryLoad(){
  category.get({})
  .then(res => {
    const categoryListElement = document.getElementById("categoryList");
    let categoryElement = "";
    res.data.map((element) => {
      categoryElement += categoryTemplate(element);
    });
    categoryListElement.innerHTML = categoryElement;
    res.data.map((element) => {
      categoryEventListener(element);
    });
    tabSaveEventListener();
  })
  .catch(e => console.log(e))
}

function categoryTemplate(element) {
  return (`
    <a class="category-card" data-categoryId=${element.id} id="category${element.id}">
      <div class="category-card-text">${element.name}</div>
      <div class="tab-text">${element.url_count ? element.url_count+" 탭" : "탭 없음"}</div>
    </a>
  `);
}

function categoryEventListener(element){
  const categoryCardElement = document.getElementById(`category${element.id}`);
  const tabSaveElement = document.getElementById("tabSave");
  categoryCardElement.addEventListener("click", () => {
    const categoryListElement = document.getElementsByClassName("category-card");
    Array.prototype.map.call(categoryListElement, (category) => {
      category.classList.remove("check");
    });
    categoryCardElement.classList.add("check");
    if(!tabSaveElement.classList.contains("active")){
      tabSaveElement.classList.add("active");
    }
    tabSaveElement.dataset.categoryId = element.id;
  }, false);
}

function tabSaveEventListener(element){
  const tabSaveElement = document.getElementById("tabSave");
  tabSaveElement.addEventListener("click", (e) => {
    alert(tabSaveElement.dataset.categoryId);
  });
}