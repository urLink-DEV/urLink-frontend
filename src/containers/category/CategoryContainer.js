/* global chrome */
import React, { useState, useEffect, createContext, useContext } from 'react'

import Grid from '@material-ui/core/Grid'

import CategoryCard from '../../components/category/CategoryCard'
import CategoryDrawer from '../../components/category/CategoryDrawer'

import categoryAPI from '../../commons/apis/category'
import linkAPI from '../../commons/apis/link'
import historyAPI from '../../commons/chromeApis/history'

// * Category context API
const CategoryStateContext = createContext(null)
const CategoryDispatchContext = createContext(null)

// * History context API
const LinkStateContext = createContext(null)
const LinkDispatchContext = createContext(null)

// * custom HOOK : 자식 컴포넌트에서 부모에게 state 변경 요청할 수 있도록 하기
export function useCategoryState() {
  return useContext(CategoryStateContext)
}
export function useCategoryDispatch() {
  return useContext(CategoryDispatchContext)
}
export function useLinkState() {
  return useContext(LinkStateContext)
}
export function useLinkDispatch() {
  return useContext(LinkDispatchContext)
}

export default function CategoryContainer() {

  const [categoryState, setCategory] = useState([])
  const [linkState, setLink] = useState([])

  // * 전체 카테고리 가져오기
  const getCategory = (id) => {
    const get = categoryAPI.get({ id })
    if (get) {
      get.then((response) => setCategory([...response.data]))
      return get.then((response) => response)
        .catch((error) => console.warn("response" in error ? error.response.data.message : error))
    }
  }

  // * 카테고리 작성
  const writeCategory = (name, isFavorited) => {
    const write = categoryAPI.write({ name, isFavorited })
    if (write) {
      return write.then(res => res) 
        .catch((error) => console.warn("response" in error ? error.response.data.message : error))
    }
  }

  // * 카테고리 수정
  // linkInfo : Object { id, name, order, isFavorited }
  const updateCategory = (linkInfo) => {
    const update = categoryAPI.update(linkInfo)
    if(update) {
      return update.then(res => res) 
        .catch((error) => console.warn("response" in error ? error.response.data.message : error))
    }
  }

  // * 카테고리 삭제
  const deleteCategory = (id) => {
    const remove = categoryAPI.remove({ id })
    if(remove) {
      return remove.then((response) => {
        if (response.status === 204) {
          return response
        }
        else throw new Error("서버 에러")
      })
        .catch((error) => console.warn("response" in error ? error.response.data.message : error))
    }
  }

  // * 전체 링크 리스트 가져오기
  const getLink = (category, path, title) => {
    const get = linkAPI.get({ category, path, title })
    if (get) {
      return get.then((response) => setLink([...response.data]))
        .catch((error) => console.warn("response" in error ? error.response.data.message : error))
    }
  }

  // * 링크 작성
  const writeLink = (category, path) => {
    const write = linkAPI.write({ category, path })
    if (write) {
      write.then((response) => {
        // setLink(m => m.concat(response.data.success))
        getLink(category)
        getCategory()
      })
      .catch((error) => console.warn("response" in error ? error.response.data.message : error))
    }
  }

  // * 링크 정보, 페보릿 수정
  const updateLink = (id, category, title, description, isFavorited) => {
    const update = linkAPI.update({id, category, title, description, isFavorited})
    if (update) {
      update.then(response => {
        console.log('status value', response.status)
        getLink(category)
      }).catch((error) => console.warn("response" in error ? error.response.data.message : error))
    }
  }

  // * 링크 삭제
  const deleteLink = (id, category, path, title) => {
    const remove = linkAPI.remove({ id })
    if (remove) {
      remove.then((response) => {
        if (response.status === 204) getLink(category, path, title)
        else throw new Error("서버 에러")
      })
      .catch((error) => console.warn("response" in error ? error.response.data.message : error))
    }
  }
  
  // * 검색기록 조회
  const getHistory = ({text, startTime, endTime, maxResults, callback}) => {
    historyAPI.get({text, startTime, endTime, maxResults, callback})
  }

  // * 드래그된 히스토리 target
  const [draggedHistory, setDraggedHistory] = useState([])
  const [selectedLinkList, setSelectedLinkList] = useState([])

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

  const props = {
    getCategoryUrlInfoList,
    draggedHistory,
    selectedLinkList,
    setSelectedLinkList,
    setDraggedHistory,
    getHistory,

    newAlarmList,
    getProfileData,
    newRecentNofitication,
  }

  useEffect(() => {
    getCategory()
  },[])
  
  return (
    <CategoryStateContext.Provider value={categoryState}>
      <CategoryDispatchContext.Provider value={categoryDispatch}>
        <LinkStateContext.Provider value={linkState}>
          <LinkDispatchContext.Provider value={linkDispatch}>
            <CategoryDrawer {...props}>
              <Grid container spacing={2}>
                {getCategoryUrlInfoList.map((urlObj, idx) => 
                  <Grid item xs={3} key={idx}>
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
},
]

const newAlarmList = [
  {
    title: '네이버 지식 검색',
    img: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
    date: '2020-06-10',
  },
  {
    title: '네이버 지식 검색',
    img: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
    date: '2020-06-10',
  },
  {
    title: '네이버 지식 검색',
    img: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
    date: '2020-06-10',
  },
  {
    title: '네이버 지식 검색',
    img: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
    date: '2020-06-10',
  },
  {
    title: '네이버 지식 검색',
    img: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
    date: '2020-06-10',
  },
  {
    title: '네이버 지식 검색',
    img: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
    date: '2020-06-10',
  },
]

const newRecentNofitication = [
  {
    title: '새로운 버전 출시', 
    description: 'asdfasfd',
    date: new Date(),
  }
]

const getProfileData = {
  nickName: '녹챠챠',
  email: 'isoo7510@gmail.com',
  profileImg: 'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
}