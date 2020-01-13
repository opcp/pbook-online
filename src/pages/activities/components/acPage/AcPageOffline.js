/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import './acPageOffline.scss'
import { connect } from 'react-redux'
import { fetchAcList } from '../../AcActions'
import AcPageAside from './AcPageAside'
import AcPageFoot from './AcPageFoot'
import ScrollToTop from '../ScrollToTop'
import AcBreadCrumb from '../AcBreadCrumb'
import moment from 'moment'

// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

const AcPageOffline = props => {
  // ------若store裡沒有活動列表資料，就拿取資料--------
  useEffect(() => {
    if (!props.acData.offline.data.length) {
      props.dispatch(fetchAcList('offline'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // -----------------------------------------------
  // ------------取得該項活動資料-----------
  let acId = props.match.params.acId
  let item = props.acData.offline.data.filter(v => {
    return +v.sid === +acId
  })
  if (!item || !item.length) return <></>
  item = item[0]
  // --------------------------------------
  let bread = [
    { text: '首頁', url: '/' },
    { text: '實體活動', url: '/activities/offline' },
    { text: item.title, url: '/activities/offline/' + acId },
  ]
  return (
    <>
      <ScrollToTop>
        <AcBreadCrumb bread={bread} />
        <div className="container acPage">
          <div
            className="banner my-3"
            style={{
              backgroundImage:
                "url('http://localhost:5555/ac/images/" + item.img + "')",
            }}
          ></div>
          <div className="row">
            <main className="col-md-9">
              <div className="info my-3">
                <small>
                  <time>時間：{moment(item.date).format('YYYY-MM-DD')}</time>
                </small>
                <br />
                <small>
                  <span>地點：{item.location}</span>
                </small>
              </div>
              <header className="py-3">
                <h1>{item.title}</h1>
              </header>

              <article
                className="mt-4 mb-5"
                dangerouslySetInnerHTML={{ __html: item.intro }}
              ></article>
            </main>
            <AcPageAside {...item} acLocation={item.location} />
          </div>
          <AcPageFoot sid={item.sid} />
        </div>
      </ScrollToTop>
    </>
  )
}
const mapStateToProps = state => ({
  acType: state.acType,
  acData: state.acData,
})
export default connect(mapStateToProps)(AcPageOffline)
