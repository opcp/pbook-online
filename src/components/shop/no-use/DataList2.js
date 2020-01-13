import React from 'react'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGripHorizontal, faList } from '@fortawesome/free-solid-svg-icons'
import BookInfoRight from '../BookInfoRight'
import BookInfoLeft from '../BookInfoLeft'
import Page from '../Page1'
import './Shop.scss'

const DataList = props => {
  function setMode() {
    localStorage.setItem('mode', 'pic')
  }
  return (
    <>
      <Col md={10} className="books">
        <div className="book_account mx-3 my-3">
          最新上架書籍共有
          <span className="book_number px-2">
            {props.shopPayload && props.shopPayload.totalRows}
          </span>
          本
        </div>
        <div className="book_order mx-4 my-3 px-5 d-flex justify-content-between">
          <div>
            <span className="mr-2">顯示模式</span>
            <Link to={'/books/' + props.nowPage + '/' + props.nowCategories}>
              <FontAwesomeIcon icon={faList} className="active" />
            </Link>
            <Link
              to={'/books/' + props.nowPage + '/' + props.nowCategories}
              onClick={() => setMode()}
            >
              <FontAwesomeIcon icon={faGripHorizontal} />
            </Link>
          </div>
          <div>
            <span className="mr-2">排序依</span>
            <select>
              <option>書名(小->大)</option>
              <option>書名(大->小)</option>
              <option>書名(小->大)</option>
              <option>書名(小->大)</option>
              <option>書名(小->大)</option>
            </select>
          </div>
        </div>
        {props.shopPayload &&
          props.shopPayload.rows &&
          props.shopPayload.rows.map(data => (
            <div className="d-flex justify-content-between my-5" key={data.sid}>
              <BookInfoLeft data={data}></BookInfoLeft>
              {/*書籍資訊左半*/}
              <BookInfoRight data={data}></BookInfoRight>
              {/*書籍資訊右半*/}
            </div>
          ))}
        <Page
          shopPayload={props.shopPayload}
          nowCategories={props.nowCategories}
          nowPage={props.nowPage}
        ></Page>
        {/*Pagination*/}
      </Col>
    </>
  )
}

export default DataList
