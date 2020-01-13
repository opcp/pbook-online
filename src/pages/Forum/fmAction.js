// Action Creators

//---- postArticle --------
export const AppendImgElement = (addElement, uploading) => ({
  type: 'APPEND_IMG_ELEMENT',
  content: addElement,
  imgData: uploading,
})
export const AppendImgInput = addElement => ({
  type: 'APPEND_IMGINPUT',
  content: addElement,
})
export const removeImg = removeNO => ({
  type: 'REMOVE_IMG',
  removeNO: removeNO,
})
export const AppendTextarea = addElement => ({
  type: 'APPEND_TEXTAREA',
  content: addElement,
})
export const AppendVedio = () => ({
  type: 'APPEND_VEDIO',
})

export const clearPostAritcleState = () => ({
  type: 'CLEAR_POST_DATA',
})
export const letMeLogin = () => ({
  type: 'LET_ME_LOGIN',
})
export const readMoreResponse = number => ({
  type: 'MORE_RESPONSES',
  number: number,
})
//---- postArticle End--------

//給UserDetailsFetch用=======
const fmUserRequest = () => {
  return {
    type: 'FM_USER_REQUEST',
  }
}
const fmUserReceive = json => {
  return {
    type: 'FM_USER_RECEIVE',
    data: json,
    receivedAt: Date.now(),
  }
}
export const fmUserFetch = (memberId, fm_category) => async dispatch => {
  dispatch(fmUserRequest())
  try {
    let response = await fetch(
      'http://localhost:5555/forum/writer/' + memberId + '/' + fm_category,
      {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    )
    dispatch(fmUserReceive(await response.json()))
  } catch (error) {
    console.log('error', error)
  }
}

//給isFollowerFetch用=======
const followerRequest = () => {
  return {
    type: 'FOLLOWER_REQUEST',
  }
}
const followerReceive = json => {
  return {
    type: 'FOLLOWER_RECEIVE',
    data: json,
  }
}
export const followerFetch = (followMemberId, memberId) => async dispatch => {
  dispatch(followerRequest())
  try {
    let response = await fetch(
      `http://localhost:5555/forum/article/follow/delete/${followMemberId}/${memberId}`,
      { method: 'GET' }
    )
    dispatch(followerReceive(await response.json()))
  } catch (error) {
    console.log('error', error)
  }
}
