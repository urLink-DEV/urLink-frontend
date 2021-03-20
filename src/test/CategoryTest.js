import React, { useState, useEffect } from 'react'
import categoryAPI from '../commons/apis/category'
/*
 * created_at: "2020-06-21T14:46:33.678119+09:00"
 * id: 225
 * is_favorited: true
 * name: "zz"
 * order: 3
 * updated_at: "2020-06-21T16:07:12.782423+09:00"
 * url_count: 5
 * user: 8
 */
export default function CategoryTest() {
  const [categoryList, setCategoryList] = useState([])

  // * 전체 카테고리 가져오기
  const getCategory = (id) => {
    categoryAPI.get({ id })
      .then((response) => {
        setCategoryList([...response.data])
      })
      .catch((error) => console.warn("response" in error ? error.response.data.message : error))
  }

  // * 카테고리 작성
  const writeCategory = (name, isFavorited) => {
    categoryAPI.write({ name, isFavorited })
      .then((response) => {
        // * 전체 카테고리 가져오기
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

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div>
      <h1>This is Category TEST PAGE</h1>
      <button style={{"marginRight":"3px", backgroundColor:"#bebeec"}} onClick={() => writeCategory("test", 0)}>name: test, isFavorit: false</button>
      <button style={{"marginRight":"3px", backgroundColor:"#bebeec"}} onClick={() => writeCategory("isFavoritTest", 1)}>name: isFavoritTest, isFavorit: true</button>
      <div style={{ display: "flex",flexWrap:"wrap", justifyContent: "space-around", textAlign: "center" }}>
      {
        categoryList.length ? 
        categoryList.map((category) => { 
          return (
            <div key={category.id} style={{border:"1px solid", width: 250, height: 100, margin:3}}>            
              {category.order} | {category.name} | {category.url_count} | {category.id} | {category.is_favorited ? "Favorited" : "noFavorited"}
              <div style={{margin: "6px", display:"flex", alignContent:"center", justifyContent:"center"}}>
                <button style={{"marginRight":"3px", backgroundColor:"#ecbee2"}} onClick={() => updateCategory(category.id,"updateTest")}>UPDATE name -&gt; updateTest</button>
                <button style={{"marginRight":"3px", backgroundColor:"#ecbee2"}} onClick={() => updateCategory(category.id,category.name,category.order,!category.is_favorited)}>UPDATE isFavorit toggle</button>
                <button style={{"marginRight":"3px", backgroundColor:"#ecbee2"}} onClick={() => deleteCategory(category.id)}>DELETE</button>
              </div>
            </div>
          )
        })
        : ""
      }
    </div>
  </div>
  )
}

