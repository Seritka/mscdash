
export function dust (dust: number): unknown[] {
    if (dust <= 15) { // dust >= 0 &&
      // message, hex
      return ['좋음', '2359c4']
    } else if (dust >= 16 && dust <= 35) {
      return ['보통', '01b670']
    } else if (dust >= 36 && dust <= 75) {
      return ['나쁨', 'FDCC1F']
    } else if (dust >= 76) {
      return ['매우 나쁨', 'd4191d']
    }

    return ['알수없음', '808080']
}
  
export function getToday (): unknown {
    const week = new Array(['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'])
    const today = new Date().getDay()
    const todayLabel = week[today]
    return todayLabel
}
  
export function dateFormat (dateLog: string, timeLog: string): unknown {
    const date = dateLog.split('_')
    const time = timeLog.split('_')
  
    const si = time[0] === '00' ? '12' : time[0]
  
    return '20' + date[0] + '년 ' + date[1] + '월 ' + date[2] + '일 ' + si + '시 ' + time[1] + '분 ' + time[2] + '초'
}
  
export function studentView (id: string) {
    const str = id.toString()
    const qks = str.substring(1, 2) === '0' ? str.substring(2, 3) : str.substring(1, 3)
    const qjs = str.substring(3, 4) === '0' ? str.substring(4, 5) : str.substring(3, 5)
    return str.substring(0, 1) + '학년 ' + qks + '반 ' + qjs + '번'
}

export interface IAdviceObject {
    [key: string]: string
}

export interface IAirDataObject {
    all_log: object,
    date_log: string,
    dust: string,
    humi: string,
    temp: string,
    time_log: string,
}