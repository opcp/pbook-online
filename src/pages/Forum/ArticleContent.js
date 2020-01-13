import React, { useState, useEffect, createRef } from 'react'
import { BrowserRouter as Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import './scss/ArticleContent.scss'
import './scss/animate.css'
//action
import { letMeLogin, readMoreResponse } from './fmAction'
//Material Icons
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import FacebookIcon from '@material-ui/icons/Facebook'
import Chip from '@material-ui/core/Chip'

import CircularProgress from '@material-ui/core/CircularProgress'
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

//component
import Message from '../../components/forum/Messgae/Message'
import avatar from './2.jpg'
import { FacebookProvider, Share, ShareButton } from 'react-facebook'

const ArticleContent = props => {
  const classes = useStyles()

  let { articleId } = useParams()

  const [login, setLogin] = useState(false)
  const [data, setData] = useState('')
  const [contentUpdated, setContentUpdated] = useState(false) //讀取內容json
  const [addElement, setAddElement] = useState(0) //render element
  const [textareaValue, setTextareaValue] = useState('')
  const [like, setLike] = useState(0)
  const [bookmark, setBookmark] = useState(false)
  const [favorite, setFavorite] = useState(false)
  const [videoCount, setVideoCount] = useState(false)

  useEffect(() => {
    let mark = 0
    if (localStorage.user !== undefined) {
      let user = JSON.parse(localStorage.user)
      mark = user.MR_number
      setLogin(user)
    }
    fetch(`http://localhost:5555/forum/article/content/${articleId}/${mark}`, {
      method: 'GET',
    })
      .then(response => {
        if (!response) throw new Error(response.statusText)
        setContentUpdated(true)
        return response.json()
      })
      .then(result => {
        setData(result)
        setLike(result.article.fm_like)
        if (result.bookmark['COUNT(1)'] !== 0) {
          setBookmark(true)
        }
        if (result.favorite['COUNT(1)'] !== 0) {
          setFavorite(true)
        }
      })
  }, [])

  useEffect(() => {
    if (contentUpdated) {
      handleContentUpdated()
    }
  }, [data])
  useEffect(() => {
    if (videoCount) {
      videoCount.forEach(value => {
        console.log(value)
        let aaa = document.querySelector(`#video${value}`)
        let content = JSON.parse(textareaValue[value])
        aaa.innerHTML = content
      })
    }
  }, [textareaValue])

  const handleContentUpdated = () => {
    fetch(
      'http://localhost:5555/forum/content/' +
        data.article.fm_articleId +
        '.json'
    )
      .then(res => {
        if (!res.ok) throw new Error(res.statusText)
        return res.json()
      })
      .then(result => {
        let video = []
        let imgUpload = 0
        let imgUnsplash = 0
        let textAreaCount = 0
        let type = data.article.fm_demoImage.split('.')[1]
        let body = result.element.map(item => {
          switch (item) {
            case 'textarea':
              let uni = `textarea${textAreaCount}`
              let textareaElement = (
                <pre id={uni} className="contentPre" key={uni}>
                  {result.textareaValue[textAreaCount]}
                </pre>
              )
              textAreaCount++
              return textareaElement
            case 'div':
              let uni2 = `video${textAreaCount}`
              let videoElement = (
                <div id={uni2} className="video-frame" key={uni2}></div>
              )
              video.push(textAreaCount)
              textAreaCount++
              return videoElement
            case 'img-upload':
              let uni1 = `imgUpload${imgUpload}`
              let imgUploadElement = (
                <img
                  className="contentImg"
                  alt=""
                  key={uni1}
                  id={uni1}
                  src={`http://localhost:5555/images/forum/article_key/${data.article.fm_articleId}${imgUpload}.${type}`}
                ></img>
              )
              imgUpload++
              return imgUploadElement
            case 'img-unsplash':
              let uni3 = `imgUnsplash${imgUnsplash}`
              let imgUpsplashElement = (
                <img
                  className="contentImg"
                  alt=""
                  key={uni3}
                  id={uni3}
                  src={result.imgFromUnsplash[imgUnsplash]}
                ></img>
              )
              imgUnsplash++
              return imgUpsplashElement
            default:
              return 'nothing'
          }
        })
        setVideoCount(video)
        setAddElement([...body])
        setTextareaValue(result.textareaValue)
      })
  }
  //追蹤作家
  const handleFollow = () => {
    if (favorite) {
      fetch(
        `http://localhost:5555/forum/article/follow/delete/${data.member.MR_number}/${login.MR_number}`
      ).then(res => {
        setFavorite(false)
        res.json()
      })
    } else {
      fetch(
        `http://localhost:5555/forum/article/follow/add/${data.member.MR_number}/${login.MR_number}`
      ).then(res => {
        setFavorite(true)
        res.json()
      })
    }
  }
  //書籤click
  const handleBookmarkClick = () => {
    if (bookmark) {
      fetch(
        `http://localhost:5555/forum/article/bookmark/delete/${articleId}/${login.MR_number}`
      ).then(res => {
        setBookmark(false)
        res.json()
      })
    } else {
      fetch(
        `http://localhost:5555/forum/article/bookmark/add/${articleId}/${login.MR_number}`
      ).then(res => {
        setBookmark(true)
        res.json()
      })
    }
  }
  //喜歡文章
  
  const handleClickArticleLike = () => {
    let node = document.querySelector('.thumb')
    fetch(`http://localhost:5555/forum/article/like/${articleId}/${like}`)
      .then(res => {
        return res.json()
      })
      .then(result => {
        node.classList.add('animated', 'bounceIn')
        node.addEventListener('animationend', function() {
          node.classList.remove('animated', 'bounceIn')
          node.removeEventListener('animationend', () => {})
        })
        setLike(like + 1)
      })
  }
  const youNeedToLogin = () => {
    if (!login) {
      document.documentElement.scrollTop = 0
      props.dispatch(letMeLogin())
    }
  }
  const handleReadMore = () => {
    props.dispatch(readMoreResponse(5))
  }
  // if (!contentUpdated) {
  if (!data) {
    return <CircularIndeterminate />
  } else {
    let countRes = data.responseNO['COUNT(1)'] - props.showResponse

    return (
      <div className="container">
        <div className="article-content-warpper">
          <span className="cateText">
            <ThemeProvider theme={theme}>
              <Chip
                label={data.article.categoriesName}
                // clickable
                color="primary"
                variant="outlined"
                style={{ fontSize: 24 }}
              />
              <Chip
                className="ml-2"
                label={data.article.subname}
                // clickable
                color="primary"
                variant="outlined"
                style={{ fontSize: 24 }}
              />
            </ThemeProvider>
            <span className="ml-4"></span>
          </span>
          <div className="dis-flex dis-flex-flex-between">
            <div className="title">{data.article.fm_title}</div>
            <div className="bookmarkIcon icon">
              {bookmark ? (
                <BookmarkIcon
                  style={{ fontSize: 40 }}
                  onClick={handleBookmarkClick}
                />
              ) : (
                <BookmarkBorderIcon
                  style={{ fontSize: 40 }}
                  onClick={handleBookmarkClick}
                />
              )}
            </div>
          </div>
          <div className="writer-details dis-flex">
            <figure>
              <img
                alt=""
                className="avater"
                src={
                  'http://localhost:5555/images/member/' + data.member.MR_pic
                }
              ></img>
            </figure>
            <div>
              <div className="writer-item ">
                <span className="name1">{data.member.MR_nickname}</span>
                <Button
                  className={favorite ? 'follow-active' : ''}
                  variant="outlined"
                  color="secondary"
                  onClick={handleFollow}
                >
                  追蹤作者
                </Button>
              </div>
              <div className="writer-item">
                <span className="name">{data.article.fm_publishTime}</span>
                <span className="name">{data.article.fm_read}人已閱讀</span>
              </div>
            </div>
          </div>
          <div className="separation-line"></div>
          <section>{addElement}</section>
          <div className="social-area">
            <div className="dis-flex thumb" onClick={handleClickArticleLike}>
              <div className="thumb-frame">
                <ThumbUpIcon style={{ fontSize: 50 }} />
              </div>
              <span>{like}</span>
            </div>
            <div className="social-icons">
              <FacebookProvider appId="2545805135652577">
                <ShareButton href="https://www.google.com.tw/">
                  <div title="分享到臉書">
                    <FacebookIcon style={{ fontSize: 40, color: '#3b5998' }} />
                  </div>
                </ShareButton>
              </FacebookProvider>
              <span className="icon">
                {bookmark ? (
                  <BookmarkIcon
                    style={{ fontSize: 40 }}
                    onClick={handleBookmarkClick}
                  />
                ) : (
                  <BookmarkBorderIcon
                    style={{ fontSize: 40 }}
                    onClick={handleBookmarkClick}
                  />
                )}
              </span>
            </div>
          </div>
          <hr></hr>
          <div className="writer-details dis-flex">
            <figure>
              <img
                alt=""
                className="avater"
                src={
                  'http://localhost:5555/images/member/' + data.member.MR_pic
                }
              ></img>
            </figure>
            <div>
              <div className="name">WRITTEN BY</div>
              <div className="writer-item">
                <span className="name1">{data.member.MR_nickname}</span>
                <Button
                  className={favorite ? 'follow-active' : ''}
                  variant="outlined"
                  color="secondary"
                  onClick={handleFollow}
                >
                  追蹤作者
                </Button>
              </div>
              <div className="writer-item">
                <div className="name">{data.member.MR_introduction}</div>
              </div>
            </div>
          </div>
          <hr></hr>

          <Message articleId={articleId} member={data.member}></Message>
          <div className="button" onClick={handleReadMore}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
            >
              看更多回應({countRes < 0 ? 0 : countRes})
            </Button>
          </div>
          {!login ? (
            <div className="need-login">
              <span>
                請先登入會員，才可回應。
                <button className="login-button" onClick={youNeedToLogin}>
                  登入
                </button>
              </span>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    )
  }
}

// 綁定props.todos <=> store.todos
const mapStateToProps = store => ({
  showResponse: store.readMoreResponse.number,
})
// redux(state)綁定到此元件的props、dispatch方法自動綁定到此元件的props

export default connect(mapStateToProps)(ArticleContent)

//components

function CircularIndeterminate() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <CircularProgress />
      <CircularProgress color="secondary" />
    </div>
  )
}

//Material UI style
const useStyles = makeStyles(theme => ({
  button: {
    width: '100%',
    margin: '8px 8px',
  },
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}))
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#58b2dc',
    },
  },
})
