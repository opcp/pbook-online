import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import ReactResizeDetector from 'react-resize-detector'
import swal from '@sweetalert/with-react'
import Home from '../../pages/Home'
import Reviewer from '../../pages/Reviewer'
import Books from '../../pages/Books'
import Activities from '../../pages/activities/Activities'
import Reviews from '../../pages/Reviews'
import Forum from '../../pages/Forum/ForumNavBar'
import PostArticle from '../../pages/Forum/PostArticle'
import Login from '../../pages/login/Login'
import Member from '../../pages/member/Member'
import Game from '../../pages/game/Game'
import Cart from '../../pages/Cart'
import NoPage from '../../pages/nopage/NoPage'
import Chat from '../../components/member/chat/Chat'
import Guide from 'react-guide'
import axios from 'axios'
import ReviewerBooks from '../../pages/ReviewerBooks'
import ReviewerBlogEdit from '../../pages/ReviewerBlogEdit'
import BookReviews from '../../pages/BookReview/BookReviews'
import ResetPWD from '../../pages/ResetPWD'
import { browserHistory } from 'react-router'
import './header.css'
import { connect } from 'react-redux'
//action
import { letMeLogin } from '../../pages/Forum/fmAction'
import { addCartToOrder } from '../shop/ShopActions'

class Header extends React.Component {
  constructor() {
    super()
    this.state = {
      loginImg: '',
      nickname: '',
      member: {},
      login: false,
      visible: false,
    }
    // this.props.dispatch(addCartToOrder(0, 0))
  }
  // 'http://localhost:5555/images/member/yoko.jpg'
  // loginSuccess(memberData){
  //   console.log("memberData", memberData);

  //   this.setState({hasData:true,id:memberData.MR_number,name:memberData.MR_name,level:memberData.MR_personLevel})
  // }
  handleLoginButton = event => {
    let loginButton = event.currentTarget
    let loginImg = loginButton.querySelector('.loginImg')
    let loginText = loginButton.querySelectorAll('.loginText')

    loginButton.classList.add('transition')
    loginButton.classList.toggle('long')
    setTimeout(() => {
      loginImg.classList.toggle('show')
      for (let i = 0; i < loginText.length; i++) {
        loginText[i].classList.toggle('show')
      }
    }, 200)
  }

  handleStopPropagation = event => {
    event.stopPropagation()
  }

  handleGoToGame = event => {
    event.stopPropagation()
    this.setState({
      visible: false,
    })
  }

  handleChatGuide = event => {
    event.stopPropagation()
    axios
      .post(`http://localhost:5555/nana_use/chatList2`, {
        memberId: JSON.parse(localStorage.getItem('user')).MR_number,
      })
      .then(res => {
        if (res.data.length === 0) {
          this.setState({
            visible: true,
          })
        }
      })
      .catch(error => {
        console.log('header handleChatGuide拿資料時有錯誤', error)
      })
  }

  clickLogin = () => {
    this.setState({ login: true })
  }

  handleLogout = () => {
    swal({
      title: '您確定要登出嗎?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(willDelete => {
      if (willDelete) {
        swal('您已經成功登出!', {
          icon: 'success',
        })
        fetch('http://localhost:5555/logout', {
          method: 'GET',
          credentials: 'include',
        }).then(res => {
          console.log('logout')
        })

        setTimeout(() => {
          localStorage.removeItem('user')
          window.location.href = '/'
        }, 1000)
      }
    })
  }

  onResize = () => {
    let loginButton = document.querySelector('.loginButton')
    loginButton.classList.remove('transition')
  }

  handlePhoneTitle = event => {
    event.currentTarget.classList.toggle('active')
  }

  componentDidMount() {
    // console.log(this.props.cartToOrder)
    let pic = JSON.parse(localStorage.getItem('user'))
    if (pic !== null) {
      this.queryMember()
    }

    // 品書通知的東西
    // load()
    // var notification;
    // function load() {
    //     if (Notification.permission === "granted") {
    //         //console.log("允許");
    //         notification = new Notification("品書通知", {
    //             body: "Notification Demo...",
    //             icon: require('./images/P_logo.png')
    //         });
    //     } else if (Notification.permission === "default") {
    //         console.log("要求權限");
    //         getPermission(load);
    //     } else {
    //         console.log("拒絕");
    //     }
    //     console.log(notification);
    // }
    // function getPermission(cb) {
    //     Notification.requestPermission(cb);
    // }
  }

  //查詢會員資料重設圖片
  queryMember() {
    let number = JSON.parse(localStorage.getItem('user')).MR_number
    // console.log(number);

    fetch('http://localhost:5555/member', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        number: number,
      }),
    })
      .then(response => {
        if (!response) throw new Error(response.statusText)
        // console.log('3'+response);
        return response.json()
      })
      .then(data => {
        // console.log("test", data);
        let newPic = 'http://localhost:5555/images/member/' + data[0].MR_pic
        let nickname = data[0].MR_nickname

        this.setState({ loginImg: newPic, nickname, member: data[0] })
      })
  }

  // componentDidUpdate(prevProps) {
  //   // console.log('DID UPDATE')
  //   // console.log(this.props)
  // }
  // shouldComponentUpdate() {}

  handleCancel() {
    this.setState({
      visible: false,
    })
  }

  render() {
    // let phoneMemberStatus = 'none'
    // if (JSON.parse(localStorage.getItem('user')).MR_number !== '') phoneMemberStatus = 'block'
    // let phoneVisitorStatus = 'block'
    // if (JSON.parse(localStorage.getItem('user')).MR_number !== '') phoneVisitorStatus = 'none'
    let level = [
      '',
      '品書會員',
      '品書學徒',
      '品書專家',
      '品書大師',
      '品書至尊',
      '書評家',
    ]
    return (
      <>
        <Guide
          visible={this.state.visible}
          onCancel={this.handleCancel.bind(this)}
          lan="zh"
        >
          <img
            src={require('./images/header.jpg')}
            className="img-fluid header-img"
            alt=""
          />

          <Router>
            <Link
              to="/"
              className="myHeaderLogo position-absolute pointer"
            ></Link>

            <div className="mwt_border"></div>

            <div className="cartButton position-absolute d-flex flex-column justify-content-center align-items-center pointer">
              <Link to="/cart" className="titleZh-white">
                購物車
              </Link>
              <span className="titleEn">CART</span>
            </div>

            {JSON.parse(localStorage.getItem('user')) === null ? (
              <>
                <div
                  className="loginButton position-absolute d-flex flex-column justify-content-center align-items-center pointer"
                  onClick={this.clickLogin}
                >
                  <span className="titleZh-white">登入</span>
                  <span className="titleEn">LOGIN</span>
                </div>
              </>
            ) : (
              <>
                <div
                  className="loginButton position-absolute d-flex flex-column justify-content-center align-items-center pointer"
                  onClick={this.handleLoginButton}
                >
                  <span className="titleZh-white">{this.state.nickname}</span>
                  <span className="titleEn">
                    {
                      level[
                        JSON.parse(localStorage.getItem('user')).MR_personLevel
                      ]
                    }
                  </span>
                  <span
                    className="loginImg"
                    style={{
                      backgroundImage: `url(${this.state.loginImg})`,
                    }}
                  ></span>
                  <Link
                    to="/member"
                    className="loginText"
                    onClick={this.handleStopPropagation}
                  >
                    會員資料
                  </Link>
                  <Link
                    to="/game"
                    className="loginText"
                    onClick={this.handleGoToGame}
                    data-step="1"
                    data-tip="第一步驟"
                  >
                    二手書配對
                  </Link>
                  <Link
                    to="/chat"
                    className="loginText"
                    onClick={this.handleChatGuide}
                  >
                    聊天室
                  </Link>
                  <div className="loginText" onClick={this.handleLogout}>
                    登出
                  </div>
                </div>
              </>
            )}
            {!(this.props.loginOrNot || this.state.login) ? (
              <>
                <section className="d-flex justify-content-center titleButton">
                  <Link
                    to="/reviewer"
                    className="myHeaderTextCenter mx-4 pointer"
                  >
                    <span className="titleZh">書評家</span>
                    <br />
                    <span className="titleEn">REVIEWER</span>
                  </Link>
                  <Link to="/books" className="myHeaderTextCenter mx-4 pointer">
                    <span className="titleZh">書籍商城</span>
                    <br />
                    <span className="titleEn">BOOKS</span>
                  </Link>
                  <Link
                    to="/activities"
                    className="myHeaderTextCenter mx-4 pointer"
                  >
                    <span className="titleZh">品書活動</span>
                    <br />
                    <span className="titleEn">ACTIVITIES</span>
                  </Link>
                  <Link
                    to="/reviews"
                    className="myHeaderTextCenter mx-4 pointer"
                  >
                    <span className="titleZh">品書書評</span>
                    <br />
                    <span className="titleEn">REVIEWS</span>
                  </Link>
                  <Link to="/forum" className="myHeaderTextCenter mx-4 pointer">
                    <span className="titleZh">品書討論區</span>
                    <br />
                    <span className="titleEn">FORUM</span>
                  </Link>
                </section>
              </>
            ) : (
              <>
                <section className="d-flex justify-content-center titleButton">
                  <Link
                    to="/reviewer"
                    className="myHeaderTextCenter mx-4 pointer"
                  >
                    <span className="titleZh">書評家</span>
                    <br />
                    <span className="titleEn">REVIEWER</span>
                  </Link>
                  <Link to="/books" className="myHeaderTextCenter mx-4 pointer">
                    <span className="titleZh">書籍商城</span>
                    <br />
                    <span className="titleEn">BOOKS</span>
                  </Link>
                  <Link
                    to="/activities"
                    className="myHeaderTextCenter mx-4 pointer"
                  >
                    <span className="titleZh">品書活動</span>
                    <br />
                    <span className="titleEn">ACTIVITIES</span>
                  </Link>
                  <Link
                    to="/reviews"
                    className="myHeaderTextCenter mx-4 pointer"
                  >
                    <span className="titleZh">品書書評</span>
                    <br />
                    <span className="titleEn">REVIEWS</span>
                  </Link>
                  <Link to="/forum" className="myHeaderTextCenter mx-4 pointer">
                    <span className="titleZh">品書討論區</span>
                    <br />
                    <span className="titleEn">FORUM</span>
                  </Link>
                </section>
                <Login />
              </>
            )}

            <div className="phoneTitleHide">
              <div className="myHeaderMenu" onClick={this.handlePhoneTitle}>
                <div className="bar bar1"></div>
                <div className="bar bar2"></div>
                <div className="bar bar3"></div>
                <ul>
                  {JSON.parse(localStorage.getItem('user')) === null ? (
                    <>
                      <li>
                        <div className="myHeaderA" onClick={this.clickLogin}>
                          登入
                        </div>
                      </li>
                      <li>
                        <Link to="/cart" className="myHeaderA">
                          購物車
                        </Link>
                      </li>
                      <li>
                        <Link to="/reviewer" className="myHeaderA">
                          書評家
                        </Link>
                      </li>
                      <li>
                        <Link to="/books" className="myHeaderA">
                          書籍商城
                        </Link>
                      </li>
                      <li>
                        <Link to="/activities" className="myHeaderA">
                          品書活動
                        </Link>
                      </li>
                      <li>
                        <Link to="/reviews" className="myHeaderA">
                          品書書評
                        </Link>
                      </li>
                      <li>
                        <Link to="/forum" className="myHeaderA">
                          品書討論區
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link to="/member" className="myHeaderA">
                          {JSON.parse(localStorage.getItem('user')).MR_name}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/game"
                          className="myHeaderA"
                          onClick={this.handleGoToGame}
                        >
                          二手書配對
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/chat"
                          className="myHeaderA"
                          onClick={this.handleChatGuide}
                        >
                          聊天室
                        </Link>
                      </li>
                      <li>
                        <Link to="/cart" className="myHeaderA">
                          購物車
                        </Link>
                      </li>
                      <li>
                        <Link to="/reviewer" className="myHeaderA">
                          書評家
                        </Link>
                      </li>
                      <li>
                        <Link to="/books" className="myHeaderA">
                          書籍商城
                        </Link>
                      </li>
                      <li>
                        <Link to="/activities" className="myHeaderA">
                          品書活動
                        </Link>
                      </li>
                      <li>
                        <Link to="/reviews" className="myHeaderA">
                          品書書評
                        </Link>
                      </li>
                      <li>
                        <Link to="/forum" className="myHeaderA">
                          品書討論區
                        </Link>
                      </li>
                      <li>
                        <div className="myHeaderA" onClick={this.handleLogout}>
                          登出
                        </div>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/reviewer" component={Reviewer} />
              <Route
                exact
                path="/reviewer/reviewerBooks/:sid?"
                component={ReviewerBooks}
              />
              <Route
                exact
                path="/reviewer/reviewerBooks/reviewerBlog/ReviewerBlogEdit/:sid?"
                component={ReviewerBlogEdit}
              />

              <Route path="/books" component={Books} />

              <Route path="/activities" component={Activities} />
              <Route exact path="/reviews" component={Reviews} />

              <Route exact path="/book_reviews/:sid" component={BookReviews} />

              <Route
                exact
                path="/forum/post/:category/:MR_number"
                component={PostArticle}
              />
              <Route path="/forum" component={Forum} />

              {/* <Route exact path="/login" component={()=><Login loginSuccess={(memberData)=>{ this.loginSuccess(memberData) }}/>} /> */}
              <Route exact path="/" component={Login} />
              <Route path="/member" component={Member} />
              <Route exact path="/game" component={Game} />
              <Route exact path="/chat" component={Chat} />
              <Route exact path="/cart" component={Cart} />
              <Route path="/ResetPWD/:id" component={ResetPWD} />
              <Route exact component={NoPage} />
            </Switch>
          </Router>

          <ReactResizeDetector
            handleWidth
            handleHeight
            onResize={this.onResize}
          />
        </Guide>
      </>
    )
  }
}

// 綁定props.todos <=> store.todos
const mapStateToProps = store => ({
  loginOrNot: store.letMeLogin.loginOrNot,
  cartToOrder: store.cartToOrder,
})

// redux(state)綁定到此元件的props、dispatch方法自動綁定到此元件的props
export default connect(mapStateToProps)(Header)
