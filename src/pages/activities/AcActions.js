// set ac status filter
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
export const VisibilityFilterType = {
  SHOW_ACTIVE: { type: 'SHOW_ACTIVE', value: 1 },
  SHOW_ALL: { type: 'SHOW_ALL', value: 3 },
  SHOW_COMING_SOON: { type: 'SHOW_COMING_SOON', value: 0 },
  SHOW_COMPLETED: { type: 'SHOW_COMPLETED', value: 2 },
}
export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  filter: filter,
})
// set ac type
export const SET_AC_TYPE = 'SET_AC_TYPE'
export const acTypeConst = { DISCOUNT: 'discount', OFFLINE: 'offline' }
export const setAcType = acType => ({
  type: SET_AC_TYPE,
  acType: acType,
})

// -----------------middleware fetch action----------------

// fetch ac list
export const FETCH_AC_LIST_BASIC_NAME = 'AC_LIST'
export function fetchAcList(acType) {
  return {
    types: ['AC_LIST_REQUEST', 'AC_LIST_SUCCESS', 'AC_LIST_FAILURE'],
    // 檢查快取：
    shouldCallAPI: state => !state.acData[acType].data.length,
    // 執行抓取資料：
    callAPI: () =>
      fetch('http://localhost:5555/activities/' + acType, {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }),
    // 要在開始/結束 action 注入的參數
    payload: { acType, rootName: acType },
  }
}

// get discount books
export const GET_DISCOUNT_BOOKS_BASIC_NAME = 'DISCOUNT_BOOKS'
export function getDiscountBooks(acId) {
  return {
    types: [
      'DISCOUNT_BOOKS_REQUEST',
      'DISCOUNT_BOOKS_SUCCESS',
      'DISCOUNT_BOOKS_FAILURE',
    ],
    // 檢查快取：
    shouldCallAPI: state => !state.discountBooks[acId],
    // 執行抓取資料：
    callAPI: () =>
      fetch('http://localhost:5555/activities/discount/' + acId, {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }),
    // 要在開始/結束 action 注入的參數
    payload: { acId, rootName: acId },
  }
}

// 取得書籍折價
export const GET_DISCOUNT_AMOUNT_BASIC_NAME = 'DISCOUNT_AMOUNT'
export function getDiscountAmount(memberLevel, bookSid = []) {
  return {
    types: [
      'DISCOUNT_AMOUNT_REQUEST',
      'DISCOUNT_AMOUNT_SUCCESS',
      'DISCOUNT_AMOUNT_FAILURE',
    ],
    // 檢查快取：
    shouldCallAPI: state => !state.discountBooks[memberLevel],
    // 執行抓取資料：
    callAPI: () =>
      fetch('http://localhost:5555/activities/books-discount/' + memberLevel, {
        method: 'POST',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(bookSid),
      }),
    // 要在開始/結束 action 注入的參數
    payload: { memberLevel, rootName: memberLevel },
  }
}

// get recommend books
export const GET_RECOMMEND_BOOKS_BASIC_NAME = 'RECOMMEND_BOOKS'
export function getRecommendBooks(memberNum, limit = 8) {
  return {
    types: [
      'RECOMMEND_BOOKS_REQUEST',
      'RECOMMEND_BOOKS_SUCCESS',
      'RECOMMEND_BOOKS_FAILURE',
    ],
    // 檢查快取：
    shouldCallAPI: state => !state.recommendBooks.length,
    // 執行抓取資料：
    callAPI: () =>
      fetch(
        'http://localhost:5555/activities/recommend-books/' +
          memberNum +
          '/' +
          limit,
        {
          method: 'GET',
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      ),
    // 要在開始/結束 action 注入的參數
    payload: { memberNum, limit },
  }
}

export const GET_AC_TABLE_BASIC_NAME = 'AC_TABLE'
export function getAcTable(memberNum) {
  return {
    types: ['AC_TABLE_REQUEST', 'AC_TABLE_SUCCESS', 'AC_TABLE_FAILURE'],
    // 檢查快取：
    shouldCallAPI: state => true,
    // 執行抓取資料：
    callAPI: () =>
      fetch('http://localhost:5555/activities/ac-sign/' + memberNum, {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }),
    // 要在開始/結束 action 注入的參數
    payload: { memberNum },
  }
}
