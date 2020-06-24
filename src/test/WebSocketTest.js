import React, { useState, useEffect } from 'react'
import alarmSocket from '../commons/apis/alarmSocket'
/*
 * id: 15
 * name: "test"
 * reserved_time: "2020-06-21 09:31:00+00:00"
 * url_description: "개발을 진행하거나, 웹브라우저를 이용하여 업무를 하다보면, 의외로 크롬에 있는 웹스토어에서 extension을 다운받아 진행하는 경우들이 많습니다. 웹브라우저내의 스크린샷을 찍는다"
 * url_favicon_path: "https://trustyoo86.github.io/assets/icons/android-icon-192x192.png"
 * url_image_path: "https://trustyoo86.github.io/assets/back-code2.jpg"
 * url_path: "https://trustyoo86.github.io/javascript/2019/12/27/chrome-extension-overview.html"
 * url_title: "Chrome extension 만들기 (1)" 
 */
export default function CategoryTest() {
  const [alarmList, setAlarmList] = useState([])

  const onReadClick = (id) => {
    alarmSocket.alarmRead({id})
  }
  
  const onNoReturnClick = (id) => {
    alarmSocket.alarmNoReturn({id})
  }

  useEffect(() => {
    alarmSocket.onmessage(function(e) {
      const { message } = JSON.parse(e.data)
      console.log(message)
      setAlarmList(alarmList => alarmList.concat(message));
    })
  }, []);

  return (
    <>
    <h1>This is Websocket Alarm TEST PAGE</h1>
    <div style={{ display: "flex",flexWrap:"wrap", justifyContent: "space-around", textAlign: "center" }}>
      {
        alarmList.length ? alarmList.map((alarm,idx) => { 
          return (
            <div key={alarm.id} style={{border:"1px solid", width: 250, height: 180, margin:3}}>            
            {idx}
              <div style={{ margin: "6px", display: "flex", alignContent: "center", justifyContent: "center" }}>
                <a href={alarm.url_path}>
                  <img src={alarm.url_image_path} width={60} height={60}></img>
                </a>
              </div>
              <img src={alarm.url_favicon_path} width={16} height={16}/>
              {alarm.name} | {new Date(alarm.reserved_time).toLocaleString()}
              <div style={{margin: "6px", display:"flex", alignContent:"center", justifyContent:"center"}}>
                <button style={{"marginRight":"3px", backgroundColor:"#bebeec"}} onClick={() => onReadClick(alarm.id)}>readMessage</button>
                <button style={{"marginRight":"3px", backgroundColor:"#ecbee2"}} onClick={() => onNoReturnClick(alarm.id)}>noReturnMessage</button>
              </div>
            </div>
          )
        })  
        : ""
      }
    </div>
    </>
  )
}

