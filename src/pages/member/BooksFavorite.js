import React from 'react'
import './lukeStyle.scss'
import { Link } from 'react-router-dom'
import MyPagination from '../../components/member/MyPagination'
import ScrollToTop from '../activities/components/ScrollToTop'


class BooksFavorite extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      path: 'http://localhost:5555/images/books/',
      booksData: [],
      data: [],
      nowPage: '',
      totalPage: '',
      totalRows: '',
      page: 1,
      pagePath: '/member/BooksFavorite/'
    }
  }

  componentDidMount() {
    this.queryBooks()
    this.changePage()
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.page !== prevProps.match.params.page) {
      this.queryBooks()
    }
  }

  changePage = page => {
    // console.log(page);
    this.setState({ page })
  }

  queryBooks = () => {
    // this.changePage()
    let number = JSON.parse(localStorage.getItem('user')).MR_number

    fetch('http://localhost:5555/member/queryBookcase/' + this.state.page, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        number: number,
      }),
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        // console.log("data11", data);
        if (data.totalRows == 0) {
          return
        }
        this.setState({
          data,
          page:1,
          booksData: data.rows ,
          nowPage: data.page,
          totalPage: data.totalPage,
          totalRows: data.totalRows,
        })
      })
  }

  render() {
    // console.log("newPage", this.state.page);
    // console.log(this.props.match.params.page);

    let data = this.state.booksData
    //因為第一次渲染是空的會報錯
    // console.log("data ",data && data)
    // console.log("props", this.props);
    let totalPage = this.state.totalPage
    let totalRows = this.state.totalRows

    return (
      <>
      <ScrollToTop>
        <div className="booksContent">
          <div className="title">收藏書籍</div>
          <div className="wrap flex-wrap">
            {!data.length ? (
              <>
                <div className="nobook">目前還沒有收藏書籍</div>
              </>
            ) : (
              <>
                {(data && data).map(data => (
                  <Link
                    to={'/books/information/' + data.sid}
                    target="_blank"
                    key={data.sid}
                  >
                    <div className="list">
                      <img
                        className="listImg"
                        src={this.state.path + data.pic}
                      />
                      <div className="booksTitle">{data.name}</div>
                      {/* <div className="booksInfo"> */}
                      {/* 預留小圖示 */}
                      {/* <img class="avatar" src="../images/gift.png" alt=""/> */}
                      {/* <div className="introduction">
                                        {data.introduction}
                                        </div> */}
                      {/* </div> */}
                    </div>
                  </Link>
                ))}
                <MyPagination 
                  pagePath = {this.state.pagePath}
                  nowPage = {this.state.page}
                  totalPage = {totalPage}
                  totalRows = {totalRows}
                  changePage = {(page) => { this.changePage(page)}}
                  />
              </>
            )}
          </div>
        </div>
        </ScrollToTop>
      </>
    )
  }
}

export default BooksFavorite
