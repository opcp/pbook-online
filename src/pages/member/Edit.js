import React from 'react'
import './lukeStyle.scss'
import swal from '@sweetalert/with-react'
import { withRouter } from 'react-router-dom'

class Edit extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      number: '',
      nickname: '',
      birthday: '',
      mobile: '',
      address: '',
      member: {},
      selectedFile: null,
    }
  }

  componentDidMount() {
    this.queryMember()
  }

  queryMember = () => {
    let number = JSON.parse(localStorage.getItem('user')).MR_number
    fetch('http://localhost:5555/member', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // credentials: 'include',
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
        // console.log("test", JSON.stringify(data));
        if (
          data[0].MR_birthday !== null &&
          data[0].MR_mobile !== null &&
          data[0].MR_address !== null
        ) {
          let bdy = data[0].MR_birthday
          let birthday = bdy.slice(0, 10)
          this.setState({
            name: data[0].MR_name,
            email: data[0].MR_email,
            number: data[0].MR_number,
            nickname: data[0].MR_nickname,
            birthday: birthday,
            mobile: data[0].MR_mobile,
            address: data[0].MR_address,
            member: data[0],
          })
          return
        }

        this.setState({
          name: data[0].MR_name,
          email: data[0].MR_email,
          number: data[0].MR_number,
          nickname: data[0].MR_nickname,
          member: data[0],
        })
      })
  }

  success = (status, message) => {
    swal({
      title: status,
      text: message,
      icon: 'success',
      button: 'OK',
    }).then(title => {
      if (title === '修改成功') {
        swal('您已經成功做了修改!', {
          icon: 'success',
        })
      }
      setTimeout(() => {
        window.location = '/member'
      }, 1000)
    })
  }

  fail = (status, message) => {
    swal({
      title: status,
      text: message,
      icon: 'error',
      button: 'OK',
    })
  }

  //照片上傳，可換照片
  onChangeHandler = e => {
    let fileField = document.querySelector("input[type='file']")
    // let figure = document.querySelector('figure')
    // figure.classList.remove('backgroundImage')
    let uploadImg = document.querySelector('.uploadImg')
    var file = fileField.files[0]
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function(e) {
      let oldImages = document.querySelector('.brAvatarImg')
      let image = document.createElement('img')
      if(!oldImages){
        image.setAttribute('src', e.target.result)
      }else{
        oldImages.removeAttribute('src')
        oldImages.setAttribute('src', e.target.result)
      }
      // let image = document.createElement('img')
      // image.setAttribute('src', e.target.result)
      // image.classList.add('imgBorder')
      image.classList.add('brAvatarImg')
      uploadImg.append(image)
    }

    this.setState({
      selectedFile: e.target.files[0],
    })
  }

  handleChange = e => {
    const name = e.target.name
    const obj = {}
    obj[name] = e.target.value
    this.setState(obj)
  }

  handleEdit = () => {
    let number = JSON.parse(localStorage.getItem('user')).MR_number
    const formData = new FormData()
    let fileField = document.querySelector("input[type='file']")
    formData.append('avatar', fileField.files[0])
    // console.log(formData)
    let imgFile = ''
    fetch('http://localhost:5555/member/upload', {
      method: 'POST',
      // credentials: 'include',
      body: formData,
    })
      .then(res => {
        // console.log('res:', res)
        return res.json()
      })
      .then(img => {
        // console.log("imgFile", img)
        if (img.filename == '') {
          imgFile = '品書印章.png'
        } else {
          imgFile = img.filename
        }
        // console.log(1111);

        fetch('http://localhost:5555/member/edit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.state.name,
            email: this.state.email,
            number: number,
            nickname: this.state.nickname,
            birthday: this.state.birthday,
            mobile: this.state.mobile,
            address: this.state.address,
            filename: imgFile,
          }),
        })
          .then(response => {
            if (!response) throw new Error(response.statusText)
            return response.json()
          })
          .then(data => {
            // console.log('data', JSON.stringify(data))
            let status = data.status
            let message = data.message
            if (status === '修改成功') {
              this.success(status, message)
            }
            if (status === '修改失敗') {
              this.fail(status, message)
            }
          })
      })
  }

  render() {
    let member = this.state.member
    // console.log("member", member);

    let newPic = 'http://localhost:5555/images/member/' + member.MR_pic
    // console.log("newPic",newPic);
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
        <div className="editWrap">
          <div className=" wrap">
            <div className="MB_title">會員資料修改</div>
            <div className="d-flex">
              <div className="list">
                <div className="d-flex item">
                  <h4>帳號 : </h4>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="d-flex item">
                  <h4>姓名 : </h4>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="d-flex item">
                  <h4>暱稱 : </h4>
                  <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    value={this.state.nickname}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="d-flex item">
                  <h4>生日 : </h4>
                  <input
                    type="text"
                    id="birthday"
                    name="birthday"
                    value={this.state.birthday}
                    onChange={this.handleChange}
                  />{' '}
                </div>
                <div className="d-flex item">
                  <h4>手機 : </h4>
                  <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    value={this.state.mobile && this.state.mobile}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="d-flex item">
                  <h4>地址 : </h4>
                  <textarea
                    name="address"
                    id=""
                    cols="30"
                    rows="5"
                    style={{
                      width: '300px',
                      minHeight: '50px',
                      resize: 'none',
                    }}
                    value={this.state.address}
                    onChange={this.handleChange}
                  ></textarea>
                </div>
              </div>
              <div className="list-r">
                <div className="itemTitle">
                  <h3>會員編號 :</h3>
                  <h3>{this.state.number}</h3>
                </div>
                <div className="itemTitle">
                  <h3>會員等級 :</h3>
                  <h3>{level[member.MR_personLevel]}</h3>
                </div>
                <div className="item">
                  <figure
                    style={{
                      backgroundImage: `url(${newPic})`,
                    }}
                  >
                    <div className="uploadImg"></div>
                  </figure>
                  <div className="chang_btn">
                    <input
                      className="btn btn-warning my-2 my-sm-0"
                      type="file"
                      name="file"
                      onChange={this.onChangeHandler}
                      style={{ width: '250px' }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex button-group">
              <div>
                <button
                  style={{ width: '130px' }}
                  type="submit"
                  className="btn btn-warning"
                  id="submit_btn"
                  onClick={() => {
                    window.location.href = '/'
                  }}
                >
                  &nbsp;回&nbsp;首&nbsp;頁&nbsp;
                </button>
              </div>
              <div>
                <button
                  style={{ width: '130px' }}
                  type="submit"
                  className="btn btn-warning"
                  id="submit_btn"
                  onClick={this.handleEdit}
                >
                  &nbsp;確&nbsp;認&nbsp;修&nbsp;改&nbsp;
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(Edit)
