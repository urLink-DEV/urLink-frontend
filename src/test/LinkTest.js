import React, { useState, useEffect } from 'react';
import linkAPI from '../commons/apis/link';

/*
 * category: 92
 * created_at: "2020-06-21T22:34:59.898609+09:00"
 * description: "개발을 진행하거나, 웹브라우저를 이용하여 업무를 하다보면, 의외로 크롬에 있는 웹스토어에서 extension을 다운받아 진행하는 경우들이 많습니다. 웹브라우저내의 스크린샷을 찍는다"
 * favicon_path: "https://trustyoo86.github.io/assets/icons/android-icon-192x192.png"
 * has_alarms: false
 * id: 619
 * image_path: "https://trustyoo86.github.io/assets/back-code2.jpg"
 * path: "https://trustyoo86.github.io/javascript/2019/12/27/chrome-extension-overview.html"
 * title: "Chrome extension 만들기 (1)"
 * updated_at: "2020-06-21T22:34:59.898645+09:00"
 * user: 8
*/
export default function UrlTabTest() {
  const [urlLink, setUrlLink] = useState([])

  // * 전체 링크 리스트 가져오기
  const getLink = (category, path, title) => {
    const get = linkAPI.get({ category, path, title })
    if (get) {
      get.then((response) => {
        setUrlLink([...response.data])
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
        getLink(category)
      })
        .catch((error) => console.warn("response" in error ? error.response.data.message : error))
    }
  }

  // * 카테고리 삭제
  const deleteLink = (id, category) => {
    const remove = linkAPI.remove({ id })
    if (remove) {
      remove.then((response) => {
        if (response.status === 204) {
          getLink(category)
        }
        else throw new Error("서버 에러")
      })
        .catch((error) => console.warn("response" in error ? error.response.data.message : error))
    }
  }

  useEffect(() => {
    getLink(92);
    // writeLink(92, "https://trustyoo86.github.io/javascript/2019/12/27/chrome-extension-overview.html"); // * Error required Array Type
    // writeLink(92, ["https://trustyoo86.github.io/javascript/2019/12/27/chrome-extension-overview.html"]);
    // deleteLink(39, 92, "trust");
  }, []);

  return (
    <div>
      <h1>This is urlLink TEST PAGE</h1>
      <button style={{"marginRight":"3px", backgroundColor:"#bebeec", width: 150, height: 50,}} onClick={() => writeLink(92,["https://trustyoo86.github.io/javascript/2019/12/27/chrome-extension-overview.html"])}>
        writeLink
      </button>
      <div style={{ display: "flex",flexWrap:"wrap", justifyContent: "space-around", textAlign: "center" }}>
      {
        urlLink.length ?
        urlLink.map((url, idx) => {
          return(
            <div key={url.id} style={{border:"1px solid", width: 300, height: 200, margin:3}}>            
              idx: {idx}
              <div style={{ margin: "6px", display: "flex", alignContent: "center", justifyContent: "center" }}>
                <a href={url.path}>
                  <img src={url.image_path} width={60} height={60}></img>
                </a>
              </div>
              <div>
                <img src={url.favicon_path} width={16} height={16}/>
                {url.id} | {url.title}
              </div>
              <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap',display: 'inline-block',width: '157px',}}>
                {url.description}
              </div>
              <div style={{margin: "6px", display:"flex", alignContent:"center", justifyContent:"center"}}>
                <button style={{"marginRight":"3px", backgroundColor:"#ecbee2"}} onClick={() => deleteLink(url.id,92)}>DELETE</button>
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

