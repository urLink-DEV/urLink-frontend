/* global chrome */
import React, { useState, useEffect , createContext , useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import categoryAPI from '../../commons/apis/category'
import linkAPI from '../../commons/apis/link'
import CategoryCard from '../../components/category/CategoryCard'
import CategoryDrawer from '../../components/category/CategoryDrawer'

//Category context API
const CategoryStateContext = createContext(null);
const CategoryDispatchContext = createContext(null);

//History context API
const LinkStateContext = createContext(null);
const LinkDispatchContext = createContext(null);

 //custom HOOK : 다른 컴포넌트에서 쉽게 불러와서 사용할 수 있도록 하기
export function useCategoryState() {
    return useContext(CategoryStateContext);
}
export function useCategoryDispatch() {
    return useContext(CategoryDispatchContext);
}
export function useLinkState() {
  return useContext(LinkStateContext);
}
export function useLinkDispatch() {
  return useContext(LinkDispatchContext);
}


export default function CategoryContainer() {

  const [categoryState, setcategory] = useState([])
  const [linkState, setLink] = useState([])

  // * 전체 카테고리 가져오기
  const getCategory = (id) => {
    categoryAPI.get({ id })
    .then((response) => {
        setcategory([...response.data])
    })
    .catch((error) => console.warn("response" in error ? error.response.data.message : error))
  }

  // * 카테고리 작성
  const writeCategory = (name, isFavorited) => {
    categoryAPI.write({ name, isFavorited })
    .then((response) => {
      setcategory(categories => [response.data, ...categories])
      getCategory()
    })
    .catch((error) => console.warn("response" in error ? error.response.data.message : error))
  }

  // * 카테고리 수정
  const updateCategory = (id, name, order, isFavorited) => {
    categoryAPI.update({ id, name, order, isFavorited })
    .then(() => {
        // * 전체 카테고리 가져오기
        getCategory()
    })
    .catch((error) => console.warn("response" in error ? error.response.data.message : error))
  }

  // * 카테고리 삭제
  const deleteCategory = (id) => {
    categoryAPI.remove({ id })
    .then((response) => {
        if (response.status === 204) {
        getCategory()
        }
        else throw new Error("서버 에러")
    })
    .catch((error) => console.warn("response" in error ? error.response.data.message : error))
  }


  // * 전체 링크 리스트 가져오기
  const getLink = (category, path, title) => {
    const get = linkAPI.get({ category, path, title })
    if (get) {
      get.then((response) => {
        setLink([...response.data])
      })
        .catch((error) => console.warn("response" in error ? error.response.data.message : error))
    }
  }

  // * 링크 작성
  const writeLink = (category, path) => {
    const write = linkAPI.write({ category, path })
    if (write) {
      write.then((response) => {
        setLink(m => m.concat(response.data.success))
        getCategory()
      })
        .catch((error) => console.warn("response" in error ? error.response.data.message : error))
    }
  }

  // * 카테고리 삭제
  const deleteLink = (id, category, path, title) => {
    const remove = linkAPI.remove({ id })
    if (remove) {
      remove.then((response) => {
        if (response.status === 204) {
          getLink(category, path, title)
        }
        else throw new Error("서버 에러")
      })
        .catch((error) => console.warn("response" in error ? error.response.data.message : error))
    }
  }

  // 드래그된 히스토리 target
  const [draggedHistory, setDraggedHistory] = useState(null)

  const categoryDispatch = {
    getCategory,
    writeCategory,
    updateCategory,
    deleteCategory
  }

  const linkDispatch = {
    getLink,
    writeLink,
    deleteLink
  }

  useEffect(() => {
    getCategory()
  },[])

  const props = {
    getCategoryUrlInfoList,
    urlList,
    draggedHistory,
    setDraggedHistory
  }

  return (
    <CategoryStateContext.Provider value={categoryState}>
      <CategoryDispatchContext.Provider value={categoryDispatch}>
        <LinkStateContext.Provider value={linkState}>
          <LinkDispatchContext.Provider value={linkDispatch}>
            <CategoryDrawer {...props}>
              <Grid container spacing={2}>
                {getCategoryUrlInfoList.map((urlObj, idx) => 
                  <Grid item xs={2} key={idx}>
                    <CategoryCard key={idx} urlInfoList={urlObj} />
                  </Grid>
                )}
              </Grid>
            </CategoryDrawer>
          </LinkDispatchContext.Provider>
        </LinkStateContext.Provider>
      </CategoryDispatchContext.Provider>
    </CategoryStateContext.Provider>
  )
}

const getCategoryUrlInfoList = [{
  img: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
  title: 'naver: 네이버',
  description: '네이버 메인 화면 입니다. 안녕하세요 이수 회원님, 네이버에 오신 것을 환영합니다. 본 이미지는 상기 이미지와 다를 수 있습니다. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
}, {
  img: 'https://poiemaweb.com/img/poiemaweb.jpg',
  title: 'poiemaweb site',
  description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
}, {
  img: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
  title: 'naver: 네이버',
  description: '네이버 메인 화면 입니다. 안녕하세요 이수 회원님, 네이버에 오신 것을 환영합니다. 본 이미지는 상기 이미지와 다를 수 있습니다. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
}, {
  img: 'https://poiemaweb.com/img/poiemaweb.jpg',
  title: 'poiemaweb site',
  description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
},{
  img: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
  title: 'naver: 네이버',
  description: '네이버 메인 화면 입니다. 안녕하세요 이수 회원님, 네이버에 오신 것을 환영합니다. 본 이미지는 상기 이미지와 다를 수 있습니다. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
}, {
  img: 'https://poiemaweb.com/img/poiemaweb.jpg',
  title: 'poiemaweb site',
  description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
},]


const urlList = [
  {
    "id": "11081",
    "lastVisitTime": 1588933029447.23,
    "title": "React App",
    "typedCount": 0,
    "path": "https://www.naver.com",
    "visitCount": 24,
  },
  {
    "id": "11081",
    "lastVisitTime": 1588933029447.23,
    "title": "React App",
    "typedCount": 0,
    "path": "https://www.naver.com",
    "visitCount": 24,
  },
  {
    "id": "11081",
    "lastVisitTime": 1588933029447.23,
    "title": "React App",
    "typedCount": 0,
    "path": "https://www.naver.com",
    "visitCount": 24,
  },
  {
    "id": "11081",
    "lastVisitTime": 1588933029447.23,
    "title": "React App",
    "typedCount": 0,
    "path": "https://www.naver.com",
    "visitCount": 24,
  },
  {
    "id": "11081",
    "lastVisitTime": 1588933029447.23,
    "title": "React App",
    "typedCount": 0,
    "path": "https://www.naver.com",
    "visitCount": 24,
  }
]
