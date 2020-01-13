import React from 'react'
import { Col } from 'react-bootstrap'
import './BookCommodity.scss'

const BookPic = props => {
  let data =
    props.bookInfoPayload &&
    props.bookInfoPayload.rows &&
    props.bookInfoPayload.rows[0]
  if (!(data && data.pic))
    return (
      <>
        <h4>
          取得資料中...
          <img
            className="loadingGif"
            src={require('../images/ani_LoadingPBook.gif')}
            alt=""
          />
        </h4>
      </>
    )
  return (
    <>
      <Col md={4}>
        <div className="bookCover">
          <img
            src={'http://localhost:5555/images/books/' + (data && data.pic)}
            alt=""
          />
        </div>
      </Col>
    </>
  )
}

export default BookPic
