/**
 * setInterval, cookie 사용해서 24시가 되면 자동으로 fetch(급식API)를 해준다.
 *
 */
import styles from "../../styles/fonts.css"
import Header from "../../components/Header"
import SchoolDash from "../../components/SchoolDash"
import AirDash from "../../components/AirDash"
import Footer from "../../components/Footer"

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}

export default function Index() {
  return (
    <section style={{ WebkitBoxSizing: 'border-box', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', background: '#f0f2f5', minHeight: '100vh', lineHeight: 1.5715 }}>
      <Header/>
      <section style={{ boxSizing: 'border-box', WebkitFlex: 'auto', display: 'flex', flexDirection: 'column', minHeight: 0, background: '#f0f2f5' }}>
        <main style={{ margin: '16px', background: '#fff', minHeight: '270px', boxSizing: 'border-box', WebkitBoxSizing: 'border-box', MozBoxSizing: 'border-box', backgroundClip: 'border-box', backgroundOrigin: 'padding-box' }}>
          <div style={{ padding: '24px'}}>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
              <SchoolDash/>
              <AirDash/>
            </div>
          </div>
        </main>
      </section>
      <Footer/>
    </section>
  );
}
