import React from 'react'
import {
  ListGroup,
  Tab,
  Row,
  Col,
  OverlayTrigger,
  Popover,
  Tabs,
  Modal,
  Button,
} from 'react-bootstrap'
import './chat.css'

import axios from 'axios'
import moment from 'moment'
import io from 'socket.io-client'
import swal from '@sweetalert/with-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch,
  faComments,
  faCommentDots,
  faUpload,
  faSmile,
  faUndoAlt,
  faPenNib,
  faPlusCircle,
  faDownload,
} from '@fortawesome/free-solid-svg-icons'

var socket

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sticker: [
        'sticker(0).png',
        'sticker(1).png',
        'sticker(2).png',
        'sticker(3).png',
        'sticker(4).png',
        'sticker(5).png',
        'sticker(6).png',
        'sticker(7).png',
        'sticker(8).png',
        'sticker(9).png',
        'sticker(10).png',
        'sticker(11).png',
        'sticker(12).png',
        'sticker(13).png',
        'sticker(14).png',
      ],
      squareData: [],
      oldDataList: [],
      oldDataMessage: [],
      mySearch: '',
      people: 0,
      chosenSticker: '',
      key: 'chat',
      oldDataMemo: [],
      modalShow: false,
      modalData: {
        myFrom: '',
        myPic: '',
        content: '',
        created_at: '',
        sid: '',
      },
      memoValue: '',
      oldDataAlbum: [],
    }
    if (localStorage.getItem('user') !== null) {
      if (this.props.location.pathname === '/chat') {
        socket = io.connect('ws://localhost:5000/', {
          query: {
            MR_number: JSON.parse(localStorage.getItem('user')).MR_number,
            MR_name: JSON.parse(localStorage.getItem('user')).MR_name,
            MR_pic: JSON.parse(localStorage.getItem('user')).MR_pic,
          },
        })
      }
    }
    socket.on('SeverToClientMsg', this.onMsg)
    socket.on('SeverToClientDelete', this.onMsgDelete)
    socket.on('SeverToClientInsertMemo', this.onInsertMemo)
    socket.on('SeverToClientInsertAlbum', this.onInsertAlbum)
  }

  // 控制左邊的搜尋欄位
  handleSearch = () => {
    // 取得搜尋的字串
    var mySearch = this.mySearch.value
    this.setState({ mySearch: mySearch })
  }

  // 點擊左邊的私聊列表
  handleMessage = async () => {
    var firstOldDataMessage, firstOldDataMemo
    this.myDiv.classList.add('hide')
    console.log('點擊左邊那欄第一次拿chatMessage')
    await axios
      .post(`http://localhost:5555/nana_use/chatMessage2`, {
        memberId: JSON.parse(localStorage.getItem('user')).MR_number,
      })
      .then(res => {
        firstOldDataMessage = res.data
        return axios.post(`http://localhost:5555/nana_use/chatMemo`, {
          memberId: JSON.parse(localStorage.getItem('user')).MR_number,
        })
      })
      .then(res => {
        firstOldDataMemo = res.data
        return axios.post(`http://localhost:5555/nana_use/chatAlbum`, {
          memberId: JSON.parse(localStorage.getItem('user')).MR_number,
        })
      })
      .then(res => {
        this.setState({
          oldDataMessage: firstOldDataMessage,
          oldDataMemo: firstOldDataMemo,
          oldDataAlbum: res.data,
        })
      })
      .catch(error => {
        console.log('點擊左邊那欄第一次拿chatMessage有錯誤', error)
      })
  }

  onMsg = fullData => {
    if (fullData.square === false) {
      console.log('私人聊天')
      console.log('客戶端接收服務端發的消息onMsg fullData', fullData)
      console.log('我是誰?', JSON.parse(localStorage.getItem('user')).MR_number)
      console.log('客戶端接收服務端發的消息onMsg fullData.data?', fullData.data)

      if (
        fullData.data.myFrom ===
        JSON.parse(localStorage.getItem('user')).MR_number
      ) {
        this.setState({
          oldDataList: fullData.oldDataList,
          oldDataMessage: fullData.oldDataMessage,
        })
      } else if (
        fullData.data.myTo ===
        JSON.parse(localStorage.getItem('user')).MR_number
      ) {
        axios
          .post(`http://localhost:5555/nana_use/chatList2`, {
            memberId: JSON.parse(localStorage.getItem('user')).MR_number,
          })
          .then(res => {
            this.setState({
              oldDataList: res.data,
              oldDataMessage: fullData.oldDataMessage,
            })
          })
          .catch(error => {
            console.log('componentDidMount拿資料時有錯誤', error)
          })
      }
    } else {
      console.log('廣場聊天')
      console.log('客戶端接收服務端發的消息onMsg fullData', fullData)
      console.log('我是誰?', JSON.parse(localStorage.getItem('user')).MR_number)

      this.setState({ squareData: [fullData, ...this.state.squareData] })
    }
  }

  onMsgDelete = fullData => {
    console.log('客戶端接收服務端發的消息onMsgDelete fullData', fullData)
    console.log('我是誰?', JSON.parse(localStorage.getItem('user')).MR_number)
    console.log(
      '客戶端接收服務端發的消息onMsgDelete fullData.data?',
      fullData.data
    )

    if (
      fullData.data.myFrom ===
      JSON.parse(localStorage.getItem('user')).MR_number
    ) {
      this.setState({
        oldDataList: fullData.oldDataList,
        oldDataMessage: fullData.oldDataMessage,
      })
    } else if (
      fullData.data.myTo === JSON.parse(localStorage.getItem('user')).MR_number
    ) {
      axios
        .post(`http://localhost:5555/nana_use/chatList2`, {
          memberId: JSON.parse(localStorage.getItem('user')).MR_number,
        })
        .then(res => {
          this.setState({
            oldDataList: res.data,
            oldDataMessage: fullData.oldDataMessage,
          })
        })
        .catch(error => {
          console.log('componentDidMount拿資料時有錯誤', error)
        })
    }
  }

  onInsertMemo = data => {
    this.setState({ oldDataMemo: data })
  }

  onInsertAlbum = data => {
    this.setState({ oldDataAlbum: data })
  }

  // 下方的聊天input(滑鼠點擊)
  handleSubmit = () => {
    // 利用網址列取得chat_id
    var chat_id_index = window.location.href.indexOf('#') // console.log(chat_id_index,"26")
    var chat_id = window.location.href.slice(chat_id_index + 1)
    // 利用localStorage取得發文者(myFrom)
    var myFrom = JSON.parse(localStorage.getItem('user')).MR_number
    // 利用網址取得myTo
    var chat_id_array = chat_id.split('MR')
    var myFrom_array = myFrom.split('MR')

    var myTo = []
    for (var i = 1; i < chat_id_array.length; i++) {
      for (var k = 1; k < myFrom_array.length; k++) {
        if (chat_id_array[i] !== myFrom_array[k]) {
          myTo.push(chat_id_array[i])
        }
      }
    }
    console.log(myTo[0])

    // 取得對話文字
    var textInput = this.textInput.value
    // 判斷是否是在大廳發出的訊息
    var square = false
    if (window.location.href === 'http://localhost:3000/chat') {
      square = true
    }
    console.log('square', square)

    socket.emit(`clientToSeverMsg`, {
      square: square,
      chat_id: chat_id,
      myFrom: myFrom,
      myTo: 'MR' + myTo[0],
      content: textInput,
      myRead: 0,
      created_at: new Date(),
      myDelete: 0,
      myUpload: 0,
    })

    this.textInput.value = ''
  }

  // 下方的聊天input(鍵盤enter事件)
  handleSubmit2 = e => {
    if (e.key === 'Enter') {
      // 利用網址列取得chat_id
      var chat_id_index = window.location.href.indexOf('#') // console.log(chat_id_index,"26")
      var chat_id = window.location.href.slice(chat_id_index + 1)
      // 利用localStorage取得發文者(myFrom)
      var myFrom = JSON.parse(localStorage.getItem('user')).MR_number
      // 利用網址取得myTo
      var chat_id_array = chat_id.split('MR')
      var myFrom_array = myFrom.split('MR')

      var myTo = []
      for (var i = 1; i < chat_id_array.length; i++) {
        for (var k = 1; k < myFrom_array.length; k++) {
          if (chat_id_array[i] !== myFrom_array[k]) {
            myTo.push(chat_id_array[i])
          }
        }
      }
      console.log(myTo[0])

      // 取得對話文字
      var textInput = this.textInput.value
      // 判斷是否是在大廳發出的訊息
      var square = false
      if (window.location.href === 'http://localhost:3000/chat') {
        square = true
      }
      console.log('square', square)

      socket.emit('clientToSeverMsg', {
        square: square,
        chat_id: chat_id,
        myFrom: myFrom,
        myTo: 'MR' + myTo[0],
        content: textInput,
        myRead: 0,
        created_at: new Date(),
        myDelete: 0,
        myUpload: 0,
      })

      this.textInput.value = ''
    }
  }

  // 私聊的收回訊息
  handleMessageDelete = MessageSid => {
    console.log('handleMessageDelete MessageSid1', MessageSid)

    // 利用網址列取得chat_id
    var chat_id_index = window.location.href.indexOf('#') // console.log(chat_id_index,"26")
    var chat_id = window.location.href.slice(chat_id_index + 1)
    // 利用localStorage取得發文者(myFrom)
    var myFrom = JSON.parse(localStorage.getItem('user')).MR_number
    // 利用網址取得myTo
    var chat_id_array = chat_id.split('MR')
    var myFrom_array = myFrom.split('MR')

    var myTo = []
    for (var i = 1; i < chat_id_array.length; i++) {
      for (var k = 1; k < myFrom_array.length; k++) {
        if (chat_id_array[i] !== myFrom_array[k]) {
          myTo.push(chat_id_array[i])
        }
      }
    }
    console.log(myTo[0])

    swal({
      title: '您確定要收回嗎?',
      text: '一旦收回,將會沒辦法復原喔!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      buttons: ['取消', '確定'],
    }).then(willDelete => {
      if (willDelete) {
        swal('您的訊息已經被收回!', {
          icon: 'success',
        })
        socket.emit(`clientToSeverDelete`, {
          MessageSid: MessageSid,
          memberId: JSON.parse(localStorage.getItem('user')).MR_number,
          chat_id: chat_id,
          myFrom: myFrom,
          myTo: 'MR' + myTo[0],
        })
      }
    })
  }

  // 回到聊天廣場按鈕
  goBackToSquare = () => {
    window.location.href = 'http://localhost:3000/chat'
  }

  // 下方input的品書貼圖
  handleSticker = e => {
    let chosenSticker = e.target.getAttribute('data-sticker')
    console.log('handleSticker chosenSticker', chosenSticker)

    // 利用網址列取得chat_id
    var chat_id_index = window.location.href.indexOf('#') // console.log(chat_id_index,"26")
    var chat_id = window.location.href.slice(chat_id_index + 1)
    // 利用localStorage取得發文者(myFrom)
    var myFrom = JSON.parse(localStorage.getItem('user')).MR_number
    // 利用網址取得myTo
    var chat_id_array = chat_id.split('MR')
    var myFrom_array = myFrom.split('MR')

    var myTo = []
    for (var i = 1; i < chat_id_array.length; i++) {
      for (var k = 1; k < myFrom_array.length; k++) {
        if (chat_id_array[i] !== myFrom_array[k]) {
          myTo.push(chat_id_array[i])
        }
      }
    }
    console.log(myTo[0])

    // 判斷是否是在大廳發出的訊息
    var square = false
    if (window.location.href === 'http://localhost:3000/chat') {
      square = true
    }
    console.log('square', square)

    socket.emit(`clientToSeverMsg`, {
      square: square,
      chat_id: chat_id,
      myFrom: myFrom,
      myTo: 'MR' + myTo[0],
      content: `<img class="stickerImg" src="http://localhost:5555/images/chatSticker/${chosenSticker}" alt="Avatar"/>`,
      myRead: 0,
      created_at: new Date(),
      myDelete: 0,
      myUpload: 0,
    })
    let triggerClick = document.getElementById('triggerClick').click()
    console.log('triggerClick', triggerClick)
  }

  // 下方input的圖片上傳
  handleUpload = async e => {
    var uploadImg
    const formData = new FormData()

    for (var n = 0; n < e.target.files.length; n++) {
      formData.append('avatar', e.target.files[n])
      console.log('formData', formData)
    }

    await fetch('http://localhost:5555/nana_use/imgFiles', {
      method: 'POST',
      body: formData,
    })
      .then(res => {
        return res.json()
      })
      .then(imgs => {
        console.log('imgs.files', imgs.pictures)
        this.setState({ uploadImg: imgs.pictures })
        uploadImg = imgs.pictures
      })
      .catch(err => {
        console.log('上傳檔案錯誤', err)
      })

    console.log('測試uploadImg', uploadImg)

    // 利用網址列取得chat_id
    var chat_id_index = window.location.href.indexOf('#') // console.log(chat_id_index,"26")
    var chat_id = window.location.href.slice(chat_id_index + 1)
    // 利用localStorage取得發文者(myFrom)
    var myFrom = JSON.parse(localStorage.getItem('user')).MR_number
    // 利用網址取得myTo
    var chat_id_array = chat_id.split('MR')
    var myFrom_array = myFrom.split('MR')

    var myTo = []
    for (var i = 1; i < chat_id_array.length; i++) {
      for (var k = 1; k < myFrom_array.length; k++) {
        if (chat_id_array[i] !== myFrom_array[k]) {
          myTo.push(chat_id_array[i])
        }
      }
    }
    console.log(myTo[0])

    // 判斷是否是在大廳發出的訊息
    var square = false
    if (window.location.href === 'http://localhost:3000/chat') {
      square = true
    }
    console.log('square', square)

    socket.emit(`clientToSeverMsg`, {
      square: square,
      chat_id: chat_id,
      myFrom: myFrom,
      myTo: 'MR' + myTo[0],
      content: JSON.stringify(uploadImg),
      myRead: 0,
      created_at: new Date(),
      myDelete: 0,
      myUpload: 1,
    })
  }

  // 私聊選擇聊天室或記事本的tabs
  handleKey = key => {
    console.log(key)

    switch (key) {
      case 'chat':
        this.messageSearch.classList.remove('hide')
        this.messageMemo.classList.remove('show-inline-flex')
        this.setState({ key: 'chat' })
        break
      case 'memo':
        this.messageSearch.classList.add('hide')
        this.messageMemo.classList.add('show-inline-flex')
        this.setState({ key: 'memo' })
        break
      case 'memoInsert':
        this.messageSearch.classList.add('hide')
        this.messageMemo.classList.add('show-inline-flex')
        this.setState({ key: 'memoInsert' })
        break
      case 'album':
        this.messageSearch.classList.add('hide')
        this.messageMemo.classList.add('show-inline-flex')
        this.setState({ key: 'album' })
        break
      default:
        break
    }
  }

  // 私聊記事本將TEXTAREA內容存到this.state.memoValue
  handleChangeMemo = event => {
    this.setState({ memoValue: event.target.value })
  }

  //私聊記事本新增送出按鈕
  handleSubmitMemo = () => {
    // 取得貼文內容
    var memoValue = this.state.memoValue
    // 利用網址列取得chat_id
    var chat_id_index = window.location.href.indexOf('#') // console.log(chat_id_index,"26")
    var chat_id = window.location.href.slice(chat_id_index + 1)
    // 利用localStorage取得發文者(myFrom)
    var myFrom = JSON.parse(localStorage.getItem('user')).MR_number
    // 利用網址取得myTo
    var chat_id_array = chat_id.split('MR')
    var myFrom_array = myFrom.split('MR')

    var myTo = []
    for (var i = 1; i < chat_id_array.length; i++) {
      for (var k = 1; k < myFrom_array.length; k++) {
        if (chat_id_array[i] !== myFrom_array[k]) {
          myTo.push(chat_id_array[i])
        }
      }
    }
    console.log(myTo[0])
    swal({
      title: '您確定要送出嗎?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      buttons: ['取消', '確定'],
    }).then(willSubmit => {
      if (willSubmit) {
        swal('您已新增貼文至記事本!', {
          icon: 'success',
        })
        socket.emit(`clientToSeverInsertMemo`, {
          chat_id: chat_id,
          myFrom: myFrom,
          myTo: 'MR' + myTo[0],
          content: memoValue,
          created_at: new Date(),
          myDelete: 0,
        })
        this.setState({ memoValue: '', key: 'memo' })
      }
    })
  }

  //私聊記事本新增清空按鈕
  handleClickMemo = () => {
    this.setState({ memoValue: '' })
  }

  //私聊記事本修改送出按鈕
  handleSubmitMemoEdit = memoSid => {
    // 取得貼文內容
    var memoValue = this.state.memoValue
    console.log('memoSid', memoSid)

    swal({
      title: '您確定要修改嗎?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      buttons: ['取消', '確定'],
    }).then(willSubmitEdit => {
      if (willSubmitEdit) {
        swal('您已修改此筆貼文!', {
          icon: 'success',
        })
        socket.emit(`clientToSeverEditMemo`, {
          myFrom: JSON.parse(localStorage.getItem('user')).MR_number,
          memoSid: memoSid,
          content: memoValue,
        })
        let memoSidForm = document.querySelector('#memoSidForm' + memoSid)
        let memoSidSpan = document.querySelector('#memoSidSpan' + memoSid)
        console.log('memoSidForm', memoSidForm)
        console.log('memoSidSpan', memoSidSpan)
        memoSidForm.classList.toggle('hide')
        memoSidSpan.classList.toggle('hide')
        this.setState({ memoValue: '' })
      }
    })
  }

  //私聊的訊息添加至記事本
  handleMessageAddToMemo = content => {
    this.messageSearch.classList.add('hide')
    this.messageMemo.classList.add('show-inline-flex')
    this.setState({ memoValue: content, key: 'memoInsert' })
  }

  // 私聊記事本的光箱控制鈕
  handleModalShow = modalData => {
    console.log('modalData', modalData)
    this.setState({
      modalData: {
        myFrom: modalData.myFrom,
        myPic: modalData.myPic,
        content: modalData.content,
        created_at: modalData.created_at,
        sid: modalData.sid,
      },
      modalShow: true,
    })
  }
  handleModalHide = () => {
    this.setState({ modalShow: false })
  }

  // 私聊記事本刪除按鈕
  handleMemoDelete = event => {
    var memosid = event.target.getAttribute('data-memosid')
    console.log('memosid', memosid)

    swal({
      title: '您確定要刪除這則貼文嗎?',
      text: '一旦刪除,將會沒辦法復原喔!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      buttons: ['取消', '確定'],
    }).then(willDelete => {
      if (willDelete) {
        swal('您的訊息已經被刪除!', {
          icon: 'success',
        })
        socket.emit(`clientToSeverMemoDelete`, {
          memoSid: memosid,
          myFrom: JSON.parse(localStorage.getItem('user')).MR_number,
        })
      }
      this.setState({ modalShow: false })
    })
  }

  // 私聊記事本編輯按鈕
  handleMemoEdit = memoSid => {
    console.log('memoSid', memoSid)
    let memoSidForm = document.querySelector('#memoSidForm' + memoSid)
    let memoSidSpan = document.querySelector('#memoSidSpan' + memoSid)
    console.log('memoSidForm', memoSidForm)
    console.log('memoSidSpan', memoSidSpan)
    memoSidForm.classList.toggle('hide')
    memoSidSpan.classList.toggle('hide')
  }

  //私聊將訊息內的照片添加至相簿
  handleAddToAlbum = picName => {
    console.log(picName)

    // 利用網址列取得chat_id
    var chat_id_index = window.location.href.indexOf('#') // console.log(chat_id_index,"26")
    var chat_id = window.location.href.slice(chat_id_index + 1)
    // 利用localStorage取得發文者(myFrom)
    var myFrom = JSON.parse(localStorage.getItem('user')).MR_number
    // 利用網址取得myTo
    var chat_id_array = chat_id.split('MR')
    var myFrom_array = myFrom.split('MR')

    var myTo = []
    for (var i = 1; i < chat_id_array.length; i++) {
      for (var k = 1; k < myFrom_array.length; k++) {
        if (chat_id_array[i] !== myFrom_array[k]) {
          myTo.push(chat_id_array[i])
        }
      }
    }
    console.log(myTo[0])

    swal({
      title: '照片新增成功!',
      text: '去相簿看看吧~',
      icon: 'success',
      buttons: true,
      buttons: 'OK',
    }).then(() => {
      socket.emit(`clientToSeverInsertAlbum`, {
        chat_id: chat_id,
        myFrom: myFrom,
        myTo: 'MR' + myTo[0],
        content: picName,
        myDelete: 0,
      })
      this.setState({ key: 'album' })
    })
  }

  //私聊下載照片
  handleDownloadImg = picName => {
    var url = 'http://localhost:5555/images/chatFile/' + picName
    axios
      .get(url, {
        responseType: 'blob', //返回数据的格式指定为blob
      })
      .then(response => {
        console.log(response)
        let url = window.URL.createObjectURL(response.data) //创建一个新的 URL 对象
        console.log(url)
        //以下代码一句话解释，在页面上生成一个a标签并指定href为上面的url,然后模拟点击，以实现自动下载
        var a = document.createElement('a')
        document.body.appendChild(a)
        a.href = url
        a.download = picName
        a.click()
        window.URL.revokeObjectURL(url)
      })
      .catch(err => {
        console.log(`接口调用失败`)
        console.log(err)
      })
  }

  componentDidMount() {
    axios
      .post(`http://localhost:5555/nana_use/chatList2`, {
        memberId: JSON.parse(localStorage.getItem('user')).MR_number,
      })
      .then(res => {
        this.setState({
          oldDataList: res.data,
        })
      })
      .catch(error => {
        console.log('componentDidMount拿資料時有錯誤', error)
      })
    socket.on(`SeverToClientPeople`, data => {
      this.setState({ people: data })
      console.log('人數', data)
    })
    if (window.location.href !== 'http://localhost:3000/chat') {
      window.location.href = 'http://localhost:3000/chat'
      socket.disconnect()
    }
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
    socket.disconnect()
  }

  render() {
    console.log('render', this.state.oldDataList)
    console.log('render', this.state.squareData)
    console.log('render uploadImg', this.state.uploadImg)
    console.log('render oldDataMemo', this.state.oldDataMemo)
    console.log('render modalData', this.state.modalData)
    console.log('render memoValue', this.state.memoValue)
    console.log('render oldDataAlbum', this.state.oldDataAlbum)

    let myId = JSON.parse(localStorage.getItem('user')).MR_number
    let myPic = JSON.parse(localStorage.getItem('user')).MR_pic
    let myName = JSON.parse(localStorage.getItem('user')).MR_name
    var count = 0
    return (
      <>
        <div className="chatWrap">
          <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
            <Row>
              <Col sm={4}>
                <ListGroup>
                  <ListGroup.Item>
                    <form className="form-inline d-flex">
                      <input
                        className="form-control form-control-sm mr-3 w-75"
                        type="text"
                        placeholder="請輸入您要尋找的姓名..."
                        aria-label="Search"
                        ref={search => (this.mySearch = search)}
                        onChange={this.handleSearch}
                      />
                      <span
                        className="chatSearchBtn"
                        onClick={this.handleSearch}
                      >
                        <FontAwesomeIcon icon={faSearch} className="pointer" />
                      </span>
                    </form>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={this.goBackToSquare}
                      >
                        回到品書聊天廣場
                      </button>
                    </span>
                  </ListGroup.Item>

                  {this.state.oldDataList
                    .filter(
                      item =>
                        !this.state.mySearch ||
                        item.MR_name.indexOf(this.state.mySearch) !== -1
                    )
                    .map((value, index) => {
                      count++
                      return (
                        <ListGroup.Item
                          key={index}
                          action
                          href={'#' + value.chat_id}
                          onClick={this.handleMessage}
                        >
                          <div className="d-flex">
                            <div className="chatImgWrap">
                              <img
                                alt="左邊DATALIST大頭照"
                                className="chatImg"
                                src={
                                  'http://localhost:5555/images/member/' +
                                  value.MR_pic
                                }
                              ></img>
                            </div>
                            <div className="d-flex flex-column align-self-center chatTextWrap">
                              <span className="chatText">{value.MR_name}</span>
                              {value.myDelete === 0 ? (
                                value.myUpload === 1 ? (
                                  <span className="d-flex">
                                    {JSON.parse(value.content).map(
                                      (value, index) => {
                                        return (
                                          <span key={index}>
                                            <img
                                              className="dataUpLoadImg"
                                              src={
                                                'http://localhost:5555/images/chatFile/' +
                                                value
                                              }
                                              alt="Avatar"
                                            />
                                          </span>
                                        )
                                      }
                                    )}
                                  </span>
                                ) : (
                                  <span
                                    className="chatText"
                                    dangerouslySetInnerHTML={{
                                      __html: value.content,
                                    }}
                                  ></span>
                                )
                              ) : (
                                <span className="chatText">
                                  {value.myFrom === myId
                                    ? '您已收回訊息'
                                    : value.MR_name + '已收回訊息'}
                                </span>
                              )}
                            </div>
                            {value.total === 0 ? (
                              <div className="d-flex flex-column align-content-center position-absolute newest hide">
                                {value.total}
                              </div>
                            ) : (
                              <div className="d-flex flex-column align-content-center position-absolute newest">
                                {value.total}
                              </div>
                            )}
                          </div>
                        </ListGroup.Item>
                      )
                    })}
                  {count === 0 ? (
                    <ListGroup.Item>找不到符合的資料...</ListGroup.Item>
                  ) : (
                    ''
                  )}
                </ListGroup>
              </Col>
              <Col sm={8}>
                <Tab.Content>
                  <div className="myDefault" ref={div => (this.myDiv = div)}>
                    <div className="p-2">
                      <FontAwesomeIcon icon={faComments} className="mx-2" />
                      歡迎來到品書聊天廣場！目前有{this.state.people}
                      位會員正在線上。
                    </div>
                    <div className="chatMessageScroll">
                      {this.state.squareData.map((value, index) => {
                        return (
                          <div key={index}>
                            {value.myFrom !== myId ? (
                              <div className="myContainer">
                                {value.myTo
                                  .filter(
                                    item => item.MR_number === value.myFrom
                                  )
                                  .map((value2, index) => {
                                    return (
                                      <div key={index}>
                                        <img
                                          className="memberImg"
                                          src={
                                            'http://localhost:5555/images/member/' +
                                            value2.MR_pic
                                          }
                                          alt="Avatar"
                                        />
                                        {value.myUpload === 1 ? (
                                          <p className="d-flex">
                                            {value2.MR_name + '說：'}
                                            {JSON.parse(value.content).map(
                                              (value, index) => {
                                                return (
                                                  <p key={index}>
                                                    <img
                                                      className="upLoadImg"
                                                      src={
                                                        'http://localhost:5555/images/chatFile/' +
                                                        value
                                                      }
                                                      alt="Avatar"
                                                    />
                                                  </p>
                                                )
                                              }
                                            )}
                                          </p>
                                        ) : (
                                          <p
                                            className="d-flex"
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                value2.MR_name +
                                                ' 說：' +
                                                value.content,
                                            }}
                                          ></p>
                                        )}
                                        <span className="time-right">
                                          {moment(value.created_at).format(
                                            'YYYY-MM-DD HH:mm:ss'
                                          )}
                                        </span>
                                      </div>
                                    )
                                  })}
                              </div>
                            ) : (
                              <div className="myContainer darker">
                                <img
                                  src={
                                    'http://localhost:5555/images/member/' +
                                    myPic
                                  }
                                  alt="Avatar"
                                  className="memberImg right"
                                />
                                {value.myUpload === 1 ? (
                                  <p className="d-flex">
                                    {myName + '說：'}
                                    {JSON.parse(value.content).map(
                                      (value, index) => {
                                        return (
                                          <p key={index}>
                                            <img
                                              className="upLoadImg"
                                              src={
                                                'http://localhost:5555/images/chatFile/' +
                                                value
                                              }
                                              alt="Avatar"
                                            />
                                          </p>
                                        )
                                      }
                                    )}
                                  </p>
                                ) : (
                                  <p
                                    className="d-fle"
                                    dangerouslySetInnerHTML={{
                                      __html: myName + ' 說：' + value.content,
                                    }}
                                  ></p>
                                )}
                                <span className="time-left">
                                  {moment(value.created_at).format(
                                    'YYYY-MM-DD HH:mm:ss'
                                  )}
                                </span>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                    {/* <img
                      alt="背景圖"
                      src={require('./images/admin_bg.png')}
                    ></img> */}
                  </div>
                  {this.state.oldDataList.map((value, index) => {
                    return (
                      <Tab.Pane key={index} eventKey={'#' + value.chat_id}>
                        <div className="p-2">
                          <FontAwesomeIcon
                            icon={faCommentDots}
                            className="mx-2"
                          />
                          {'您正在和[' + value.MR_name + ']聊天'}
                        </div>
                        <Tabs
                          id="controlled-tab-example"
                          activeKey={this.state.key}
                          onSelect={key => this.handleKey(key)}
                        >
                          <Tab eventKey="chat" title="聊天室">
                            <div className="chatMessageScroll">
                              {/* eslint-disable-next-line array-callback-return */}
                              {this.state.oldDataMessage.map(
                                (value2, index2) => {
                                  if (value.chat_id === value2.chat_id) {
                                    return (
                                      <div key={index2}>
                                        {(() => {
                                          if (
                                            value2.myFrom !== myId &&
                                            value2.myDelete === 0 &&
                                            value2.myUpload === 0
                                          ) {
                                            return (
                                              <div className="myContainer">
                                                <img
                                                  className="memberImg"
                                                  src={
                                                    'http://localhost:5555/images/member/' +
                                                    value.MR_pic
                                                  }
                                                  alt="Avatar"
                                                />
                                                <p
                                                  className="d-flex"
                                                  dangerouslySetInnerHTML={{
                                                    __html: value2.content,
                                                  }}
                                                ></p>
                                                {value2.content.indexOf(
                                                  '<img'
                                                ) !== -1 ? (
                                                  ''
                                                ) : (
                                                  <span
                                                    className="messageAddMemo time-right"
                                                    onClick={() => {
                                                      this.handleMessageAddToMemo(
                                                        value2.content
                                                      )
                                                    }}
                                                  >
                                                    <FontAwesomeIcon
                                                      icon={faPenNib}
                                                    />
                                                    <span>添加至記事本</span>
                                                  </span>
                                                )}
                                                <span className="time-right">
                                                  {moment(
                                                    value2.created_at
                                                  ).format(
                                                    'YYYY-MM-DD HH:mm:ss'
                                                  )}
                                                </span>
                                              </div>
                                            )
                                          } else if (
                                            value2.myFrom === myId &&
                                            value2.myDelete === 0 &&
                                            value2.myUpload === 0
                                          ) {
                                            return (
                                              <div className="myContainer darker">
                                                <img
                                                  src={
                                                    'http://localhost:5555/images/member/' +
                                                    myPic
                                                  }
                                                  alt="Avatar"
                                                  className="memberImg right"
                                                />
                                                <p
                                                  className="d-flex"
                                                  dangerouslySetInnerHTML={{
                                                    __html: value2.content,
                                                  }}
                                                ></p>
                                                <span className="time-left">
                                                  {moment(
                                                    value2.created_at
                                                  ).format(
                                                    'YYYY-MM-DD HH:mm:ss'
                                                  )}
                                                </span>
                                                <span
                                                  className="messageDelete"
                                                  onClick={() =>
                                                    this.handleMessageDelete(
                                                      value2.sid
                                                    )
                                                  }
                                                >
                                                  <FontAwesomeIcon
                                                    icon={faUndoAlt}
                                                  />
                                                  <span>收回</span>
                                                </span>
                                                {value2.content.indexOf(
                                                  '<img'
                                                ) !== -1 ? (
                                                  ''
                                                ) : (
                                                  <span
                                                    className="messageAddMemo"
                                                    onClick={() => {
                                                      this.handleMessageAddToMemo(
                                                        value2.content
                                                      )
                                                    }}
                                                  >
                                                    <FontAwesomeIcon
                                                      icon={faPenNib}
                                                    />
                                                    <span>添加至記事本</span>
                                                  </span>
                                                )}
                                              </div>
                                            )
                                          } else if (
                                            value2.myFrom === myId &&
                                            value2.myDelete === 0 &&
                                            value2.myUpload === 1
                                          ) {
                                            return (
                                              <div className="myContainer darker">
                                                <img
                                                  src={
                                                    'http://localhost:5555/images/member/' +
                                                    myPic
                                                  }
                                                  alt="Avatar"
                                                  className="memberImg right"
                                                />
                                                <p className="d-flex">
                                                  {JSON.parse(
                                                    value2.content
                                                  ).map((value, index) => {
                                                    return (
                                                      <div key={index}>
                                                        <img
                                                          className="upLoadImg"
                                                          src={
                                                            'http://localhost:5555/images/chatFile/' +
                                                            value
                                                          }
                                                          alt="Avatar"
                                                        />
                                                        <div
                                                          className="addToAlbum"
                                                          onClick={() =>
                                                            this.handleAddToAlbum(
                                                              value
                                                            )
                                                          }
                                                        >
                                                          <FontAwesomeIcon
                                                            icon={faPlusCircle}
                                                            className="pointer"
                                                          />
                                                        </div>
                                                        <div
                                                          className="downloadImg"
                                                          onClick={() =>
                                                            this.handleDownloadImg(
                                                              value
                                                            )
                                                          }
                                                        >
                                                          <FontAwesomeIcon
                                                            icon={faDownload}
                                                            className="pointer"
                                                          />
                                                        </div>
                                                      </div>
                                                    )
                                                  })}
                                                </p>
                                                <span className="time-left">
                                                  {moment(
                                                    value2.created_at
                                                  ).format(
                                                    'YYYY-MM-DD HH:mm:ss'
                                                  )}
                                                </span>
                                                <span
                                                  className="messageDelete"
                                                  onClick={() =>
                                                    this.handleMessageDelete(
                                                      value2.sid
                                                    )
                                                  }
                                                >
                                                  <FontAwesomeIcon
                                                    icon={faUndoAlt}
                                                  />
                                                  <span>收回</span>
                                                </span>
                                              </div>
                                            )
                                          } else if (
                                            value2.myFrom !== myId &&
                                            value2.myDelete === 0 &&
                                            value2.myUpload === 1
                                          ) {
                                            return (
                                              <div className="myContainer">
                                                <img
                                                  className="memberImg"
                                                  src={
                                                    'http://localhost:5555/images/member/' +
                                                    value.MR_pic
                                                  }
                                                  alt="Avatar"
                                                />
                                                <p className="d-flex">
                                                  {JSON.parse(
                                                    value2.content
                                                  ).map((value, index) => {
                                                    return (
                                                      <div key={index}>
                                                        <img
                                                          className="upLoadImg"
                                                          src={
                                                            'http://localhost:5555/images/chatFile/' +
                                                            value
                                                          }
                                                          alt="Avatar"
                                                        />
                                                        <div
                                                          className="addToAlbum"
                                                          onClick={() =>
                                                            this.handleAddToAlbum(
                                                              value
                                                            )
                                                          }
                                                        >
                                                          <FontAwesomeIcon
                                                            icon={faPlusCircle}
                                                            className="pointer"
                                                          />
                                                        </div>
                                                        <div
                                                          className="downloadImg"
                                                          onClick={() =>
                                                            this.handleDownloadImg(
                                                              value
                                                            )
                                                          }
                                                        >
                                                          <FontAwesomeIcon
                                                            icon={faDownload}
                                                            className="pointer"
                                                          />
                                                        </div>
                                                      </div>
                                                    )
                                                  })}
                                                </p>
                                                <span className="time-right">
                                                  {moment(
                                                    value2.created_at
                                                  ).format(
                                                    'YYYY-MM-DD HH:mm:ss'
                                                  )}
                                                </span>
                                              </div>
                                            )
                                          } else if (
                                            value2.myFrom !== myId &&
                                            value2.myDelete === 1
                                          ) {
                                            return (
                                              <span className="chatDeleteMessage">
                                                {value.MR_name + '已收回訊息'}
                                              </span>
                                            )
                                          } else if (
                                            value2.myFrom === myId &&
                                            value2.myDelete === 1
                                          ) {
                                            return (
                                              <span className="chatDeleteMessage">
                                                您已收回訊息
                                              </span>
                                            )
                                          }
                                        })()}
                                      </div>
                                    )
                                  }
                                }
                              )}
                            </div>
                          </Tab>
                          <Tab eventKey="memo" title="記事本">
                            <div className="chatMessageScroll">
                              {this.state.oldDataMemo.map((value2, index2) => {
                                if (value.chat_id === value2.chat_id) {
                                  return (
                                    <div className="card my-3" key={index2}>
                                      <h5 className="card-header d-flex align-content-center justify-content-between">
                                        <div>
                                          <img
                                            className="memoImg"
                                            src={
                                              'http://localhost:5555/images/member/' +
                                              value2.MR_pic
                                            }
                                            alt="Avatar"
                                          />
                                          <span style={{ lineHeight: '60px' }}>
                                            {value2.MR_name}
                                          </span>
                                        </div>
                                        <div>
                                          <i
                                            className="far fa-edit memoIcon"
                                            onClick={() => {
                                              this.handleMemoEdit(value2.sid)
                                            }}
                                          ></i>
                                          <i
                                            className="far fa-trash-alt memoIcon"
                                            data-memosid={value2.sid}
                                            onClick={this.handleMemoDelete}
                                          ></i>
                                        </div>
                                      </h5>
                                      <div className="card-body">
                                        <div
                                          className="hide"
                                          id={'memoSidForm' + value2.sid}
                                        >
                                          <textarea
                                            className="insertMemoTextarea"
                                            placeholder={value2.content}
                                            value={this.state.memoValue}
                                            onChange={this.handleChangeMemo}
                                          />
                                          <div className="d-flex justify-content-center pt-3">
                                            <input
                                              type="button"
                                              value="送出"
                                              className="btn btn-outline-warning"
                                              onClick={() => {
                                                this.handleSubmitMemoEdit(
                                                  value2.sid
                                                )
                                              }}
                                            />
                                          </div>
                                        </div>

                                        <span
                                          className="block"
                                          id={'memoSidSpan' + value2.sid}
                                        >
                                          <p className="card-text memoText">
                                            {value2.content}
                                          </p>
                                          <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() =>
                                              this.handleModalShow({
                                                myFrom: value2.MR_name,
                                                myPic: value2.MR_pic,
                                                content: value2.content,
                                                created_at: value2.created_at,
                                                sid: value2.sid,
                                              })
                                            }
                                          >
                                            全部顯示
                                          </button>
                                        </span>
                                      </div>
                                      <div className="card-footer text-muted">
                                        {moment(value2.created_at).format(
                                          'YYYY-MM-DD HH:mm:ss'
                                        )}
                                      </div>
                                    </div>
                                  )
                                }
                              })}

                              <Modal
                                show={this.state.modalShow}
                                onHide={this.handleModalHide}
                                size="lg"
                                aria-labelledby="myModal"
                                centered
                              >
                                <Modal.Header>
                                  <Modal.Title
                                    id="myModal"
                                    className="d-flex align-content-center justify-content-between"
                                    style={{ width: '100%' }}
                                  >
                                    <div>
                                      <img
                                        className="memoImg"
                                        src={
                                          'http://localhost:5555/images/member/' +
                                          this.state.modalData.myPic
                                        }
                                        alt="Avatar"
                                      />
                                      <span style={{ lineHeight: '60px' }}>
                                        {this.state.modalData.myFrom}
                                      </span>
                                    </div>
                                    <div>
                                      <i
                                        className="far fa-trash-alt memoIcon"
                                        data-memosid={this.state.modalData.sid}
                                        onClick={this.handleMemoDelete}
                                      ></i>
                                    </div>
                                  </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  {this.state.modalData.content}
                                  <div>
                                    {'【此貼文發布於：' +
                                      moment(
                                        this.state.modalData.created_at
                                      ).format('YYYY-MM-DD HH:mm:ss') +
                                      '】'}
                                  </div>
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button onClick={this.handleModalHide}>
                                    關閉
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                            </div>
                          </Tab>
                          <Tab eventKey="memoInsert" title="新增貼文">
                            <div className="chatMessageScroll">
                              <div className="card my-3">
                                <div className="card-header">
                                  <div>
                                    <img
                                      className="memoImg"
                                      src={
                                        'http://localhost:5555/images/member/' +
                                        myPic
                                      }
                                      alt="Avatar"
                                    />
                                    <span style={{ lineHeight: '60px' }}>
                                      {myName}
                                    </span>
                                  </div>
                                </div>
                                <div className="card-body">
                                  <div>
                                    <textarea
                                      className="insertMemoTextarea"
                                      value={this.state.memoValue}
                                      onChange={this.handleChangeMemo}
                                    />
                                    <div className="d-flex justify-content-center pt-3">
                                      <input
                                        onClick={this.handleSubmitMemo}
                                        type="button"
                                        value="送出"
                                        className="btn btn-outline-danger mx-3"
                                      />
                                      <input
                                        onClick={this.handleClickMemo}
                                        type="button"
                                        value="清空"
                                        className="btn btn-outline-secondary"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Tab>
                          <Tab eventKey="album" title="相簿">
                            <div className="chatMessageScroll">
                              <div className="card-columns">
                                {this.state.oldDataAlbum.map((value, indx) => {
                                  return (
                                    <div className="card" key={index}>
                                      <img
                                        src={
                                          'http://localhost:5555/images/chatFile/' +
                                          value.content
                                        }
                                        className="card-img-top"
                                        alt="相簿照片"
                                      />
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          </Tab>
                        </Tabs>
                      </Tab.Pane>
                    )
                  })}
                  <div
                    className="input-group md-form form-sm form-2 my-3"
                    ref={messageSearch => (this.messageSearch = messageSearch)}
                  >
                    <input
                      className="form-control my-0 py-1 lime-border"
                      type="text"
                      placeholder="請輸入訊息..."
                      aria-label="Search"
                      ref={input => (this.textInput = input)}
                      onKeyPress={this.handleSubmit2}
                    />
                    <div className="input-group-append">
                      <span
                        className="input-group-text lime lighten-2 chatMessageSubmit position-relative"
                        id="basic-text1"
                        style={{ width: '41.5px' }}
                      >
                        <FontAwesomeIcon
                          icon={faUpload}
                          className="position-absolute"
                        />
                        <input
                          type="file"
                          name="file"
                          id="fileUpload"
                          multiple="multiple"
                          className="position-absolute"
                          style={{
                            opacity: 0,
                            width: '41.5px',
                            top: 0,
                            left: 0,
                            fontSize: '20px',
                          }}
                          onChange={this.handleUpload}
                        ></input>
                      </span>

                      <OverlayTrigger
                        trigger="click"
                        placement="top"
                        overlay={
                          <Popover id="popover-positioned-top">
                            <Popover.Title as="h3">{`品書貼圖`}</Popover.Title>
                            <Popover.Content>
                              <div className="chatStickerWrapScroll d-flex flex-wrap justify-content-center">
                                {this.state.sticker.map((value, index) => {
                                  return (
                                    <div key={index}>
                                      <div className="chatStickerWrap">
                                        <img
                                          data-sticker={value}
                                          onClick={this.handleSticker}
                                          src={
                                            'http://localhost:5555/images/chatSticker/' +
                                            value
                                          }
                                          alt="Avatar"
                                        />
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            </Popover.Content>
                          </Popover>
                        }
                      >
                        <span
                          className="input-group-text lime lighten-2 chatMessageSubmit"
                          id="triggerClick"
                        >
                          <FontAwesomeIcon icon={faSmile} />
                        </span>
                      </OverlayTrigger>

                      <span
                        className="input-group-text lime lighten-2 chatMessageSubmit"
                        id="basic-text1"
                        onClick={this.handleSubmit}
                      >
                        送出
                      </span>
                    </div>
                  </div>

                  <div
                    className="input-group md-form form-sm form-2 my-3 hide d-flex justify-content-center"
                    ref={messageMemo => (this.messageMemo = messageMemo)}
                  >
                    <h5 style={{ color: 'transparent' }}>
                      品書來找碴!隱藏文字在這裡!
                    </h5>
                  </div>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </>
    )
  }
}
export default Chat
