import React from 'react'
import './login.css'
import '../member/lukeStyle.scss'
import FbLogin from './FbLogin'
import swal from '@sweetalert/with-react'
import Carousel from '../../components/indexComponents/carousel/Carousel'
import Theme from '../../components/indexComponents/theme/Theme'
import Storyteller from '../../components/indexComponents/storyteller/Storyteller'
import CaptchaMini from 'captcha-mini'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter,
} from 'react-router-dom'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      nickname: '',
      email: '',
      password: '',
      password2: '',
      captcha: '',
      error: '',
      memberData: {},
      login: false,
      selectedFile: null,
      captcha1: '',
      captcha2: '',
      forgetPwd: false,
      err_email: '信箱: 合理的EMAIL格式',
      err_username: '使用者姓名: 至少2個字元',
      err_password: '至少有一個數字、一個小寫英文字母、密碼長度在 4~8 之間',
      err_captcha: '請輸入圖上的字',
      picture: '請選擇個人頭像',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.captcha1 = this.captcha1.bind(this)
    this.sendPWD = this.sendPWD.bind(this)
    // this.onClickhandler = this.onClickhandler.bind(this)
    
  }

  componentDidMount() {
    this.captcha1()
  }

  clearStyle = () => {
    let email = document.querySelector('#email')
    email.classList.remove('err_border')
    let name = document.querySelector('#name')
    name.classList.remove('err_border')
    let password = document.querySelector('#password')
    let password2 = document.querySelector('#password2')
    password.classList.remove('err_border')
    password2.classList.remove('err_border')
    let captcha2 = document.querySelector('#captcha2')
    captcha2.classList.remove('err_border')
    let err_email = document.querySelector('#err_email')
    err_email.classList.remove('err_text')
    let err_username = document.querySelector('#err_username')
    err_username.classList.remove('err_text')
    let err_password = document.querySelector('#err_password')
    err_password.classList.remove('err_text')

    this.setState({
      name: '',
      email: '',
      password: '',
      password2: '',
      captcha2: '',
      err_email: '信箱: 合理的EMAIL格式',
      err_username: '使用者名稱: 至少3個字元',
      err_password: '至少有一個數字、一個小寫英文字母、密碼長度在 4~8 之間',
      err_captcha: '',
    })
  }

  success(status, message) {
    swal({
      title: status,
      text: message,
      icon: 'success',
      button: 'OK',
    }).then(title => {
      if (title === '登入成功') {
        swal('您已經成功登入!', {
          icon: 'success',
        })
      } else if (title === '註冊成功') {
        swal('您已經成功註冊!', {
          icon: 'success',
        })
      }
    })
  }

  fail(status, message) {
    swal({
      title: status,
      text: message,
      icon: 'error',
      button: 'OK',
    })
  }

  //驗證碼
  captcha1() {
    let captcha1 = new CaptchaMini({
      lineWidth: 1,   //线条宽度
      lineNum: 0,       //线条数量
      dotR: 2,          //点的半径
      dotNum: 0,       //点的数量
      preGroundColor: [10, 80],    //前景色区间
      backGroundColor: [150, 250], //背景色区间
      fontSize: 28,           //字体大小
      fontFamily: ['Georgia', '微软雅黑', 'Helvetica', 'Arial'],  //字体类型
      fontStyle: 'fill',      //字体绘制方法，有fill和stroke
      content: 'abcdefghijklmnopqrstuvwxyz123456789',  //验证码内容
      length: 4    //验证码长度
  })
    captcha1.draw(document.querySelector('#captcha1'), r => {
      // console.log(r, '验证码1');
      this.setState({ captcha1: r })
    })
  }

  //輸入轉值
  handleChange(e) {
    //解構賦值
    const { name, value } = e.target
    this.setState({ [name]: value })
    // const name = e.target.name
    // const obj = {};
    // obj[name] = e.target.value;
    // this.setState(obj, ()=>{
    //   // console.log(this.state)
    // });
  }

  sendPWD() {
    let email = this.state.email

    fetch('http://localhost:5555/member/sendPwd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        let status = data.status
        let message = data.message
        console.log(status, message)
        if (data.status === '傳送成功') {
          this.success(status, message)
          setTimeout(() => {
            window.location.href = '/'
          }, 1000)
        } else {
          this.fail(status, message)
        }
      })

    // this.props.setEmail(email)
  }

  //判斷姓名欄位字數
  checkName(name) {
    const re = /^\S{3,}/
    const result = re.test(name)
    return result
  }

  //判斷email格式
  checkEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const result = re.test(email)
    return result
  }

  //判斷密碼格式
  checkPassword(password, password2) {
    const re = /^(?=.*\d)(?=.*[a-z]).{4,8}$/
    // console.log((password === password2) , re.test(password, password2));
    const result = password === password2 && re.test(password, password2)
    return result
  }

  //照片上傳，可換照片
  onChangeHandler(e) {
      
      let fileField = document.querySelector("input[type='file']")
      let uploadImg = document.querySelector('.uploadImg')
      var file = fileField.files[0];
      var reader = new FileReader;
      reader.readAsDataURL(file);
        reader.onload = function(e) {
          let oldImages = document.querySelector('.imgBorder')
          let image = document.createElement('img')
          if(!oldImages){
            image.setAttribute('src', e.target.result) 
          }else{
            oldImages.removeAttribute('src')
            oldImages.setAttribute('src', e.target.result)
          }
          image.classList.add('imgBorder')
          image.classList.add('brAvatarImg')
          uploadImg.append(image)

          
      }
  
    
    this.setState({
      selectedFile: e.target.files[0],
    })
  }

  // onClickhandler(){
  //   const formData = new FormData()
  //   let fileField = document.querySelector("input[type='file']")
  //   // formData.append('username', 'abc')
  //   formData.append('avatar', fileField.files[0])
  //   // const formData = new FormData()
  //   // data.appen2d('file', this.state.selectedFile)

  //   fetch('http://localhost:5555/member/upload',{
  //     method: 'POST',
  //     credentials: 'include',
  //     body: formData
  //   })
  //   .then(res =>{
  //     console.log("res:", res);

  //     return res.json()
  //   })
  //   .then(img =>{
  //     console.log(img);

  //   })
  // }

  //登入
  handleLogin(e) {
    fetch('http://localhost:5555/member/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then(response => {
        if (!response) throw new Error(response.statusText)
        // console.log('3'+response);
        return response.json()
      })
      .then(data => {
        console.log(data)
        console.log(data.info)
        let status = data.status
        let message = data.message
        if (status === '登入成功') {
          localStorage.setItem('user', JSON.stringify(data.info))
          this.success(status, message)
          this.setState({ login: !this.state.login })
          setTimeout(() => {
            window.location = window.location.href
          }, 1000)
          // console.log("1234", data.info);
          // await this.setState({memberData: data.info})
          // await this.props.loginSuccess(data.info)
        }
        if (status === '登入失敗') {
          console.log(status, message)
          this.fail(status, message)
        }
      })
      .catch(error => {
        let err = error
        this.fail(err)
      })
  }

  //註冊
  handleRegister(e) {
    let isPass = false
    let email = this.state.email
    let password = this.state.password
    let password2 = this.state.password2
    let name = this.state.name
    let nickname = this.state.nickname
    let captcha1 = this.state.captcha1
    let captcha2 = this.state.captcha2

    if (this.checkEmail(email) === false) {
      //驗證信箱錯誤時的訊息
      let email = document.querySelector('#email')
      let err_email = document.querySelector('#err_email')
      email.classList.add('err_border')
      err_email.classList.add('err_text')
      this.setState({ err_email: '信箱格式有誤' })
      // return
    }
    // console.log(1, isPass);

    if (this.checkName(name) === false) {
      //驗證名稱錯誤時的訊息
      let name = document.querySelector('#name')
      let err_username = document.querySelector('#err_username')
      name.classList.add('err_border')
      err_username.classList.add('err_text')
      this.setState({ err_username: '使用者姓名字太少' })
      //  return
    }
    //  console.log(2, isPass);
    if (this.checkPassword(password, password2) === false) {
      let password = document.querySelector('#password')
      let password2 = document.querySelector('#password2')
      let err_password = document.querySelector('#err_password')
      // password.type = (password.type === "text") ;
      // password2.type = (password2.type === "text") ;
      password.classList.add('err_border')
      password2.classList.add('err_border')
      err_password.classList.add('err_text')
      this.setState({ err_password: '密碼格式不正確或輸入錯誤' })
      // return
    }
    console.log(3, isPass);
    if (captcha1 !== captcha2) {
      let captcha2 = document.querySelector('#captcha2')
      let err_captcha = document.querySelector('#err_captcha')
      captcha2.classList.add('err_border')
      err_captcha.classList.add('err_text')
      this.setState({ err_captcha: '驗證碼有誤' })
      return
    } else {
      isPass = true
    }
    // this.setState({name: "字數太少囉",password: "格式或密碼有誤", password2: "請再重新輸入"})
    console.log("isPass",isPass);
    
    
    const formData = new FormData()
    let fileField = document.querySelector("input[type='file']")
    formData.append('avatar', fileField.files[0])
    console.log(4, isPass, formData);

    if (isPass) {
      let imgFile = ''
      //目前想說新增完圖片再塞入修改資料
      fetch('http://localhost:5555/member/upload', {
        method: 'POST',
        body: formData,
      })
        .then(res => {
          // console.log("res:", res);
          return res.json()
        })
        .then(img => {
          if (img.filename === '') {
            imgFile = '品書印章.png'
          } else {
            imgFile = img.filename
          }

          fetch('http://localhost:5555/member/register', {
            method: 'POST',
            credentials: 'include', //跨網域取得session資訊
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: this.state.name,
              nickname: this.state.nickname,
              email: this.state.email,
              password: this.state.password,
              filename: imgFile,
            }),
          })
            .then(response => {
              if (!response) throw new Error(response.statusText)
              // console.log('3'+response);

              return response.json()
            })
            .then(data => {
              let status = data.status
              let message = data.message
              console.log('註冊', data)
              if (data.status === '註冊成功') {
                this.success(status, message)
                // setTimeout(() => {
                //   window.location = window.location.href
                //  }, 1000)
              } else {
                this.fail(status, message)
              }
            })
            .catch(error => {
              console.log('error = ' + error)
            })
        })
    }
  }

  //翻頁效果
  flipSingUp = () => {
    let container_back = document.querySelector('.container_back')
    let container_front = document.querySelector('.container_front')
    container_back.classList.add('flip-to-right')
    container_front.classList.add('_opacity')
    container_front.classList.remove('_invisible')
  }
  flipSingIn = () => {
    let container_right = document.querySelector('.container_right')
    let container_front = document.querySelector('.container_front')
    let container_back = document.querySelector('.container_back')
    container_right.classList.add('flip-to-left')
    container_back.classList.remove('flip-to-right')
    container_front.classList.add('_invisible')
  }

  render() {
    // console.log(this.state.forgetPwd);
    // console.log(this.state.props)

    return (
      <>
        <div className="login_wrap">
          <div>
            <div className="container_login">
              <div className="container_back">
                <div className="login_singUp">
                  <img
                    src={require('./icon_MR_m.svg')}
                    alt=""
                    style={{ width: '60px' }}
                  />
                  <h2 style={{ paddingTop: '20px' }}>品書人註冊</h2>
                </div>
                <input
                  className="login_input"
                  name="email"
                  id="email"
                  type="text"
                  placeholder="電子郵件"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <small className="tip" id="err_email">
                  {this.state.err_email}
                </small>
                <div className="d-flex">
                <input
                  className="login_name"
                  type="text"
                  placeholder="使用者姓名"
                  name="name"
                  id="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <input
                  className="login_name"
                  type="text"
                  placeholder="使用者暱稱"
                  name="nickname"
                  id="nickname"
                  value={this.state.nickname}
                  onChange={this.handleChange}
                />
                </div>

                <small className="tip" id="err_username">
                  {this.state.err_username}
                </small>
                <input
                  className="login_input"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="密碼"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <small className="tip" id="err_password">
                  {this.state.err_password}
                </small>
                <input
                  className="login_input"
                  type="password"
                  placeholder="請再次確認密碼"
                  name="password2"
                  id="password2"
                  value={this.state.password2}
                  onChange={this.handleChange}
                />
                <input
                  className="login_input"
                  type="file"
                  name="file"
                  id="upload"
                  onChange={this.onChangeHandler}
                />
                <small className="tip">{this.state.picture}</small>
                {/* <button type="button" className="btn btn-success btn-block" onClick={this.onClickhandler}>Upload</button>  */}
                {/* <div className="serial"></div> */}
                <canvas
                  className="serial"
                  id="captcha1"
                  onClick={this.captcha1}
                ></canvas>
                <input
                  className="login_input"
                  type="text"
                  placeholder="輸入驗證碼"
                  name="captcha2"
                  id="captcha2"
                  value={this.state.captcha2}
                  onChange={this.handleChange}
                />
                <small className="tip" id="err_captcha">
                  {this.state.err_captcha}
                </small>
                <div className="btn-group">
                  <button
                    type="button"
                    className="singUp_btn"
                    onClick={this.handleRegister}
                  >
                    確認
                  </button>
                  <button
                    type="button"
                    className="singUp_btn"
                    onClick={this.clearStyle}
                  >
                    取消重填
                  </button>
                </div>
              </div>
              {this.state.forgetPwd === false ? (
                <div className="container_front">
                  <div className="login_title">
                    <img
                      src={require('./icon_MR_m.svg')}
                      alt=""
                      onClick={() => {
                        window.location.href = '/'
                      }}
                    />
                    <h2 className="h2_title" style={{ marginLeft: '20px' }}>
                      品書人登入
                    </h2>
                  </div>
                  <input
                    className="login_input"
                    placeholder="Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <input
                    className="login_input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  <button className="login_btn" onClick={this.handleLogin}>
                    登入
                  </button>
                  <a
                    className="forgetPassword"
                    onClick={() => {
                      this.setState({ forgetPwd: true })
                    }}
                  >
                    Forgot your password?
                  </a>
                  {/* <div className="social-container ">
                    <div className="title">快速登入</div> */}
                      {/* <Link to="/fbLogin">
                      <FbLogin className="facebook-login"/> */} 
                      {/* <div className="facebook-login">
                        <i class="fab fa-facebook-square" style={{width: '80px'}}></i>
                        <div className="social_title">Log in with Facebook</div>
                      </div> */}
                    {/* </Link> */}
                  {/* </div> */}
                </div>
              ) : (
                <div className="container_front">
                  <div className="resend_title">
                    <img
                      src={require('./icon_MR_m.svg')}
                      alt=""
                      style={{ width: '60px'}}
                      onClick={() => {
                        window.location.href = '/'
                      }}
                    />
                    <h2>品書人重設密碼</h2>
                  </div>
                  <input
                    className="login_input"
                    placeholder="Email"
                    name="email"
                    value={this.state.email}
                    style={{ margin: '10px 0px' }}
                    onChange={this.handleChange}
                  />
                  {/* <input className="login_input" type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/> */}
                  <button className="login_btn" onClick={this.sendPWD}>
                    寄送EMAIL
                  </button>
                </div>
              )}

              <div className="container_left _center">
                <img
                  src={require('./品書logo.png')}
                  alt=""
                  style={{ maxWidth: '120px', marginTop: '175px', cursor: 'pointer' }}
                  onClick={() => {
                    window.location = window.location.href
                  }}
                />
                <h4 style={{ margin: '80px' }}>
                  還沒有帳號就快來加入品書人行列
                </h4>
                <button className="login_btn" onClick={this.flipSingUp}>
                  品書人註冊
                </button>
              </div>

              <div className="container_right _center">
                <img
                  src={require('./品書logo.png')}
                  alt=""
                  style={{ width: '120px', marginTop: '200px', cursor: 'pointer' }}
                  
                  onClick={() => {
                    window.location = window.location.href
                  }}
                />
                <button
                  className="login_btn"
                  onClick={this.flipSingIn}
                  style={{ marginTop: '50px' }}
                >
                  品書人登入
                </button>
                <div className="uploadImg">
                 
                </div>

              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(Login)
