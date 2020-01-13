import React from 'react'
//---- PostArticle --------
const postArticleState = {
  imgData: [],
  imgCount: 0,
  addElement: [],
  mainImage: '',
}
function postArticle(state = postArticleState, action) {
  switch (action.type) {
    case 'APPEND_IMGINPUT':
      return {
        ...state,
        addElement: [...state.addElement, action.content],
        imgCount: state.imgCount + 1,
      }
    case 'APPEND_IMG_ELEMENT':
      return {
        ...state,
        addElement: [...state.addElement, action.content],
        imgData: [...state.imgData, action.imgData],
      }
    case 'APPEND_TEXTAREA':
      return {
        ...state,
        addElement: [...state.addElement, action.content],
      }
    case 'APPEND_VEDIO':
      let element = <div className="video-frame"></div>
      return {
        ...state,
        addElement: [...state.addElement, element],
      }
    case 'REMOVE_IMG':
      let newContent = state.addElement.filter(item => {
        let imgId = `img${action.removeNO}`
        let fileId = `file${action.removeNO}`
        if (item.props.id !== imgId) {
          if (item.props.id !== fileId) {
            return item
          }
        }
      })
      return {
        ...state,
        addElement: [...newContent],
      }

    case 'CLEAR_POST_DATA':
      return {
        ...postArticleState,
      }

    default:
      return state
  }
}

//---- PostArticle End --------

//---Login----
const loginOrNot = {
  loginOrNot: false,
}
function letMeLogin(state = loginOrNot, action) {
  switch (action.type) {
    case 'LET_ME_LOGIN':
      return { ...state, loginOrNot: true }
    default:
      return state
  }
}

//---- UserDetails --------
const detailInitState = {
  update: false,
  data: false,
  follow: false,
}

function UserDetails(state = detailInitState, action) {
  switch (action.type) {
    // case 'FM_USER_REQUEST':
    //   return { ...state, data: action.data }
    case 'FM_USER_RECEIVE':
      return {
        ...state,
        data: action.data.writer,
        follow: action.data.follow,
        update: true,
      }
    default:
      return state
  }
}
//---- UserDetails End --------

//---- Follower --------
const followerInitState = { follow: false, data: '' }

function isFollower(state = followerInitState, action) {
  switch (action.type) {
    // case 'FM_USER_REQUEST':
    //   return { ...state, data: action.data }
    case 'SET_FOLLOW':
      return { ...state, follow: !state.follow }
    case 'FOLLOWER_RECEIVE':
      return { ...state, data: action.data }
    default:
      return state
  }
}
//---- UserDetails End --------

//-----readMore response----
const NumberInitState = {
  number: 3,
}

function readMoreResponse(state = NumberInitState, action) {
  switch (action.type) {
    case 'MORE_RESPONSES':
      return { ...state, number: state.number + action.number }
    default:
      return state
  }
}

//-----readMore response end----
const ListReducer = {
  UserDetails,
  postArticle,
  letMeLogin,
  readMoreResponse,
  isFollower,
}

export default ListReducer
