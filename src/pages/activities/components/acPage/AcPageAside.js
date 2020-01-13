/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import './acPageAside.scss'
import { withRouter } from 'react-router'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import FacebookIcon from '@material-ui/icons/Facebook'
import { FacebookProvider, ShareButton } from 'react-facebook'
import AcSign from '../acSign/AcSign'

// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

const AcPageAside = props => {
  const [show, setShow] = React.useState(false)
  const [like, setLike] = React.useState(false)
  let userNum = localStorage.user
    ? JSON.parse(localStorage.user).MR_number
    : 'not login'
  let acType = props.match.url.split('/')[2] === 'offline' ? 1 : 2
  let acId = props.match.params.acId

  useEffect(() => {
    fetch(
      'http://localhost:5555/activities/ac-like/' +
        userNum +
        '/' +
        acType +
        '/' +
        acId
    )
      .then(response => response.json())
      .then(result => {
        setLike(!!result)
      })
      .catch(err => console.log('ac-like', err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleClickOpen() {
    setShow(true)
  }
  function handleClose() {
    setShow(false)
  }
  function handleLike(event) {
    let el = event.currentTarget
    el.classList.toggle('like')
    let toggle = el.classList.contains('like') ? 1 : 0
    fetch(
      'http://localhost:5555/activities/ac-like/' +
        userNum +
        '/' +
        acType +
        '/' +
        acId +
        '/' +
        toggle
    )
      .then(response => response.json())
      .then(result => {})
      .catch(err => console.log('ac-like', err))
  }
  return (
    <>
      <aside className="col-md-3 acPageAside">
        <span className="share d-flex mt-3 justify-content-around align-items-center">
          <button
            className={'py-2 ' + (like ? 'like' : '')}
            title="收藏活動"
            onClick={e => {
              e.stopPropagation()
              handleLike(e)
            }}
          >
            <FavoriteBorderIcon />
          </button>
          <a
            className="py-2"
            title="聯絡主辦方"
            href="mailto:abc1230429@gmail.com"
          >
            <MailOutlineIcon />
          </a>
          <FacebookProvider appId="468465107359578">
            <ShareButton className="py-2" href="http://www.facebook.com">
              <div title="分享到臉書">
                <FacebookIcon />
              </div>
            </ShareButton>
          </FacebookProvider>
        </span>
        {(function() {
          if (props.quota && !(props.quota === -1))
            return (
              <>
                <div className="sign-info pt-3 mb-2 d-flex justify-content-center">
                  <span>總名額：{props.quota}</span>
                  <span>剩餘名額：{props.quota - props.registered}</span>
                  <button
                    className="sign-btn my-2 p-2"
                    onClick={handleClickOpen}
                  >
                    {' '}
                    我要報名
                  </button>
                  <AcSign
                    show={show}
                    handleClose={handleClose}
                    match={props.match}
                    title={props.title}
                  />
                </div>
                <div className="googleMap px-3 mt-3">
                  <iframe
                    title="map"
                    width="100%"
                    height="250"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src={
                      'https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q=' +
                      props.acLocation +
                      '&z=16&output=embed&t='
                    }
                  ></iframe>
                </div>
              </>
            )
        })()}
      </aside>
    </>
  )
}
export default withRouter(AcPageAside)
