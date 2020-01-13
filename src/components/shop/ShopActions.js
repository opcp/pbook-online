import { getDiscountAmount } from '../../pages/activities/AcActions'
//-------categories--------

export const CATEGORIES_RECEIVE = 'CATEGORIES_RECEIVE'
export const CATEGORIES_REQUEST = 'CATEGORIES_REQUEST'
//給cgFetch用=======
function cgReceive(json) {
  return {
    type: CATEGORIES_RECEIVE,
    payload: json,
    receivedAt: Date.now(),
  }
}
function cgRequest() {
  return {
    type: CATEGORIES_REQUEST,
  }
}
//==================
export const cgFetch = () => async dispatch => {
  dispatch(cgRequest())
  try {
    let response = await fetch('http://localhost:5555/books/book_categories', {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    dispatch(cgReceive(await response.json()))
  } catch (error) {
    console.log('error ', error)
  }
}
//------------------------
//-------Shop-----------
export const SHOP_RECEIVE = 'SHOP_RECEIVE'
export const SHOP_REQUEST = 'SHOP_REQUEST'
function shopReceive(shopPage, shopCategories, shopKeyword, json) {
  return {
    type: SHOP_RECEIVE,
    shopPage,
    shopCategories,
    shopKeyword,
    payload: json,
    receivedAt: Date.now(),
  }
}
function shopRequest(shopPage, shopCategories, shopKeyword) {
  return {
    type: SHOP_REQUEST,
    shopPage,
    shopCategories,
    shopKeyword,
  }
}
export const shopFetch = (
  shopPage,
  shopCategories,
  shopKeyword
) => async dispatch => {
  dispatch(shopRequest(shopPage, shopCategories, shopKeyword))
  try {
    let response = await fetch(
      'http://localhost:5555/books/book_data/' +
        shopPage +
        '/' +
        shopCategories +
        '/' +
        (shopKeyword ? shopKeyword : ''),
      {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    )

    const json = await response.json()
    dispatch(shopReceive(shopPage, shopCategories, shopKeyword, json))
    const sids = json.rows.map(v => v.sid)
    let memberLevel
    if (!localStorage.getItem('user')) memberLevel = 1
    else memberLevel = JSON.parse(localStorage.getItem('user')).MR_personLevel
    dispatch(getDiscountAmount(memberLevel, sids))
  } catch (error) {
    console.log('error ', error)
  }
}
//-------------------------
//-------BookInfo-----------
export const BOOKINFO_RECEIVE = 'BOOKINFO_RECEIVE'
export const BOOKINFO_REQUEST = 'BOOKINFO_REQUEST'
function bookInfoReceive(sid, json) {
  return {
    type: BOOKINFO_RECEIVE,
    sid,
    payload: json,
    receivedAt: Date.now(),
  }
}
function bookInfoRequest(sid) {
  return {
    type: BOOKINFO_REQUEST,
    sid,
  }
}
export const bookInfoFetch = sid => async dispatch => {
  dispatch(bookInfoRequest(sid))
  try {
    let response = await fetch('http://localhost:5555/books/book_info/' + sid, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const json = await response.json()
    dispatch(bookInfoReceive(sid, json))
    const sids = json.rows.map(v => v.sid)
    let memberLevel
    if (!localStorage.getItem('user')) memberLevel = 1
    else memberLevel = JSON.parse(localStorage.getItem('user')).MR_personLevel
    dispatch(getDiscountAmount(memberLevel, sids))
  } catch (error) {
    console.log('error ', error)
  }
}
//-------------------------
//-------ADD_TO_FAV--------
export const ADD_TO_FAV_RECEIVE = 'ADD_TO_FAV_RECEIVE'
export const ADD_TO_FAV_REQUEST = 'ADD_TO_FAV_REQUEST'
function afReceive(memberID, isbn, sid, json) {
  return {
    type: ADD_TO_FAV_RECEIVE,
    memberID,
    isbn,
    sid,
    payload: json,
    receivedAt: Date.now(),
  }
}
function afRequest(memberID, isbn, sid) {
  return {
    type: ADD_TO_FAV_REQUEST,
    memberID,
    isbn,
    sid,
  }
}
export const addToFavFetch = (memberID, isbn, sid) => async dispatch => {
  dispatch(afRequest(memberID, isbn, sid))
  try {
    let response = await fetch('http://localhost:5555/member/addBookcase', {
      method: 'POST',
      body: JSON.stringify({
        number: memberID,
        isbn: isbn,
        bookSid: sid,
      }),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    dispatch(afReceive(memberID, isbn, sid, await response.json()))
  } catch (error) {
    console.log('error ', error)
  }
}
//------------------------
//-------DEL_FAV--------
export const DEL_FAV_RECEIVE = 'DEL_FAV_RECEIVE'
export const DEL_FAV_REQUEST = 'DEL_FAV_REQUEST'
function dfReceive(memberID, isbn, json) {
  return {
    type: DEL_FAV_RECEIVE,
    memberID,
    isbn,
    payload: json,
    receivedAt: Date.now(),
  }
}
function dfRequest(memberID, isbn) {
  return {
    type: DEL_FAV_REQUEST,
    memberID,
    isbn,
  }
}
export const delFavFetch = (memberID, isbn) => async dispatch => {
  dispatch(dfRequest(memberID, isbn))
  try {
    let response = await fetch('http://localhost:5555/member/removeBookcase', {
      method: 'POST',
      body: JSON.stringify({ number: memberID, isbn: isbn }),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    dispatch(dfReceive(memberID, isbn, await response.json()))
  } catch (error) {
    console.log('error ', error)
  }
}
//------------------------
//-------ADD_TO_CART--------
export const ADD_TO_CART_RECEIVE = 'ADD_TO_CART_RECEIVE'
export const ADD_TO_CART_REQUEST = 'ADD_TO_CART_REQUEST'
function atcReceive(sid, price, json) {
  return {
    type: ADD_TO_CART_RECEIVE,
    sid,
    price,
    payload: json,
    receivedAt: Date.now(),
  }
}
function atcRequest(sid, price) {
  return {
    type: ADD_TO_CART_REQUEST,
    sid,
    price,
  }
}
export const addToCartFetch = (sid, price) => async dispatch => {
  dispatch(atcRequest(sid, price))
  try {
    let response = await fetch('http://localhost:5555/books/addToCart', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        sid: sid,
        price: price,
      }),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    dispatch(atcReceive(sid, price, await response.json()))
  } catch (error) {
    console.log('error ', error)
  }
}
//------------------------
//-------DEL_CART--------
export const DEL_CART_RECEIVE = 'DEL_CART_RECEIVE'
export const DEL_CART_REQUEST = 'DEL_CART_REQUEST'
function dcReceive(sid, json) {
  return {
    type: DEL_CART_RECEIVE,
    sid,
    payload: json,
    receivedAt: Date.now(),
  }
}
function dcRequest(sid) {
  return {
    type: DEL_CART_REQUEST,
    sid,
  }
}
export const delCartFetch = sid => async dispatch => {
  dispatch(dcRequest(sid))
  try {
    let response = await fetch('http://localhost:5555/books/delCart', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ sid: sid }),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    dispatch(dcReceive(sid, await response.json()))
  } catch (error) {
    console.log('error ', error)
  }
}
//------------------------
//-------EDIT_CART--------
export const EDIT_CART_RECEIVE = 'EDIT_CART_RECEIVE'
export const EDIT_CART_REQUEST = 'EDIT_CART_REQUEST'
function ecReceive(sid, amount, json) {
  return {
    type: EDIT_CART_RECEIVE,
    sid,
    amount,
    payload: json,
    receivedAt: Date.now(),
  }
}
function ecRequest(sid, amount) {
  return {
    type: EDIT_CART_REQUEST,
    sid,
    amount,
  }
}
export const editCartFetch = (sid, amount) => async dispatch => {
  dispatch(ecRequest(sid, amount))
  try {
    let response = await fetch('http://localhost:5555/books/editCart', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        sid: sid,
        amount: amount,
      }),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    dispatch(ecReceive(sid, amount, await response.json()))
  } catch (error) {
    console.log('error ', error)
  }
}
//------------------------
//-------CART--------
export const CART_RECEIVE = 'CART_RECEIVE'
export const CART_REQUEST = 'CART_REQUEST'
function ctReceive(json) {
  return {
    type: CART_RECEIVE,
    payload: json,
    receivedAt: Date.now(),
  }
}
function ctRequest() {
  return {
    type: CART_REQUEST,
  }
}
export const cartFetch = () => async dispatch => {
  dispatch(ctRequest())
  try {
    let response = await fetch('http://localhost:5555/books/addToCart', {
      method: 'GET',
      credentials: 'include',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    dispatch(ctReceive(await response.json()))
  } catch (error) {
    console.log('error ', error)
  }
}
//------------------------
//-------ORDER--------
export const ORDER_RECEIVE = 'ORDER_RECEIVE'
export const ORDER_REQUEST = 'ORDER_REQUEST'
function odReceive(memberID, json) {
  return {
    type: ORDER_RECEIVE,
    memberID,
    payload: json,
    receivedAt: Date.now(),
  }
}
function odRequest(memberID) {
  return {
    type: ORDER_REQUEST,
    memberID,
  }
}
export const orderFetch = memberID => async dispatch => {
  dispatch(odRequest(memberID))
  try {
    let response = await fetch(
      'http://localhost:5555/books/order/' + memberID,
      {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    )
    dispatch(odReceive(memberID, await response.json()))
  } catch (error) {
    console.log('error ', error)
  }
}
//------------------------
//-------ADD_ORDER--------
export const ADD_ORDER_RECEIVE = 'ADD_ORDER_RECEIVE'
export const ADD_ORDER_REQUEST = 'ADD_ORDER_REQUEST'
function aoReceive(
  memberID,
  bookName,
  singlePrice,
  bookAmount,
  orderPrice,
  created_time,
  json
) {
  return {
    type: ADD_ORDER_RECEIVE,
    memberID,
    bookName,
    singlePrice,
    bookAmount,
    orderPrice,
    created_time,
    payload: json,
    receivedAt: Date.now(),
  }
}
function aoRequest(
  memberID,
  bookName,
  singlePrice,
  bookAmount,
  orderPrice,
  created_time
) {
  return {
    type: ADD_ORDER_REQUEST,
    memberID,
    bookName,
    singlePrice,
    bookAmount,
    orderPrice,
    created_time,
  }
}
export const addOrderFetch = (
  memberID,
  bookName,
  singlePrice,
  bookAmount,
  orderPrice,
  created_time
) => async dispatch => {
  dispatch(
    aoRequest(
      memberID,
      bookName,
      singlePrice,
      bookAmount,
      orderPrice,
      created_time
    )
  )
  try {
    let response = await fetch('http://localhost:5555/books/addOrder', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        memberID: memberID,
        bookName: bookName,
        singlePrice: singlePrice,
        bookAmount: bookAmount,
        orderPrice: orderPrice,
        created_time: created_time,
      }),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    dispatch(
      aoReceive(
        memberID,
        bookName,
        singlePrice,
        bookAmount,
        orderPrice,
        created_time,
        await response.json()
      )
    )
  } catch (error) {
    console.log('error ', error)
  }
}
//------------------------
//-------REVIEWS--------
export const REVIEWS_RECEIVE = 'REVIEWS_RECEIVE'
export const REVIEWS_REQUEST = 'REVIEWS_REQUEST'
function rvReceive(sid, json) {
  return {
    type: REVIEWS_RECEIVE,
    sid,
    payload: json,
    receivedAt: Date.now(),
  }
}
function rvRequest(sid) {
  return {
    type: REVIEWS_REQUEST,
    sid,
  }
}
export const reviewsFetch = sid => async dispatch => {
  dispatch(rvRequest(sid))
  try {
    let response = await fetch('http://localhost:5555/books/reviews/' + sid, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    dispatch(rvReceive(sid, await response.json()))
  } catch (error) {
    console.log('error ', error)
  }
}
//------------------------
//-------Favorite-----------
export const FAVORITE_RECEIVE = 'FAVORITE_RECEIVE'
export const FAVORITE_REQUEST = 'FAVORITE_REQUEST'

function favoriteReceive(member, json) {
  return {
    type: FAVORITE_RECEIVE,
    member,
    payload: json,
    receivedAt: Date.now(),
  }
}
function favoriteRequest(member) {
  return {
    type: FAVORITE_REQUEST,
    member,
  }
}
export const favoriteFetch = member => async dispatch => {
  dispatch(favoriteRequest(member))
  try {
    let response = await fetch(
      'http://localhost:5555/books/favorite/' + member,
      {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    )
    dispatch(favoriteReceive(member, await response.json()))
  } catch (error) {
    console.log('error ', error)
  }
}
//-------------------------
//-------FAVORITENUM-----------
export const FAVORITENUM_RECEIVE = 'FAVORITENUM_RECEIVE'
export const FAVORITENUM_REQUEST = 'FAVORITENUM_REQUEST'

function favoriteNumReceive(sid, json) {
  return {
    type: FAVORITENUM_RECEIVE,
    sid,
    payload: json,
    receivedAt: Date.now(),
  }
}
function favoriteNumRequest(sid) {
  return {
    type: FAVORITENUM_REQUEST,
    sid,
  }
}
export const favoriteNumFetch = sid => async dispatch => {
  dispatch(favoriteNumRequest(sid))
  try {
    let response = await fetch(
      'http://localhost:5555/books/favoriteNum/' + sid,
      {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    )
    dispatch(favoriteNumReceive(sid, await response.json()))
  } catch (error) {
    console.log('error ', error)
  }
}
//-------------------------
export const ADD_CART_TO_ORDER = 'ADD_CART_TO_ORDER'
export const addCartToOrder = (totalAmount, totalPrice) => {
  return {
    type: ADD_CART_TO_ORDER,
    totalAmount: totalAmount,
    totalPrice: totalPrice,
    receivedAt: Date.now(),
  }
}
