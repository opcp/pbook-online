import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Col } from 'react-bootstrap'
import { orderFetch } from '../shop/ShopActions'
import moment from 'moment'
import './Cart.scss'

const StepThree = props => {
  let member = JSON.parse(localStorage.getItem('user')).MR_number
  useEffect(() => {
    props.dispatch(orderFetch(member))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  let date = moment(
    props.order.payload &&
      props.order.payload.rows &&
      props.order.payload.rows[0].created_time
  ).format('YYYYMMDD')
  console.log(date)
  let orderID
  let sid =
    props.order.payload &&
    props.order.payload.rows &&
    props.order.payload.rows[0].sid

  if (sid < 10) {
    orderID = date + sid
  } else if (sid < 100) {
    orderID = date + sid
  } else if (sid < 1000) {
    orderID = date + sid
  }
  return (
    <>
      <Col md={12}>
        <div className="orderDetail my-5 ">
          <div className="orderFin mx-auto">
            <div className="finish d-flex align-items-center justify-content-center">
              訂單完成
            </div>
            <div className="m-3 orderNumber">訂單編號： {orderID}</div>
            <div className="m-3 orderTime">
              訂購時間：
              {moment(
                props.order.payload &&
                  props.order.payload.rows &&
                  props.order.payload.rows[0].created_time
              ).format('YYYY-MM-DD HH:mm:ss')}
            </div>
            <div className="m-3 detail">
              <span className="title">購物明細</span>
              <div className="m-4 d-flex align-items-center tableTop">
                <div className="picName">商品明細</div>
                <div className="bookAmount">數量</div>
                <div className="bookPrice">單價</div>
              </div>
              {props.order.payload &&
                props.order.payload &&
                props.order.payload.rows.map(orderData => (
                  <div
                    className="m-4 d-flex align-items-center eachDetail"
                    key={orderData.sid}
                  >
                    <div className="picName">
                      <span>{orderData.bookName}</span>
                    </div>
                    <div className="bookAmount">{orderData.bookAmount}</div>
                    <div className="bookPrice">NT$ {orderData.singlePrice}</div>
                  </div>
                ))}
            </div>
            <div className="m-3 price">
              總金額：NT${' '}
              <span className="color-red">
                {props.order.payload &&
                  props.order.payload.rows &&
                  props.order.payload.rows[0].orderPrice}
              </span>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button className="toHome m-3" onClick={() => props.toHome()}>
              回到首頁
            </button>
          </div>
        </div>
      </Col>
    </>
  )
}

const mapStateToProps = state => ({
  order: state.order,
})
export default connect(mapStateToProps)(StepThree)
