import React, { useMemo, useState } from "react"
import { dateFormat, dust, IAdviceObject, IAirDataObject } from '../lib/utils'
import adviceMessages from '../lib/advice.json'
import db from '../lib/firebase'
import { child, onValue, ref } from "firebase/database"

const AirDash = () => {
    const [adviceIndex, setAdviceIndex] = useState<string>(`명언${Math.floor(Math.random() * 101)}`)
    const [airData, setAirData] = useState<IAirDataObject>({
      all_log: {},
      date_log: "",
      dust: "0",
      humi: "0",
      temp: "0",
      time_log: ""
    })
  
    useMemo(() => {
      const id = setInterval(() => {
        return setAdviceIndex(`명언${Math.floor(Math.random() * Object.keys(adviceMessages).length + 1)}`)
      }, 300000)
      return () => { clearInterval(id) }
    }, [adviceIndex])
  
    useMemo(() => {
      onValue(child(ref(db), '/air_quality'), (snapshot) => {
        if (snapshot.exists()) {
          setAirData(snapshot.val().data)
        }
      })
    }, [])


    return <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', boxSizing: 'border-box' }}>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ fontWeight: 'bolder', textAlign: 'center', fontSize: '40px' }}>우리학교 공기질</h3>
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <h1 style= {{ marginRight: '25px', fontWeight: 'bold', fontSize: '165px' }}>{Math.floor(Number(airData.temp))}°C</h1>
          <div style={{ marginTop: '50px', fontSize: '45px', fontWeight: 'bolder' }}>
            미세먼지: <b style={{ color: `#${dust(Number(airData.dust))[1] }` }}>{dust(Number(airData.dust))![0] as string}</b> ({airData.dust}㎍/㎥)
            <br/>
            습&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;도: { Math.floor(Number(airData.humi))}%
            <br/>
            <div style={{ fontSize: '25px' }}>
            { (airData.date_log && airData.time_log) && dateFormat(airData.date_log, airData.time_log) + ' 업데이트 됨' || '알 수 없음이라고 선배님이 말씀하셨다.' }
            </div>
          </div>
        </div>
        <h4 style={{ fontSize: '25px', fontFamily: 'MaruBuri-Regular', fontWeight: 'bold', display: 'inline-block', width: '850px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal' }}>
          { (adviceMessages as IAdviceObject)[adviceIndex]}
        </h4>
      </div>
  </div>
}

export default React.memo(AirDash)