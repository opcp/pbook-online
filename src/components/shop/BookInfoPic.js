import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addToCartFetch, addCartToOrder, cartFetch } from './ShopActions'
import swal from '@sweetalert/with-react'
import './Shop.scss'

const BookInfoPic = props => {
  let totalAmount = props.cartToOrder.totalAmount
  let totalPrice = props.cartToOrder.totalPrice
  function addCart() {
    let cart = props.cartPayload && props.cartPayload.cart
    let sid = props.data.sid
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
          parseInt((props.data.fixed_price * (100 - discount)) / 100)
        )
      )
      localStorage.setItem(sid, 1)
      if (!localStorage.getItem('totalAmount')) {
        localStorage.setItem('totalAmount', 1)
      } else {
        localStorage.setItem(sid, 1)
        props.dispatch(
          addCartToOrder(totalAmount + 1, totalPrice + props.data.fixed_price)
        )
      }
      swal({
        text: '加入購物車成功',
        icon: 'success',
        button: 'OK',
      }).then(() => {
        props.dispatch(cartFetch())
      })
    }
  }
  let discount
  for (let i = 0; i < 8; i++) {
    if (
      (props.discountData &&
        props.discountData[i] &&
        props.discountData[i].sid) === props.data.sid
    ) {
      discount =
        props.discountData &&
        props.discountData[i] &&
        props.discountData[i].discount
    }
  }
  if (!discount)
    return (
      <>
        <h4>
          取得資料中...
          <img
            className="loadingGif"
            src={require('./images/ani_LoadingPBook.gif')}
            alt=""
          />
        </h4>
      </>
    )
  return (
    <>
      <div className="book_pic mr-3">
        <Link to={'/books/information/' + props.data.sid}>
          <img
            src={'http://localhost:5555/images/books/' + props.data.pic}
            alt=""
          />
        </Link>
      </div>
      <Link to={'/books/information/' + props.data.sid} className="book_name">
        {props.data.name}
      </Link>
      <span className="font-big pb-2">
        優惠價 : <span className="price">{String(100 - discount)}</span> 折{' '}
        <span className="price">
          {String(parseInt((props.data.fixed_price * (100 - discount)) / 100))}
        </span>{' '}
        元
      </span>
      <button className="addCart mb-2" onClick={() => addCart()}>
        放入購物車
      </button>
    </>
  )
}

const mapStateToProps = state => ({
  Cart: state.Cart,
  cartToOrder: state.cartToOrder,
})
export default connect(mapStateToProps)(BookInfoPic)
