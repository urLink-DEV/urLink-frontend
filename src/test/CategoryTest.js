import React, { useState, useEffect } from 'react';
import categoryAPI from '../commons/apis/category';

export default function CategoryTest() {
  const [category, setcategory] = useState([])

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
        setcategory(m => m.concat(response.data))
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
    writeCategory("insta",1,false)
    updateCategory(101,"update~",3)
    // deleteCategory(53)

  }, []);

  return (
    <div>
      this is Category TEST PAGE
      {[].concat(category).map((data, id) => <div key={data.id}>{data.name} : {data.id}</div>)}
    </div>
  )
}

