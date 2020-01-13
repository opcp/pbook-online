import React from 'react'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import swal from '@sweetalert/with-react'
import Rating from '@material-ui/lab/Rating'
import Box from '@material-ui/core/Box'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faBookmark } from '@fortawesome/free-solid-svg-icons'
import {
  addToFavFetch,
  delFavFetch,
  addToCartFetch,
  addCartToOrder,
  cartFetch,
  favoriteFetch,
} from '../ShopActions'
import { letMeLogin } from '../../../pages/Forum/fmAction'
import './BookCommodity.scss'

const BookBuy = props => {
  let data =
    props.bookInfoPayload &&
    props.bookInfoPayload.rows &&
    props.bookInfoPayload.rows[0]
  let discount =
    props.discountAmount &&
    props.discountAmount.data &&
    props.discountAmount.data[0].discount

  if (!discount)
    return (
      <>
        <h4>
          取得資料中...
          <img
            className="loadingGif"
            src={require('../images/ani_LoadingPBook.gif')}
            alt=""
          />
        </h4>
      </>
    )

  let totalAmount = props.cartToOrder.totalAmount
  let totalPrice = props.cartToOrder.totalPrice
  let isbn = data && data.isbn
  let sid = data && data.sid
  let memberID
  let favIndex
  if (!localStorage.getItem('user')) {
    memberID = 'MR00174'
    favIndex = -1
  } else {
    if (!props.favoritePayload)
      return (
        <>
          <h4>
            取得資料中...
            <img
              className="loadingGif"
              src={require('../images/ani_LoadingPBook.gif')}
              alt=""
            />
          </h4>
        </>
      )
    memberID = JSON.parse(localStorage.getItem('user')).MR_number
    favIndex = (props.favoritePayload && props.favoritePayload).findIndex(
      favorite => +favorite.isbn === isbn
    )
  }
  function goCart() {
    let cart = props.cartPayload && props.cartPayload.cart
    let sid = data && data.sid
    let index = cart.findIndex(carts => carts.sid === sid)
    if (index !== -1) {
      props.history.push(`/cart`)
    } else if (index === -1) {
      props.dispatch(
        addToCartFetch(
          sid,
          parseInt(((data && data.fixed_price) * (100 - discount)) / 100)
        )
      )
      localStorage.setItem(sid, 1)
      props.dispatch(
        addCartToOrder(totalAmount + 1, totalPrice + (data && data.fixed_price))
      )
      props.history.push(`/cart`)
    }
  }
  function addCart() {
    let cart = props.cartPayload && props.cartPayload.cart
    let sid = data && data.sid
    let index = cart.findIndex(carts => carts.sid === sid)
    if (index !== -1) {
      swal({
        text: '購物車已有此商品',
        icon: 'warning',
        button: 'OK',
      })
    } else if (index === -1) {
      props.dispatch(
        addToCartFetch(
          sid,
          parseInt(((data && data.fixed_price) * (100 - discount)) / 100)
        )
      )
      localStorage.setItem(sid, 1)
      props.dispatch(
        addCartToOrder(totalAmount + 1, totalPrice + (data && data.fixed_price))
      )
      swal({
        text: '加入購物車成功',
        icon: 'success',
        button: 'OK',
      }).then(() => {
        props.dispatch(cartFetch())
      })
    }
  }
  function addFav() {
    if (localStorage.user !== undefined) {
      //有登入
      props.dispatch(addToFavFetch(memberID, isbn, sid))
      swal({
        text: '加入收藏成功',
        icon: 'success',
        button: 'OK',
      }).then(() => {
        props.dispatch(favoriteFetch(memberID))
      })
    } else {
      props.dispatch(letMeLogin())
    }
  }
  function delFav() {
    props.dispatch(delFavFetch(memberID, isbn))
    swal({
      text: '取消收藏成功',
      icon: 'success',
      button: 'OK',
    }).then(() => {
      props.dispatch(favoriteFetch(memberID))
    })
  }
  return (
    <>
      <Col md={3} className="d-flex flex-column">
        <button className="buyNow my-2" onClick={() => goCart()}>
          <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
          立即購買
        </button>
        <button className="addCart my-2" onClick={() => addCart()}>
          <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
          加入購物車
        </button>
        {favIndex === -1 ? (
          <button className="addFav my-2" onClick={() => addFav()}>
            <FontAwesomeIcon icon={faBookmark} className="mr-2" />
            加入收藏
          </button>
        ) : (
          <button className="addFav my-2" onClick={() => delFav()}>
            <FontAwesomeIcon icon={faBookmark} className="mr-2" />
            取消收藏
          </button>
        )}
        <div className="d-flex book_star my-3 flex-column">
          <div className="d-flex flex-column align-items-center">
            <span className="book_rank">{data && data.avg}</span>
            <Box component="fieldset" mb={0} borderColor="transparent">
              <Rating value={data && data.avg} readOnly />
            </Box>
            <span className="book_review">
              {data && data.totalStars}
              篇評論
            </span>
          </div>
        </div>
        <Link
          to={'/book_reviews/' + (data && data.sid)}
          className="addComment my-2"
        >
          +我想評語
        </Link>
      </Col>
    </>
  )
}

const mapStateToProps = state => ({
  addToFav: state.addToFav,
  addToCart: state.addToCart,
  cartToOrder: state.cartToOrder,
  Cart: state.Cart,
  favorite: state.favorite,
})
export default connect(mapStateToProps)(BookBuy)
