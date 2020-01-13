import React, { useState, useEffect, createRef } from 'react'
import { BrowserRouter as Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import './Message.scss'
//action
import { letMeLogin } from '../../../pages/Forum/fmAction'

//Material Icons
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import FacebookIcon from '@material-ui/icons/Facebook'

import CircularProgress from '@material-ui/core/CircularProgress'
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import TextareaAutosize from 'react-textarea-autosize'

import avatar from './2.jpg'
// import { FacebookProvider, Share, ShareButton } from 'react-facebook'

//nees to import props : articleId =articleId  member=member.MR_pic
const Massage = props => {
  const classes = useStyles()

  let textInput = createRef()

  const [login, setLogin] = useState(false)
  const [response, setResponse] = useState(false)

  useEffect(() => {
    if (localStorage.user !== undefined) {
      let user = JSON.parse(localStorage.user)
      setLogin(user)
    }
    loadingMessage()
  }, [props.articleId])

  const loadingMessage = () => {
    fetch(`http://localhost:5555/forum/message/content/${props.articleId}`, {
      method: 'GET',
    })
      .then(response => {
        return response.json()
      })
      .then(result => {
        setResponse(result)
      })
  }

  const youNeedToLogin = () => {
    if (!login) {
      document.documentElement.scrollTop = 0
      props.dispatch(letMeLogin())
    }
  }
  const wantToReply = () => {
    let formData = new FormData()
    let reponseInput = document.querySelector('#reponseInput').value
    formData.append('contentValue', reponseInput)

    fetch(
      `http://localhost:5555/forum/article/newResponse/${props.articleId}/${login.MR_number}`,
      { method: 'POST', body: formData }
    ).then(() => {
      loadingMessage()
      reponseInput = document.querySelector('#reponseInput').value = ''
    })
  }

  if (!response) {
    return (
      <>
        <CircularProgress />
      </>
    )
  } else {
    let count = 0
    return (
      <div>
        <div className="massage-frame dis-flex">
          <div className="avatar-md">
            <img
              alt=""
              src={
                login
                  ? 'http://localhost:5555/images/member/' + login.MR_pic
                  : avatar
              }
            ></img>
          </div>

          <TextareaAutosize
            placeholder="寫個留言吧......"
            onClick={youNeedToLogin}
            id="reponseInput"
            ref={textInput}
          />
          {login ? (
            <BootstrapButton
              variant="contained"
              color="primary"
              className={classes.margin}
              onClick={wantToReply}
            >
              <span>回覆文章</span>
            </BootstrapButton>
          ) : (
            ''
          )}
        </div>
        {response.map(item => {
          if (count < props.showResponse) {
            count++
            return (
              <MessageChild
                key={item.sid}
                response={item}
                sid={item.sid}
                like={item.fm_resLike}
              />
            )
          } else {
            return ''
          }
        })}
      </div>
    )
  }
}

const MessageChild = props => {
  const [like, setLike] = useState(0)
  useEffect(() => {
    setLike(props.like)
  }, [])

  const handleResponseLike = sid => {
    let node = document.querySelector(`#thumb-sm${sid}`)
    fetch(`http://localhost:5555/forum/article/responseLike/${sid}/${like}`, {
      method: 'GET',
    })
      .then(response => {
        return response.json()
      })
      .then(result => {
        if (result.affectedRows === 1) {
          node.classList.add('animated', 'bounceIn')
          node.addEventListener('animationend', function() {
            node.classList.remove('animated', 'bounceIn')
            node.removeEventListener('animationend', () => {})
          })
          setLike(like + 1)
        }
      })
  }

  return (
    <div>
      <div className="massage-frame">
        <div className="dis-flex flex-align-center writer">
          <div className="avatar-sm">
            <img
              alt=""
              src={`http://localhost:5555/images/member/${props.response.MR_pic}`}
            ></img>
          </div>
          <div className="writer-d">
            <div className="writer-name">{props.response.MR_nickname}</div>
            <div>
              {`${props.response.responseTime}`
                .replace('T', '   ')
                .replace('.000Z', '')}
            </div>
          </div>
        </div>
        <div className="p2">
          <pre className="pre-content">{props.response.fm_responseContent}</pre>
        </div>
        <div className="social-area2">
          <div
            className="dis-flex thumb-sm"
            id={`thumb-sm${props.sid}`}
            onClick={() => handleResponseLike(props.sid)}
          >
            <div className="thumb-frame">
              <ThumbUpIcon style={{ fontSize: 20 }} />
            </div>
            <span>{like}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// 綁定props.todos <=> store.todos
const mapStateToProps = store => ({
  showResponse: store.readMoreResponse.number,
})
// redux(state)綁定到此元件的props、dispatch方法自動綁定到此元件的props
export default connect(mapStateToProps)(Massage)

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

const BootstrapButton = withStyles({
  root: {
    fontSize: '1rem',
    width: '130px',
    padding: '8px 24px',
    // border: '1px solid',
    backgroundColor: '#2d3a3a',
    // fontFamily: [
    //   '-apple-system',
    //   'Roboto',
    //   '"Helvetica Neue"',
    //   'Arial',
    // ].join(','),
    '&:hover': {
      backgroundColor: '#2d3a3a',
      color: '#ffc408',
      boxShadow: 'none',
    },
    // '&:focus': {
    //   boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    // },
  },
})(Button)
