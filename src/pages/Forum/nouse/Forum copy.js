import React from 'react'
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Route, Link } from 'react-router-dom'
import CardS1 from '../../components/forum/CardS1/CardS1'
import CardS2 from '../../components/forum/CardS2/CardS2'
import Listitem from '../../components/forum/ListItem/ListItem'
import HotTopic from '../../components/forum/HotTopic/HotTopic'
import './Forum.scss'

class Forum extends React.Component {
  constructor() {
    super()
    this.state = {
      update: false,
      items: 20,
      data: [],
    }
  }
  componentDidMount() {
    fetch('http://localhost:5555/forum/homepage', {
      method: 'GET',
    })
      .then(response => {
        if (!response.ok) throw new Error(response.statusText)
        return response.json()
      })
      .then(async result => {
        await this.setState({
          data: result.featured,
          update: true,
        })
      })
      .catch(error => {
        //這裡可以顯示一些訊息
        console.error(error)
      })
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="position-r">
            <div className="featured-title">精選文章</div>
            <div className="featured">
              <CardS1 data={this.state.data[0]} />
              <CardS2
                update={this.state.update}
                data={[
                  this.state.data[2],
                  this.state.data[3],
                  this.state.data[4],
                ]}
              />
              <CardS1 data={this.state.data[1]} />
            </div>
            <div style={{ color: 'transparent' }}>更多精選</div>
            <Link to="" className="more-featured position-a">
              更多精選 +{' '}
            </Link>
          </div>
          <hr></hr>
          <div className="position-r">
            <div className="forum-list-wrapper card-module">
              <div className="articleList-title">文章列表</div>
              {this.state.data.map(value => {
                return <Listitem key={value.fm_articleId} article={value} />
              })}
            </div>
            <div className="HotTopic-wrapper card-module position-a">
              <HotTopic />
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default Forum
