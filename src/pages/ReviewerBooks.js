/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import { withRouter } from 'react-router-dom'
import BR_ReviewerList from './reviewer_page/BR_ReviewerList'
import BR_BookcaseList from './reviewer_page/BR_BookcaseList'
import BR_BookcaseHot_books from './reviewer_page/BR_BookcaseHot_books'
import BR_Navbar from './reviewer_page/BR_Navbar'
import ReviewerBlog from './ReviewerBlog'
import axios from 'axios'

class ReviewerBooks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      brData: [],
      csData: [],
      opened: null,
      openedSid: null,
      hotNum: 3,
      loading: false,
    }
  }

  componentDidMount() {
    this.fetchData()
    window.addEventListener('scroll', e => this.handleScroll(e)) //監聽滾動
    // window.addEventListener('resize', this.handleResize.bind(this)) //監聽視窗
  }

  fetchData = () => {
    this.fetchBrData()
    this.fetchCsData()
  }

  fetchBrData = () => {
    axios
      .get('http://localhost:5555/reviewer/brReviewerList')
      .then(({ data: { rows: brData } }) => {
        this.setState({ brData })
      })
  }

  fetchCsData = () => {
    axios
      .get('http://localhost:5555/reviewer/brBookcase')
      .then(({ data: { rows: csData } }) => {
        this.setState({ csData })
      })
  }

  // 移除監聽，防組件錯亂
  componentWillUnmount() {
    window.removeEventListener('scroll', e => this.handleScroll(e))
  }

  startLoading = () => this.setState({ loading: true })
  endLoading = () => this.setState({ loading: false })

  handleScroll = e => {
    const maxHeight = e.srcElement.scrollingElement.scrollHeight
    const fromTop = e.srcElement.scrollingElement.scrollTop
    const { innerHeight } = window
    const { csData, hotNum } = this.state
    const csLength = csData.filter(
      ({ number }) => number === this.getReviewerData().number
    ).length
    if (innerHeight + fromTop === maxHeight) {
      if (hotNum === csLength) {
        // do something
        return false
      }

      this.startLoading()
      window.setTimeout(() => {
        this.endLoading()
        this.setState({
          hotNum: Math.min(csLength, this.state.hotNum + 3),
        })
      }, 600)
    }
  }

  // 裝填
  handleOpened = (opened, openedSid) => {
    this.setState({ opened, openedSid })
  }

  getReviewerData() {
    const { brData } = this.state
    let reviewerData = null
    for (let i = 0; i < brData.length; i++) {
      if (brData[i].sid == this.props.match.params.sid) {
        reviewerData = brData[i]
      }
    }
    return reviewerData
  }

  render() {
    const { opened, openedSid, loading } = this.state

    if (this.state.brData.length === 0)
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

    let brData = this.state.brData //書評家
    let csData = this.state.csData //看看書櫃

    const reviewerData = this.getReviewerData()

    // 指定會員的書櫃，收藏的書籍
    let bookcaseData = null
    for (let i = 0; i < csData.length; i++) {
      if (csData[i].number == reviewerData.number) {
        bookcaseData = csData[i].isbn
        // console.log('進入',reviewerData.br_name,'會員編號',reviewerData.number,'的書櫃')
      }
    }

    return (
      <div className="br_bg">
        <>
          <BR_Navbar brData={this.state.brData} />
          <h1>　</h1>
          <section className="reviewerBooks">
            {/* 接應id的書評家個人介紹 */}
            <BR_ReviewerList
              number={reviewerData.number}
              key={reviewerData.sid}
              sid={reviewerData.sid}
              title={reviewerData.title}
              img={reviewerData.img}
              br_name={reviewerData.br_name}
              job={reviewerData.job}
              intro={reviewerData.intro}
              tube={reviewerData.tube}
            ></BR_ReviewerList>

            {/* 熱門書評列表 */}
            <div className="HotBookBoxAll_Light">
              <div className="blackBG">
                <h5 className="h5_hotText">推薦書評</h5>
                <div className="HotBookBoxAll_Bookcase">
                  {this.state.csData
                    .filter(({ number }) => reviewerData.number === number)
                    .filter((key, index) => index < 5)
                    .map(({ pic, sid, name, likebook, readbook }) => (
                      <BR_BookcaseHot_books
                        onHandleOpen={this.handleOpened}
                        opened={opened}
                        key={sid}
                        sid={sid}
                        pic={pic}
                        name={name}
                        likebook={likebook}
                        readbook={readbook}
                      ></BR_BookcaseHot_books>
                    ))}
                </div>
              </div>
            </div>
            {opened === 'blog' && (
              <ReviewerBlog
                sid={openedSid}
                opened={opened}
                onHandleOpen={this.handleOpened}
              />
            )}

            {/* 針對書評家 - 書櫃列表 */}
            {this.state.csData
              .filter(({ number }) => number === reviewerData.number)
              .filter((key, index) => index < this.state.hotNum)
              .map(
                ({
                  number,
                  title,
                  vb_book_sid,
                  name,
                  pic,
                  author,
                  sid,
                  introduction,
                  blog,
                  tube,
                  likebook,
                  readbook,
                  isbn,
                }) => (
                  <BR_BookcaseList
                    number={number}
                    key={sid}
                    id={sid} // 點擊熱門書名傳送至對應#id
                    isbn={isbn}
                    title={title}
                    br_name={reviewerData.br_name}
                    vb_book_sid={vb_book_sid}
                    sid={sid}
                    pic={pic}
                    name={name}
                    author={author}
                    blog={blog}
                    introduction={introduction}
                    tube={tube}
                    readbook={readbook}
                    likebook={likebook}
                    refreshReadBook={this.fetchCsData}
                    refreshLikeBook={this.fetchCsData}
                    refreshBlog={this.fetchCsData}
                  ></BR_BookcaseList>
                )
              )}
            {loading && (
              <h1 className="h1_br">
                取得資料中...
                <img
                  className="loadingGif"
                  src={require('./reviewer_page/images/ani_LoadingPBook.gif')}
                  alt=""
                />
              </h1>
            )}
          </section>
        </>
      </div>
    )
  }
}

export default withRouter(ReviewerBooks)
