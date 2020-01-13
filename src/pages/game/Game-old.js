import React from 'react'
import axios from 'axios'
import swal from '@sweetalert/with-react'
import { ButtonToolbar, Button, Modal, Card } from 'react-bootstrap'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './changeGame.css'
import BGsound from './BGsound'
import MyCountdown from './MyCountdown'

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'start',
      myBooks: [],
      pairedMemberBooks: [],
      modalShow: false,
    }
  }

  // 遊戲首頁到對方的書籍列表(進入遊戲)
  handleStartGame = () => {
    this.btnaudio.cloneNode().play()
    if (this.state.myBooks.length === 0) {
      swal({
        title: '您的書櫃裡沒有書唷!請到會員資料的二手書管理內新增配對書籍!',
        icon: 'warning',
      }).then(value => {
        // 這邊要記得改!要引導到上架書籍那
        window.location.href = '/'
      })
    } else {
      // console.log(Object.values(this.state.myBooks))
      // for (var i = 0; i < Object.values(this.state.myBooks).length - 1; i++) {
      //   Object.values(this.state.myBooks)[i]["mb_status"] === "1")
      // }
      console.log(Object.values(this.state.myBooks))

      // Object.values(this.state.myBooks)

      // this.setState({ status: 'gameBookList' })
    }
  }

  // 遊戲首頁返回(退出遊戲)
  handleBackGame = () => {
    this.btnaudio.cloneNode().play()
    window.history.back()
  }

  // 書籍列表光箱控制鈕
  handleModalShow = () => {
    this.setState({ modalShow: true })
  }
  handleModalHide = () => {
    this.setState({ modalShow: false })
  }

  componentDidMount() {
    axios.get(`http://localhost/php-api/game.php`).then(res => {
      const persons = res.data
      for (var i = 0; i < persons.length; i++) {
        // console.log('persons', persons[i])
        if (
          persons[i][0]['mb_shelveMember'] ===
          JSON.parse(localStorage.getItem('user')).MR_number
        ) {
          console.log('第一組')
          this.setState({
            myBooks: persons[i][0],
            pairedMemberBooks: persons[i][1],
          })
        } else if (
          persons[i][1]['mb_shelveMember'] ===
          JSON.parse(localStorage.getItem('user')).MR_number
        ) {
          console.log('第二組')
          this.setState({
            myBooks: persons[i][1],
            pairedMemberBooks: persons[i][0],
          })
        }
      }
    })
  }

  render() {
    const { myBooks, pairedMemberBooks } = this.state
    console.log('render myBooks', myBooks)
    console.log('render pairedMemberBooks', pairedMemberBooks)
    var pcSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }

    if (this.state.status === 'start') {
      return (
        <>
          <audio
            id="audio"
            hidden={true}
            src={require('./sound/yisell_sound_2007_11_14_10_40_498758.mp3')}
            ref={audio => (this.btnaudio = audio)}
          ></audio>

          <div
            style={{
              width: '100vw',
              height: '100vh',
              background: 'URL(' + require('./images/bg.png') + ')',
              position: 'absolute',
              top: '0',
              left: '0',
              zIndex: 999,
            }}
          >
            <div className="changeGameIndexBG">
              <div id="snow"></div>
              <div className="position-relative PC-changeGameWrap">
                <img
                  className="position-absolute PC-changeGameIndexContext"
                  src={require('./images/PC-changeGameIndexContext.png')}
                  alt="電腦版"
                />
                <div className="position-absolute d-flex PC-changeGameBtnWrap">
                  <img
                    id="btn"
                    src={require('./images/start-black.png')}
                    alt="電腦版進入按鈕"
                    onClick={this.handleStartGame}
                  />
                  <img
                    src={require('./images/back-black.png')}
                    alt="電腦版退出按鈕"
                    onClick={this.handleBackGame}
                  />
                </div>
              </div>

              <div className="position-relative">
                <img
                  className="PHONE-changeGameIndexContext"
                  src={require('./images/PHONE-changeGameIndexContext.png')}
                  alt="手機板"
                />
                <div className="position-absolute PHONE-changeGameBtnWrap">
                  <img
                    src={require('./images/start-black.png')}
                    alt="手機版進入按鈕"
                    onClick={this.handleStartGame}
                  />
                  <img
                    src={require('./images/back-black.png')}
                    alt="手機版退出按鈕"
                    onClick={this.handleBackGame}
                  />
                </div>
              </div>
            </div>
            <BGsound />
          </div>
        </>
      )
    } else if (this.state.status === 'gameBookList') {
      return (
        <>
          <audio
            id="audio"
            hidden={true}
            src={require('./sound/yisell_sound_2007_11_14_10_40_498758.mp3')}
            ref={audio => (this.btnaudio = audio)}
          ></audio>

          <div
            style={{
              width: '100vw',
              height: '100vh',
              background: 'URL(' + require('./images/bg.png') + ')',
              position: 'absolute',
              top: '0',
              left: '0',
              zIndex: 999,
            }}
          >
            <div className="changeGameIndexBG">
              <div id="snow"></div>
              <div className="position-relative PC-changeGameBookListWrap d-flex">
                <img
                  className="position-absolute PC-changeGameBookListContext"
                  src={require('./images/PC-changeGameBookListContext.png')}
                  alt="電腦版"
                />
                <div className="position-absolute PC-changeGameBookListTableWrap">
                  <div className="PC-changeGameBookListTable">
                    <MyCountdown />
                    <table className="table table-bordered table-hover">
                      <thead className="thead-dark">
                        <tr>
                          <th scope="col">選擇</th>
                          <th scope="col">書籍名稱</th>
                          <th
                            scope="col"
                            className="PC-changeGameBookListBookStatus"
                          >
                            +書況
                          </th>
                          <th scope="col">書籍照片</th>
                          <th scope="col">分類</th>
                          <th scope="col">定價</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">
                            <input
                              type="radio"
                              name="react-tips"
                              value="option1"
                            ></input>
                          </th>
                          <td>柱子小隊的資策會人生</td>
                          <td>A良好</td>
                          <td>
                            <ButtonToolbar>
                              <div
                                className="PC-changeGameBookListShow"
                                onClick={this.handleModalShow}
                              >
                                +顯示
                              </div>
                              <Modal
                                show={this.state.modalShow}
                                size="lg"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                              >
                                <Modal.Header>
                                  <Modal.Title id="contained-modal-title-vcenter">
                                    書籍名稱
                                  </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  <Slider {...pcSettings}>
                                    <div>
                                      <img
                                        style={{
                                          margin: '0 auto',
                                        }}
                                        src={require('./images/vb_9573318318.jpg')}
                                        alt="書籍照片"
                                      />
                                    </div>
                                    <div>
                                      <img
                                        style={{
                                          margin: '0 auto',
                                        }}
                                        src={require('./images/vb_9573318318.jpg')}
                                        alt="書籍照片"
                                      />
                                    </div>
                                  </Slider>
                                </Modal.Body>
                                <Modal.Body>書籍備註：無畫線註記。</Modal.Body>
                                <Modal.Footer>
                                  <Button onClick={this.handleModalHide}>
                                    關閉
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                            </ButtonToolbar>
                          </td>
                          <td>程式語言</td>
                          <td>500元</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <input
                              type="radio"
                              name="react-tips"
                              value="option2"
                            ></input>
                          </th>
                          <td>柱子小隊的資策會人生</td>
                          <td>A良好</td>
                          <td>+顯示</td>
                          <td>程式語言</td>
                          <td>500元</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <input
                              type="radio"
                              name="react-tips"
                              value="option3"
                            ></input>
                          </th>
                          <td>柱子小隊的資策會人生</td>
                          <td>A良好</td>
                          <td>+顯示</td>
                          <td>程式語言</td>
                          <td>500元</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <input
                              type="radio"
                              name="react-tips"
                              value="option4"
                            ></input>
                          </th>
                          <td>柱子小隊的資策會人生</td>
                          <td>A良好</td>
                          <td>+顯示</td>
                          <td>程式語言</td>
                          <td>500元</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="d-flex justify-content-end PC-changeGameBookListBtnWrap">
                    <img
                      src={require('./images/submit-green.png')}
                      alt="電腦版確認送出按鈕"
                    />
                    <img
                      src={require('./images/back-red.png')}
                      alt="電腦版回到首頁按鈕"
                    />
                  </div>
                </div>
              </div>

              <div className="position-relative PHONE-changeGameBookListWrap">
                <img
                  className="PHONE-changeGameBookListContext"
                  src={require('./images/PHONE-changeGameBookListContext.png')}
                  alt="手機板"
                />

                <Slider {...settings}>
                  <div>
                    <div className="text-center" style={{ margin: '10px 0' }}>
                      <MyCountdown />
                    </div>
                    <div
                      style={{
                        width: '90vw',
                        margin: '0 auto',
                      }}
                    >
                      <Card.Header className="text-center">
                        柱子小隊的資策會人生
                      </Card.Header>
                      <Card.Body className="text-left">
                        <Card.Text>
                          <img
                            src={require('./images/hina.jpg')}
                            alt="手機板書籍照片"
                            className="PHONE-changeGameBookListImg"
                          ></img>
                        </Card.Text>
                        <Card.Text>
                          ・選擇：
                          <input
                            type="radio"
                            name="react-tips"
                            value="option1"
                          ></input>
                        </Card.Text>
                        <Card.Text>・書況：A良好</Card.Text>
                        <Card.Text>・分類：程式語言</Card.Text>
                        <Card.Text className="PHONE-changeGameBookListText">
                          ・書籍備註：CSS不能單獨使用，必須與HTML或XML一起協同工作，為HTML或XML起裝飾作用。本文主要介紹用於裝飾HTML網頁的CSS技術。其中HTML負責確定網頁中有哪些內容，CSS確定以何種外觀(大小、粗細、顏色、對齊和位置)展現這些元素。CSS可以用於設定頁面布局、設定頁面元素樣式、設定適用於所有網頁的全域樣式。CSS可以零散地直接添加在要應用樣式的網頁元素上，也可以集中化內建於網頁、連結式引入網頁以及匯入式引入網頁。[1]
                          CSS最重要的目標是將檔案的內容與它的顯示分隔開來。在CSS出現前，幾乎所有的HTML檔案內都包含檔案顯示的資訊，比如字型的顏色、背景應該是怎樣的、如何排列、邊緣、連線等等都必須一一在HTML檔案內列出，有時重複列出。CSS使作者可以將這些資訊中的大部分隔離出來，簡化HTML檔案，這些資訊被放在一個輔助的，用CSS語言寫的檔案中。HTML檔案中只包含結構和內容的資訊，CSS檔案中只包含樣式的資訊。
                          比如HTML中H2標誌這一個二級標題，它在級別上比一級標題H1低，比三級標題H3高。這些資訊都是結構上的資訊。
                        </Card.Text>
                        <Card.Text>・定價：500元</Card.Text>
                      </Card.Body>
                    </div>
                  </div>
                  <div>
                    <h6 className="text-center" style={{ margin: '10px 0' }}>
                      2019年9月29日 剩餘時間 5小時3分20秒
                    </h6>
                    <div
                      style={{
                        width: '90vw',
                        margin: '0 auto',
                      }}
                    >
                      <Card.Header className="text-center">
                        柱子小隊的資策會人生
                      </Card.Header>
                      <Card.Body className="text-left">
                        <Card.Text>
                          <img
                            src={require('./images/hina.jpg')}
                            alt="手機板書籍照片"
                            className="PHONE-changeGameBookListImg"
                          ></img>
                        </Card.Text>
                        <Card.Text>
                          ・選擇：
                          <input
                            type="radio"
                            name="react-tips"
                            value="option2"
                          ></input>
                        </Card.Text>
                        <Card.Text>・書況：A良好</Card.Text>
                        <Card.Text>・分類：程式語言</Card.Text>
                        <Card.Text className="PHONE-changeGameBookListText">
                          ・書籍備註：CSS不能單獨使用，必須與HTML或XML一起協同工作，為HTML或XML起裝飾作用。本文主要介紹用於裝飾HTML網頁的CSS技術。其中HTML負責確定網頁中有哪些內容，CSS確定以何種外觀(大小、粗細、顏色、對齊和位置)展現這些元素。CSS可以用於設定頁面布局、設定頁面元素樣式、設定適用於所有網頁的全域樣式。CSS可以零散地直接添加在要應用樣式的網頁元素上，也可以集中化內建於網頁、連結式引入網頁以及匯入式引入網頁。[1]
                          CSS最重要的目標是將檔案的內容與它的顯示分隔開來。在CSS出現前，幾乎所有的HTML檔案內都包含檔案顯示的資訊，比如字型的顏色、背景應該是怎樣的、如何排列、邊緣、連線等等都必須一一在HTML檔案內列出，有時重複列出。CSS使作者可以將這些資訊中的大部分隔離出來，簡化HTML檔案，這些資訊被放在一個輔助的，用CSS語言寫的檔案中。HTML檔案中只包含結構和內容的資訊，CSS檔案中只包含樣式的資訊。
                          比如HTML中H2標誌這一個二級標題，它在級別上比一級標題H1低，比三級標題H3高。這些資訊都是結構上的資訊。
                        </Card.Text>
                        <Card.Text>・定價：500元</Card.Text>
                      </Card.Body>
                    </div>
                  </div>
                </Slider>
                <div className="d-flex PHONE-changeGameBookListBtnWrap">
                  <img
                    src={require('./images/submit-green.png')}
                    alt="手機版確認送出按鈕"
                  />
                  <img
                    src={require('./images/back-red.png')}
                    alt="手機版回到首頁按鈕"
                  />
                </div>
              </div>
            </div>
            <BGsound />
          </div>
        </>
      )
    } else if (this.state.status === 'aaaa') {
      return (
        <>
          <h1>測試2</h1>
        </>
      )
    }
  }
}

export default Game
