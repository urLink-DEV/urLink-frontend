import React, { useState, useEffect } from 'react';
import linkAPI from '../commons/apis/linkAPI';

export default function UrlTabTest() {
  const [link, setLink] = useState([])

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
  /**
  * * response data
  * * fail -> array
  * * success -> array
  */
  const writeLink = (category, path) => {
    const write = linkAPI.write({ category, path })
    if (write) {
      write.then((response) => {
        setLink(m => m.concat(response.data.success))
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

  useEffect(() => {
    getLink(87, "trust");
    writeLink(87, "https://trustyoo86.github.io/javascript/2019/12/27/chrome-extension-overview.html"); // * Error required Array Type
    writeLink(87, ["https://trustyoo86.github.io/javascript/2019/12/27/chrome-extension-overview.html"]);
    deleteLink(39, 87, "trust");
  }, []);

  return (
    <div>
      this is urlTab TEST PAGE
      {[].concat(link).map((data, id) => <div key={data.id}>{data.title} : {data.id}</div>)}
    </div>
  )
}

