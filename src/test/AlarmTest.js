import React, { useState, useEffect } from 'react';
import alaramAPI from '../commons/apis/alaram';
/*
 * category: 225
 * created_at: "2020-06-21T14:59:01.162445+09:00"
 * has_been_sent: true
 * has_done: false
 * has_read: false
 * id: 15
 * name: "test"
 * reserved_time: "2020-06-21T18:31:00+09:00"
 * updated_at: "2020-06-21T18:31:00.225070+09:00"
 * url: 598
 * user: 8 
 */
export default function UrlTabTest() {
  const [alarmLink, setAlarmLink] = useState([])

  const [name, setName] = useState('test')
  const [category, setCategory] = useState(92)
  const [url, setUrl] = useState(598)
  const [year, setYear] = useState('2020')
  const [month, setMonth] = useState('06')
  const [day, setDay] = useState('22')
  const [hour, setHour] = useState('00') // * 24시간
  const [minute, setMinute] = useState('18')

  // * 전체 알람 리스트 가져오기
  const getAlarm = () => {
    const get = alaramAPI.get({  })
    if (get) {
      get.then((response) => {
        setAlarmLink([...response.data])
      })
        .catch((error) => console.warn("response" in error ? error.response.data.message : error))
    }
  }

  // * 알람 삭제
  const writeAlarm = (name, category, url, year, month, day, hour, minute) => {
    const write = alaramAPI.write({ name, category, url, year, month, day, hour, minute })
    if (write) {
      write.then((response) => {
        getAlarm()
      })
        .catch((error) => console.warn("response" in error ? error.response.data.message : error))
    }
  }

  // * 알람 삭제
  const deleteAlarm = (id) => {
    const remove = alaramAPI.remove({ id })
    if (remove) {
      remove.then((response) => {
        if (response.status === 204) {
          getAlarm()
        }
        else throw new Error("서버 에러")
      })
        .catch((error) => console.warn("response" in error ? error.response.data.message : error))
    }
  }

  useEffect(() => {
    getAlarm();
  }, []);

  return (
    <div>
      <h1>This is Alarm TEST PAGE</h1>
      <button style={{"marginRight":"3px", backgroundColor:"#bebeec", width: 150, height: 50,}} onClick={() => writeAlarm(name, category, url, year, month, day, hour, minute)}>
        writeAlarm
      </button>
      <div style={{ display: "flex",flexWrap:"wrap", justifyContent: "space-around", textAlign: "center" }}>
      {
        alarmLink.length ?
        alarmLink.map((alarm, idx) => {
          return(
            <div key={alarm.id} style={{border:"1px solid", width: 400, height: 130, margin:3}}>            
              idx: {idx}
              <div>
                {alarm.id} | {alarm.name} | {new Date(alarm.reserved_time).toLocaleString()}
              </div>
              <div >
                url: {alarm.url} | category : {alarm.category}
              </div>
              <div>
                has_been_sent: {alarm.has_been_sent ? "ok" : "no"} | has_done: {alarm.has_done ? "ok" : "no"} | has_read: {alarm.has_read ? "ok" : "no"}
              </div>
              <div style={{margin: "6px", display:"flex", alignContent:"center", justifyContent:"center"}}>
                <button style={{"marginRight":"3px", backgroundColor:"#ecbee2"}} onClick={() => deleteAlarm(alarm.id)}>DELETE</button>
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