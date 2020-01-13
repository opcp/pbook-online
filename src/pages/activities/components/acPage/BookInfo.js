import React from 'react'
import { Link } from 'react-router-dom'
import { addToCartFetch } from '../../../../components/shop/ShopActions'
import './bookInfo.scss'
import { connect } from 'react-redux'
import swal from 'sweetalert'
function BookInfo(props) {
  function addCart(sid) {
    let cart = props.Cart.payload && props.Cart.payload.cart
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
          Math.round((props.fixed_price * (100 - discount)) / 100)
        )
      )
      swal({
        text: '加入購物車成功',
        icon: 'success',
        button: 'OK',
      })
    }
  }

  let discount = 0
  if (
    props.discountAmount[props.memberLevel] &&
    props.discountAmount[props.memberLevel].data
  ) {
    let discountInfo = props.discountAmount[props.memberLevel].data.find(
      v => v.sid === props.sid
    )
    discount = discountInfo ? +discountInfo.discount : 0
  }
  return (
    <div className="book_box col-md-3 mb-5 wow fadeIn">
      <figure className="mb-1">
        <Link
          to={'/books/information/' + props.sid}
          className="ml-auto mt-auto moreInfo"
        >
          <div className="book_pic">
            <img
              src={'http://localhost:5555/images/books/' + props.pic}
              alt=""
            />
          </div>
          <div className="book_data">
            <h6
              className="px-3 mt-2 mb-1"
              title={props.name + '\n\n' + props.introduction}
            >
              {props.name}
            </h6>
            <span className="info mb-2 mt-1">
              {/* <span className="author" title={'作者：' + props.author}>
                作者：{props.author}
              </span> */}
              <div className="">
                <span className="fixedPrice">
                  原價 <strike>{props.fixed_price}</strike>元
                </span>{' '}
                <span className="price">
                  {100 - discount === 100 ? '無打折' : 100 - discount}
                </span>{' '}
                折
                <span className="price discountPrice">
                  {Math.round((props.fixed_price * (100 - discount)) / 100)}
                </span>{' '}
                元
              </div>
            </span>
            {/* <div className="intro">{props.introduction}</div> */}
          </div>
        </Link>
      </figure>
      <div className="book_sell d-flex justify-content-center">
        <button className="addCart" onClick={() => addCart(props.sid)}>
          放入購物車
        </button>
      </div>
    </div>
  )
}
const mapStateToProps = state => ({
  Cart: state.Cart,
  discountAmount: state.discountAmount,
})
export default connect(mapStateToProps)(BookInfo)
