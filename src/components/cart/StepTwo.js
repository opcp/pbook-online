/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Col } from 'react-bootstrap'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import swal from '@sweetalert/with-react'
import { addOrderFetch, delCartFetch } from '../shop/ShopActions'
import './Cart.scss'

const StepTwo = props => {
  const required_fields = [
    {
      id: 'name',
      pattern: /^\S{2,}/,
      info: '請輸入正確姓名',
    },
    {
      id: 'phone',
      pattern: /^09\d{2}\-?\d{3}\-?\d{3}$/,
      info: '請輸入正確電話',
    },
    {
      id: 'email',
      pattern: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
      info: '請輸入正確信箱',
    },
    {
      id: 'address',
      pattern: /\S{1,}/i,
      info: '請輸入正確地址',
    },
  ]
  let s, item
  let delivery, receipt, pay
  function goPay() {
    for (s in required_fields) {
      item = required_fields[s]
      item.el.style.border = 'none'
      item.infoEl.textContent = ''
    }
    delivery.style.border = 'none'
    receipt.style.border = 'none'
    pay.style.border = 'none'
    let isPass = true
    for (s in required_fields) {
      item = required_fields[s]
      if (!item.pattern.test(item.el.value)) {
        item.el.style.border = '1px solid #FF525B'
        item.infoEl.textContent = item.info
        isPass = false
      }
    }
    if (!document.querySelector('input[name="delivery"]:checked')) {
      isPass = false
      delivery.style.border = '1px solid #FF525B'
    }
    if (!document.querySelector('input[name="receipt"]:checked')) {
      isPass = false
      receipt.style.border = '1px solid #FF525B'
    }
    if (!document.querySelector('input[name="pay"]:checked')) {
      isPass = false
      pay.style.border = '1px solid #FF525B'
    }
    if (isPass === true) {
      swal({
        title: '確認送出訂單?',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then(sure => {
        if (sure) {
          for (
            let i = 0;
            i < (props.cartPayload && props.cartPayload.totalCart);
            i++
          ) {
            props.dispatch(
              addOrderFetch(
                memberID,
                bookName[i],
                singlePrice[i],
                bookAmount[i],
                orderPrice,
                created_time
              )
            )
          }
          props.setOrder(1)
          swal('送出訂單成功', {
            icon: 'success',
          })
            .then(() => {
              for (
                let i = 0;
                i < (props.cartPayload && props.cartPayload.totalCart);
                i++
              ) {
                localStorage.removeItem(
                  props.cartPayload &&
                    props.cartPayload.cart &&
                    props.cartPayload.cart[i].sid
                )
                props.dispatch(
                  delCartFetch(
                    props.cartPayload &&
                      props.cartPayload.cart &&
                      props.cartPayload.cart[i].sid
                  )
                )
              }
            })
            .then(() => {
              props.changeSteps(2)
            })
        } else {
          swal({ title: '送出訂單失敗', icon: 'warning', buttons: 'ok' })
        }
      })
    } else {
      swal({
        title: '資料填寫不完全',
        icon: 'warning',
        buttons: 'ok',
      })
    }
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    for (s in required_fields) {
      item = required_fields[s]
      item.el = document.querySelector('#' + item.id)
      item.infoEl = document.querySelector('#' + item.id + 'Help')
    }
    delivery = document.querySelector('.delivery')
    receipt = document.querySelector('.receipt')
    pay = document.querySelector('.pay')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  let memberID = JSON.parse(localStorage.getItem('user')).MR_number
  let orderPrice = props.cartPayload && props.cartPayload.totalPrice
  let created_time = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  let bookName = [],
    singlePrice = [],
    bookAmount = []
  for (let i = 0; i < (props.cartPayload && props.cartPayload.totalCart); i++) {
    bookName[i] =
      props.cartPayload &&
      props.cartPayload.cart &&
      props.cartPayload.cart[i].name
    singlePrice[i] =
      props.cartPayload &&
      props.cartPayload.cart &&
      props.cartPayload.cart[i].fixed_price
    bookAmount[i] =
      props.cartPayload &&
      props.cartPayload.cart &&
      props.cartPayload.cart[i].amount
  }
  return (
    <>
      <Col md={12}>
        <div className="checkout my-5">
          <button className="backToCart" onClick={() => props.changeSteps(0)}>
            <FontAwesomeIcon icon={faAngleLeft} /> 返回購物車
          </button>
          <div className="d-flex justify-content-center my-3">
            <div className="input-wrapper d-flex flex-column mx-3 delivery">
              <div className="choose py-3">請選擇配送方式</div>
              <div className="mt-3 ml-3">
                <input
                  type="radio"
                  name="delivery"
                  value="ConvenienceStore"
                  id="ConvenienceStore"
                />
                <label htmlFor="ConvenienceStore">便利商店取貨</label>
              </div>
              <div className="mt-3 ml-3">
                <input
                  type="radio"
                  name="delivery"
                  value="sendHome"
                  id="sendHome"
                />
                <label htmlFor="sendHome">宅配到府</label>
              </div>
            </div>
            <div className="input-wrapper d-flex flex-column mx-3 receipt">
              <div className="choose py-3">請選擇發票資訊</div>
              <div className="mt-3 ml-3">
                <input type="radio" name="receipt" value="donate" id="donate" />
                <label htmlFor="donate">捐贈發票</label>
              </div>
              <div className="mt-3 ml-3">
                <input
                  type="radio"
                  name="receipt"
                  value="electronic"
                  id="electronic"
                />
                <label htmlFor="electronic">電子發票</label>
              </div>
            </div>
            <div className="input-wrapper d-flex flex-column mx-3 pay">
              <div className="choose py-3">請選擇付款方式</div>
              <div className="mt-3 ml-3">
                <input type="radio" name="pay" value="cash" id="cash" />
                <label htmlFor="cash">貨到付款</label>
              </div>
              <div className="mt-3 ml-3">
                <input
                  type="radio"
                  name="pay"
                  value="creditCard"
                  id="creditCard"
                />
                <label htmlFor="creditCard">信用卡付款</label>
              </div>
            </div>
          </div>
          <div className="SubscriberWrapper mx-auto">
            <div className="d-flex align-items-center justify-content-center info">
              訂購人資訊
            </div>
            <div className="formWrap m-3">
              <label htmlFor="name">訂購人姓名</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="真實姓名"
                autoComplete="off"
              />
              <small id="nameHelp" className="color-red"></small>
            </div>
            <div className="formWrap m-3">
              <label htmlFor="phone">聯絡電話</label>
              <input type="text" name="phone" id="phone" autoComplete="off" />
              <small id="phoneHelp" className="color-red"></small>
            </div>
            <div className="formWrap m-3">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" autoComplete="off" />
              <small id="emailHelp" className="color-red"></small>
            </div>
            <div className="formWrap m-3">
              <label htmlFor="address">地址</label>
              {/* <input
                type="text"
                name="address"
                id="code"
                placeholder="郵遞區號"
                autoComplete="off"
              /> */}
              <input
                type="text"
                name="address"
                id="address"
                autoComplete="off"
              />
              <small id="addressHelp" className="color-red"></small>
            </div>
          </div>
          <div className="nextStep d-flex justify-content-end">
            <button className="last m-3" onClick={() => goPay()}>
              確認送出訂單
            </button>
          </div>
        </div>
      </Col>
    </>
  )
}

const mapStateToProps = state => ({
  addOrder: state.addOrder,
})

export default connect(mapStateToProps)(StepTwo)
