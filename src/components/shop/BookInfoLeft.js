import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import './Shop.scss'

const BookInfoLeft = props => {
  return (
    <>
      <div className="d-flex">
        <div className="book_pic mr-3">
          <Link to={'/books/information/' + props.data.sid}>
            <img
              src={'http://localhost:5555/images/books/' + props.data.pic}
              alt=""
            />
          </Link>
        </div>
        <div className="d-flex flex-column book_data">
          <Link
            to={'/books/information/' + props.data.sid}
            className="book_name"
          >
            {props.data.name}
          </Link>
          <div>
            <Link
              to={'/books/search/1/' + props.data.author}
              className="content_color mt-2 mb-1"
            >
              作者：{props.data.author}
            </Link>
            <span className="content_color mt-2 mb-1 mx-3">
              出版社：{props.data.cp_name}
            </span>
          </div>
          <span className="content_color mb-2">
            出版日期：
            {moment(props.data.publish_date).format('YYYY/MM/DD')}
          </span>
          <div className="content_color content_box">
            {props.data.introduction}
          </div>
          <Link
            to={'/books/information/' + props.data.sid}
            className="ml-auto mt-auto moreInfo"
          >
            ... {''} <FontAwesomeIcon icon={faCaretRight} /> more
          </Link>
        </div>
      </div>
    </>
  )
}

export default BookInfoLeft
