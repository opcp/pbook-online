import {
  CATEGORIES_RECEIVE,
  CATEGORIES_REQUEST,
  SHOP_RECEIVE,
  SHOP_REQUEST,
  BOOKINFO_RECEIVE,
  BOOKINFO_REQUEST,
  ADD_TO_FAV_RECEIVE,
  ADD_TO_FAV_REQUEST,
  DEL_FAV_RECEIVE,
  DEL_FAV_REQUEST,
  ADD_TO_CART_RECEIVE,
  ADD_TO_CART_REQUEST,
  CART_RECEIVE,
  CART_REQUEST,
  DEL_CART_RECEIVE,
  DEL_CART_REQUEST,
  EDIT_CART_RECEIVE,
  EDIT_CART_REQUEST,
  ORDER_RECEIVE,
  ORDER_REQUEST,
  ADD_ORDER_RECEIVE,
  ADD_ORDER_REQUEST,
  REVIEWS_RECEIVE,
  REVIEWS_REQUEST,
  FAVORITE_RECEIVE,
  FAVORITE_REQUEST,
  FAVORITENUM_RECEIVE,
  FAVORITENUM_REQUEST,
  ADD_CART_TO_ORDER,
} from './ShopActions'

//--------categories------
function cg(
  state = {
    isFetching: false,
    didInvalidate: false,
  },
  action
) {
  switch (action.type) {
    case CATEGORIES_RECEIVE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        payload: action.payload,
        lastUpdated: action.receivedAt,
      }
    case CATEGORIES_REQUEST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      }
    default:
      return state
  }
}

function categories(state = [], action) {
  switch (action.type) {
    case CATEGORIES_RECEIVE:
    case CATEGORIES_REQUEST:
      return {
        ...state,
        ...cg(state[action], action),
      }
    default:
      return state
  }
}
//--------------------
//-------shop-------
function sp(
  state = {
    isFetching: false,
    didInvalidate: false,
    payload: [],
  },
  action
) {
  switch (action.type) {
    case SHOP_RECEIVE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        sids: action.sids,
        payload: action.payload,
        lastUpdated: action.receivedAt,
      }
    case SHOP_REQUEST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      }
    default:
      return state
  }
}

function shop(state = [], action) {
  switch (action.type) {
    case SHOP_RECEIVE:
    case SHOP_REQUEST:
      return {
        ...state,
        ...sp(state[action], action),
      }
    default:
      return state
  }
}
//---------------------
//-------bookInfo-------
function bi(
  state = {
    isFetching: false,
    didInvalidate: false,
    payload: [],
  },
  action
) {
  switch (action.type) {
    case BOOKINFO_RECEIVE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        payload: action.payload,
        lastUpdated: action.receivedAt,
      }
    case BOOKINFO_REQUEST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      }
    default:
      return state
  }
}

function bookInfo(state = [], action) {
  switch (action.type) {
    case BOOKINFO_RECEIVE:
    case BOOKINFO_REQUEST:
      return {
        ...state,
        ...bi(state[action], action),
      }
    default:
      return state
  }
}
//---------------------
//------addToFav-------
function af(
  state = {
    isFetching: false,
    didInvalidate: false,
  },
  action
) {
  switch (action.type) {
    case ADD_TO_FAV_RECEIVE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        payload: action.payload,
        lastUpdated: action.receivedAt,
      }
    case ADD_TO_FAV_REQUEST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      }
    default:
      return state
  }
}

function addToFav(state = [], action) {
  switch (action.type) {
    case ADD_TO_FAV_RECEIVE:
    case ADD_TO_FAV_REQUEST:
      return {
        ...state,
        ...af(state[action], action),
      }
    default:
      return state
  }
}
//---------------------
//------delFav-------
function df(
  state = {
    isFetching: false,
    didInvalidate: false,
  },
  action
) {
  switch (action.type) {
    case DEL_FAV_RECEIVE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        payload: action.payload,
        lastUpdated: action.receivedAt,
      }
    case DEL_FAV_REQUEST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      }
    default:
      return state
  }
}

function delFav(state = [], action) {
  switch (action.type) {
    case DEL_FAV_RECEIVE:
    case DEL_FAV_REQUEST:
      return {
        ...state,
        ...df(state[action], action),
      }
    default:
      return state
  }
}
//---------------------
//------addToCart-------
function atc(
  state = {
    isFetching: false,
    didInvalidate: false,
  },
  action
) {
  switch (action.type) {
    case ADD_TO_CART_RECEIVE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        payload: action.payload,
        lastUpdated: action.receivedAt,
      }
    case ADD_TO_CART_REQUEST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      }
    default:
      return state
  }
}

function addToCart(state = [], action) {
  switch (action.type) {
    case ADD_TO_CART_RECEIVE:
    case ADD_TO_CART_REQUEST:
      return {
        ...state,
        ...atc(state[action], action),
      }
    default:
      return state
  }
}
//---------------------
//------delCart-------
function dc(
  state = {
    isFetching: false,
    didInvalidate: false,
  },
  action
) {
  switch (action.type) {
    case DEL_CART_RECEIVE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        payload: action.payload,
        lastUpdated: action.receivedAt,
      }
    case DEL_CART_REQUEST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      }
    default:
      return state
  }
}

function delCart(state = [], action) {
  switch (action.type) {
    case DEL_CART_RECEIVE:
    case DEL_CART_REQUEST:
      return {
        ...state,
        ...dc(state[action], action),
      }
    default:
      return state
  }
}
//---------------------
//------delCart-------
function ec(
  state = {
    isFetching: false,
    didInvalidate: false,
  },
  action
) {
  switch (action.type) {
    case EDIT_CART_RECEIVE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        payload: action.payload,
        lastUpdated: action.receivedAt,
      }
    case EDIT_CART_REQUEST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      }
    default:
      return state
  }
}

function editCart(state = [], action) {
  switch (action.type) {
    case EDIT_CART_RECEIVE:
    case EDIT_CART_REQUEST:
      return {
        ...state,
        ...ec(state[action], action),
      }
    default:
      return state
  }
}
//---------------------
//------Cart-------
function ct(
  state = {
    isFetching: false,
    didInvalidate: false,
  },
  action
) {
  switch (action.type) {
    case CART_RECEIVE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        payload: action.payload,
        lastUpdated: action.receivedAt,
      }
    case CART_REQUEST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      }
    default:
      return state
  }
}

function Cart(state = [], action) {
  switch (action.type) {
    case CART_RECEIVE:
    case CART_REQUEST:
      return {
        ...state,
        ...ct(state[action], action),
      }
    default:
      return state
  }
}
//---------------------
//-----ORDER-----------
function od(
  state = {
    isFetching: false,
    didInvalidate: false,
  },
  action
) {
  switch (action.type) {
    case ORDER_RECEIVE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        payload: action.payload,
        lastUpdated: action.receivedAt,
      }
    case ORDER_REQUEST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      }
    default:
      return state
  }
}
function order(state = [], action) {
  switch (action.type) {
    case ORDER_RECEIVE:
    case ORDER_REQUEST:
      return {
        ...state,
        ...od(state[action], action),
      }
    default:
      return state
  }
}
//----------------------
//------addOrder-------
function ao(
  state = {
    isFetching: false,
    didInvalidate: false,
    payload: [],
  },
  action
) {
  switch (action.type) {
    case ADD_ORDER_RECEIVE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        payload: action.payload,
        lastUpdated: action.receivedAt,
      }
    case ADD_ORDER_REQUEST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      }
    default:
      return state
  }
}

function addOrder(state = [], action) {
  switch (action.type) {
    case ADD_ORDER_RECEIVE:
    case ADD_ORDER_REQUEST:
      return {
        ...state,
        ...ao(state[action], action),
      }
    default:
      return state
  }
}
//---------------------
//-----REVIEWS---------
function rv(
  state = {
    isFetching: false,
    didInvalidate: false,
  },
  action
) {
  switch (action.type) {
    case REVIEWS_RECEIVE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        payload: action.payload,
        lastUpdated: action.receivedAt,
      }
    case REVIEWS_REQUEST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      }
    default:
      return state
  }
}
function reviews(state = [], action) {
  switch (action.type) {
    case REVIEWS_RECEIVE:
    case REVIEWS_REQUEST:
      return {
        ...state,
        ...rv(state[action], action),
      }
    default:
      return state
  }
}
//----------------------
//-----FAVORITE---------
function fv(
  state = {
    isFetching: false,
    didInvalidate: false,
  },
  action
) {
  switch (action.type) {
    case FAVORITE_RECEIVE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        payload: action.payload,
        lastUpdated: action.receivedAt,
      }
    case FAVORITE_REQUEST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      }
    default:
      return state
  }
}
function favorite(state = [], action) {
  switch (action.type) {
    case FAVORITE_RECEIVE:
    case FAVORITE_REQUEST:
      return {
        ...state,
        ...fv(state[action], action),
      }
    default:
      return state
  }
}
//----------------------
//-----FAVORITENUM---------
function fvn(
  state = {
    isFetching: false,
    didInvalidate: false,
  },
  action
) {
  switch (action.type) {
    case FAVORITENUM_RECEIVE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        payload: action.payload,
        lastUpdated: action.receivedAt,
      }
    case FAVORITENUM_REQUEST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      }
    default:
      return state
  }
}
function favoriteNum(state = [], action) {
  switch (action.type) {
    case FAVORITENUM_RECEIVE:
    case FAVORITENUM_REQUEST:
      return {
        ...state,
        ...fvn(state[action], action),
      }
    default:
      return state
  }
}
//----------------------
const ap = {
  totalAmount: 0,
  totalPrice: 0,
}
function cartToOrder(state = ap, action) {
  switch (action.type) {
    case ADD_CART_TO_ORDER:
      return {
        ...state,
        totalAmount: action.totalAmount,
        totalPrice: action.totalPrice,
        lastUpdated: action.receivedAt,
      }
    default:
      return state
  }
}
//---------------------

const ShopReducers = {
  addToFav,
  delFav,
  addToCart,
  Cart,
  delCart,
  editCart,
  bookInfo,
  categories,
  shop,
  order,
  addOrder,
  reviews,
  favorite,
  favoriteNum,
  cartToOrder,
}

export default ShopReducers
