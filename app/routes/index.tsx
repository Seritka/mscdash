/**
 * setInterval, cookie 사용해서 24시가 되면 자동으로 fetch(급식API)를 해준다.
 *
 */

import { useMemo, useState } from "react"
import { dateFormat, dust, getToday, IAdviceObject, IAirDataObject } from '../../lib/utils'
import adviceMessages from '../../lib/advice.json'
import db from '../../lib/firebase'
import styles from "../../styles/fonts.css"
import { child, onValue, ref } from "firebase/database"
import { useCookies } from "react-cookie"

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

const KEY = 'd7df428d3d4548d0940e2d7c3a7b61b6'

export default function Index() {
  const [cookies, setCookie, removeCookie] = useCookies(['meal'])
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
      if (!cookies.meal) {
        const meal = async () => {
          const request =  await fetch(`https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${KEY}&Type=json&pIndex=1&pSize=10&ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7530135&MLSV_YMD=${new Date().getFullYear()}${new Date().getMonth() + 1}${new Date().getDate()}`)
          const json =  await request.json()

            const now = new Date()
            const date = new Date(now.setDate(now.getDate() + 1))
            date.setHours(0, 0, 0, 0)

            return setCookie('meal', json, { expires: date })
          }
          meal()
        }
      }, 30000)
      return () => clearInterval(id)
  }, [cookies.meal])

  useMemo(() => {
    const id = setInterval(() => {
      return setAdviceIndex(`명언${Math.floor(Math.random() * Object.keys(adviceMessages).length + 1)}`)
    }, 300000)
    return () => clearInterval(id)
  }, [adviceIndex])

  useMemo(() => {
    onValue(child(ref(db), '/air_quality'), (snapshot) => {
      if (snapshot.exists()) {
        setAirData(snapshot.val().data)
      }
    })
  }, [])

  return (
    <section style={{ WebkitBoxSizing: 'border-box', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', background: '#f0f2f5', minHeight: '100vh', lineHeight: 1.5715 }}>
      <header style={{ flex: '0 0 auto', height: '64px', padding: '0 50px', color: 'rgba(0,0,0,.85)', background: '#001529', boxSizing: 'border-box', lineHeight: '64px' }}>
        <h1 style={{ color: "white", fontWeight: "bold" }}>우리 학교 현황</h1>
      </header>
      <section style={{ boxSizing: 'border-box', WebkitFlex: 'auto', display: 'flex', flexDirection: 'column', minHeight: 0, background: '#f0f2f5' }}>
        <main style={{ margin: '16px', background: '#fff', minHeight: '270px', boxSizing: 'border-box', WebkitBoxSizing: 'border-box', MozBoxSizing: 'border-box', backgroundClip: 'border-box', backgroundOrigin: 'padding-box' }}>
          <div style={{ padding: '24px'}}>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', boxSizing: 'border-box' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontWeight: 'bolder', textAlign: 'center', fontSize: '40px' }}>현재 시각</h3>
                  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <h1 style= {{ marginRight: '25px', fontWeight: 'bold', fontSize: '165px' }}>{new Date().getHours() > 12 ? new Date().getHours() - 12 : new Date().getHours() === 0 ? '12' : new Date().getHours()}:{new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()}</h1>
                  <div style={{ marginTop: '55px', fontSize: '45px' }}>
                    <div style={{ fontWeight: 'bolder' }}>
                      {new Date().getMonth() + 1}월 {new Date().getDate()}일 {getToday()}
                      <br/>
                      {new Date().getHours() > 12 ? '오후' : '오전' }
                    </div>
                  </div>
              </div>
              <div style={{ fontFamily: 'Uiyeun', fontSize: '60px', textAlign: 'left' }}>
                <div style={{ lineHeight: '55px', fontWeight: 'bolder', fontSize: '65px' }}>오늘의 급식</div>
                  <div style={{ lineHeight: '45px' }}>
                  { cookies.meal && 'mealServiceDietInfo' in cookies.meal && cookies.meal.mealServiceDietInfo.length === 2 && 'row' in cookies.meal.mealServiceDietInfo[1]
                    ? cookies.meal.mealServiceDietInfo[1].row.map((row: { DDISH_NM: any }) => {
                        return String(row.DDISH_NM).split('<br/>').map(dish => {
                          return <div key={dish}>{dish}</div>
                      })
                    })
                    : <h4>오늘의 급식은 없습니다</h4> }
                  </div>
                </div>
                <i style={{ lineHeight: '25px', fontWeight: 'lighter', fontSize: '22px', opacity: '75%', fontFamily: 'Uiyeun' }}>
                  * 요리명에 표시된 번호는 알레르기를 유발할수 있는 식재료입니다
                  <br/>
                  (1.난류, 2.우유, 3.메밀, 4.땅콩, 5.대두, 6.밀, 7.고등어, 8.게, 9.새우, 10.돼지고기,
                  <br/>
                  11.복숭아, 12.토마토, 13.아황산염, 14.호두, 15.닭고기, 16.쇠고기, 17.오징어, 18.조개류(굴,전복,홍합 등)
                </i>
              </div>
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
          </div>
        </main>
      </section>
      <footer style={{ flex: '0 0 auto', padding: '24px 50px', color: 'rgba(0,0,0.85)', background: '#f0f2f5', textAlign: 'center', fontSize: '14px' }}>
        우리 학교 현황 프로젝트
        <br/>
        © 2021 CodIT &amp; 황정언 &amp; 김택우
      </footer>
    </section>
  );
}
