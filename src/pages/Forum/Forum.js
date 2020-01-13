import React from 'react'
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Route, Link } from 'react-router-dom'
import CardS11 from '../../components/forum/CardS1/CardS1-1'
import Listitem from '../../components/forum/ListItem/ListItem'
import HotArticle from '../../components/forum/HotArticle/HotArticle'

import './scss/Forum.scss'

class Forum extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      update: false,
      items: 20,
      data: [],
      articleList: [],
      number: 5,
      outOfList: false,
    }
  }
  componentDidMount() {
    fetch('http://localhost:5555/forum/homepage/true', {
      method: 'GET',
    })
      .then(response => {
        if (!response.ok) throw new Error(response.statusText)
        return response.json()
      })
      .then(async result => {
        fetch(`http://localhost:5555/forum/articleList/5`, {
          method: 'GET',
        })
          .then(res => {
            if (!res.ok) throw new Error(res.statusText)
            return res.json()
          })
          .then(result2 => {
            this.setState({
              data: result.featured,
              articleList: result2,
              update: true,
            })
            document.documentElement.scrollTop = 0
          })
      })
      .catch(error => {
        //這裡可以顯示一些訊息
        console.error(error)
      })
    window.addEventListener('scroll', this.scrollEvent)
  }

  scrollEvent = () => {
    let contentTop = document.documentElement.clientHeight
    let scrollTop = document.documentElement.scrollTop
    let scrollHeight = document.documentElement.scrollHeight
    let reLoadValue = scrollHeight - contentTop - 200
    let stopValue = scrollHeight - contentTop + contentTop
    if (!this.state.outOfList) {
      if (scrollTop > reLoadValue) {
        let newNumber = this.state.number + 5
        fetch(`http://localhost:5555/forum/articleList/${newNumber}`, {
          method: 'GET',
        })
          .then(res => {
            if (!res.ok) throw new Error(res.statusText)
            return res.json()
          })
          .then(result2 => {
            this.setState(
              {
                articleList: result2,
                number: newNumber,
              },
              () => {
                console.log(this.state.articleList)
                document.documentElement.scrollTop = reLoadValue
              }
            )

            if (
              scrollTop + contentTop + 50 > stopValue ||
              this.state.number > 100
            ) {
              console.log('list end', this.state.number)
              window.removeEventListener('scroll', () => {})
              this.setState({ outOfList: true })
            }
          })
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollEvent)
  }
  render() {
    return (
      <>
        <div className="container">
          <div className="position-r">
            <div className="featured-title">精選文章</div>
            <div className="featured">
              <CardS11 data={this.state.data[0]} />
              <CardS11 data={this.state.data[1]} />
              <CardS11 data={this.state.data[2]} />
            </div>
            <div style={{ color: 'transparent' }}>更多精選</div>
            <Link
              to="/forum/search/featured"
              className="more-featured position-a"
            >
              更多精選 +
            </Link>
          </div>
          <hr></hr>
          <div className="position-r">
            <div className="forum-list-wrapper card-module">
              <div className="articleList-title">文章列表</div>
              <hr></hr>
              {this.state.articleList.map(value => {
                return (
                  <Listitem
                    key={value.fm_articleId}
                    article={value}
                    empty={false}
                  />
                )
              })}
              {!this.state.outOfList ? (
                <>
                  <Listitem empty={true} />
                  <Listitem empty={true} />
                </>
              ) : (
                ''
              )}
            </div>
            <div className="HotArticle-wrapper card-module position-a">
              <HotArticle />
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default Forum
