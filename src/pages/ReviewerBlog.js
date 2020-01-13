import React from 'react'
import { withRouter } from 'react-router-dom'
import BR_BlogList from './reviewer_page/BR_BlogList'
import axios from 'axios'

export class ReviewerBlog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      csData: [],
      bkData: [],
      opened: null,
    }
  }

  componentDidMount() {
    let newcsData
    axios
      .get('http://localhost:5555/reviewer/brBookcase')
      .then(res => {
        newcsData = res.data.rows
        return axios.get('http://localhost:5555/reviewer/brbooks')
      })
      .then(res => {
        this.setState({ csData: newcsData, bkData: res.data.rows })
      })
      .catch(function(error) {
        console.log('前端沒有取得資料', error)
      })
  }

  handleOpened = opened => {
    this.setState({ opened: opened })
  }
  render() {
    // if (!this.state.csData.length) return <></>
    if (this.state.csData.length === 0)
      return (
        <>
          <h1 className="h1_br">
            取得資料中...
            <img
              className="loadingGif"
              src={require('./reviewer_page/images/ani_LoadingPBook.gif')}
              alt=""
            />
          </h1>
        </>
      )
    let csData = this.state.csData

    // 參數接
    // let BlogData = null
    //   for (let i = 0; i < csData.length; i++) {
    //     if (csData[i].sid == this.props.match.params.sid) {
    //       BlogData = csData[i]
    //     }
    // }
    // State接
    let BlogData = null
    for (let i = 0; i < csData.length; i++) {
      if (csData[i].sid == this.props.sid) {
        BlogData = csData[i]
      }
    }
    console.log('點選書籍，獲取sid', BlogData.sid)

    return (
      <div className="br_bg">
        <>
          <h3 className="h3_br">{this.props.title}</h3>
          <section className="reviewerBlog ">
            {/* 部落格內文 */}
            <BR_BlogList
              onHandleOpen={this.props.onHandleOpen}
              opened={this.props.opened}
              key={BlogData.sid}
              sid={BlogData.sid}
              name={BlogData.name}
              blog={BlogData.blog}
              tube={BlogData.tube}
            ></BR_BlogList>
          </section>
        </>
      </div>
    )
  }
}

export default withRouter(ReviewerBlog)
