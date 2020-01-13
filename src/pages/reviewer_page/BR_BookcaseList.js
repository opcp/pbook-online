import React from 'react'
import { Link } from 'react-router-dom'
import ReviewerBlog from '../ReviewerBlog'
import ReviewerBlogEdit from '../ReviewerBlogEdit'
import axios from 'axios'
import swal from '@sweetalert/with-react'

class BR_BookcaseList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false,
      opened: null,
      likeData: this.props.likebook,
      read: this.props.readbook,
      readData: this.props.readbook,
      eye:false,
    }
  }

  componentDidMount() {
    if (JSON.parse(localStorage.getItem('user')) !== null) {
      this.setState({
        isLogin: true,
      })
    }
    if ((this.props.readbook === null, this.props.likebook === null)) {
      this.setState({
        readData: 0,
        likeData: 0,
      })
    }
    this.setState({
      eye:false,
    })
  }
  //   componentDidMount() {}
  //   componentWillReceiveProps(nextProps) {}
  //   shouldComponentUpdate() {
  //     return true
  //   }
  //   componentWillUpdate() {}
  //   //   render()
  //   componentDidUpdate(prevProps, prevState) {
  //     console.log('prevState.like ', prevState.like)
  //     console.log('this.state.like ', this.state.like)
  //     if (prevState.like !== this.state.like) {
  //       //
  //     }
  //   }
  // componentWillUnmount() {}

  // 按讚數API-------------------------------------------------------------------------
  handleLikeBook = value => {
    this.setState({
      likeData: this.state.likeData + value,
    })
    axios
      .post('http://localhost:5555/reviewer/brLikeBook', {
        sid: this.props.sid,
        likebook: this.state.likeData + value,
      })
      .then(data => {
        // this.props.refreshLikeBook()
        swal('按讚成功', '', require('./images/swal_success.gif'))
      })
  }
  // 閱讀數API-------------------------------------------------------------------------
  handleReadBook = opened => {
    this.setState({
      opened,
      readData:opened === 'blog' ? this.state.readData + 1 : this.state.readData,
      eye: opened === 'blog' ? true : false
    })
    axios.post('http://localhost:5555/reviewer/brReadBook', {
      sid: this.props.sid,
      readbook:opened === 'blog' ? this.state.readData + 1 : this.state.readData,
    })
  }
  // 開關狀態
  handleOpened = opened => {
    this.setState({
      opened,
      read: opened === 'blog' ? this.state.read + 1 : this.state.read,
    })
  }
  render() {
    // console.log(this.state.likeData)
    const { opened } = this.state
    const { sid, name, number, blog, vb_book_sid, br_name, title } = this.props

    ;(function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) return
      js = d.createElement(s)
      js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0'
      fjs.parentNode.insertBefore(js, fjs)
    })(document, 'script', 'facebook-jssdk')

    return (
      <>
        <section className="ReviewerListAllBox_Bookcase">
          {/* 書籍圖片 */}
          <div
            className="brAvatarAllBox_Bookcase"
            id={this.props.sid}
            onClick={() =>
              this.handleReadBook(opened === 'blog' ? null : 'blog')
            }
          >
            <img
              className="brBookInfoImg_Bookcase"
              src={`http://localhost:5555/images/books/${this.props.pic}`}
              alt=""
            />
          </div>

          <div className="bookInfoRWD">
            <div className="bookName_Bookcase">書名：{this.props.name}</div>
            <div className="bookName_Bookcase">作者：{this.props.author}</div>
          </div>

          <div className="brInfoBox_Bookcase">
            {/* <h4 className="h4_br">書籍簡介</h4> */}
            <div className="blurBar"></div>
            <div className="brInfoTextBox_Bookcase">
              <div className="bookInfo">
                <div className="bookNameBox_Bookcase">
                  <div className="bookName_Bookcase">書名：</div>
                  <div className="bookNameText_Bookcase">{this.props.name}</div>
                </div>

                <div className="brAuthorText">作者：{this.props.author}</div>
              </div>
              {/* 書櫃區的簡介內文 */}
              <h5 className="h5_title">{this.props.title}</h5>
              <div
                className="brInfoText_Bookcase"
                dangerouslySetInnerHTML={{
                  __html: this.props.blog
                    ? this.props.blog
                    : this.props.introduction,
                }}
              ></div>
            </div>

            {/* 看更多 more (圖示) */}
            <div onClick={() => this.handleReadBook(opened === 'blog' ? null : 'blog')}
              className="brIconMore_Bookcase"
            >
              <img
                className="brMore_img"
                src={require('../reviewer_page/images/icon_more.png')}
              />
            </div>
            
            {!this.state.isLogin ? (
              ''
            ) : JSON.parse(localStorage.getItem('user')).MR_number ===
              this.props.number ? (
              <>
                {/* 編輯模式按鈕 */}
                <div className="Animate_Edit_Box">
                  <div
                    className="Animate_Edit_btn"
                    onClick={() =>
                      this.handleOpened(opened === 'edit' ? null : 'edit')
                    }
                  >
                    <img
                      className="icon_Blog_Edit"
                      src={require('../reviewer_page/images/icon_Blog_Edit.png')}
                    />
                    <h5 className="text_Blog_Edit">編輯模式</h5>
                  </div>
                </div>
              </>
            ) : (
              ''
            )}

            {/* 收藏書籍 (圖示) */}
            <div className="brIconBox_Bookcase">
              <Link
                to={`/books/information/${vb_book_sid}`}
                className="brIconShare_Bookcase"
              >
                <img
                  className="brMark_img"
                  src={require('../reviewer_page/images/ing_cart_black.png')}
                />
              </Link>

              <div className="brLikeBox">
                {/* 讚數、閱讀數 */}
                <img
                  className="brMark_img"
                  onClick={() => this.handleLikeBook(1)}
                  src={require('../reviewer_page/images/icon_likebook.png')}
                />
                <span className="brMark_p">{this.state.likeData}</span>

                {!this.state.eye ?
                (
                <>
                  <img
                  onClick={() =>
                    this.handleReadBook(opened === 'blog' ? null : 'blog')
                  }
                  className="brMark_img_noAni"
                  src={require('../reviewer_page/images/icon_readbook.png')}/>
                </>
                ):(
                  <>
                  <img
                  onClick={() =>
                    this.handleReadBook(opened === 'blog' ? null : 'blog')
                  }
                  className="brMark_img_noAni"
                  src={require('../reviewer_page/images/icon_eye.png')}/>
                </>
                )}
                

                <span className="brMark_p">{this.state.readData}</span>
              </div>

              {/* 分享功能 */}
              <div className="fbBox">
                <div
                  className="fb-share-button"
                  data-href="https://i.imgur.com/PKtu1i4.png"
                  data-layout="button_count"
                ></div>
              </div>
            </div>
          </div>
          {/* 評分組件區塊 */}
          {/* <div className="brStarBox_Bookcase borderLine"></div> */}
        </section>
        {/* 切換文章 與 編輯 */} {/* onHandleOpen → brBlog → brBlogList */}
        {opened === 'blog' && (
          <ReviewerBlog
            sid={sid}
            opened={opened}
            onHandleOpen={this.handleOpened}
            title={title}
          />
        )}
        {opened === 'edit' && (
          <ReviewerBlogEdit
            sid={sid}
            name={name}
            number={number}
            opened={opened}
            onHandleOpen={this.handleOpened}
            blog={blog}
            br_name={br_name}
            refreshBlog={this.props.refreshBlog}
          />
        )}
      </>
    )
  }
}

export default BR_BookcaseList
