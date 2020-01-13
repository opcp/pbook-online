import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import {
  bookInfoFetch,
  cartFetch,
  reviewsFetch,
  favoriteFetch,
  favoriteNumFetch,
} from '../ShopActions'
import { getRecommendBooks } from '../../../pages/activities/AcActions'
import Breadcrumb from './Breadcrumb'
import BookDetail from './BookDetail'
import BookPic from './BookPic'
import BookBuy from './BookBuy'
import BookProduct from './BookProduct'
import BookComment from './BookComment'
import ScrollToTop from '../ScrollToTop'
import './BookCommodity.scss'

const BookCommodity = props => {
  // let favState = JSON.parse(localStorage.getItem('favState'))
  let memberLevel, memberID
  if (!localStorage.getItem('user')) {
    memberLevel = 1
    memberID = 'MR00174'
  } else {
    memberLevel = JSON.parse(localStorage.getItem('user')).MR_personLevel
    memberID = JSON.parse(localStorage.getItem('user')).MR_number
  }
  useEffect(() => {
    props.dispatch(bookInfoFetch(props.match.params.sid))
    props.dispatch(reviewsFetch(props.match.params.sid))
    props.dispatch(favoriteNumFetch(props.match.params.sid))
    props.dispatch(getRecommendBooks(memberID, 4))
    props.dispatch(cartFetch())
    props.dispatch(favoriteFetch(memberID))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  let bookInfoPayload = props.bookInfo.payload
  let cartPayload = props.Cart.payload
  let reviewsPayload = props.reviews.payload
  let favoritePayload = props.favorite.payload
  let favoriteNumPayload = props.favoriteNum.payload
  let discountAmount = props.discountAmount[memberLevel]
  return (
    <ScrollToTop>
      <Container className="px-0 detail_wrapper" fluid={true}>
        <Breadcrumb bookInfoPayload={bookInfoPayload}></Breadcrumb>
        <Container className="mt-5">
          <Row>
            <BookPic bookInfoPayload={bookInfoPayload}></BookPic>
            <BookDetail
              bookInfoPayload={bookInfoPayload}
              discountAmount={discountAmount}
              favoriteNumPayload={favoriteNumPayload}
            ></BookDetail>
            <BookBuy
              bookInfoPayload={bookInfoPayload}
              cartPayload={cartPayload}
              history={props.history}
              match={props.match}
              discountAmount={discountAmount}
              favoritePayload={favoritePayload}
            ></BookBuy>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col md={12}>
              <BookProduct
                bookInfoPayload={bookInfoPayload}
                recommendBooks={props.recommendBooks}
              ></BookProduct>
              <BookComment reviewsPayload={reviewsPayload}></BookComment>
            </Col>
          </Row>
        </Container>
      </Container>
    </ScrollToTop>
  )
}

const mapStateToProps = state => ({
  bookInfo: state.bookInfo,
  reviews: state.reviews,
  Cart: state.Cart,
  discountAmount: state.discountAmount,
  recommendBooks: state.recommendBooks,
  favorite: state.favorite,
  favoriteNum: state.favoriteNum,
})
export default connect(mapStateToProps)(BookCommodity)
