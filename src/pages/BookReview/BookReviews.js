/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import styled from '@emotion/styled'
import BookScoreAndLine from './BookScore/BookScoreAndLine'
import BookStar from './BookScore/BookScoreForBR'
import BookScoreForMember from './BookScore/BookScoreForMember'
import { faTimes, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import swal from '@sweetalert/with-react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import Nav from './components/Navbar'

//---------------------------------------------------------------------------------------------------------
const All = styled.section`
  background-image: url('../../images/bg.png');
`
//------------------------------------------------------------------------------------------------------

const List = () => {
  //從nodejs拿取資料的sid值
  const urlParams = window.location.pathname.replace('/book_reviews/', '')

  //變數

  //上方書本資料
  const [List, setList] = useState([])
  //推薦書本資料
  const [recommendBook, setRecommendBook] = useState([])
  //會員書評
  const [memberReview, getMemberReview] = useState([])
  //會員個人資料設定
  const [user, setUser] = useState({
    isLogin: false,
    pic: 'yui.png',
    nickname: '',
  })
  //CRUD設定
  const [review, setReview] = useState({
    sid: '',
    pic: '',
    editReview: '',
    reviewText: '',
    book: urlParams,
    star: '1',
    isEdit: false,
  })
  const [id, getID] = useState()
  //ISBN
  const [ISBN, setISBN] = useState()
  //書評下方顯示欄資料
  const [reply, setReply] = useState([])
  //書評回覆用對照ID
  const [reviewID, setReviewID] = useState(1)
  //書評回覆內容更新
  let replyTxt
  const [rept, SetRept] = useState('')
  //書評回覆CRUD狀態
  const [replyMode, setReplyMode] = useState({
    isEdit: false,
    sid: '',
    editReply: '',
  })

  useEffect(() => {
    bookList()
    reviewList()
    replyText()
    if (JSON.parse(localStorage.getItem('user')) !== null) {
      let data = JSON.parse(localStorage.getItem('user'))
      setUser({
        isLogin: true,
        pic: data.MR_pic,
        nickname: data.MR_nickname,
      })
      getID(data.MR_number)
      recommend(data.MR_number)
    }
  }, [])
  //書評分頁資料ajax
  const bookList = async () => {
    await axios
      .get(`http://localhost:5555/books/book_info/${urlParams}`)
      .then(res => {
        let data = res.data.rows[0]
        setList(res.data.rows)
        setISBN(data.isbn)
        setReview({
          ...review,
          isbn: data.isbn,
          pic: data.pic,
          reviewText: '',
          star: 1,
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
  //書評資料
  const reviewList = async () => {
    await axios
      .get(`http://localhost:5555/reviews/memberReview/${urlParams}`)
      .then(res => {
        getMemberReview(res.data.reviews)
      })
      .catch(error => {
        console.log(error)
      })
  }
  //書籍推薦資料
  const recommend = async e => {
    await axios
      .get(`http://localhost:5555/activities/recommend-books/${e}/4`)
      .then(res => {
        setRecommendBook(res.data)
      })
  }
  //書評回覆 用ENTER 發送&修改
  const keypress = e => {
    if (e.which === 13) {
      if (replyMode.editReply !== '' && replyMode.editReply !== undefined) {
        submitHandler2(e)
        updateHandler(e)
      } else {
        swal('內容為空', '', 'warning')
      }
    }
  }

  //輸入時更新資料
  const changeHandler = e => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    })
    setReviewID(e.target.name)
    replyTxt = e.target.name
    SetRept({ replyTxt: e.target.value })
    console.log(e.target.value)
    setReplyMode({ ...replyMode, editReply: e.target.value })
  }

  //新增資料
  const submitHandler = e => {
    e.preventDefault()
    let api
    api = `http://localhost:5555/reviews/book_reviews/${urlParams}/data`

    if (review.reviewText !== '') {
      axios
        .post(api, {
          id: id,
          book: review.book,
          reviewText: review.reviewText,
          star: review.star,
        })
        .then(res => {
          swal('新增成功', '', 'success').then(value => {
            reviewList()
            bookList()
          })
        })

        .catch(error => {
          setReview({
            ...review,
            error: true,
            submitSuccess: false,
          })
        })
    } else {
      swal('書評內容為空')
    }
  }
  //新增資料下方回覆
  const submitHandler2 = e => {
    e.preventDefault()
    let api = `http://localhost:5555/reviews/reply/InsertData`

    if (user.isLogin) {
      axios
        .post(api, {
          id: id,
          review_sid: reviewID,
          reply: replyMode.editReply,
        })
        .then(res => {
          swal('新增成功', '', 'success').then(value => {
            replyText()
            clear()
          })
        })

        .catch(error => {
          setReview({
            ...review,
            error: true,
            submitSuccess: false,
          })
        })
    } else {
      swal('書評內容為空')
    }
  }
  //更新書評&回覆資料
  const updateHandler = e => {
    e.preventDefault()
    let api
    if (replyMode.isEdit) {
      api = `http://localhost:5555/reviews/reply/EditData`
    } else {
      api = `http://localhost:5555/reviews/editReview/data`
    }
    axios
      .put(api, {
        sid: review.sid,
        replySid: replyMode.sid,
        editReview: review.editReview,
        editReply: replyMode.editReply,
      })
      .then(res => {
        swal('修改成功!').then(value => {
          setReview({ isEdit: false })
          reviewList()
          replyText()
        })
      })
      .then(setReplyMode({ isEdit: false }))

      .catch(error => {
        setReview({
          ...review,
          error: true,
          submitSuccess: false,
        })
      })
  }

  //刪除書評資料
  const deleteHandler = e => {
    let delete_data = e
    let api
    if (replyMode.isEdit) {
      api = `http://localhost:5555/reviews/reply/DeleteData/${delete_data}`
    } else {
      api = `http://localhost:5555/reviews/deleteReview/${delete_data}`
    }
    swal({
      title: '確定刪除嗎?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(willDelete => {
      if (willDelete) {
        axios.delete(api)
        swal('刪除成功!', '', {
          icon: 'success',
        })
          .then(value => {
            bookList()
            reviewList()
            replyText()
          })
          .then(console.log('123'))
      } else {
        swal('已取消刪除!')
      }
    })
  }

  //刪除書評回覆資料
  const deleteHandler2 = e => {
    let delete_data = e
    let api
    api = `http://localhost:5555/reviews/reply/DeleteData/${delete_data}`
    swal({
      title: '確定刪除嗎?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(willDelete => {
      if (willDelete) {
        axios.delete(api)
        swal('刪除成功!', '', {
          icon: 'success',
        }).then(value => {
          reviewList()
          replyText()
        })
      } else {
        swal('已取消刪除!')
      }
    })
  }

  // 跳至登入畫面
  const login = () => {
    let loginBtn = document.querySelector('.loginButton')
    loginBtn.click()
  }

  //加入書櫃
  const addCase = e => {
    e.preventDefault()
    let api = `http://localhost:5555/reviews/bookcase`
    if (user.isLogin) {
      axios
        .post(api, {
          number: id,
          isbn: ISBN,
        })
        .then(res => {
          swal('新增成功', '', 'success')
        })
    } else {
      swal('請登入會員').then(value => {
        login()
      })
    }
  }

  // -----------------------------------------------------------------------

  //書評下方顯示資料
  const replyText = async () => {
    await axios.get(`http://localhost:5555/reviews/reply/`).then(res => {
      setReply(res.data.reply)
    })
  }
  const clear = () => {
    setReview({ reviewText: '' })
    SetRept({ name: '' })
  }
  return (
    <>
      <All>
        <Nav />
        <section className="reviews_Main">
          {List.map(data => (
            <div className="reviews_Book" key={data.sid}>
              <div className="reviews_column">
                <img
                  className="reviews_list_img"
                  key={data.sid}
                  src={`http://localhost:5555/images/books/${data.pic}`}
                />
              </div>
              <div className="reviews_column2">
                <div className="reviews_bookInfo">
                  <h3>{data.name}</h3>
                  <span>作者:</span>
                  <span className="reviews_author" style={{ opacity: 0.6 }}>
                    {data.author}
                  </span>
                  <span className="reviews_author">出版社:</span>
                  <span style={{ opacity: 0.6 }}>{data.cp_name}</span>
                  <span className="reviews_author">出版日期:</span>
                  <span style={{ opacity: 0.6 }}>
                    {new Intl.DateTimeFormat('zh-TW', {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      hour12: false,
                    })
                      .format(new Date(data.publish_date))
                      .replace(/\//g, '-')}
                  </span>
                  <br />
                  <br />
                  {'內容簡介:'}
                  <div className="reviews_info">
                    {data.introduction
                      .replace(/<[^>]*>/g, '')
                      .replace(/&nbsp;/g, '')
                      .replace(/&hellip;/g, '')
                      .replace(/&bull;/g, '')}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {user.isLogin ? (
            <div className="reviews_recommendText">推薦書籍</div>
          ) : (
            ''
          )}
          <div className="reviews_recommendBook">
            {recommendBook.map((book, index) => (
              <Link
                key={index}
                className="reviews_recommendBook_Link"
                to={'/book_reviews/' + book.sid}
              >
                <div>
                  <img
                    className="reviews_recommendBook_img"
                    src={`http://localhost:5555/images/books/${book.pic}`}
                  />
                  <div className="reviews_recommendBookName">{book.name}</div>
                </div>
              </Link>
            ))}
          </div>
          {/* <div className="reviews_BookColumnScore"> */}
          {user.isLogin ? (
            <div className="reviews_BookColumnScore">
              <Link to={`/books/information/${urlParams}`}>
                <button style={{ outline: 0 }} className="reviews_BookBuy">
                  立即購買
                </button>
              </Link>
              <div className="reviews_row">
                <BookScoreAndLine List={List} />
              </div>
              <form onSubmit={addCase}>
                <button type="submit" className="reviews_BookCase">
                  加入書櫃
                </button>
              </form>
            </div>
          ) : (
            <div className="reviews_BookColumnScore2">
              <Link to={`/books/information/${urlParams}`}>
                <button style={{ outline: 0 }} className="reviews_BookBuy">
                  立即購買
                </button>
              </Link>
              <div className="reviews_BookRow2">
                <BookScoreAndLine List={List} />
              </div>
              <form onSubmit={addCase}>
                <button type="submit" className="reviews_BookCase">
                  加入書櫃
                </button>
              </form>
            </div>
          )}
          <h3 className="reviews_push">發表評論</h3>
          <section className="reviews_container">
            <div className="reviews_BookColumnMember">
              <div className="reviews_MemberIcon">
                {user.isLogin ? (
                  <img
                    className="reviews_member_img"
                    src={`http://localhost:5555/images/member/${user.pic}`}
                  />
                ) : (
                  ''
                )}
                <h6 className="reviews_member_nickname">{user.MR_nickname}</h6>
              </div>
            </div>
            {user.isLogin ? (
              <form className="reviews_form" onSubmit={submitHandler}>
                <textarea
                  className="reviews_textarea"
                  name="reviewText"
                  value={review.reviewText}
                  onChange={changeHandler}
                  onKeyPress={keypress}
                  placeholder="新增評論..."
                />
                <div className="reviews_push2">
                  <p style={{ width: '80px' }}>幫書籍評分</p>
                  <BookStar
                    score_star={review.star}
                    setScore_star={changeHandler}
                  />
                  <button
                    style={{ outline: 0 }}
                    type="submit"
                    className="reviews_submitBtn"
                  >
                    送出評論
                  </button>
                </div>
              </form>
            ) : (
              <form className="reviews_form">
                <h6 className="reviews_Login">
                  <a className="reviews_goLogin" onClick={login} href="#">
                    請登入會員填寫評論
                  </a>
                </h6>
              </form>
            )}
          </section>
          {memberReview.map((data, index) => (
            <section className="reviews_container" key={index}>
              <div className="reviews_BookColumnMember">
                <div className="reviews_MemberIcon">
                  <img
                    className="reviews_memberReview_img"
                    src={`http://localhost:5555/images/member/${data.MR_pic}`}
                  />
                </div>
              </div>
              <div className="reviews_member_text">
                <div className="reviews_row">
                  <BookScoreForMember score_star={data.star} />
                  {data.MR_levelName}
                </div>
                <div className="reviews_row">
                  <h6 className="reviews_member_nickname">
                    {data.MR_nickname}
                  </h6>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <div className="reviews_time">
                    {new Intl.DateTimeFormat('zh-TW', {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      hour12: false,
                    })
                      .format(new Date(data.create_time))
                      .replace(/\//g, '-')}
                  </div>
                </div>
                <br />
                {review.isEdit && data.sid === review.sid ? (
                  <form onSubmit={updateHandler}>
                    <textarea
                      className="reviews_textarea"
                      name="editReview"
                      value={review.editReview}
                      onChange={changeHandler}
                      // onKeyPress={keypress}
                    />
                    <button
                      style={{ outline: 0 }}
                      type="submit"
                      className="reviews_UpdateBtn"
                    >
                      修改評論
                    </button>
                  </form>
                ) : (
                  <div className="reviews_text">{data.message}</div>
                )}
                {reply.map((item, index) =>
                  item.review_sid == data.sid ? (
                    <div key={index} className="reviews_reply_view">
                      <img
                        className="reviews_memberReply_img"
                        src={`http://localhost:5555/images/member/${item.MR_pic}`}
                      />
                      {replyMode.isEdit && replyMode.sid === item.reply_sid ? (
                        <form
                          className="reviews_reply_form"
                          onSubmit={updateHandler}
                        >
                          {item.MR_nickname}
                          &nbsp;
                          {':'}
                          &nbsp;
                          <input
                            className="reviews_reply_editText"
                            name="editReply"
                            onChange={changeHandler}
                            value={replyMode.editReply}
                          ></input>
                        </form>
                      ) : (
                        <div className="reviews_reply_form">
                          {item.MR_nickname}
                          &nbsp;
                          {':'}
                          &nbsp;
                          {item.reply_text}
                        </div>
                      )}
                      {item.member == id ? (
                        <>
                          {replyMode.isEdit &&
                          replyMode.sid === item.reply_sid ? (
                            <FontAwesomeIcon
                              className="reviews_reply_cancel"
                              onClick={() => {
                                setReplyMode({
                                  ...replyMode,
                                  isEdit: false,
                                  sid: item.reply_sid,
                                  editReply: item.reply_text,
                                })
                              }}
                              icon={faTimes}
                            />
                          ) : (
                            <FontAwesomeIcon
                              className="reviews_reply_edit"
                              onClick={() => {
                                setReplyMode({
                                  ...replyMode,
                                  isEdit: true,
                                  sid: item.reply_sid,
                                  editReply: item.reply_text,
                                })
                              }}
                              icon={faPen}
                            />
                          )}
                          {replyMode.isEdit &&
                          replyMode.sid === item.reply_sid ? (
                            ''
                          ) : (
                            <FontAwesomeIcon
                              className="reviews_reply_delete"
                              value={item.reply_sid}
                              onClick={() => {
                                deleteHandler2(item.reply_sid)
                              }}
                              icon={faTrashAlt}
                            />
                          )}
                        </>
                      ) : (
                        ''
                      )}
                    </div>
                  ) : (
                    ''
                  )
                )}
                {user.isLogin ? (
                  <form onSubmit={submitHandler2} key={index}>
                    <textarea
                      value={rept.name}
                      onChange={changeHandler}
                      name={data.sid}
                      placeholder="回覆此書評"
                      className="reviews_reply_text"
                      onKeyPress={keypress}
                    />
                  </form>
                ) : (
                  ''
                )}
              </div>
              {id === data.member ? (
                <div className="reviews_row2">
                  {review.isEdit && data.sid === review.sid ? (
                    <>
                      <FontAwesomeIcon
                        onClick={() => {
                          setReview({
                            ...review,
                            isEdit: false,
                            editReview: data.message,
                            sid: data.sid,
                          })
                        }}
                        className="reviews_member_icon_times"
                        icon={faTimes}
                      />
                    </>
                  ) : (
                    <FontAwesomeIcon
                      onClick={() => {
                        setReview({
                          ...review,
                          isEdit: true,
                          sid: data.sid,
                          editReview: data.message,
                        })
                      }}
                      className="reviews_member_icon"
                      icon={faPen}
                    />
                  )}
                  <br />
                  {review.isEdit && data.sid === review.sid ? (
                    ''
                  ) : (
                    <FontAwesomeIcon
                      onClick={() => deleteHandler(data.sid)}
                      value={data.sid}
                      className="reviews_member_icon"
                      icon={faTrashAlt}
                    />
                  )}
                </div>
              ) : (
                ''
              )}
            </section>
          ))}
        </section>
      </All>
    </>
  )
}

export default List
