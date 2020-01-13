import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import swal from '@sweetalert/with-react'
import Login from '../login/Login'

class BR_ReviewerList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: JSON.parse(localStorage.getItem('user')) !== null,
      loginUI: false,
      followDid:false,
    }
  }

  componentDidMount() {
    axios
      .get('http://localhost:5555/reviewer/brReviewerList')
      .then(({ data: { rows: brData } }) => {
        this.setState({ brData })
      })
    }
    
    // 關閉登錄UI
  componentDidUpdate(prevProps, prevState) {
    if (this.state.loginUI) {
      document.getElementById('overlay').addEventListener('click', (event) => {
        this.setState({
          loginUI: false,
        })
      })
    }
  }

    // 登錄捷徑
    openedLoginUI=(loginUI)=>{
      this.setState({
        loginUI,
      })
    }
    // 取消收藏API-------------------------------------------------------------------------
  handleDelReviewer = () => {
    let inNumber = JSON.parse(localStorage.getItem('user')).MR_number
    if (inNumber){
      axios
      .post('http://localhost:5555/reviewer/brReviewerDel', {
        number: inNumber,
        number_reviewer: this.props.number,
      })
      .then(res => {
        if(res.data.status === 'success'){
          swal('取消收藏', '', 'success')
          this.setState({
            followDid:false
          })
          return res
        } else {
          swal('取消失敗', '', 'error')
          this.setState({
            followDid:true
          })
        }
      })
    }
  }

  // 收藏書評家API-------------------------------------------------------------------------
  handleFollowReviewer = () => {
    let inNumber = JSON.parse(localStorage.getItem('user')).MR_number
    if (inNumber){
      axios
      .post('http://localhost:5555/reviewer/brReviewerAdd', {
        number: inNumber,
        number_reviewer: this.props.number,
        
      })
      .then(res => {
        // this.state.refreshLikeBook()
        if(res.data.status === 'success'){
          swal('收藏成功','','success')
          this.setState({
            followDid:true
          })
        // console.log('收藏成功data',res)
        } 
        else {
          swal('已加入過收藏！','','warning')
          this.setState({
            followDid:true
          })
        }
      })
    }
  }
  render() {
    const { loginUI } = this.state
    const { followDid } = this.state
    console.log('loginUI',loginUI)
    console.log('followDid',followDid)
    // console.log(this.props)
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
        {/* 設定書評列表的 id={會員編號} {this.props.number} */}
        <section
          id={this.props.number}
          className="ReviewerListAllBox reviewerList br_bg">

        {/* 呼叫登錄UI */}
        
        {loginUI && <div className="inLoginUI"><div id="overlay" /><Login/></div>}

          <div className="d-flex">
            <div className="brAvatarAllBox borderLineR">
              <h5 className="h5_br">{this.props.title}</h5>
              <Link to={'/reviewer/reviewerBooks/' + this.props.sid}>
                <div className="brAvatarBox">
                  <img
                    className="brAvatarImg"
                    src={require(`./images/${this.props.img}`)}
                  />
                </div>
              </Link>
              <h5 className="h5_br">{this.props.br_name}</h5>

              <div className="brIconBox">
                <div className="AvatarInfo">{this.props.job}</div>
              </div>

              <Link
                to={'/reviewer/reviewerBooks/' + this.props.sid}
                className="brSeeBookBox d-flex justify-content-center borderLineTop"
              >
                <div className="brIconBox">
                  <img
                    className="brMark_img_noAni"
                    src={require('../reviewer_page/images/P_logo.png')}
                  />
                  <img
                    className="brMark_img_ani"
                    src={require('../reviewer_page/images/ani_LoadingPBook_min.gif')}
                  />
                </div>
                <div className="brReadBooks">看看書櫃</div>
              </Link>

              {/* 收藏作者----------------------------------------------------- */}
              {!this.state.isLogin ? (
                <>
                  {/* 沒登入狀態，呼叫登入UI */}
                <div onClick={()=> this.openedLoginUI(!loginUI)} className="brIconBox borderLineTop">
                  <img
                    className="brIconFollow"
                    src={require('../reviewer_page/images/icon_followLogin.png')}
                  />
                </div>
              </>
            ) : JSON.parse(localStorage.getItem('user')).MR_number !==
              this.props.number ? (
              <>
              {/* 達成收藏條件，也不是自己看自己書櫃的話---------------------------------------- */}
              {/* 添加動畫判斷 */}
                <div onClick={()=> this.handleFollowReviewer()} className="brIconBox borderLineTop">
                {/* 查看是否收藏過 */}
                {this.state.followDid ? (
                  <>
                  <img
                    className="brIconFollow_noAni"
                    // 已收藏過作者
                    src={require('../reviewer_page/images/icon_followDid.png')}
                  />
                  <img
                    className="brIconFollow_Did" onClick={()=> this.handleDelReviewer()}
                    // 已收藏過作者
                    src={require('../reviewer_page/images/icon_followNot.png')}
                  />
                  </>
                ):(
                  <>
                  <img
                    className="brIconFollow_noAni"
                    // 收藏作者
                    src={require('../reviewer_page/images/icon_follow.png')}
                  />
                  <img
                    className="brIconFollow_Ani"
                    // 收藏作者
                    src={require('../reviewer_page/images/like.svg')}
                  />
                  </>
                  )
                }
                  
                </div>
              </>
            ) : (
              <>
              {/* 如果自己看自己的話---------------------------------------- */}
                <Link to={'/reviewer/reviewerBooks/' + this.props.sid} className="brIconBox borderLineTop">
                  <img
                    className="brIconFollow"
                    // 無法收藏，變成看看書櫃
                    src={require('../reviewer_page/images/icon_followMy.png')}
                  />
                </Link>
              </>
            )}
              {/* 收藏作者 結束----------------------------------------------------- */}

              <div className="brIconBox borderLineTop">
                <a
                  className="brIconShare"
                  href={this.props.youtube}
                  target="black"
                >
                  <img
                    className="brMark_img"
                    src={require('../reviewer_page/images/icon_youtube.png')}
                  />
                </a>
                <a
                  className="brIconShare"
                  href={this.props.facebook}
                  target="black"
                >
                  <img
                    className="brMark_img"
                    src={require('../reviewer_page/images/icon_facebook.png')}
                  />
                </a>
                <a
                  className="brIconShare"
                  href={this.props.twitter}
                  target="black"
                >
                  <img
                    className="brMark_img"
                    src={require('../reviewer_page/images/icon_twitter.png')}
                  />
                </a>
              </div>
            </div>

            <div className="brInfoBox">
              <h5 className="h5_br">書評家簡介</h5>
              <div className="brInfoText">{this.props.intro}</div>
              <div className="fbBox">
                <div
                  className="fb-share-button"
                  data-href={this.props.tube}
                  data-layout="button_count"
                ></div>
              </div>
            </div>
          </div>
          <iframe
            className="brYouTubeRWD"
            width="50%"
            height="auto"
            src={this.props.tube}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </section>
        <div style={{ height: '60px' }}></div>
      </>
    )
  }
}

export default BR_ReviewerList
