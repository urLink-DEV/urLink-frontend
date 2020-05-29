/* global chrome */
import React, { useState, useEffect , createContext , useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import categoryAPI from '../../commons/apis/category'
import CategoryCard from '../../components/category/CategoryCard'
import CategoryDrawer from '../../components/category/CategoryDrawer'

//context API
const CategoryStateContext = createContext(null);
const CategoryDispatchContext = createContext(null);

 //custom HOOK : 다른 컴포넌트에서 쉽게 불러와서 사용할 수 있도록 하기
export function useCategoryState() {
    return useContext(CategoryStateContext);
}
export function useCategoryDispatch() {
    return useContext(CategoryDispatchContext);
}


export default function CategoryContainer() {

  const [categoryState, setcategory] = useState([])

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


  const categoryDispatch = {
    getCategory,
    writeCategory,
    updateCategory,
    deleteCategory
  }

  useEffect(() => {
    getCategory()
  },[])

  const props = {
    getCategoryUrlInfoList,
  }

  return (
    <CategoryStateContext.Provider value={categoryState}>
      <CategoryDispatchContext.Provider value={categoryDispatch}>
        <CategoryDrawer {...props}>
          <Grid container spacing={2}>
            {getCategoryUrlInfoList.map((urlObj, idx) => 
              <Grid item xs={2} key={idx}>
                <CategoryCard key={idx} urlInfoList={urlObj} />
              </Grid>
            )}
          </Grid>
        </CategoryDrawer>
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
