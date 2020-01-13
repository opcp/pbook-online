import React from 'react'
import './lukeStyle.scss'
import { Link } from 'react-router-dom'
import MyPagination from '../../components/member/MyPagination'
import axios from 'axios'
import ScrollToTop from '../activities/components/ScrollToTop'

class FavoriteReviwer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reviewerData: [],
      totalPage: '',
      totalRows: '',
      page: 1,
      pagePath: '/member/FavoriteReviwer/',
    }
  }
  componentDidMount() {
    this.changePage()
    this.queryReviewer()
  }

  componentDidUpdate(prevProps) {
    //當頁數變更時才重新渲染
    if (this.props.match.params.page !== prevProps.match.params.page) {
      this.queryReviewer()
    }
  }

  changePage = page => {
    // console.log("page", page);
    this.setState({ page })
  }

  queryReviewer = () => {
    let number = JSON.parse(localStorage.getItem('user')).MR_number
    // console.log(number);
    axios
      .post('http://localhost:5555/member/queryReviewer/' + this.state.page, {
        number,
      })
      .then(res => {
        // console.log("res",res.data.totalPage, res.data.totalRows);
        this.setState({
          page:1,
          reviewerData: res.data.rows,
          totalPage: res.data.totalPage,
          totalRows: res.data.totalRows,
        })
      })
  }

  render() {
    let reviewerData = this.state.reviewerData
    let totalPage = this.state.totalPage
    let totalRows = this.state.totalRows
    let createId = 0
    console.log('state', this.state)

    return (
      <>
      <ScrollToTop>
        <div className="reviewerContent">
          <div className="title">收藏書評家</div>
          <div className="test1">
            {
              (!reviewerData && !reviewerData) ? (
                <>
                <div className="nobook">目前還沒有收藏書評家</div>
               </>
              ):(
                <>
                {(reviewerData && reviewerData).map(data => (
                    <section
                      className="ReviewerListAllBox reviewerList"
                      key={createId++}
                    >
                      <div className="d-flex">
                        <div className="brAvatarAllBox borderLine">
                          <h5 className="h5_br">{data.title}</h5>
                          <Link to={'/reviewer/reviewerBooks/' + data.sid}>
                            <div className="brAvatarBox">
                              <img
                                className="brAvatarImg"
                                src={require(`../reviewer_page/images/${data.img}`)}
                              />
                            </div>
                          </Link>
                          <h5 className="h5_br">{data.br_name}</h5>

                          <div className="brIconBox">
                            <div className="AvatarInfo">{data.job}</div>
                          </div>

                          <Link
                            to={'/reviewer/reviewerBooks/' + data.sid}
                            className="d-flex justify-content-center borderLineTop"
                          >
                            <div className="brIconBox">
                              <img
                                className="brMark_img"
                                src={require('../reviewer_page/images/P_logo.png')}
                              />
                            </div>
                            <div className="brReadBooks">看看書櫃</div>
                          </Link>

                          <div className="brIconBox borderLineTop">
                            <img
                              className="brIconFollow"
                              src={require('../reviewer_page/images/icon_follow.png')}
                            />
                          </div>

                          <div className="brIconBox borderLineTop">
                            <a
                              className="brIconShare"
                              href={data.youtube}
                              target="black"
                            >
                              <img
                                className="brMark_img"
                                src={require('../reviewer_page/images/icon_youtube.png')}
                              />
                            </a>
                            <a
                              className="brIconShare"
                              href={data.facebook}
                              target="black"
                            >
                              <img
                                className="brMark_img"
                                src={require('../reviewer_page/images/icon_facebook.png')}
                              />
                            </a>
                            <a
                              className="brIconShare"
                              href={data.twitter}
                              target="black"
                            >
                              <img
                                className="brMark_img"
                                src={require('../reviewer_page/images/icon_twitter.png')}
                              />
                            </a>
                          </div>
                        </div>

                        <div className="brInfoBox borderLine">
                          <h5 className="h5_br">書評家簡介</h5>
                          <div className="brInfoText ">{data.intro}</div>
                          <div className="fbBox">
                            <div
                              className="fb-share-button"
                              data-href={data.tube}
                              data-layout="button_count"
                            ></div>
                          </div>
                        </div>
                      </div>
                      <iframe
                        className="brYouTubeRWD borderLine"
                        width="50%"
                        height="auto"
                        src={data.tube}
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </section>
                  ))}
                  <MyPagination
                    pagePath={this.state.pagePath}
                    nowPage={this.state.page}
                    totalPage={totalPage}
                    totalRows={totalRows}
                    changePage={page => {
                      this.changePage(page)
                    }}
                  />
                </>
              )
            }
          </div>
        </div>
        </ScrollToTop>
      </>
    )
  }
}

export default FavoriteReviwer
