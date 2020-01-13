// import { combineReducers } from 'redux'
import { SET_VISIBILITY_FILTER, VisibilityFilterType } from './AcActions'
import { SET_AC_TYPE, acTypeConst } from './AcActions'
// import { AC_REQUEST, AC_RECEIVE } from './AcActions'
import { FETCH_AC_LIST_BASIC_NAME } from './AcActions'
import { GET_DISCOUNT_BOOKS_BASIC_NAME } from './AcActions'
import { GET_RECOMMEND_BOOKS_BASIC_NAME } from './AcActions'
import { GET_DISCOUNT_AMOUNT_BASIC_NAME } from './AcActions'
import { GET_AC_TABLE_BASIC_NAME } from './AcActions'

// visibilityFiler
const { SHOW_ACTIVE } = VisibilityFilterType
const visibilityFilter = (state = SHOW_ACTIVE, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.visibilityFilter
    default:
      return state
  }
}
// set ac type
const { OFFLINE } = acTypeConst
const acType = (state = OFFLINE, action) => {
  switch (action.type) {
    case SET_AC_TYPE:
      return action.acType
    default:
      return state
  }
}

// fetch data
let initAcData = {
  discount: {
    isFetching: false,
    didInvalidate: false,
    lastUpdated: '',
    data: [],
  },
  offline: {
    isFetching: false,
    didInvalidate: false,
    lastUpdated: '',
    data: [],
  },
}

const acData = fetchReducerCreator(FETCH_AC_LIST_BASIC_NAME, initAcData)
const discountBooks = fetchReducerCreator(GET_DISCOUNT_BOOKS_BASIC_NAME)
const recommendBooks = fetchReducerCreator(GET_RECOMMEND_BOOKS_BASIC_NAME)
const discountAmount = fetchReducerCreator(GET_DISCOUNT_AMOUNT_BASIC_NAME)
const acTable = fetchReducerCreator(GET_AC_TABLE_BASIC_NAME)

// -------------------fetch reducer creator--------------------------
function fetchReducerCreator(basicActionName, initState = {}) {
  const actionRequest = basicActionName + '_REQUEST'
  const actionSuccess = basicActionName + '_SUCCESS'
  const actionFailure = basicActionName + '_FAILURE'
  const fetchReducer = (state = initState, action) => {
    if (action.rootName) {
      return {
        ...state,
        [action.rootName]: fetchReducerHelper(state[action.rootName], action),
      }
    }
    return {
      ...state,
      ...fetchReducerHelper(state, action),
    }
  }

  const fetchReducerHelper = (state, action) => {
    switch (action.type) {
      case actionRequest:
        return {
          ...state,
          isFetching: true,
          didInvalidate: false,
        }
      case actionSuccess:
        return {
          ...state,
          isFetching: false,
          didInvalidate: false,
          lastUpdated: action.receivedAt,
          data: action.data !== undefined ? action.data : null,
        }
      case actionFailure:
        return {
          ...state,
          isFetching: false,
          didInvalidate: false,
          error: action.error.toString(),
        }
      default:
        return state
    }
  }
  return fetchReducer
}
// ---------------------------------------------------------------------

const ListReducer = {
  visibilityFilter,
  acType,
  acData,
  discountBooks,
  recommendBooks,
  discountAmount,
  acTable,
}
export default ListReducer
