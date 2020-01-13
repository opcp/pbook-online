import React from 'react'
import axios from 'axios'
import moment from 'moment-timezone'
import { Link } from 'react-router-dom'

import HorizontalTimelineContent from './demos/demo-swipeable-views/HorizontalTimelineContent'

import './timeLine.css'

class TimeLine extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      previous: 0,
      oldData: [],
    }
  }

  // goToReviews = () => {
  //   window.location.href = '/reviews'
  // }

  componentDidMount() {
    setInterval(() => {
      renderMydata()
    }, 1000)

    const renderMydata = async () => {
      var GameInfo = []
      await axios.get(`http://localhost:5555/nana_use/timeLine`).then(res => {
        GameInfo = res.data
      })

      this.data = GameInfo.map((game, index) => {
        return {
          date: game.created_time,
          component: (
            <div
              className="container"
              key={index}
              style={{ textAlign: 'left' }}
            >
              <h2 className="timeLine20">
                {game.title
                  .replace(/<.+?>/g, '')
                  .replace(/&nbsp;/gi, '')
                  .replace(/\s/gi, '')}
              </h2>
              <em className="timeLine16" style={{ fontSize: '20px' }}>
                -書評家：{game.br_name}
              </em>
              <br />
              <em className="timeLine16" style={{ fontSize: '20px' }}>
                -發表時間：
                {moment(game.created_time)
                  .tz('Asia/Taipei')
                  .format('YYYY-MM-DD HH:mm:ss')}
              </em>
              <br />
              <em className="timeLine16" style={{ fontSize: '20px' }}>
                -書籍名稱：{game.bookName}
              </em>
              <hr />
              <p className="timeline-p">
                {game.blog
                  .replace(/<.+?>/g, '')
                  .replace(/&nbsp;/gi, '')
                  .replace(/\s/gi, '')}
              </p>
              <hr />
              <div className="timeline-more">
                <Link
                  to={'reviewer/reviewerBooks/' + game.brr_sid}
                  target="_blank"
                >
                  <span className="pointer" style={{ color: '#ffc408' }}>
                    ►
                  </span>
                  <span className="pointer">Read More</span>
                </Link>
              </div>
            </div>
          ),
        }
      })
      this.setState({ oldData: GameInfo })
      console.log('timeLineCounter')
    }
    renderMydata()
  }

  render() {
    if (!this.data) return <h1>等待資料中...</h1>
    return (
      <section className="position-relative timeline-body">
        <div className="crane"></div>
        <div className="sub-title">
          <span style={{ fontSize: '20px' }}>書評家x最新書評</span>
          <br />
          <span style={{ fontSize: '16px', color: '#ffc408' }}>NEWS</span>
        </div>
        <HorizontalTimelineContent content={this.data} />
      </section>
    )
  }
}

export default TimeLine
