import React from 'react'
import './HotArticle.scss'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBookmark } from '@fortawesome/free-solid-svg-icons'
// import { faBookmark as faBookmarks } from '@fortawesome/free-regular-svg-icons'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'

class HotArticle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      article: 0,
    }
  }
  componentDidMount() {
    fetch('http://localhost:5555/forum/hotArticle', {
      method: 'GET',
    })
      .then(response => {
        if (!response.ok) throw new Error(response.statusText)
        return response.json()
      })
      .then(async result => {
        let arr = result.featured.map(v => {
          return v
        })
        await this.setState(() => {
          return {
            article: [...arr],
          }
        })
      })
      .catch(error => {
        //這裡可以顯示一些訊息
        console.error(error)
      })
  }
  render() {
    if (this.state.article === 0) {
      return <CircularProgress />
    } else {
      let count = 1
      return (
        <>
          <div className="HotArticle-card">
            <div className="HotArticle-title">討論區熱門文章</div>
            <div className="tilte-line"></div>
            <div className="padding-frame">
              {this.state.article.map(value => {
                return (
                  <div className="HotArticle-item" key={value.fm_articleId}>
                    <div className="dis-flex">
                      <Link to={`/forum/article/${value.fm_articleId}`}>
                        <span className="counter">{'0' + count++}</span>
                      </Link>
                      <div>
                        <Link to={`/forum/article/${value.fm_articleId}`}>
                          <div
                            className="card-title-font fm-title"
                            title={value.fm_title}
                          >
                            {value.fm_title}
                          </div>
                        </Link>

                        <div className="nickname">{value.MR_nickname}</div>
                        <div>
                          <span className="time">
                            {value.fm_publishTime.slice(0, 10)}
                          </span>
                          <span className="time">
                            {value.fm_read}人已經閱讀
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )
    }
  }
}
export default HotArticle
