import { getToday } from "../lib/utils"
import React, { useMemo } from "react"
import { useCookies } from "react-cookie"
import { format } from "date-fns"

// TODO: process data
const KEY = 'd7df428d3d4548d0940e2d7c3a7b61b6'

const SchoolDash = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['meal'])

    useMemo(() => {
        const id = setInterval(() => {
            const meal = async () => {
              if (!cookies.meal) {
                const data = await fetch(`https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${KEY}&Type=json&pIndex=1&pSize=10&ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7530135&MLSV_YMD=${format(new Date(), 'yyyyMMdd')}`).then(r => r.json())
    
                const now = new Date()
                const date = new Date(now.setDate(now.getDate() + 1))
                date.setHours(0, 0, 0, 0)

                if (!(data !== undefined && 'mealServiceDietInfo' in data && data.mealServiceDietInfo.length === 2 && 'row' in data.mealServiceDietInfo[1])) return
                else return setCookie('meal',  data, { expires: date })
              }
            }
            meal()
          }, 5000)
        return () => clearInterval(id)
      }, [cookies.meal])

    return <div style={{ display: 'flex', flexDirection: 'column' }}>
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
}

export default React.memo(SchoolDash)