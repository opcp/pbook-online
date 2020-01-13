/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import './acPageDiscount.scss'
import { connect } from 'react-redux'
import {
  getDiscountBooks,
  fetchAcList,
  getRecommendBooks,
  getDiscountAmount,
} from '../../AcActions'
import BookInfo from './BookInfo'
import AcPageAside from './AcPageAside'
import AcPageFoot from './AcPageFoot'
import ScrollToTop from '../ScrollToTop'
import AcBreadCrumb from '../AcBreadCrumb'
import { cartFetch } from '../../../../components/shop/ShopActions'
import WOW from 'wowjs'
import moment from 'moment'

// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

const AcPageDiscount = props => {
  const [getDiscountOfSid, setGetDiscountOfSid] = useState([])
  let acId = props.match.params.acId.toString()
  let allBooksDiscount = false
  let memberNum = 'MR00001'
  let memberLevel = 1
  if (localStorage.user) {
    memberNum = JSON.parse(localStorage.user).MR_number
    memberLevel = JSON.parse(localStorage.user).MR_personLevel
  }
  useEffect(() => {
    new WOW.WOW().init()
    // 取得活動列表
    if (!props.acData.offline.data.length) {
      props.dispatch(fetchAcList('discount'))
    }

    // 獲取折價書籍
    props.dispatch(getDiscountBooks(acId))
    // 獲取折價比例
    if (getDiscountOfSid.length !== 0)
      props.dispatch(getDiscountAmount(memberLevel, getDiscountOfSid))

    // 獲取推薦書籍
    props.dispatch(getRecommendBooks(memberNum, 15))

    // 取得購物車
    if (!props.Cart) props.dispatch(cartFetch())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.acId, getDiscountOfSid[0]])
  if (!props.discountBooks[acId] || !props.discountBooks[acId].data)
    return <></>
  // 獲取活動資訊
  let acInfo = props.acData.discount.data.filter(v => {
    return +v.sid === +acId
  })
  if (!acInfo || !acInfo.length) return <></>

  let discountBook = []
  // 若此活動全品項皆適用，獲取推薦書籍
  if (props.discountBooks[acId].data.books.length === 0) {
    allBooksDiscount = true
    discountBook.books = props.recommendBooks.data
  } else {
    discountBook = props.discountBooks[acId].data
  }

  if (
    discountBook.books &&
    discountBook.books.length !== 0 &&
    getDiscountOfSid.length === 0
  ) {
    setGetDiscountOfSid(
      discountBook.books ? discountBook.books.map(v => v.sid) : []
    )
  }

  acInfo = acInfo[0]
  let bread = [
    { text: '首頁', url: '/' },
    { text: '優惠活動', url: '/activities/discount' },
    { text: acInfo.title, url: '/activities/discount/' + acId },
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
                "url('http://localhost:5555/ac/images/" + acInfo.img + "')",
            }}
          ></div>
          <div className="row">
            <main className="col-md-9">
              <div className="info my-3">
                <small>
                  <time>
                    開始時間：{moment(acInfo.start_time).format('YYYY-MM-DD')}
                  </time>
                </small>
                <br />
                <small>
                  <time>
                    結束時間：{moment(acInfo.end_time).format('YYYY-MM-DD')}
                  </time>
                </small>
              </div>
              <header className="py-3">
                <h1>{acInfo.title}</h1>
              </header>

              <article
                className="mt-4 mb-5"
                dangerouslySetInnerHTML={{
                  __html: acInfo.brief_intro,
                }}
              ></article>

              <span className="booksRowInfo mb-5">
                {allBooksDiscount ? '全品項皆適用　　推薦書籍' : '適用書籍'}
              </span>
            </main>
            <AcPageAside />
          </div>
          <section className="books col-md-11 m-auto row pt-5 d-flex justify-content-center">
            {discountBook.books &&
              discountBook.books.map(v => {
                return <BookInfo {...v} key={v.sid} memberLevel={memberLevel} />
              })}
          </section>
          <AcPageFoot sid={acInfo.sid} />
        </div>
      </ScrollToTop>
    </>
  )
}
const mapStateToProps = state => ({
  acType: state.acType,
  acData: state.acData,
  discountBooks: state.discountBooks,
  recommendBooks: state.recommendBooks,
})
export default connect(mapStateToProps)(AcPageDiscount)
