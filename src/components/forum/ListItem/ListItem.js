import React from 'react'
import './Listitem.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

//material UI
import StarsIcon from '@material-ui/icons/Stars'
import Button from '@material-ui/core/Button'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { makeStyles } from '@material-ui/core/styles'

import {
  faBookmark as faBookmarks,
  faStar as faStars,
} from '@fortawesome/free-regular-svg-icons'
//props: article(文章資訊)

class Listitem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      faBookmark: true,
      like: false,
      userHover: false,
      level: [
        '品書會員',
        '品書學徒',
        '品書專家',
        '品書大師',
        '品書至尊',
        '書評家',
      ],
    }
  }

  componentDidMount() {}
  handleIconClick = value => event => {
    if (value === 1) {
      this.handleBookmarkClick()
    }
    if (value === 2) {
      this.setState({ like: !this.state.like })
    }
  }
  //user details hover frame
  handleUserMouseInOut = event => {
    this.setState({
      userHover: !this.state.userHover,
    })
  }

  handleBookmarkClick = () => {
    if (localStorage.user !== undefined) {
      let user = JSON.parse(localStorage.user)
      let article = this.props.article

      if (!faBookmark) {
        fetch(
          `http://localhost:5555/forum/article/bookmark/delete/${article.fm_articleId}/${user.MR_number}`
        ).then(res => {
          this.setState({ faBookmark: !this.state.faBookmark })
        })
      } else {
        fetch(
          `http://localhost:5555/forum/article/bookmark/add/${article.fm_articleId}/${user.MR_number}`
        ).then(res => {
          this.setState({ faBookmark: !this.state.faBookmark })
        })
      }
    }
  }

  render() {
    let article = this.props.article
    if (!this.props.empty) {
      return (
        <>
          <div className="forum-list-item dis-flex">
            <div className="item-left">
              <div className="list-item-category">{article.categoriesName}</div>
              <Link to={`/forum/article/${article.fm_articleId}`}>
                <div
                  className="card-title-font list-title"
                  title={article.fm_title}
                >
                  {article.fm_title}
                </div>
              </Link>
              <Link to={`/forum/article/${article.fm_articleId}`}>
                <div className="card-subtitle-font fm-subtitle">
                  {article.fm_subTitle}
                </div>
              </Link>
              <div className="list-item-details">
                <span
                  onMouseEnter={this.handleUserMouseInOut}
                  onMouseLeave={this.handleUserMouseInOut}
                >
                  {article.MR_nickname}
                  {/* user hover div */}
                  <div
                    className={
                      'userFrame ' +
                      (this.state.userHover ? 'displayBlock' : 'displayNone')
                    }
                  >
                    <div className="title-line"></div>
                    <div className="title">
                      <span>{article.MR_nickname}</span>
                      <span className="d-flex flex-align-center">
                        <StarsIcon
                          className="icon pr-1"
                          style={{ fontSize: 26 }}
                        ></StarsIcon>
                        <span>
                          {this.state.level[`${article.MR_personLevel}`]}
                        </span>
                      </span>
                    </div>
                    <hr></hr>
                    <div className="subtitle">
                      從
                      <span className="m-1">
                        {article.MR_createdDate.slice(0, 10)}{' '}
                      </span>
                      成為品書會員
                    </div>
                    <div
                      className="mt-1 pr-2 introduction"
                      title={article.MR_introduction}
                    >
                      {article.MR_introduction}
                    </div>
                    <hr></hr>
                    <div>
                      <span className="followText">
                        <span className="mr-3">{this.props.follow || 6}</span>
                        <span className="mr-3">人追蹤中</span>
                        <Button variant="outlined" color="secondary">
                          追蹤作者
                        </Button>
                      </span>
                    </div>
                  </div>
                  {/* user hover end */}
                </span>
              </div>
              <div className="list-item-time dis-flex ">
                <div>
                  <span>{article.fm_publishTime.slice(0, 10)}</span>
                  <span className="ml-2">{article.fm_read}人已閱讀</span>
                  <span
                    className={
                      article.fm_featured ? 'displayInlineBlock' : 'diplayNone'
                    }
                  >
                    {this.props.article.fm_featured === 1 ? (
                      <FontAwesomeIcon
                        icon={faStars}
                        className={'fa-star active'}
                      />
                    ) : (
                      ''
                    )}
                  </span>
                </div>
                <div className="item-time-right">
                  <span className="item-icon" onClick={this.handleIconClick(1)}>
                    <FontAwesomeIcon
                      icon={this.state.faBookmark ? faBookmarks : faBookmark}
                    />
                  </span>
                  <ClickAway></ClickAway>
                </div>
              </div>
            </div>
            <Link to={`/forum/article/${article.fm_articleId}`}>
              <div className="item-right">
                <img
                  className="img"
                  src={
                    'http://localhost:5555/images/forum/article_key/' +
                    article.fm_demoImage
                  }
                  alt=""
                />
              </div>
            </Link>
          </div>
        </>
      )
    } else {
      return (
        <>
          <div className="forum-list-item dis-flex">
            <div className="item-left">
              <div className="list-item-category loadinglist "></div>
              <div className="card-title-font loadinglist ">Loading</div>
              <div className="card-subtitle-font fm-subtitle loadinglist "></div>
              <div className="list-item-details loadinglist "></div>
              <div className="list-item-time dis-flex loadinglist ">
                <div className="loadinglist ">
                  <span></span>
                  <span></span>
                </div>
                <div className="item-time-right ">
                  <span className="item-icon">
                    <FontAwesomeIcon icon={faBookmarks} />
                  </span>
                  <span className="item-icon position-r">
                    <FontAwesomeIcon icon={faEllipsisH} />
                    <div
                      className={
                        'likeOrNot position-a ' +
                        (this.state.like ? 'displayBlock' : ' displayNone')
                      }
                    ></div>
                  </span>
                </div>
              </div>
            </div>
            <div className="item-right loadinglist">
              <img className="img" src="" alt="" />
            </div>
          </div>
        </>
      )
    }
  }
}
export default Listitem

function ClickAway() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(prev => !prev)
  }

  const handleClickAway = () => {
    setOpen(false)
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={classes.wrapper} onClick={handleClick}>
        <FontAwesomeIcon icon={faEllipsisH} />
        {open ? (
          <Link>
            <div className={classes.div} style={{ cursor: 'pointer' }}>
              檢舉文章
            </div>
          </Link>
        ) : null}
      </div>
    </ClickAwayListener>
  )
}

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'relative',
  },
  div: {
    position: 'absolute',
    width: '80px',
    top: 28,
    right: 0,
    // left: 0,
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}))
